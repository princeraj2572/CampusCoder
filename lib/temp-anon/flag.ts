// TEMPORARY: delete lib/temp-anon, app/api/register and app/api/verify when Google login lands.
export function isAnonRegistrationEnabled(
  source: Record<string, string | undefined> = process.env,
): boolean {
  return source.ALLOW_ANON_REGISTRATION === "true";
}
