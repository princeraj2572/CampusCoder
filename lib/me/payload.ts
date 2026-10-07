import type { Domain, Platform } from "@/lib/registration/schema";

export interface MeInput {
  fullName: string;
  admissionYear: number;
  section?: string;
  primaryDomain: Domain;
  secondaryDomains: Domain[];
  accounts: { platform: Platform; username: string }[];
}

/** The JSON the register_my_student and update_my_student functions take. */
export function toRpcPayload(input: MeInput, leaderboardOptOut?: boolean) {
  return {
    full_name: input.fullName,
    admission_year: input.admissionYear,
    section: input.section ?? null,
    primary_domain: input.primaryDomain,
    secondary_domains: input.secondaryDomains,
    accounts: input.accounts,
    ...(leaderboardOptOut === undefined
      ? {}
      : { leaderboard_opt_out: leaderboardOptOut }),
  };
}
