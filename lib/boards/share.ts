import { BOARD_META } from "./meta";
import type { BoardRanks } from "./profile-ranks";
import type { BoardId } from "@/lib/scoring/types";

const ORDINAL = ["1st", "2nd", "3rd", "4th"] as const;
const JOIN = "Come and join!";

/** The text for "share my rank": the student's best position, or a plain invitation if unranked. */
export function shareMessage(ranks: Record<BoardId, BoardRanks>): string {
  const best = (Object.entries(ranks) as [BoardId, BoardRanks][])
    .flatMap(([board, r]) => {
      const pick = r.inYear ?? r.overall;
      return pick
        ? [{ board, rank: pick.rank, total: pick.total, year: r.inYear?.year }]
        : [];
    })
    .sort((a, b) => a.rank - b.rank)[0];

  if (!best) {
    return `I just joined CampusCoders, our campus coding leaderboard. ${JOIN}`;
  }
  const where = best.year ? ` in ${ORDINAL[best.year - 1]} year` : "";
  return `I am #${best.rank} of ${best.total}${where} on the CampusCoders ${BOARD_META[best.board].title} board. ${JOIN}`;
}
