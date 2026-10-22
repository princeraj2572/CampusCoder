const PUBLIC_EXACT = ["/", "/login", "/privacy", "/terms"];
// /api/cron/ is for the refresh timer. It has no session, so the route checks its own secret.
const PUBLIC_PREFIXES = ["/auth/", "/leaderboards/", "/api/cron/"];

/** Pages and API routes that need a signed-in user. Everything not listed as public is protected. */
export function isProtectedPath(pathname: string): boolean {
  if (PUBLIC_EXACT.includes(pathname)) return false;
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) return false;
  return true;
}

/** Pages that ask a signed-in student to agree to the current terms first. */
export function isTermsGatedPath(pathname: string): boolean {
  return (
    pathname === "/profile" ||
    pathname.startsWith("/profile/") ||
    pathname === "/students" ||
    pathname.startsWith("/students/")
  );
}
