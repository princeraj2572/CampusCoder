import {
  FetchError,
  REQUEST_TIMEOUT_MS,
  type FetchOptions,
  type PlatformProfile,
} from "./types";

// Assumptions (unofficial, page scraping): the profile page has <div class="rating-number">N</div>
// and the text "Total Problems Solved: N"; an unknown user redirects (HTTP 3xx).
export async function fetchCodeChefProfile(
  username: string,
  { fetchImpl = fetch }: FetchOptions = {},
): Promise<PlatformProfile> {
  let res: Response;
  try {
    res = await fetchImpl(
      `https://www.codechef.com/users/${encodeURIComponent(username)}`,
      {
        redirect: "manual",
        headers: { "user-agent": "Mozilla/5.0 (compatible; CampusCoders/1.0)" },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );
  } catch (e) {
    throw new FetchError("unavailable", `network error: ${(e as Error).message}`);
  }
  if (res.status >= 300 && res.status < 400) {
    throw new FetchError("not-found", "CodeChef user not found");
  }
  if (!res.ok)
    throw new FetchError("unavailable", `CodeChef returned HTTP ${res.status}`);

  const html = await res.text();
  const rating = /<div class="rating-number">\s*(\d+)\s*<\/div>/.exec(html)?.[1];
  const solved = /Total Problems Solved:\s*(\d+)/.exec(html)?.[1];
  if (!rating && !solved)
    throw new FetchError("unexpected", "CodeChef page layout changed");

  return {
    stats: {
      rating: rating ? Number(rating) : null,
      solved: solved ? Number(solved) : null,
      rank: null,
      contests: null,
      extra: {},
    },
    contests: [],
  };
}
