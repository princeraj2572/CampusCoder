import Link from "next/link";
import { Sparkline } from "@/components/sparkline";
import { TierChip } from "@/components/tier-chip";
import type { BoardRow as Row } from "@/lib/boards/build";
import { BOARD_META, rowDetail } from "@/lib/boards/meta";
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
        className="text-muted-foreground w-8 text-sm sm:w-10"
        aria-label="No rank change data yet"
      >
        –
      </span>
    );
  }
  if (value === 0) {
    return (
      <span
        className="text-muted-foreground w-8 text-sm sm:w-10"
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
      className={`w-8 text-sm font-medium tabular-nums sm:w-10 ${up ? "text-success" : "text-danger"}`}
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

  const tier = ratingTier(student.metrics.leetcode?.rating ?? null);
  const barColor =
    board === "contests" && tier.key !== "unrated"
      ? `var(--tier-${tier.key})`
      : "var(--foreground)";
  const barPercent = max > 0 ? Math.max(2, Math.round((row.value / max) * 100)) : 0;
  const accent =
    row.rank === 1
      ? "border-foreground"
      : top
        ? "border-foreground/40"
        : "border-transparent";

  return (
    <li
      className={`group border-border hover:bg-foreground/[0.04] relative border-b border-l-[3px] pl-3 transition-colors ${accent} ${shift ? "row-slide" : ""}`}
      style={shift ? ({ "--from": `${shift}px` } as React.CSSProperties) : undefined}
    >
      <div className={`flex items-center gap-2 sm:gap-3 ${top ? "py-4" : "py-3"}`}>
        <span
          className={`numeral w-9 shrink-0 text-right font-extrabold sm:w-12 ${top ? "text-5xl sm:text-6xl" : "text-2xl"} leading-none`}
        >
          {row.rank}
        </span>
        {improved ? <span className="w-8 sm:w-10" /> : <Movement value={row.movement} />}
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
          <p className="text-muted-foreground text-xs">{rowDetail(board, student)}</p>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-[2px] opacity-70"
        style={{ width: `${barPercent}%`, background: barColor }}
      />
    </li>
  );
}
