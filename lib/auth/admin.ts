/** Whether a signed-in email is the bootstrap admin from ADMIN_BOOTSTRAP_EMAIL. */
export function isAdminEmail(
  email: string | null | undefined,
  adminEmail: string | null | undefined,
): boolean {
  const a = email?.trim().toLowerCase();
  const b = adminEmail?.trim().toLowerCase();
  return Boolean(a) && Boolean(b) && a === b;
}
