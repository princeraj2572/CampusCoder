import type { Platform } from "@/lib/registration/schema";

/** The numbers a score needs, whether they come from current stats or an old snapshot. */
export interface PlatformMetrics {
  rating: number | null;
  solved: number | null;
  contests?: number | null;
  extra: Record<string, unknown>;
}

export type MetricsByPlatform = Partial<Record<Platform, PlatformMetrics>>;

export type BoardId = "problem-solving" | "contests" | "github";
export const BOARD_IDS: BoardId[] = ["problem-solving", "contests", "github"];

export const num = (v: unknown): number =>
  typeof v === "number" && Number.isFinite(v) ? v : 0;
