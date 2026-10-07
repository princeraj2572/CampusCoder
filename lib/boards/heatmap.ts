export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/**
 * Contribution calendar for the heatmap: level 0 for no activity, 1 to 4 relative to a busy day.
 * The scale tops out at the 80th percentile of active days so a few extreme days do not push
 * everything else onto the faintest level.
 */
export function toActivityLevels(daily: [string, number][]): ActivityDay[] {
  const active = daily
    .map(([, count]) => count)
    .filter((c) => c > 0)
    .sort((a, b) => a - b);
  const cap = active.length ? active[Math.ceil(active.length * 0.8) - 1] : 0;
  return daily.map(([date, count]) => ({
    date,
    count,
    level:
      count <= 0 || cap === 0
        ? 0
        : (Math.min(4, Math.ceil((4 * Math.min(count, cap)) / cap)) as 1 | 2 | 3 | 4),
  }));
}
