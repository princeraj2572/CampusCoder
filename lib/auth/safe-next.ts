const FALLBACK = "/profile";
const AUTH_PREFIXES = ["/login", "/auth"];

/** A post-login destination that is guaranteed to stay on this site. */
export function safeNext(next: string | null | undefined): string {
  if (!next) return FALLBACK;
  // Must be an absolute path on this site: one leading slash, no backslashes, no encoded slashes.
  if (!next.startsWith("/") || next.startsWith("//")) return FALLBACK;
  if (next.includes("\\")) return FALLBACK;
  if (/%2f|%5c/i.test(next)) return FALLBACK;
  const path = next.split(/[?#]/)[0];
  if (AUTH_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) return FALLBACK;
  return next;
}
