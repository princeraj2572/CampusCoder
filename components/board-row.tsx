import Link from "next/link";
import { RowGraphic } from "@/components/row-graphic";
import { Sparkline } from "@/components/sparkline";
import { TierChip } from "@/components/tier-chip";
import type { BoardRow as Row } from "@/lib/boards/build";
import { BOARD_META, rowDetail, rowStats } from "@/lib/boards/meta";
import { DOMAIN_LABELS } from "@/lib/registration/schema";
import { ratingTier } from "@/lib/scoring/tier";
import type { BoardId } from "@/lib/scoring/types";
import { studentYear } from "@/lib/year";

const ROW_PX = 68;

function yearText(admissionYear: number, override: number | null, today: Date) {
  const y = studentYear(admissionYear, today, override);
  return y.kind === "active" ? `${["1st", "2nd", "3rd", "4th"][y.year - 1]} year` : "";
}

function Movement({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span
        className="text-muted-foreground hidden w-10 text-sm sm:block"
        aria-label="No rank change data yet"
      >
        –
      </span>
    );
  }
  if (value === 0) {
    return (
      <span
        className="text-muted-foreground hidden w-10 text-sm sm:block"
        aria-label="Rank unchanged"
      >
        =
      </span>
    );
  }
  const up = value > 0;
  const places = Math.abs(value);
  return (
    <span
      className={`hidden w-10 text-sm font-medium tabular-nums sm:block ${up ? "text-success" : "text-danger"}`}
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
}: {
  row: Row;
  board: BoardId;
  improved: boolean;
  today: Date;
  /** The leader's value in this view, so every row's bar is drawn against it. */
  max: number;
}) {
  const { student } = row;
  const top = row.rank <= 3;
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
    board === "contests" && tier.key !== "unrated"
      ? `var(--tier-${tier.key})`
      : "var(--foreground)";
  const barPercent = max > 0 ? Math.max(2, Math.round((row.value / max) * 100)) : 0;
  const accent =
    row.rank === 1
      ? "border-foreground/50"
      : top
        ? "border-foreground/25"
        : "border-border";

  return (
    <li
      className={`group bg-foreground/[0.03] hover:bg-foreground/[0.06] relative overflow-hidden rounded-xl border transition-colors ${accent} ${shift ? "row-slide" : ""}`}
      style={shift ? ({ "--from": `${shift}px` } as React.CSSProperties) : undefined}
    >
      <div
        className={`flex items-center gap-2 px-3 sm:gap-3 sm:px-4 ${top ? "py-5" : "py-4"}`}
      >
        <span
          className={`numeral w-9 shrink-0 text-right font-extrabold sm:w-12 ${top ? "text-5xl sm:text-6xl" : "text-2xl"} leading-none`}
        >
          {row.rank}
        </span>
        {improved ? (
          <span className="hidden w-10 sm:block" />
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
            <RowGraphic board={board} student={student} />
          </div>
        </div>
        <div className="hidden sm:block">
          <Sparkline points={row.trend} />
        </div>
        <div className="shrink-0 text-right">
          <p
            className={`numeral font-extrabold ${top ? "text-3xl" : "text-xl"}`}
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
        className="absolute bottom-0 left-0 h-[3px] opacity-70"
        style={{ width: `${barPercent}%`, background: barColor }}
      />
    </li>
  );
}
