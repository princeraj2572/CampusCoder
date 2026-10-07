/** Competition ranking: highest value first, ties share a rank (1, 2, 2, 4). */
export function rankDescending<T extends { id: string; value: number }>(
  items: T[],
): (T & { rank: number })[] {
  const sorted = [...items].sort((a, b) => b.value - a.value);
  let rank = 0;
  let previous: number | null = null;
  return sorted.map((item, index) => {
    if (previous === null || item.value !== previous) rank = index + 1;
    previous = item.value;
    return { ...item, rank };
  });
}

/** Places gained since the earlier rank (positive = moved up); null if either rank is unknown. */
export function movement(
  current: number | undefined,
  previous: number | undefined,
): number | null {
  if (current === undefined || previous === undefined) return null;
  return previous - current;
}
