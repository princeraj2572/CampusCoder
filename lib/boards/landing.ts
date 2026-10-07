import { cacheLife } from "next/cache";
import { createServiceClient } from "@/lib/supabase/service";
import { buildBoard, type BoardRow } from "./build";
import { landingStats, type LandingStats } from "./landing-stats";
import { loadBoardData } from "./load";

export interface LandingSnapshot {
  /** When this snapshot was taken; the page measures "updated N min ago" from here. */
  nowIso: string;
  /** When the most recent stat was refreshed, or null if nothing has been fetched. */
  updatedIso: string | null;
  /** The top of the DSA board. */
  rows: BoardRow[];
  /** The leader's value, for scaling the score bars. */
  max: number;
  stats: LandingStats;
}

/**
 * The real top of the DSA board and the department's headline numbers, for the public landing page.
 * Cached for a minute so a busy landing page does not query the database on every visit. Only
 * public leaderboard data is read, through the server's own key.
 */
export async function getLandingSnapshot(): Promise<LandingSnapshot> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });

  const now = new Date();
  const data = await loadBoardData(createServiceClient(), now);
  const all = buildBoard({
    board: "problem-solving",
    students: data.students,
    weights: data.weights,
    today: now,
    params: { year: "all" },
    history: data.history,
  });
  return {
    nowIso: now.toISOString(),
    updatedIso: data.lastUpdated ? data.lastUpdated.toISOString() : null,
    rows: all.slice(0, 4),
    max: Math.max(0, ...all.map((r) => r.value)),
    stats: landingStats(data.students, now),
  };
}
