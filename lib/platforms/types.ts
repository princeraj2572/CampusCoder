export type VerifyResult = "found" | "not-found" | "unavailable" | "unchecked";

export interface VerifyOptions {
  fetchImpl?: typeof fetch;
  token?: string;
}

export const REQUEST_TIMEOUT_MS = 8000;
