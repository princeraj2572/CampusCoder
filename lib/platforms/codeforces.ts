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

// Assumption: unknown handles return JSON {status:"FAILED", comment:"... not found"} with HTTP 400.
export async function verifyCodeforces(
  username: string,
  { fetchImpl = fetch }: VerifyOptions = {},
): Promise<VerifyResult> {
  try {
    const res = await fetchImpl(
      `https://codeforces.com/api/user.info?handles=${encodeURIComponent(username)}`,
      { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) },
    );
    const body = await res.json().catch(() => null);
    if (body?.status === "OK") return "found";
    if (body?.status === "FAILED" && /not found/i.test(String(body.comment)))
      return "not-found";
    return "unavailable";
  } catch {
    return "unavailable";
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function cfResult(fetchImpl: typeof fetch, url: string): Promise<unknown[]> {
  const { body } = await requestJson(fetchImpl, url);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsed = body as any;
  if (parsed?.status === "OK" && Array.isArray(parsed.result)) return parsed.result;
  if (parsed?.status === "FAILED" && /not found/i.test(String(parsed.comment))) {
    throw new FetchError("not-found", "Codeforces user not found");
  }
  throw new FetchError(
    "unavailable",
    `Codeforces call failed: ${parsed?.comment ?? "no response"}`,
  );
}

export async function fetchCodeforcesProfile(
  username: string,
  { fetchImpl = fetch, delayMs = 1000 }: FetchOptions = {},
): Promise<PlatformProfile> {
  const handle = encodeURIComponent(username);
  const base = "https://codeforces.com/api";

  const [user] = (await cfResult(fetchImpl, `${base}/user.info?handles=${handle}`)) as {
    rating?: number;
    maxRating?: number;
    rank?: string;
    maxRank?: string;
  }[];
  await sleep(delayMs);
  const history = (await cfResult(fetchImpl, `${base}/user.rating?handle=${handle}`)) as {
    contestId: number;
    contestName: string;
    rank: number;
    ratingUpdateTimeSeconds: number;
    oldRating: number;
    newRating: number;
  }[];
  await sleep(delayMs);
  const submissions = (await cfResult(
    fetchImpl,
    `${base}/user.status?handle=${handle}&from=1&count=10000`,
  )) as {
    verdict?: string;
    problem: { contestId?: number; index: string; name: string };
  }[];

  const solved = new Set(
    submissions
      .filter((s) => s.verdict === "OK")
      .map((s) => `${s.problem.contestId ?? "gym"}-${s.problem.index}-${s.problem.name}`),
  ).size;

  const contests: ContestEntry[] = history.map((h) => ({
    contestId: String(h.contestId),
    contestName: h.contestName,
    contestDate: new Date(h.ratingUpdateTimeSeconds * 1000),
    rank: h.rank ?? null,
    ratingAfter: h.newRating,
    ratingChange: h.newRating - h.oldRating,
  }));

  return {
    stats: {
      rating: user?.rating ?? null,
      solved,
      rank: null,
      contests: history.length,
      extra: {
        max_rating: user?.maxRating ?? null,
        rank_title: user?.rank ?? null,
        max_rank: user?.maxRank ?? null,
      },
    },
    contests,
  };
}
