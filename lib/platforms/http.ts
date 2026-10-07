import { FetchError, REQUEST_TIMEOUT_MS } from "./types";

export async function requestJson(
  fetchImpl: typeof fetch,
  url: string,
  init: RequestInit = {},
): Promise<{ status: number; ok: boolean; body: unknown }> {
  let res: Response;
  try {
    res = await fetchImpl(url, {
      ...init,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (e) {
    throw new FetchError("unavailable", `network error: ${(e as Error).message}`);
  }
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { status: res.status, ok: res.ok, body };
}
