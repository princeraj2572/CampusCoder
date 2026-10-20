import { describe, expect, it } from "vitest";
import { fetchLeetCodeProfile } from "@/lib/platforms/leetcode";

const json = (body: unknown, status = 200) =>
  (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
const throws = (async () => {
  throw new Error("down");
}) as unknown as typeof fetch;

const solved = {
  profile: { ranking: 103587 },
  submitStatsGlobal: {
    acSubmissionNum: [
      { difficulty: "All", count: 686 },
      { difficulty: "Easy", count: 126 },
      { difficulty: "Medium", count: 411 },
      { difficulty: "Hard", count: 149 },
    ],
  },
};

const full = {
  data: {
    matchedUser: solved,
    userContestRanking: {
      attendedContestsCount: 2,
      rating: 1556.233,
      globalRanking: 7550,
      totalParticipants: 886096,
      topPercentage: 0.9,
    },
    userContestRankingHistory: [
      {
        attended: false,
        rating: 1500,
        ranking: 0,
        contest: { title: "Skipped", startTime: 1484000000 },
      },
      {
        attended: true,
        rating: 1556.233,
        ranking: 145,
        contest: { title: "Weekly 16", startTime: 1485012600 },
      },
      {
        attended: true,
        rating: 1600.4,
        ranking: 90,
        contest: { title: "Weekly 18", startTime: 1486222200 },
      },
    ],
  },
};

describe("fetchLeetCodeProfile", () => {
  it("maps solved counts, contest rating and history", async () => {
    const { stats, contests } = await fetchLeetCodeProfile("lee215", {
      fetchImpl: json(full),
    });
    expect(stats).toEqual({
      rating: 1556,
      solved: 686,
      rank: 7550,
      contests: 2,
      extra: {
        easy: 126,
        medium: 411,
        hard: 149,
        problem_rank: 103587,
        top_percentage: 0.9,
        total_participants: 886096,
      },
    });
    expect(contests).toHaveLength(2);
    expect(contests[0]).toMatchObject({
      contestId: "Weekly 16",
      contestName: "Weekly 16",
      rank: 145,
      ratingAfter: 1556,
      ratingChange: 56,
    });
    expect(contests[0].contestDate).toEqual(new Date(1485012600 * 1000));
    expect(contests[1]).toMatchObject({ ratingAfter: 1600, ratingChange: 44 });
  });

  it("returns nulls and no contests for an unrated user", async () => {
    const body = {
      data: {
        matchedUser: solved,
        userContestRanking: null,
        userContestRankingHistory: [],
      },
    };
    const { stats, contests } = await fetchLeetCodeProfile("newbie", {
      fetchImpl: json(body),
    });
    expect(stats.rating).toBeNull();
    expect(stats.rank).toBeNull();
    expect(stats.contests).toBe(0);
    expect(stats.solved).toBe(686);
    expect(contests).toEqual([]);
  });

  it("ignores contests LeetCode lists as attended but with rank 0 (registered, never took part)", async () => {
    const phantom = (title: string, startTime: number) => ({
      attended: true,
      rating: 1500,
      ranking: 0,
      contest: { title, startTime },
    });
    const body = {
      data: {
        matchedUser: solved,
        userContestRanking: null,
        userContestRankingHistory: [
          phantom("Weekly 520", 1790000000),
          phantom("Weekly 521", 1790600000),
        ],
      },
    };
    const { stats, contests } = await fetchLeetCodeProfile("registered-only", {
      fetchImpl: json(body),
    });
    expect(contests).toEqual([]);
    expect(stats.rating).toBeNull();
  });

  it("keeps real contests when phantom ones are mixed into the history", async () => {
    const body = {
      data: {
        matchedUser: solved,
        userContestRanking: {
          attendedContestsCount: 1,
          rating: 1556.2,
          globalRanking: 900,
          totalParticipants: 5000,
          topPercentage: 18,
        },
        userContestRankingHistory: [
          {
            attended: true,
            rating: 1500,
            ranking: 0,
            contest: { title: "Registered only", startTime: 1790000000 },
          },
          {
            attended: true,
            rating: 1556.2,
            ranking: 900,
            contest: { title: "Took part", startTime: 1790600000 },
          },
        ],
      },
    };
    const { contests } = await fetchLeetCodeProfile("mixed", { fetchImpl: json(body) });
    expect(contests.map((c) => c.contestName)).toEqual(["Took part"]);
    // The rating change is measured from the starting 1500, not from the skipped entry.
    expect(contests[0]).toMatchObject({ ratingAfter: 1556, ratingChange: 56 });
  });

  it("throws not-found when the user does not exist", async () => {
    const body = {
      errors: [{ message: "That user does not exist." }],
      data: { matchedUser: null },
    };
    await expect(
      fetchLeetCodeProfile("nobody", { fetchImpl: json(body) }),
    ).rejects.toMatchObject({
      kind: "not-found",
    });
  });

  it("throws unavailable on HTTP errors and network errors", async () => {
    await expect(
      fetchLeetCodeProfile("x", { fetchImpl: json({}, 429) }),
    ).rejects.toMatchObject({
      kind: "unavailable",
    });
    await expect(fetchLeetCodeProfile("x", { fetchImpl: throws })).rejects.toMatchObject({
      kind: "unavailable",
    });
  });

  it("throws unexpected when the response shape is wrong", async () => {
    const body = { data: { matchedUser: { profile: {} } } };
    await expect(
      fetchLeetCodeProfile("x", { fetchImpl: json(body) }),
    ).rejects.toMatchObject({
      kind: "unexpected",
    });
  });
});
