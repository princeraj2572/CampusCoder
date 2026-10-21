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
    blurb:
      "LeetCode contest rating. Students who have not competed in a rated contest yet are listed below the ranking.",
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

export interface RowStat {
  label: string;
  value: string | number;
}

const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);

/** The small figures shown under a student's name on a board. Missing data is left out. */
export function rowStats(board: BoardId, s: BoardStudent): RowStat[] {
  const m = s.metrics;
  const out: RowStat[] = [];

  if (board === "problem-solving") {
    const e = m.leetcode?.extra;
    if (e) {
      out.push(
        { label: "Easy", value: num(e.easy) },
        { label: "Medium", value: num(e.medium) },
        { label: "Hard", value: num(e.hard) },
      );
    }
    if (isNumber(m.codeforces?.rating))
      out.push({ label: "CF", value: m.codeforces.rating });
    if (isNumber(m.codechef?.rating)) out.push({ label: "CC", value: m.codechef.rating });
  } else if (board === "contests") {
    if (m.leetcode) {
      const top = m.leetcode.extra.top_percentage;
      if (isNumber(top)) out.push({ label: "Top", value: `${top}%` });
      out.push({ label: "Solved", value: num(m.leetcode.solved) });
    }
  } else if (m.github) {
    const e = m.github.extra;
    const streak = num(e.longest_streak);
    out.push(
      { label: "Commits", value: num(e.commits) },
      { label: "PRs", value: num(e.pull_requests) },
      { label: "Repos", value: num(e.repos_with_code) },
      { label: "Best streak", value: `${streak} ${streak === 1 ? "day" : "days"}` },
    );
  }
  return out;
}
