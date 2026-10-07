import { refreshBoardData } from "@/lib/boards/cached";
import { fetchProfile } from "@/lib/platforms/fetchers";
import { createServiceClient } from "@/lib/supabase/service";
import { refreshBatch } from "./batch";
import { createSupabaseRefreshDb } from "./supabase-db";

/**
 * Fetch one student's scores now, then refresh the cached boards so they see their rank.
 * Used right after someone registers or changes their usernames, so they do not wait for the
 * scheduled refresh. `skipFreshSince` leaves out accounts already refreshed after that time, so
 * repeated edits cannot be used to hammer the platforms.
 */
export async function refreshStudentNow(
  studentId: string,
  opts: { skipFreshSince?: Date } = {},
): Promise<void> {
  try {
    const token = process.env.GITHUB_TOKEN;
    await refreshBatch({
      db: createSupabaseRefreshDb(createServiceClient()),
      batchSize: 8,
      studentId,
      updatedBefore: opts.skipFreshSince,
      fetchProfile: (platform, username) => fetchProfile(platform, username, { token }),
    });
  } catch (e) {
    // Never fail a registration because a platform was slow; the scheduled refresh retries.
    console.error("refreshStudentNow failed", e);
  } finally {
    refreshBoardData();
  }
}
