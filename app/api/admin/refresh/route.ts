import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin/guard";
import { fetchProfile } from "@/lib/platforms/fetchers";
import { refreshBatch } from "@/lib/refresh/batch";
import { createSupabaseRefreshDb } from "@/lib/refresh/supabase-db";
import { createServiceClient } from "@/lib/supabase/service";

// A batch fetches accounts one after another, so give it room.
export const maxDuration = 60;

const BATCH_SIZE = 8;

/** Admin only: refresh the accounts that are most overdue, right now, instead of waiting for the schedule. */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Admins only." }, { status: 403 });
  }
  // The page sends the time it started, so repeated batches skip accounts already done.
  const body = (await request.json().catch(() => null)) as { since?: unknown } | null;
  const since = typeof body?.since === "string" ? new Date(body.since) : null;
  const updatedBefore =
    since && !Number.isNaN(since.getTime()) && since.getTime() <= Date.now() + 60_000
      ? since
      : undefined;
  try {
    const token = process.env.GITHUB_TOKEN;
    const summary = await refreshBatch({
      db: createSupabaseRefreshDb(createServiceClient()),
      batchSize: BATCH_SIZE,
      updatedBefore,
      fetchProfile: (platform, username) => fetchProfile(platform, username, { token }),
    });
    return NextResponse.json(summary);
  } catch (e) {
    console.error("admin refresh failed", e);
    return NextResponse.json(
      { error: "The refresh could not run. Check the database and try again." },
      { status: 500 },
    );
  }
}
