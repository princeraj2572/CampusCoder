import type { BoardStudent } from "./build";
import { num, type BoardId } from "@/lib/scoring/types";

export const BOARD_META: Record<
  BoardId,
  { title: string; valueLabel: string; blurb: string; improvedLabel: string }
> = {
  "problem-solving": {
    title: "DSA",
    valueLabel: "Score",
    blurb:
      "Data structures and algorithms: LeetCode problems weighted by difficulty, plus Codeforces and CodeChef solves.",
    improvedLabel: "Score gained",
  },
  contests: {
    title: "Contests",
    valueLabel: "Rating",
    blurb: "LeetCode contest rating. Students who have not competed yet are not listed.",
    improvedLabel: "Rating gained",
  },
  github: {
    title: "GitHub",
    valueLabel: "Contributions",
    blurb: "Public contributions over the last 12 months.",
    improvedLabel: "Contributions gained",
  },
};

/** The small line under a student's name on a board, in plain words. */
export function rowDetail(board: BoardId, s: BoardStudent): string {
  const m = s.metrics;
  if (board === "problem-solving") {
    const solved =
      num(m.leetcode?.solved) + num(m.codeforces?.solved) + num(m.codechef?.solved);
    return `${solved} problems solved`;
  }
  if (board === "contests") {
    const n = num(m.leetcode?.contests);
    return `${n} ${n === 1 ? "contest" : "contests"}`;
  }
  const days = num(m.github?.extra.active_days);
  return `${days} active ${days === 1 ? "day" : "days"}`;
}
