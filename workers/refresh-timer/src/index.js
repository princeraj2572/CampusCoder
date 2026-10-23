// A small timer that runs on Cloudflare's free plan and asks the CampusCoders site to refresh
// scores every few minutes. The site decides what is actually due, so most runs do almost nothing.

/** Call the site's refresh endpoint once. Throws if it is not set up or the site refuses. */
export async function callRefresh(env, fetchImpl = fetch) {
  if (!env.TARGET_URL) throw new Error("TARGET_URL is not set");
  if (!env.CRON_SECRET) throw new Error("CRON_SECRET is not set");
  const res = await fetchImpl(env.TARGET_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.CRON_SECRET}` },
    // The site stops itself after about 45 seconds; do not wait past its own limit.
    signal: AbortSignal.timeout(58_000),
  });
  const body = await res.text();
  if (!res.ok)
    throw new Error(`Refresh failed with HTTP ${res.status}: ${body.slice(0, 200)}`);
  return { status: res.status, body };
}

const worker = {
  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(
      callRefresh(env).then(
        (out) => console.log(`refresh ok: ${out.body.slice(0, 200)}`),
        (err) => {
          console.error(String(err));
          // Rethrow so the failed run is visible in the Cloudflare dashboard.
          throw err;
        },
      ),
    );
  },
  // Nothing is served over HTTP; this Worker only runs on its schedule.
  async fetch() {
    return new Response("Not found", { status: 404 });
  },
};

export default worker;
