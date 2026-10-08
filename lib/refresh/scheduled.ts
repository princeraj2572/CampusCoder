import { refreshBatch, type RefreshDb, type RefreshSummary } from "./batch";
import type { PlatformProfile } from "@/lib/platforms/types";
import type { Platform } from "@/lib/registration/schema";

export interface ScheduledSummary extends RefreshSummary {
  /** How many batches were run, counting the empty one that ends the run. */
  rounds: number;
}

/**
 * What the timer runs: refresh accounts that have not been updated for `staleMinutes`, in small
 * parallel batches, until none are left or the time budget is nearly gone. A run that finds
 * everything fresh costs one cheap query.
 */
export async function runScheduledRefresh(deps: {
  db: RefreshDb;
  fetchProfile: (platform: Platform, username: string) => Promise<PlatformProfile>;
  now?: () => Date;
  /** How long this run may take in total. The hosting function has a hard limit. */
  budgetMs?: number;
  /** Do not start another batch with less time than this left. */
  reserveMs?: number;
  staleMinutes?: number;
  batchSize?: number;
  concurrency?: number;
  log?: (line: string) => void;
}): Promise<ScheduledSummary> {
  const now = deps.now ?? (() => new Date());
  const budgetMs = deps.budgetMs ?? 45_000;
  const reserveMs = deps.reserveMs ?? 15_000;
  const start = now().getTime();
  // Fixed once, so an account refreshed in this run is not picked again in the next round.
  const updatedBefore = new Date(start - (deps.staleMinutes ?? 180) * 60_000);

  const total: ScheduledSummary = { picked: 0, succeeded: 0, failed: 0, rounds: 0 };
  for (;;) {
    if (total.rounds > 0 && budgetMs - (now().getTime() - start) < reserveMs) break;
    const batch = await refreshBatch({
      db: deps.db,
      fetchProfile: deps.fetchProfile,
      now,
      batchSize: deps.batchSize ?? 12,
      concurrency: deps.concurrency ?? 3,
      updatedBefore,
      log: deps.log,
    });
    total.rounds += 1;
    total.picked += batch.picked;
    total.succeeded += batch.succeeded;
    total.failed += batch.failed;
    if (batch.picked === 0) break;
  }
  return total;
}
