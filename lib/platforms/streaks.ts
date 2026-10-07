export interface CalendarDay {
  date: string;
  count: number;
}

export function computeStreaks(days: CalendarDay[]): {
  activeDays: number;
  longest: number;
  current: number;
} {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let activeDays = 0;
  let longest = 0;
  let run = 0;
  for (const d of sorted) {
    if (d.count > 0) {
      activeDays++;
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }
  // Today may not have contributions yet; that should not break yesterday's streak.
  let i = sorted.length - 1;
  if (i >= 0 && sorted[i].count === 0) i--;
  let current = 0;
  while (i >= 0 && sorted[i].count > 0) {
    current++;
    i--;
  }
  return { activeDays, longest, current };
}
