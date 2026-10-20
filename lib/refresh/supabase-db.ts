import type { SupabaseClient } from "@supabase/supabase-js";
import type { PlatformProfile } from "@/lib/platforms/types";
import type { Platform } from "@/lib/registration/schema";
import type { DueRow, RefreshDb } from "./batch";
import { istDate } from "./dates";

/** Daily snapshots live for years on a free tier, so drop the bulky per-day calendar. */
export function toSnapshotExtra(extra: Record<string, unknown>): Record<string, unknown> {
  const { daily: _daily, ...rest } = extra;
  return rest;
}

function check(result: { error: { message: string } | null }) {
  if (result.error) throw new Error(result.error.message);
}

export function createSupabaseRefreshDb(client: SupabaseClient): RefreshDb {
  return {
    async pickDue(limit, now, updatedBefore) {
      let query = client
        .from("student_platforms")
        .select(
          "student_id, platform, username, fail_count, students!inner(is_alumni), platforms!inner(enabled)",
        )
        .eq("students.is_alumni", false)
        .eq("platforms.enabled", true)
        .or(`next_attempt_at.is.null,next_attempt_at.lte.${now.toISOString()}`);
      if (updatedBefore) {
        query = query.or(
          `last_updated.is.null,last_updated.lt.${updatedBefore.toISOString()}`,
        );
      }
      const { data, error } = await query
        .order("last_updated", { ascending: true, nullsFirst: true })
        .limit(limit);
      if (error) throw new Error(error.message);
      return (data ?? []).map((r): DueRow => ({
        studentId: r.student_id as string,
        platform: r.platform as Platform,
        username: r.username as string,
        failCount: r.fail_count as number,
      }));
    },

    async saveSuccess(row, profile: PlatformProfile, now) {
      const key = { student_id: row.studentId, platform: row.platform };
      const { stats } = profile;
      const nowIso = now.toISOString();

      check(
        await client.from("platform_stats").upsert(
          {
            ...key,
            rating: stats.rating,
            solved: stats.solved,
            rank: stats.rank,
            contests: stats.contests,
            extra: stats.extra,
            last_updated: nowIso,
          },
          { onConflict: "student_id,platform" },
        ),
      );

      if (profile.contests.length > 0) {
        check(
          await client.from("contest_history").upsert(
            profile.contests.map((c) => ({
              ...key,
              contest_id: c.contestId,
              contest_name: c.contestName,
              contest_date: c.contestDate.toISOString(),
              rank: c.rank,
              rating_after: c.ratingAfter,
              rating_change: c.ratingChange,
            })),
            { onConflict: "student_id,platform,contest_id" },
          ),
        );
      }

      check(
        await client.from("daily_snapshots").upsert(
          {
            ...key,
            snapshot_date: istDate(now),
            rating: stats.rating,
            solved: stats.solved,
            rank: stats.rank,
            contests: stats.contests,
            extra: toSnapshotExtra(stats.extra),
          },
          { onConflict: "student_id,platform,snapshot_date" },
        ),
      );

      // Last, so a failure above leaves the row due and it is retried.
      check(
        await client
          .from("student_platforms")
          .update({
            last_updated: nowIso,
            fail_count: 0,
            last_error: null,
            next_attempt_at: null,
          })
          .match(key),
      );
    },

    async saveFailure(row, error, nextAttemptAt) {
      check(
        await client
          .from("student_platforms")
          .update({
            fail_count: row.failCount + 1,
            last_error: error.message.slice(0, 300),
            next_attempt_at: nextAttemptAt.toISOString(),
          })
          .match({ student_id: row.studentId, platform: row.platform }),
      );
    },
  };
}
