import { ratingTier } from "@/lib/scoring/tier";

/** Contest-rating tier. The name is always written out so colour is never the only signal. */
export function TierChip({ rating }: { rating: number | null | undefined }) {
  const tier = ratingTier(rating ?? null);
  if (tier.key === "unrated") return null;
  const color = `var(--tier-${tier.key})`;
  return (
    <span
      className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium"
      style={{
        color,
        borderColor: `color-mix(in oklab, ${color} 45%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${color} 12%, transparent)`,
      }}
      title={`Contest rating ${rating}`}
    >
      {tier.label}
    </span>
  );
}
