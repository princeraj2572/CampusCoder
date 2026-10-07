import { DifficultyBar } from "@/components/row-graphic";
import { TierChip } from "@/components/tier-chip";

// Fictional students, drawn by hand. The real boards are one click away.
const SAMPLE = [
  {
    rank: 1,
    name: "Aarav S.",
    meta: "3rd year · DSA/CP",
    score: "94.2",
    rating: 2040,
    medal: "var(--medal-gold)",
    rotate: "-1.5deg",
    delay: "120ms",
    mix: [140, 190, 64],
  },
  {
    rank: 2,
    name: "Meera R.",
    meta: "2nd year · AI/ML",
    score: "88.7",
    rating: 1840,
    medal: "var(--medal-silver)",
    rotate: "1deg",
    delay: "260ms",
    mix: [150, 160, 40],
  },
  {
    rank: 3,
    name: "Kabir D.",
    meta: "4th year · Web",
    score: "81.3",
    rating: 1620,
    medal: "var(--medal-bronze)",
    rotate: "-0.5deg",
    delay: "400ms",
    mix: [160, 120, 24],
  },
  {
    rank: 4,
    name: "Isha V.",
    meta: "3rd year · Data science",
    score: "72.5",
    rating: 1450,
    medal: "",
    rotate: "0.8deg",
    delay: "540ms",
    mix: [130, 100, 18],
  },
];

/** A little stack of sample leaderboard cards for the landing page. */
export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <span className="bg-foreground text-background absolute -top-3 right-2 z-10 rotate-3 rounded-full px-3 py-1 text-xs font-semibold">
        Sample board
      </span>
      <ol className="flex flex-col gap-3" aria-label="Sample leaderboard">
        {SAMPLE.map((s) => (
          <li
            key={s.rank}
            className="hero-in border-border bg-background flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-[0_6px_0_0_color-mix(in_oklab,var(--foreground)_10%,transparent)]"
            style={
              {
                "--r": s.rotate,
                "--delay": s.delay,
                transform: `rotate(${s.rotate})`,
                ...(s.medal
                  ? {
                      borderColor: `color-mix(in oklab, ${s.medal} 60%, transparent)`,
                      backgroundColor: `color-mix(in oklab, ${s.medal} 12%, var(--background))`,
                    }
                  : {}),
              } as React.CSSProperties
            }
          >
            <span
              className="numeral w-12 text-right text-6xl leading-none font-extrabold"
              style={{ color: s.medal || undefined }}
            >
              {s.rank}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-lg font-semibold">{s.name}</span>
                <TierChip rating={s.rating} />
              </div>
              <p className="text-muted-foreground text-sm">{s.meta}</p>
              <div className="mt-2">
                <DifficultyBar easy={s.mix[0]} medium={s.mix[1]} hard={s.mix[2]} />
              </div>
            </div>
            <span
              className="numeral text-4xl font-extrabold"
              style={{ color: "var(--board-dsa)" }}
            >
              {s.score}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
