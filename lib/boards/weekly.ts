import { num, type MetricsByPlatform } from "@/lib/scoring/types";

/** Problems solved across LeetCode, Codeforces and CodeChef. */
export function solvedTotal(m: MetricsByPlatform): number {
  return num(m.leetcode?.solved) + num(m.codeforces?.solved) + num(m.codechef?.solved);
}

/**
 * Problems solved since the snapshot a week ago, or null while there is no snapshot to compare with
 * (the site has not been tracking that student for a week yet). Never negative.
 */
export function solvedThisWeek(
  now: MetricsByPlatform,
  weekAgo: MetricsByPlatform | undefined,
): number | null {
  if (!weekAgo) return null;
  return Math.max(0, solvedTotal(now) - solvedTotal(weekAgo));
}
