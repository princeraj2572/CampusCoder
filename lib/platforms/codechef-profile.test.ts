import { describe, expect, it } from "vitest";
import { fetchProfile } from "@/lib/platforms/fetchers";
import { fetchCodeChefProfile } from "@/lib/platforms/codechef";

const page = (rating: string | null, solved: string | null) =>
  `<html><body>
  ${rating ? `<div class="rating-number">\n   ${rating}   </div>` : ""}
  ${solved ? `<h3>Total Problems Solved: ${solved}</h3>` : ""}
  </body></html>`;

const html = (body: string, status = 200) =>
  (async () => new Response(body, { status })) as unknown as typeof fetch;

describe("fetchCodeChefProfile", () => {
  it("reads rating and solved count from the profile page", async () => {
    const { stats, contests } = await fetchCodeChefProfile("aarav", {
      fetchImpl: html(page("1850", "212")),
    });
    expect(stats).toEqual({
      rating: 1850,
      solved: 212,
      rank: null,
      contests: null,
      extra: {},
    });
    expect(contests).toEqual([]);
  });

  it("accepts a user with a solved count but no rating", async () => {
    const { stats } = await fetchCodeChefProfile("aarav", {
      fetchImpl: html(page(null, "5")),
    });
    expect(stats).toMatchObject({ rating: null, solved: 5 });
  });

  it("treats a redirect as an unknown user", async () => {
    const f = (async () =>
      new Response(null, {
        status: 302,
        headers: { location: "/" },
      })) as unknown as typeof fetch;
    await expect(fetchCodeChefProfile("nobody", { fetchImpl: f })).rejects.toMatchObject({
      kind: "not-found",
    });
  });

  it("throws unexpected when the page layout has changed", async () => {
    await expect(
      fetchCodeChefProfile("x", { fetchImpl: html("<html>new layout</html>") }),
    ).rejects.toMatchObject({
      kind: "unexpected",
    });
  });

  it("throws unavailable on server errors and network errors", async () => {
    await expect(
      fetchCodeChefProfile("x", { fetchImpl: html("oops", 503) }),
    ).rejects.toMatchObject({
      kind: "unavailable",
    });
    const down = (async () => {
      throw new Error("down");
    }) as unknown as typeof fetch;
    await expect(fetchCodeChefProfile("x", { fetchImpl: down })).rejects.toMatchObject({
      kind: "unavailable",
    });
  });
});

describe("fetchProfile dispatcher", () => {
  it("routes each platform to its fetcher", async () => {
    const lc = (async () =>
      new Response(
        JSON.stringify({
          data: {
            matchedUser: {
              profile: {},
              submitStatsGlobal: { acSubmissionNum: [{ difficulty: "All", count: 7 }] },
            },
            userContestRanking: null,
            userContestRankingHistory: [],
          },
        }),
      )) as unknown as typeof fetch;
    expect((await fetchProfile("leetcode", "a", { fetchImpl: lc })).stats.solved).toBe(7);
    expect(
      (await fetchProfile("codechef", "a", { fetchImpl: html(page("1500", "1")) })).stats
        .rating,
    ).toBe(1500);
  });
});
