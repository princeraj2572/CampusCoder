export type VerifyResult = "found" | "not-found" | "unavailable" | "unchecked";

export interface VerifyOptions {
  fetchImpl?: typeof fetch;
  token?: string;
}

export const REQUEST_TIMEOUT_MS = 8000;

export interface PlatformStats {
  rating: number | null;
  solved: number | null;
  rank: number | null;
  contests: number | null;
  extra: Record<string, unknown>;
}

export interface ContestEntry {
  contestId: string;
  contestName: string;
  contestDate: Date;
  rank: number | null;
  ratingAfter: number | null;
  ratingChange: number | null;
}

export interface PlatformProfile {
  stats: PlatformStats;
  contests: ContestEntry[];
}

export type FetchErrorKind = "not-found" | "unavailable" | "unexpected";

export class FetchError extends Error {
  constructor(
    public kind: FetchErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "FetchError";
  }
}

export interface FetchOptions extends VerifyOptions {
  /** Pause between calls to the same platform; tests pass 0. */
  delayMs?: number;
}

export type ProfileFetcher = (
  username: string,
  opts?: FetchOptions,
) => Promise<PlatformProfile>;
