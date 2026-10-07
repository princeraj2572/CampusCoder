const STALE_AFTER_MINUTES = 2 * 60;

export function describeUpdated(
  updatedAt: Date | null,
  now: Date,
): { text: string; stale: boolean } {
  if (!updatedAt) return { text: "Not updated yet", stale: true };
  const minutes = Math.max(0, Math.floor((now.getTime() - updatedAt.getTime()) / 60_000));
  const plural = (n: number, unit: string) => `${n} ${unit}${n === 1 ? "" : "s"}`;
  let text: string;
  if (minutes < 1) text = "Updated just now";
  else if (minutes < 60) text = `Updated ${minutes} min ago`;
  else if (minutes < 60 * 24)
    text = `Updated ${plural(Math.floor(minutes / 60), "hour")} ago`;
  else text = `Updated ${plural(Math.floor(minutes / (60 * 24)), "day")} ago`;
  return { text, stale: minutes > STALE_AFTER_MINUTES };
}
