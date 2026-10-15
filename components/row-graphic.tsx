import type { BoardStudent } from "@/lib/boards/build";
import { difficultySegments, percentileMarker, weeklyTotals } from "@/lib/boards/visuals";
import { ratingTier } from "@/lib/scoring/tier";
import { num, type BoardId } from "@/lib/scoring/types";

const DIFFICULTY_COLOR = {
  easy: "var(--success)",
  medium: "var(--warning)",
  hard: "var(--danger)",
} as const;

/** Stacked bar of easy, medium and hard solves. */
function DifficultyBar({
  easy,
  medium,
  hard,
}: {
  easy: number;
  medium: number;
  hard: number;
}) {
  const segments = difficultySegments(easy, medium, hard);
  if (segments.length === 0) return null;
  return (
    <div
      role="img"
      aria-label={`${easy} easy, ${medium} medium, ${hard} hard`}
      className="flex h-2 w-40 max-w-full overflow-hidden rounded-full"
    >
      {segments.map((s) => (
        <span
          key={s.key}
          style={{ width: `${s.percent}%`, background: DIFFICULTY_COLOR[s.key] }}
        />
      ))}
    </div>
  );
}

/** A track with a marker: the further right, the better the percentile. */
function PercentileGauge({ top, color }: { top: number; color: string }) {
  const position = percentileMarker(top);
  return (
    <div
      role="img"
      aria-label={`Top ${top} percent of LeetCode contestants`}
      className="bg-foreground/15 relative h-2 w-40 max-w-full rounded-full"
    >
      <span
        className="absolute inset-y-0 left-0 rounded-full opacity-60"
        style={{ width: `${position}%`, background: color }}
      />
      <span
        className="border-background absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{ left: `${position}%`, background: color }}
      />
    </div>
  );
}

/** Twelve weekly contribution totals. */
function WeeklyBars({ totals, color }: { totals: number[]; color: string }) {
  if (totals.length < 2) return null;
  const max = Math.max(1, ...totals);
  return (
    <div
      role="img"
      aria-label={`Contributions over the last ${totals.length} weeks`}
      className="flex h-6 items-end gap-0.5"
    >
      {totals.map((t, i) => (
        <span
          key={i}
          className="w-1.5 rounded-sm"
          style={{
            background: color,
            height: `${Math.max(8, (t / max) * 100)}%`,
            opacity: i === totals.length - 1 ? 1 : 0.55,
          }}
        />
      ))}
    </div>
  );
}

/** The small graphic under a student's name on a board. */
export function RowGraphic({
  board,
  student,
  accent,
}: {
  board: BoardId;
  student: BoardStudent;
  accent: string;
}) {
  const m = student.metrics;
  if (board === "problem-solving" && m.leetcode) {
    const e = m.leetcode.extra;
    return <DifficultyBar easy={num(e.easy)} medium={num(e.medium)} hard={num(e.hard)} />;
  }
  if (board === "contests" && m.leetcode) {
    const top = m.leetcode.extra.top_percentage;
    if (typeof top !== "number") return null;
    const tier = ratingTier(m.leetcode.rating ?? null);
    const color =
      tier.key === "unrated" ? "var(--foreground)" : `var(--tier-${tier.key})`;
    return <PercentileGauge top={top} color={color} />;
  }
  if (board === "github" && m.github) {
    const daily = m.github.extra.daily;
    return Array.isArray(daily) ? (
      <WeeklyBars totals={weeklyTotals(daily as [string, number][], 12)} color={accent} />
    ) : null;
  }
  return null;
}
