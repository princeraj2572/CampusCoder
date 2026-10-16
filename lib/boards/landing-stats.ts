import type { BoardStudent } from "./build";
import { filterStudents } from "./filter";
import { num } from "@/lib/scoring/types";

export interface LandingStats {
  /** Active students who have any stats yet. */
  students: number;
  solved: number;
  contributions: number;
  /** The highest LeetCode contest rating, or null when nobody is rated. */
  topRating: number | null;
}

/** Department-wide headline numbers for the landing page. Alumni and hidden students are excluded. */
export function landingStats(students: BoardStudent[], today: Date): LandingStats {
  const active = filterStudents(students, { year: "all" }, today).filter(
    (s) => Object.keys(s.metrics).length > 0,
  );
  let solved = 0;
  let contributions = 0;
  let topRating: number | null = null;
  for (const s of active) {
    solved +=
      num(s.metrics.leetcode?.solved) +
      num(s.metrics.codeforces?.solved) +
      num(s.metrics.codechef?.solved);
    contributions += num(s.metrics.github?.extra.contributions_12m);
    const rating = s.metrics.leetcode?.rating;
    if (typeof rating === "number" && (topRating === null || rating > topRating))
      topRating = rating;
  }
  return { students: active.length, solved, contributions, topRating };
}
