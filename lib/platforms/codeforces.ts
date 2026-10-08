import { REQUEST_TIMEOUT_MS, type VerifyOptions, type VerifyResult } from "./types";

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
