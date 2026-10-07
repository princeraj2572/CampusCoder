import { num, type MetricsByPlatform } from "./types";

export interface ScoreWeights {
  leetcodeShare: number;
  otherShare: number;
  difficulty: { easy: number; medium: number; hard: number };
}

export const DEFAULT_WEIGHTS: ScoreWeights = {
  leetcodeShare: 0.7,
  otherShare: 0.3,
  difficulty: { easy: 1, medium: 3, hard: 5 },
};

const isWeight = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v) && v >= 0;

/** Reads settings.score_weights; anything malformed falls back to the defaults. */
export function parseWeights(value: unknown): ScoreWeights {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v = value as any;
  const shares = v?.leetcode_vs_other;
  const d = v?.difficulty;
  if (
    Array.isArray(shares) &&
    isWeight(shares[0]) &&
    isWeight(shares[1]) &&
    d &&
    isWeight(d.easy) &&
    isWeight(d.medium) &&
    isWeight(d.hard)
  ) {
    return {
      leetcodeShare: shares[0],
      otherShare: shares[1],
      difficulty: { easy: d.easy, medium: d.medium, hard: d.hard },
    };
  }
  return DEFAULT_WEIGHTS;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function leetcodeWeighted(m: MetricsByPlatform, w: ScoreWeights): number {
  const e = m.leetcode?.extra ?? {};
  return (
    num(e.easy) * w.difficulty.easy +
    num(e.medium) * w.difficulty.medium +
    num(e.hard) * w.difficulty.hard
  );
}

export function otherSolved(m: MetricsByPlatform): number {
  return num(m.codeforces?.solved) + num(m.codechef?.solved);
}

/**
 * Scores 0 to 100: each part is scaled against the cohort's best, then weighted.
 * Students with no problem-solving data on any platform are left out.
 */
export function problemSolvingScores(
  cohort: { id: string; metrics: MetricsByPlatform }[],
  w: ScoreWeights,
  /** Scale against this cohort's best instead (used to compare an old snapshot on today's scale). */
  scaleWith: { id: string; metrics: MetricsByPlatform }[] = cohort,
): Map<string, number> {
  const hasData = (c: { metrics: MetricsByPlatform }) =>
    Boolean(c.metrics.leetcode || c.metrics.codeforces || c.metrics.codechef);
  const maxLc = Math.max(
    0,
    ...scaleWith.filter(hasData).map((c) => leetcodeWeighted(c.metrics, w)),
  );
  const maxOther = Math.max(
    0,
    ...scaleWith.filter(hasData).map((c) => otherSolved(c.metrics)),
  );
  const out = new Map<string, number>();
  for (const c of cohort.filter(hasData)) {
    const lcPart = maxLc > 0 ? leetcodeWeighted(c.metrics, w) / maxLc : 0;
    const otherPart = maxOther > 0 ? otherSolved(c.metrics) / maxOther : 0;
    out.set(c.id, round1(100 * (w.leetcodeShare * lcPart + w.otherShare * otherPart)));
  }
  return out;
}
