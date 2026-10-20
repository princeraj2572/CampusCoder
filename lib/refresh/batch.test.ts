import { describe, expect, it } from "vitest";
import { refreshBatch, type DueRow, type RefreshDb } from "@/lib/refresh/batch";
import { FetchError, type PlatformProfile } from "@/lib/platforms/types";

const NOW = new Date("2026-10-07T10:00:00Z");
const profile: PlatformProfile = {
  stats: { rating: 1500, solved: 10, rank: null, contests: 1, extra: {} },
  contests: [],
};
const row = (n: number, failCount = 0): DueRow => ({
  studentId: `s${n}`,
  platform: "leetcode",
  username: `user${n}`,
  failCount,
});

function fakeDb(rows: DueRow[], opts: { failSaveFailure?: boolean } = {}) {
  const calls = {
    pickLimit: 0,
    updatedBefore: undefined as Date | undefined,
    successes: [] as string[],
    failures: [] as { id: string; kind: string; next: Date }[],
  };
  const db: RefreshDb = {
    async pickDue(limit, _now, updatedBefore) {
      calls.pickLimit = limit;
      calls.updatedBefore = updatedBefore;
      return rows;
    },
    async saveSuccess(r) {
      calls.successes.push(r.studentId);
    },
    async saveFailure(r, error, next) {
      if (opts.failSaveFailure) throw new Error("db down");
      calls.failures.push({ id: r.studentId, kind: error.kind, next });
    },
  };
  return { db, calls };
}

const run = (
  db: RefreshDb,
  fetchProfile: Parameters<typeof refreshBatch>[0]["fetchProfile"],
  extra = {},
) => refreshBatch({ db, fetchProfile, now: () => NOW, log: () => {}, ...extra });

describe("refreshBatch", () => {
  it("only asks for accounts not updated since the given time", async () => {
    const { db, calls } = fakeDb([row(1)]);
    const since = new Date("2026-10-07T09:55:00Z");
    await run(db, async () => profile, { updatedBefore: since });
    expect(calls.updatedBefore).toEqual(since);
  });

  it("asks for everything due when no time is given", async () => {
    const { db, calls } = fakeDb([row(1)]);
    await run(db, async () => profile);
    expect(calls.updatedBefore).toBeUndefined();
  });

  it("saves every row that fetches successfully", async () => {
    const { db, calls } = fakeDb([row(1), row(2)]);
    const summary = await run(db, async () => profile);
    expect(calls.successes).toEqual(["s1", "s2"]);
    expect(summary).toEqual({ picked: 2, succeeded: 2, failed: 0 });
  });

  it("asks for the configured batch size, defaulting to 10", async () => {
    const a = fakeDb([]);
    await run(a.db, async () => profile);
    expect(a.calls.pickLimit).toBe(10);
    const b = fakeDb([]);
    await run(b.db, async () => profile, { batchSize: 3 });
    expect(b.calls.pickLimit).toBe(3);
  });

  it("isolates a failing row and backs it off a day when the account is not found", async () => {
    const { db, calls } = fakeDb([row(1), row(2), row(3)]);
    const summary = await run(db, async (_p, username) => {
      if (username === "user2") throw new FetchError("not-found", "gone");
      return profile;
    });
    expect(calls.successes).toEqual(["s1", "s3"]);
    expect(calls.failures).toEqual([
      { id: "s2", kind: "not-found", next: new Date("2026-10-08T10:00:00Z") },
    ]);
    expect(summary).toEqual({ picked: 3, succeeded: 2, failed: 1 });
  });

  it("backs off exponentially using the previous failure count", async () => {
    const { db, calls } = fakeDb([row(1, 2)]);
    await run(db, async () => {
      throw new FetchError("unavailable", "rate limited");
    });
    // third consecutive failure => 60 minutes
    expect(calls.failures[0].next).toEqual(new Date("2026-10-07T11:00:00Z"));
  });

  it("treats a non-FetchError exception as unexpected", async () => {
    const { db, calls } = fakeDb([row(1)]);
    await run(db, async () => {
      throw new TypeError("boom");
    });
    expect(calls.failures[0].kind).toBe("unexpected");
  });

  it("keeps going when recording a failure itself fails", async () => {
    const { db, calls } = fakeDb([row(1), row(2)], { failSaveFailure: true });
    const summary = await run(db, async (_p, u) => {
      if (u === "user1") throw new FetchError("unavailable", "x");
      return profile;
    });
    expect(calls.successes).toEqual(["s2"]);
    expect(summary).toEqual({ picked: 2, succeeded: 1, failed: 1 });
  });

  it("does nothing when no rows are due", async () => {
    const { db } = fakeDb([]);
    expect(await run(db, async () => profile)).toEqual({
      picked: 0,
      succeeded: 0,
      failed: 0,
    });
  });
});
