import type { Platform } from "@/lib/registration/schema";
import type { BoardId } from "@/lib/scoring/types";

/** CSS variable holding each board's accent colour. */
export const BOARD_ACCENT: Record<BoardId, string> = {
  "problem-solving": "var(--board-dsa)",
  contests: "var(--board-contests)",
  github: "var(--board-github)",
};

/** Each coding platform's brand colour, used wherever that platform's data appears. */
export const PLATFORM_BRAND: Record<Platform, string> = {
  leetcode: "var(--board-dsa)",
  codeforces: "var(--brand-codeforces)",
  codechef: "var(--brand-codechef)",
  github: "var(--board-github)",
};

const MEDALS = ["var(--medal-gold)", "var(--medal-silver)", "var(--medal-bronze)"];

/** Gold, silver or bronze for ranks 1 to 3; null for everyone else. Ties share the medal. */
export function medalColor(rank: number): string | null {
  return rank >= 1 && rank <= 3 ? MEDALS[rank - 1] : null;
}

/** A small-text colour for an accent: the accent blended toward the text colour, so it stays readable on its own tint in both themes. */
export function ink(color: string): string {
  return `color-mix(in oklab, ${color} 60%, var(--foreground))`;
}
