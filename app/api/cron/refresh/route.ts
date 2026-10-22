import { NextResponse } from "next/server";
import { refreshBoardData } from "@/lib/boards/cached";
import { fetchProfile } from "@/lib/platforms/fetchers";
import { isValidCronRequest } from "@/lib/refresh/cron-auth";
import { runScheduledRefresh } from "@/lib/refresh/scheduled";
import { createSupabaseRefreshDb } from "@/lib/refresh/supabase-db";
import { createServiceClient } from "@/lib/supabase/service";

// The run stops starting new batches after about 45 seconds, inside this limit.
export const maxDuration = 60;

function minutesFromEnv(): number | undefined {
  const n = Number(process.env.REFRESH_STALE_MINUTES);
  return Number.isFinite(n) && n >= 5 ? n : undefined;
}

/**
 * Called on a schedule by the Cloudflare timer. Refreshes accounts that have not been updated for
 * a few hours. Open to the internet, so it needs the shared secret in CRON_SECRET.
 */
export async function POST(request: Request) {
  if (
    !isValidCronRequest(request.headers.get("authorization"), process.env.CRON_SECRET)
  ) {
    // Same answer for "no secret configured" and "wrong secret", so nothing is revealed.
    return NextResponse.json({ error: "Not allowed." }, { status: 401 });
  }
  try {
    const token = process.env.GITHUB_TOKEN;
    const summary = await runScheduledRefresh({
      db: createSupabaseRefreshDb(createServiceClient()),
      fetchProfile: (platform, username) => fetchProfile(platform, username, { token }),
      staleMinutes: minutesFromEnv(),
    });
    if (summary.picked > 0) refreshBoardData();
    return NextResponse.json(summary);
  } catch (e) {
    console.error("scheduled refresh failed", e);
    return NextResponse.json({ error: "The refresh could not run." }, { status: 500 });
  }
}
