import Link from "next/link";
import { Sparkline } from "@/components/sparkline";
import { TierChip } from "@/components/tier-chip";
import type { BoardRow as Row } from "@/lib/boards/build";
import { BOARD_META, rowDetail } from "@/lib/boards/meta";
import { DOMAIN_LABELS } from "@/lib/registration/schema";
import type { BoardId } from "@/lib/scoring/types";
import { studentYear } from "@/lib/year";

const ROW_PX = 64;

function yearText(admissionYear: number, override: number | null, today: Date) {
  const y = studentYear(admissionYear, today, override);
  return y.kind === "active" ? `${["1st", "2nd", "3rd", "4th"][y.year - 1]} year` : "";
}

function Movement({ value }: { value: number | null }) {
  if (value === null) {
    return (
      <span
        className="text-muted-foreground w-10 text-sm"
        aria-label="No rank change data yet"
      >
        –
      </span>
    );
  }
  if (value === 0) {
    return (
      <span className="text-muted-foreground w-10 text-sm" aria-label="Rank unchanged">
        =
      </span>
    );
  }
  const up = value > 0;
  return (
    <span
      className={`w-10 text-sm font-medium tabular-nums ${up ? "text-success" : "text-danger"}`}
      aria-label={`${up ? "Up" : "Down"} ${Math.abs(value)} ${Math.abs(value) === 1 ? "place" : "places"}`}
    >
      {up ? "▲" : "▼"}
      {Math.abs(value)}
    </span>
  );
}

export function BoardRow({
  row,
  board,
  improved,
  today,
}: {
  row: Row;
  board: BoardId;
  improved: boolean;
  today: Date;
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

  return (
    <li
      className={`border-border flex items-center gap-3 border-b ${top ? "py-4" : "py-3"} ${shift ? "row-slide" : ""}`}
      style={shift ? ({ "--from": `${shift}px` } as React.CSSProperties) : undefined}
    >
      <span
        className={`font-display w-10 shrink-0 text-right font-bold tabular-nums ${top ? "text-4xl" : "text-xl"}`}
      >
        {row.rank}
      </span>
      {improved ? <span className="w-10" /> : <Movement value={row.movement} />}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <Link
            href={`/students/${student.id}`}
            className="font-display truncate text-base font-semibold underline-offset-4 hover:underline focus-visible:underline"
          >
            {student.fullName}
          </Link>
          <TierChip rating={student.metrics.leetcode?.rating} />
        </div>
        <p className="text-muted-foreground truncate text-sm">{meta}</p>
      </div>
      <div className="hidden sm:block">
        <Sparkline points={row.trend} />
      </div>
      <div className="shrink-0 text-right">
        <p
          className={`font-display font-bold tabular-nums ${top ? "text-2xl" : "text-lg"}`}
          title={
            improved ? BOARD_META[board].improvedLabel : BOARD_META[board].valueLabel
          }
        >
          {improved ? `+${row.value}` : row.value}
        </p>
        <p className="text-muted-foreground text-xs">{rowDetail(board, student)}</p>
      </div>
    </li>
  );
}
