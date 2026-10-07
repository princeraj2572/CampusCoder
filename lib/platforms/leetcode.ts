import { REQUEST_TIMEOUT_MS, type VerifyOptions, type VerifyResult } from "./types";

// Assumption (unofficial API): an unknown user gives data.matchedUser = null.
const QUERY = "query($u:String!){matchedUser(username:$u){username}}";

export async function verifyLeetCode(
  username: string,
  { fetchImpl = fetch }: VerifyOptions = {},
): Promise<VerifyResult> {
  try {
    const res = await fetchImpl("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "content-type": "application/json", referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { u: username } }),
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
