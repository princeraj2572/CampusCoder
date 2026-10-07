import { problemSolvingScores, type ScoreWeights } from "./problem-solving";
import { num, type BoardId, type MetricsByPlatform } from "./types";

/** Contest board value: LeetCode contest rating, unrated students are skipped. */
function contestScore(m: MetricsByPlatform): number | null {
  const rating = m.leetcode?.rating;
  return typeof rating === "number" ? rating : null;
}

/** GitHub board value. Provisional: 12-month public contributions (Phase 4 adds anti-gaming). */
function githubScore(m: MetricsByPlatform): number | null {
  return m.github ? num(m.github.extra.contributions_12m) : null;
}

/** Score for every cohort member who has data for the board. */
export function scoreBoard(
  board: BoardId,
  cohort: { id: string; metrics: MetricsByPlatform }[],
  weights: ScoreWeights,
): Map<string, number> {
  if (board === "problem-solving") return problemSolvingScores(cohort, weights);
  const pick = board === "contests" ? contestScore : githubScore;
  const out = new Map<string, number>();
  for (const c of cohort) {
    const v = pick(c.metrics);
    if (v !== null) out.set(c.id, v);
  }
  return out;
}
