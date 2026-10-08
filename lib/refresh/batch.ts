import {
  FetchError,
  type FetchErrorKind,
  type PlatformProfile,
} from "@/lib/platforms/types";
import type { Platform } from "@/lib/registration/schema";
import { backoffMinutes } from "./backoff";

export interface DueRow {
  studentId: string;
  platform: Platform;
  username: string;
  failCount: number;
}

export interface RefreshDb {
  /** Due accounts, oldest first. `updatedBefore` leaves out accounts refreshed at or after that time. */
  pickDue(
    limit: number,
    now: Date,
    updatedBefore?: Date,
    studentId?: string,
  ): Promise<DueRow[]>;
  saveSuccess(row: DueRow, profile: PlatformProfile, now: Date): Promise<void>;
  saveFailure(
    row: DueRow,
    error: { kind: FetchErrorKind; message: string },
    nextAttemptAt: Date,
    now: Date,
  ): Promise<void>;
}

export interface RefreshSummary {
  picked: number;
  succeeded: number;
  failed: number;
}

export async function refreshBatch(deps: {
  db: RefreshDb;
  fetchProfile: (platform: Platform, username: string) => Promise<PlatformProfile>;
  now?: () => Date;
  batchSize?: number;
  /** Only accounts not refreshed since this time, so repeated batches do not repeat work. */
  updatedBefore?: Date;
  /** Only this student's accounts, for refreshing one person right after they register or edit. */
  studentId?: string;
  /** How many accounts to fetch at the same time. One by default, which is the gentlest. */
  concurrency?: number;
  log?: (line: string) => void;
}): Promise<RefreshSummary> {
  const { db, fetchProfile } = deps;
  const now = deps.now ?? (() => new Date());
  const log = deps.log ?? (() => {});
  const rows = await db.pickDue(
    deps.batchSize ?? 10,
    now(),
    deps.updatedBefore,
    deps.studentId,
  );

  let succeeded = 0;
  let failed = 0;
  async function refreshOne(row: DueRow) {
    const label = `${row.platform}:${row.username}`;
    try {
      const profile = await fetchProfile(row.platform, row.username);
      await db.saveSuccess(row, profile, now());
      succeeded++;
      log(`ok ${label}`);
    } catch (e) {
      failed++;
      const kind: FetchErrorKind = e instanceof FetchError ? e.kind : "unexpected";
      const message = e instanceof Error ? e.message : String(e);
      const at = now();
      const next = new Date(
        at.getTime() + backoffMinutes(row.failCount + 1, kind) * 60_000,
      );
      log(`fail ${label} (${kind}): ${message}`);
      try {
        await db.saveFailure(row, { kind, message }, next, at);
      } catch (saveError) {
        log(`could not record failure for ${label}: ${(saveError as Error).message}`);
      }
    }
  }

  // A small pool of workers takes rows from one list. One bad row never stops the others.
  const queue = [...rows];
  const workers = Math.max(1, Math.min(deps.concurrency ?? 1, rows.length));
  await Promise.all(
    Array.from({ length: workers }, async () => {
      for (let row = queue.shift(); row; row = queue.shift()) await refreshOne(row);
    }),
  );
  return { picked: rows.length, succeeded, failed };
}
