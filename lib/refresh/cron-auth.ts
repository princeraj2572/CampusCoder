import { timingSafeEqual } from "node:crypto";

const MIN_SECRET_LENGTH = 24;

/**
 * Whether a request carries the refresh timer's secret as `Authorization: Bearer <secret>`.
 * Refuses everything when no secret is configured, or when it is too short to be safe.
 */
export function isValidCronRequest(
  authorization: string | null,
  secret: string | undefined,
): boolean {
  if (!secret || secret.length < MIN_SECRET_LENGTH) return false;
  if (!authorization?.startsWith("Bearer ")) return false;
  const given = Buffer.from(authorization.slice("Bearer ".length));
  const expected = Buffer.from(secret);
  // Same length first, because timingSafeEqual throws on different lengths.
  return given.length === expected.length && timingSafeEqual(given, expected);
}
