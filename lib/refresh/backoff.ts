import type { FetchErrorKind } from "@/lib/platforms/types";

const DAY_MINUTES = 1440;

/** Minutes to wait before retrying a row that has now failed `failCount` times in a row. */
export function backoffMinutes(failCount: number, kind: FetchErrorKind): number {
  if (kind === "not-found") return DAY_MINUTES;
  const exponent = Math.min(Math.max(failCount, 1) - 1, 10);
  return Math.min(15 * 2 ** exponent, DAY_MINUTES);
}
