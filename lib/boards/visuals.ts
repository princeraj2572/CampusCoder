/** Contribution totals for the most recent weeks, oldest first. Blocks are counted back from the last day. */
export function weeklyTotals(daily: [string, number][], weeks = 12): number[] {
  if (weeks <= 0) return [];
  const recent = daily.slice(-weeks * 7);
  const totals: number[] = [];
  for (let end = recent.length; end > 0; end -= 7) {
    const block = recent.slice(Math.max(0, end - 7), end);
    totals.unshift(block.reduce((sum, [, count]) => sum + count, 0));
  }
  return totals;
}

export type Difficulty = "easy" | "medium" | "hard";

/** Each difficulty's share of the solved total, for a stacked bar. */
export function difficultySegments(
  easy: number,
  medium: number,
  hard: number,
): { key: Difficulty; count: number; percent: number }[] {
  const total = easy + medium + hard;
  if (total <= 0) return [];
  return (
    [
      ["easy", easy],
      ["medium", medium],
      ["hard", hard],
    ] as [Difficulty, number][]
  ).map(([key, count]) => ({ key, count, percent: (count / total) * 100 }));
}

/** Position on a 0 to 100 track for "top N percent": a better rank sits further right. */
export function percentileMarker(topPercentage: number): number {
  return Math.min(100, Math.max(0, 100 - topPercentage));
}
