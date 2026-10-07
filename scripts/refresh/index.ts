import { fetchProfile } from "@/lib/platforms/fetchers";
import { refreshBatch } from "@/lib/refresh/batch";
import { createSupabaseRefreshDb } from "@/lib/refresh/supabase-db";
import { createServiceClient } from "@/lib/supabase/service";

function batchSizeFromEnv(): number {
  const n = Number(process.env.REFRESH_BATCH_SIZE ?? 10);
  return Number.isInteger(n) && n > 0 ? n : 10;
}

async function main() {
  const db = createSupabaseRefreshDb(createServiceClient());
  const token = process.env.GITHUB_TOKEN;
  const summary = await refreshBatch({
    db,
    batchSize: batchSizeFromEnv(),
    fetchProfile: (platform, username) => fetchProfile(platform, username, { token }),
    log: console.log,
  });
  console.log(JSON.stringify(summary));
}

// Per-row failures are recorded and do not fail the run; only infrastructure errors (e.g. the
// database being unreachable) exit non-zero so the scheduled workflow turns red.
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
