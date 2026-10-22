import { describe, expect, it } from "vitest";
import type { DueRow, RefreshDb } from "./batch";
import { runScheduledRefresh } from "./scheduled";
import type { PlatformProfile } from "@/lib/platforms/types";

const profile: PlatformProfile = {
  stats: { rating: 1500, solved: 10, rank: null, contests: 0, extra: {} },
  contests: [],
};
const START = new Date("2026-10-08T06:00:00Z");

/** A queue of due accounts. Each saved success removes one from the queue, like the real database. */
function setup(count: number) {
  const queue: DueRow[] = Array.from({ length: count }, (_, i) => ({
    studentId: `s${i}`,
    platform: "leetcode" as const,
    username: `u${i}`,
    failCount: 0,
  }));
  const seen = { updatedBefore: [] as (Date | undefined)[], picks: 0 };
  const db: RefreshDb = {
    async pickDue(limit, _now, updatedBefore) {
      seen.updatedBefore.push(updatedBefore);
      seen.picks++;
      return queue.splice(0, limit);
    },
    async saveSuccess() {},
    async saveFailure() {},
  };
  return { db, seen, queue };
}

describe("runScheduledRefresh", () => {
  it("keeps going until nothing is due, adding up every round", async () => {
    const { db } = setup(25);
    const out = await runScheduledRefresh({
      db,
      fetchProfile: async () => profile,
      now: () => START,
      batchSize: 10,
      concurrency: 1,
    });
    expect(out).toMatchObject({ picked: 25, succeeded: 25, failed: 0 });
    expect(out.rounds).toBe(4); // 10, 10, 5, then an empty round that ends it
  });

  it("only asks for accounts not refreshed within the stale window, fixed at the start", async () => {
    const { db, seen } = setup(15);
    let t = START.getTime();
    await runScheduledRefresh({
      db,
      fetchProfile: async () => profile,
      now: () => new Date((t += 1000)),
      staleMinutes: 180,
      batchSize: 10,
    });
    const expected = new Date(START.getTime() + 1000 - 180 * 60_000);
    expect(seen.updatedBefore.length).toBeGreaterThan(1);
    for (const u of seen.updatedBefore) expect(u).toEqual(expected);
  });

  it("stops starting new rounds once the time budget is nearly used", async () => {
    const { db, seen, queue } = setup(100);
    let t = START.getTime();
    const out = await runScheduledRefresh({
      db,
      fetchProfile: async () => {
        t += 20_000; // each fetch "takes" 20 seconds
        return profile;
      },
      now: () => new Date(t),
      budgetMs: 45_000,
      reserveMs: 15_000,
      batchSize: 1,
      concurrency: 1,
    });
    // 0s start -> 20s -> 40s; at 40s only 5s is left, below the 15s reserve, so it stops.
    expect(out.rounds).toBe(2);
    expect(out.picked).toBe(2);
    expect(queue.length).toBe(98);
    expect(seen.picks).toBe(2);
  });

  it("does nothing, quickly, when everything is fresh", async () => {
    const { db } = setup(0);
    const out = await runScheduledRefresh({
      db,
      fetchProfile: async () => profile,
      now: () => START,
    });
    expect(out).toEqual({ picked: 0, succeeded: 0, failed: 0, rounds: 1 });
  });
});
