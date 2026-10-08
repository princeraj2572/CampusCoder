import { REQUEST_TIMEOUT_MS, type VerifyOptions, type VerifyResult } from "./types";

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
