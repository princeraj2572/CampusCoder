import type { BoardId } from "@/lib/scoring/types";

/** CSS variable holding each board's accent colour. */
export const BOARD_ACCENT: Record<BoardId, string> = {
  "problem-solving": "var(--board-dsa)",
  contests: "var(--board-contests)",
  github: "var(--board-github)",
};

const MEDALS = ["var(--medal-gold)", "var(--medal-silver)", "var(--medal-bronze)"];

/** Gold, silver or bronze for ranks 1 to 3; null for everyone else. Ties share the medal. */
export function medalColor(rank: number): string | null {
  return rank >= 1 && rank <= 3 ? MEDALS[rank - 1] : null;
}
