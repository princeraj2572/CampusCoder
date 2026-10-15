import Link from "next/link";
import { RowGraphic } from "@/components/row-graphic";
import { Sparkline } from "@/components/sparkline";
import { TierChip } from "@/components/tier-chip";
import type { BoardRow as Row } from "@/lib/boards/build";
import { BOARD_META, rowDetail, rowStats } from "@/lib/boards/meta";
import { BOARD_ACCENT, medalColor } from "@/lib/boards/theme";
import { DOMAIN_LABELS } from "@/lib/registration/schema";
import { ratingTier } from "@/lib/scoring/tier";
import type { BoardId } from "@/lib/scoring/types";
import { studentYear } from "@/lib/year";

const ROW_PX = 120;

function yearText(admissionYear: number, override: number | null, today: Date) {
  const y = studentYear(admissionYear, today, override);
  return y.kind === "active" ? `${["1st", "2nd", "3rd", "4th"][y.year - 1]} year` : "";
}

function Movement({ value }: { value: number | null }) {
  const base = "hidden w-9 text-sm sm:block";
  if (value === null) {
    return (
      <span
        className={`${base} text-muted-foreground`}
        aria-label="No rank change data yet"
      >
        –
      </span>
    );
  }
  if (value === 0) {
    return (
      <span className={`${base} text-muted-foreground`} aria-label="Rank unchanged">
        =
      </span>
    );
  }
  const up = value > 0;
  const places = Math.abs(value);
  return (
    <span
      className={`${base} font-medium tabular-nums ${up ? "text-success" : "text-danger"}`}
      aria-label={`${up ? "Up" : "Down"} ${places} ${places === 1 ? "place" : "places"}`}
    >
      {up ? "▲" : "▼"}
      {places}
    </span>
  );
}

export function BoardRow({
  row,
  board,
  improved,
  today,
  max,
  isMe,
}: {
  row: Row;
  board: BoardId;
  improved: boolean;
  today: Date;
  /** The leader's value in this view, so every row's bar is drawn against it. */
  max: number;
  /** Whether this card is the signed-in student's own. */
  isMe?: boolean;
}) {
  const { student } = row;
  const medal = medalColor(row.rank);
  const accent = BOARD_ACCENT[board];
  const shift = row.movement ? Math.max(-8, Math.min(8, row.movement)) * ROW_PX : 0;
  const meta = [
    yearText(student.admissionYear, student.yearOverride, today),
    DOMAIN_LABELS[student.primaryDomain],
    student.section,
  ]
    .filter(Boolean)
    .join(" · ");

  const stats = rowStats(board, student);
  const tier = ratingTier(student.metrics.leetcode?.rating ?? null);
  const barColor =
    board === "contests" && tier.key !== "unrated" ? `var(--tier-${tier.key})` : accent;
  const barPercent = max > 0 ? Math.max(2, Math.round((row.value / max) * 100)) : 0;

  // Medal colours tint the border and background of the top three; everyone else stays neutral.
  const cardStyle: React.CSSProperties = {
    ...(shift ? ({ "--from": `${shift}px` } as React.CSSProperties) : {}),
    ...(medal
      ? {
          borderColor: `color-mix(in oklab, ${medal} 55%, transparent)`,
          backgroundColor: `color-mix(in oklab, ${medal} 9%, transparent)`,
        }
      : {}),
    ...(isMe && !medal
      ? { borderColor: `color-mix(in oklab, ${accent} 60%, transparent)` }
      : {}),
  };

  return (
    <li
      className={`group border-border bg-foreground/[0.03] hover:bg-foreground/[0.06] relative overflow-hidden rounded-xl border transition-colors ${shift ? "row-slide" : ""}`}
      style={cardStyle}
    >
      <div
        className={`flex items-center gap-2 px-3 sm:gap-3 sm:px-4 ${medal ? "py-4" : "py-3"}`}
      >
        <span
          className={`numeral w-9 shrink-0 text-right leading-none font-extrabold sm:w-12 ${medal ? "text-5xl sm:text-6xl" : "text-2xl"}`}
          style={medal ? { color: medal } : undefined}
        >
          {row.rank}
        </span>
        {improved ? (
          <span className="hidden w-9 sm:block" />
        ) : (
          <Movement value={row.movement} />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              href={`/students/${student.id}`}
              className="font-display text-base font-semibold break-words underline-offset-4 hover:underline focus-visible:underline"
            >
              {student.fullName}
            </Link>
            {isMe && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{ background: accent, color: "var(--on-board)" }}
              >
                You
              </span>
            )}
            <TierChip rating={student.metrics.leetcode?.rating} />
          </div>
          <p className="text-muted-foreground text-sm">{meta}</p>
          {stats.length > 0 && (
            <dl className="text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
              {stats.map((x) => (
                <div key={x.label} className="flex gap-1">
                  <dt>{x.label}</dt>
                  <dd className="text-foreground font-medium tabular-nums">{x.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-2 empty:hidden">
            <RowGraphic board={board} student={student} accent={accent} />
          </div>
        </div>
        <div className="hidden sm:block" style={{ color: accent }}>
          <Sparkline points={row.trend} />
        </div>
        <div className="shrink-0 text-right">
          <p
            className={`numeral font-extrabold ${medal ? "text-4xl" : "text-2xl"}`}
            style={{ color: accent }}
            title={
              improved ? BOARD_META[board].improvedLabel : BOARD_META[board].valueLabel
            }
          >
            {improved ? `+${row.value}` : row.value}
          </p>
          <p className="text-muted-foreground hidden text-xs sm:block">
            {rowDetail(board, student)}
          </p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] opacity-80"
        style={{ width: `${barPercent}%`, background: barColor }}
      />
    </li>
  );
}
