import { requestJson } from "./http";
import {
  FetchError,
  REQUEST_TIMEOUT_MS,
  type ContestEntry,
  type FetchOptions,
  type PlatformProfile,
  type VerifyOptions,
  type VerifyResult,
} from "./types";

const ENDPOINT = "https://leetcode.com/graphql";
const HEADERS = { "content-type": "application/json", referer: "https://leetcode.com" };

// Assumption (unofficial API): an unknown user gives data.matchedUser = null.
const VERIFY_QUERY = "query($u:String!){matchedUser(username:$u){username}}";

export async function verifyLeetCode(
  username: string,
  { fetchImpl = fetch }: VerifyOptions = {},
): Promise<VerifyResult> {
  try {
    const res = await fetchImpl(ENDPOINT, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ query: VERIFY_QUERY, variables: { u: username } }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return "unavailable";
    const body = await res.json();
    const matched = body?.data?.matchedUser;
    if (matched && typeof matched.username === "string") return "found";
    if (body?.data && matched === null) return "not-found";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

const PROFILE_QUERY = `query($u:String!){
  matchedUser(username:$u){ profile{ranking} submitStatsGlobal{acSubmissionNum{difficulty count}} }
  userContestRanking(username:$u){ attendedContestsCount rating globalRanking totalParticipants topPercentage }
  userContestRankingHistory(username:$u){ attended rating ranking contest{ title startTime } }
}`;

type Counts = { difficulty: string; count: number }[];

export async function fetchLeetCodeProfile(
  username: string,
  { fetchImpl = fetch }: FetchOptions = {},
): Promise<PlatformProfile> {
  const { ok, body } = await requestJson(fetchImpl, ENDPOINT, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query: PROFILE_QUERY, variables: { u: username } }),
  });
  if (!ok) throw new FetchError("unavailable", "LeetCode returned an HTTP error");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (body as any)?.data;
  if (!data) throw new FetchError("unexpected", "LeetCode response had no data");
  if (data.matchedUser === null)
    throw new FetchError("not-found", "LeetCode user not found");

  const counts: Counts | undefined = data.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!Array.isArray(counts))
    throw new FetchError("unexpected", "LeetCode solved counts missing");
  const count = (name: string) => counts.find((c) => c.difficulty === name)?.count ?? 0;

  const ranking = data.userContestRanking ?? null;
  const history: {
    attended: boolean;
    rating: number;
    ranking: number | null;
    contest: { title: string; startTime: number };
  }[] = (data.userContestRankingHistory ?? []).filter(
    // LeetCode also lists contests someone only registered for as attended, with rank 0.
    (h: { attended: boolean; ranking: number | null }) =>
      h.attended && (h.ranking ?? 0) > 0,
  );

  let previous = 1500;
  const contests: ContestEntry[] = history.map((h) => {
    const after = Math.round(h.rating);
    const entry: ContestEntry = {
      contestId: h.contest.title,
      contestName: h.contest.title,
      contestDate: new Date(h.contest.startTime * 1000),
      rank: h.ranking ?? null,
      ratingAfter: after,
      ratingChange: after - Math.round(previous),
    };
    previous = h.rating;
    return entry;
  });

  return {
    stats: {
      rating: ranking ? Math.round(ranking.rating) : null,
      solved: count("All"),
      rank: ranking?.globalRanking ?? null,
      contests: ranking?.attendedContestsCount ?? 0,
      extra: {
        easy: count("Easy"),
        medium: count("Medium"),
        hard: count("Hard"),
        problem_rank: data.matchedUser?.profile?.ranking ?? null,
        top_percentage: ranking?.topPercentage ?? null,
        total_participants: ranking?.totalParticipants ?? null,
      },
    },
    contests,
  };
}
