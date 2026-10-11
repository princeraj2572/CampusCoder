import { buildBoard, type History, type BoardStudent } from "./build";
import type { ScoreWeights } from "@/lib/scoring/problem-solving";
import { BOARD_IDS, type BoardId } from "@/lib/scoring/types";
import { studentYear } from "@/lib/year";

export interface RankInfo {
  rank: number;
  total: number;
}

export interface BoardRanks {
  overall?: RankInfo;
  inYear?: RankInfo & { year: 1 | 2 | 3 | 4 };
}

/** A student's rank on each board, overall and within their own year. Missing = not ranked there. */
export function profileRanks(
  data: { students: BoardStudent[]; weights: ScoreWeights; history: History },
  studentId: string,
  today: Date,
): Record<BoardId, BoardRanks> {
  const me = data.students.find((s) => s.id === studentId);
  const y = me ? studentYear(me.admissionYear, today, me.yearOverride) : null;
  const out = {} as Record<BoardId, BoardRanks>;
  for (const board of BOARD_IDS) {
    const base = {
      board,
      students: data.students,
      weights: data.weights,
      today,
      history: data.history,
    };
    const overallRows = buildBoard({ ...base, params: { year: "all" } });
    const mine = overallRows.find((r) => r.id === studentId);
    const ranks: BoardRanks = {};
    if (mine) {
      ranks.overall = { rank: mine.rank, total: overallRows.length };
      if (y?.kind === "active") {
        const yearRows = buildBoard({ ...base, params: { year: y.year } });
        const inYear = yearRows.find((r) => r.id === studentId);
        if (inYear)
          ranks.inYear = { rank: inYear.rank, total: yearRows.length, year: y.year };
      }
    }
    out[board] = ranks;
  }
  return out;
}
