import type { BoardStudent } from "./build";
import { filterStudents } from "./filter";
import type { BoardParams } from "./params";

/**
 * Students who match the view but have no LeetCode contest rating yet, sorted by name.
 * The Contests board only ranks rated students; this lists everyone else so nobody looks missing.
 */
export function unratedStudents(
  students: BoardStudent[],
  view: Pick<BoardParams, "year" | "section" | "domain" | "q">,
  today: Date,
): BoardStudent[] {
  return filterStudents(students, view, today)
    .filter((s) => typeof s.metrics.leetcode?.rating !== "number")
    .sort((a, b) =>
      a.fullName.localeCompare(b.fullName, undefined, { sensitivity: "base" }),
    );
}
