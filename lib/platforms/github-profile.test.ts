import { describe, expect, it } from "vitest";
import { fetchGitHubProfile } from "@/lib/platforms/github";

const json = (body: unknown, status = 200) =>
  (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
const throws = (async () => {
  throw new Error("down");
}) as unknown as typeof fetch;

const calendar = (counts: number[]) => ({
  totalContributions: counts.reduce((a, b) => a + b, 0),
  weeks: [
    {
      contributionDays: counts.map((contributionCount, i) => ({
        date: `2026-03-${String(i + 1).padStart(2, "0")}`,
        contributionCount,
      })),
    },
  ],
});

const ok = {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: 30,
        totalPullRequestContributions: 4,
        totalIssueContributions: 2,
        totalPullRequestReviewContributions: 1,
        contributionCalendar: calendar([0, 3, 2, 0]),
      },
      repositories: {
        totalCount: 4,
        nodes: [
          {
            name: "a",
            stargazerCount: 10,
            forkCount: 2,
            isEmpty: false,
            primaryLanguage: { name: "TypeScript" },
          },
          {
            name: "b",
            stargazerCount: 5,
            forkCount: 1,
            isEmpty: false,
            primaryLanguage: { name: "TypeScript" },
          },
          {
            name: "c",
            stargazerCount: 1,
            forkCount: 0,
            isEmpty: false,
            primaryLanguage: { name: "Python" },
          },
          {
            name: "empty",
            stargazerCount: 0,
            forkCount: 0,
            isEmpty: true,
            primaryLanguage: null,
          },
        ],
      },
    },
    search: { issueCount: 3 },
  },
};

const opts = (fetchImpl: typeof fetch, token: string | null = "tok") => ({
  fetchImpl,
  token: token ?? undefined,
});

describe("fetchGitHubProfile", () => {
  it("maps contributions, streaks, repos and languages", async () => {
    const { stats, contests } = await fetchGitHubProfile("aarav", opts(json(ok)));
    expect(contests).toEqual([]);
    expect(stats).toMatchObject({
      rating: null,
      solved: null,
      rank: null,
      contests: null,
    });
    expect(stats.extra).toMatchObject({
      contributions_12m: 5,
      commits: 30,
      pull_requests: 4,
      issues: 2,
      reviews: 1,
      active_days: 2,
      longest_streak: 2,
      current_streak: 2,
      repos_total: 4,
      repos_with_code: 3,
      stars: 16,
      forks: 3,
      merged_prs_external: 3,
      languages: [
        { name: "TypeScript", repos: 2 },
        { name: "Python", repos: 1 },
      ],
    });
    expect(stats.extra.daily).toEqual([
      ["2026-03-01", 0],
      ["2026-03-02", 3],
      ["2026-03-03", 2],
      ["2026-03-04", 0],
    ]);
  });

  it("sends the token to the GraphQL endpoint", async () => {
    let auth: string | null = null;
    let url = "";
    const f = (async (u: string, init?: RequestInit) => {
      url = u;
      auth = new Headers(init?.headers).get("authorization");
      return new Response(JSON.stringify(ok));
    }) as unknown as typeof fetch;
    await fetchGitHubProfile("aarav", opts(f));
    expect(url).toBe("https://api.github.com/graphql");
    expect(auth).toBe("Bearer tok");
  });

  it("fails loudly without a token instead of reporting not-found", async () => {
    await expect(fetchGitHubProfile("aarav", opts(json(ok), null))).rejects.toMatchObject(
      {
        kind: "unexpected",
        message: expect.stringContaining("GITHUB_TOKEN"),
      },
    );
  });

  it("throws not-found for an unknown login", async () => {
    const body = {
      data: { user: null },
      errors: [{ type: "NOT_FOUND", message: "Could not resolve" }],
    };
    await expect(fetchGitHubProfile("nobody", opts(json(body)))).rejects.toMatchObject({
      kind: "not-found",
    });
  });

  it("throws unavailable on rate limits, server errors and network errors", async () => {
    const limited = {
      errors: [{ type: "RATE_LIMITED", message: "API rate limit exceeded" }],
    };
    await expect(fetchGitHubProfile("x", opts(json(limited)))).rejects.toMatchObject({
      kind: "unavailable",
    });
    await expect(fetchGitHubProfile("x", opts(json({}, 403)))).rejects.toMatchObject({
      kind: "unavailable",
    });
    await expect(fetchGitHubProfile("x", opts(json({}, 502)))).rejects.toMatchObject({
      kind: "unavailable",
    });
    await expect(fetchGitHubProfile("x", opts(throws))).rejects.toMatchObject({
      kind: "unavailable",
    });
  });

  it("throws unexpected for a rejected token", async () => {
    await expect(
      fetchGitHubProfile("x", opts(json({ message: "Bad credentials" }, 401))),
    ).rejects.toMatchObject({
      kind: "unexpected",
    });
  });

  it("copes with a user who has no repositories and no contributions", async () => {
    const body = {
      data: {
        user: {
          contributionsCollection: {
            totalCommitContributions: 0,
            totalPullRequestContributions: 0,
            totalIssueContributions: 0,
            totalPullRequestReviewContributions: 0,
            contributionCalendar: calendar([0, 0]),
          },
          repositories: { totalCount: 0, nodes: [] },
        },
        search: { issueCount: 0 },
      },
    };
    const { stats } = await fetchGitHubProfile("new", opts(json(body)));
    expect(stats.extra).toMatchObject({
      contributions_12m: 0,
      active_days: 0,
      current_streak: 0,
      stars: 0,
      languages: [],
      merged_prs_external: 0,
    });
  });
});
