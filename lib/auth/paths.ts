const PUBLIC_EXACT = ["/", "/login"];
const PUBLIC_PREFIXES = ["/auth/", "/leaderboards/"];

/** Pages and API routes that need a signed-in user. Everything not listed as public is protected. */
export function isProtectedPath(pathname: string): boolean {
  if (PUBLIC_EXACT.includes(pathname)) return false;
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) return false;
  return true;
}
