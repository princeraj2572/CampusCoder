/** The version of the Terms and Privacy Policy people agree to. Change it to ask everyone to agree again. */
export const TERMS_VERSION = "2026-10-08";

/** Whether someone still has to agree: they never did, or only agreed to an older version. */
export function needsAgreement(accepted: string | null | undefined): boolean {
  return accepted !== TERMS_VERSION;
}
