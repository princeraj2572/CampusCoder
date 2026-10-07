export type TierKey =
  "unrated" | "grey" | "green" | "cyan" | "blue" | "violet" | "orange" | "red";

export interface Tier {
  key: TierKey;
  label: string;
}

const BANDS: { min: number; tier: Tier }[] = [
  { min: 2400, tier: { key: "red", label: "Red" } },
  { min: 2200, tier: { key: "orange", label: "Orange" } },
  { min: 2000, tier: { key: "violet", label: "Violet" } },
  { min: 1800, tier: { key: "blue", label: "Blue" } },
  { min: 1600, tier: { key: "cyan", label: "Cyan" } },
  { min: 1400, tier: { key: "green", label: "Green" } },
];

/** Tier by LeetCode contest rating. */
export function ratingTier(rating: number | null): Tier {
  if (rating == null) return { key: "unrated", label: "Unrated" };
  return BANDS.find((b) => rating >= b.min)?.tier ?? { key: "grey", label: "Grey" };
}
