export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Contribution calendar for the heatmap: level 0 for no activity, 1 to 4 relative to the busiest day. */
export function toActivityLevels(daily: [string, number][]): ActivityDay[] {
  const max = Math.max(0, ...daily.map(([, count]) => count));
  return daily.map(([date, count]) => ({
    date,
    count,
    level:
      count <= 0 || max === 0
        ? 0
        : (Math.min(4, Math.ceil((4 * count) / max)) as 1 | 2 | 3 | 4),
  }));
}
