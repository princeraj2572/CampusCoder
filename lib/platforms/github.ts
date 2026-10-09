import { requestJson } from "./http";
import { computeStreaks } from "./streaks";
import {
  FetchError,
  REQUEST_TIMEOUT_MS,
  type FetchOptions,
  type PlatformProfile,
  type VerifyOptions,
  type VerifyResult,
} from "./types";

export async function verifyGitHub(
  username: string,
  { fetchImpl = fetch, token }: VerifyOptions = {},
): Promise<VerifyResult> {
  try {
    const res = await fetchImpl(
      `https://api.github.com/users/${encodeURIComponent(username)}`,
      {
        headers: {
          accept: "application/vnd.github+json",
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );
    if (res.status === 404) return "not-found";
    if (!res.ok) return "unavailable";
    const body = await res.json();
    return body?.type === "User" ? "found" : "not-found";
  } catch {
    return "unavailable";
  }
}

const PROFILE_QUERY = `query($l:String!,$q:String!){
  user(login:$l){
    contributionsCollection{
      totalCommitContributions totalPullRequestContributions
      totalIssueContributions totalPullRequestReviewContributions
      contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount } } }
    }
    repositories(first:100, ownerAffiliations:OWNER, isFork:false, orderBy:{field:STARGAZERS, direction:DESC}){
      totalCount
      nodes{ name stargazerCount forkCount isEmpty primaryLanguage{ name } }
    }
  }
  search(query:$q, type:ISSUE){ issueCount }
}`;

type Repo = {
  stargazerCount: number;
  forkCount: number;
  isEmpty: boolean;
  primaryLanguage: { name: string } | null;
};

export async function fetchGitHubProfile(
  username: string,
  { fetchImpl = fetch, token }: FetchOptions = {},
): Promise<PlatformProfile> {
  if (!token) throw new FetchError("unexpected", "GITHUB_TOKEN is not set");

  const { status, body } = await requestJson(
    fetchImpl,
    "https://api.github.com/graphql",
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({
        query: PROFILE_QUERY,
        variables: {
          l: username,
          q: `author:${username} is:pr is:merged -user:${username}`,
        },
      }),
    },
  );

  if (status === 401) throw new FetchError("unexpected", "GitHub rejected the token");
  if (status === 403 || status === 429 || status >= 500) {
    throw new FetchError("unavailable", `GitHub returned HTTP ${status}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = body as any;
  const errors: { type?: string }[] = parsed?.errors ?? [];
  if (errors.some((e) => e.type === "RATE_LIMITED")) {
    throw new FetchError("unavailable", "GitHub rate limit reached");
  }
  const user = parsed?.data?.user;
  if (!user) {
    if (errors.some((e) => e.type === "NOT_FOUND")) {
      throw new FetchError("not-found", "GitHub user not found");
    }
    throw new FetchError("unexpected", "GitHub response had no user");
  }

  const collection = user.contributionsCollection;
  const calendar = collection.contributionCalendar;
  const daily: [string, number][] = (
    calendar.weeks as {
      contributionDays: { date: string; contributionCount: number }[];
    }[]
  ).flatMap((w) =>
    w.contributionDays.map((d) => [d.date, d.contributionCount] as [string, number]),
  );
  const streaks = computeStreaks(daily.map(([date, count]) => ({ date, count })));

  const repos: Repo[] = user.repositories.nodes ?? [];
  const languageCounts = new Map<string, number>();
  for (const r of repos) {
    if (!r.isEmpty && r.primaryLanguage) {
      languageCounts.set(
        r.primaryLanguage.name,
        (languageCounts.get(r.primaryLanguage.name) ?? 0) + 1,
      );
    }
  }
  const languages = [...languageCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([name, count]) => ({ name, repos: count }));

  return {
    stats: {
      rating: null,
      solved: null,
      rank: null,
      contests: null,
      extra: {
        contributions_12m: calendar.totalContributions,
        commits: collection.totalCommitContributions,
        pull_requests: collection.totalPullRequestContributions,
        issues: collection.totalIssueContributions,
        reviews: collection.totalPullRequestReviewContributions,
        active_days: streaks.activeDays,
        longest_streak: streaks.longest,
        current_streak: streaks.current,
        repos_total: user.repositories.totalCount,
        repos_with_code: repos.filter((r) => !r.isEmpty).length,
        stars: repos.reduce((sum, r) => sum + r.stargazerCount, 0),
        forks: repos.reduce((sum, r) => sum + r.forkCount, 0),
        merged_prs_external: parsed?.data?.search?.issueCount ?? 0,
        languages,
        daily,
      },
    },
    contests: [],
  };
}
