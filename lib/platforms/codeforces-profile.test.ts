import { describe, expect, it } from "vitest";
import { fetchCodeforcesProfile } from "@/lib/platforms/codeforces";

type Routes = Record<string, { status?: number; body: unknown } | Error>;

function router(routes: Routes): typeof fetch {
  return (async (url: string) => {
    const key = Object.keys(routes).find((k) => url.includes(k));
    if (!key) throw new Error(`unexpected url ${url}`);
    const r = routes[key];
    if (r instanceof Error) throw r;
    return new Response(JSON.stringify(r.body), { status: r.status ?? 200 });
  }) as unknown as typeof fetch;
}

const info = {
  status: "OK",
  result: [
    {
      handle: "aarav",
      rating: 1450,
      maxRating: 1500,
      rank: "specialist",
      maxRank: "specialist",
    },
  ],
};
const rating = {
  status: "OK",
  result: [
    {
      contestId: 1,
      contestName: "Round 1",
      rank: 100,
      ratingUpdateTimeSeconds: 1600000000,
      oldRating: 0,
      newRating: 1450,
    },
    {
      contestId: 2,
      contestName: "Round 2",
      rank: 50,
      ratingUpdateTimeSeconds: 1601000000,
      oldRating: 1450,
      newRating: 1500,
    },
  ],
};
const sub = (contestId: number, index: string, verdict: string) => ({
  verdict,
  problem: { contestId, index, name: `${contestId}${index}` },
});
const status = {
  status: "OK",
  result: [
    sub(1, "A", "OK"),
    sub(1, "A", "OK"),
    sub(1, "B", "WRONG_ANSWER"),
    sub(2, "A", "OK"),
  ],
};

const opts = (fetchImpl: typeof fetch) => ({ fetchImpl, delayMs: 0 });

describe("fetchCodeforcesProfile", () => {
  it("maps rating, unique solved problems and contest history", async () => {
    const f = router({
      "user.info": { body: info },
      "user.rating": { body: rating },
      "user.status": { body: status },
    });
    const { stats, contests } = await fetchCodeforcesProfile("aarav", opts(f));
    expect(stats).toEqual({
      rating: 1450,
      solved: 2,
      rank: null,
      contests: 2,
      extra: { max_rating: 1500, rank_title: "specialist", max_rank: "specialist" },
    });
    expect(contests[0]).toMatchObject({
      contestId: "1",
      contestName: "Round 1",
      rank: 100,
      ratingAfter: 1450,
      ratingChange: null, // first contest: Codeforces reports oldRating 0, so there is no real change
    });
    expect(contests[1]).toMatchObject({ ratingAfter: 1500, ratingChange: 50 });
    expect(contests[0].contestDate).toEqual(new Date(1600000000 * 1000));
  });

  it("handles an unrated user with no contests", async () => {
    const f = router({
      "user.info": { body: { status: "OK", result: [{ handle: "new" }] } },
      "user.rating": { body: { status: "OK", result: [] } },
      "user.status": { body: { status: "OK", result: [] } },
    });
    const { stats, contests } = await fetchCodeforcesProfile("new", opts(f));
    expect(stats).toMatchObject({ rating: null, solved: 0, contests: 0 });
    expect(stats.extra).toEqual({ max_rating: null, rank_title: null, max_rank: null });
    expect(contests).toEqual([]);
  });

  it("throws not-found for an unknown handle", async () => {
    const f = router({
      "user.info": {
        status: 400,
        body: { status: "FAILED", comment: "handles: User with handle x not found" },
      },
    });
    await expect(fetchCodeforcesProfile("x", opts(f))).rejects.toMatchObject({
      kind: "not-found",
    });
  });

  it("throws unavailable when the call limit is hit or the network fails", async () => {
    const limited = router({
      "user.info": {
        status: 503,
        body: { status: "FAILED", comment: "Call limit exceeded" },
      },
    });
    await expect(fetchCodeforcesProfile("x", opts(limited))).rejects.toMatchObject({
      kind: "unavailable",
    });
    const down = router({ "user.info": new Error("down") });
    await expect(fetchCodeforcesProfile("x", opts(down))).rejects.toMatchObject({
      kind: "unavailable",
    });
  });

  it("throws unavailable if a later call fails, so no partial data is saved", async () => {
    const f = router({
      "user.info": { body: info },
      "user.rating": {
        status: 503,
        body: { status: "FAILED", comment: "Call limit exceeded" },
      },
    });
    await expect(fetchCodeforcesProfile("aarav", opts(f))).rejects.toMatchObject({
      kind: "unavailable",
    });
  });
});
