import type { SupabaseClient } from "@supabase/supabase-js";
import { verifyAccount } from "@/lib/platforms";
import type { Platform } from "@/lib/registration/schema";

export const PLATFORM_LABELS: Record<Platform, string> = {
  leetcode: "LeetCode",
  github: "GitHub",
  codeforces: "Codeforces",
  codechef: "CodeChef",
};

type Account = { platform: Platform; username: string };

/** Checks each username exists on its platform. */
export async function checkAccountsExist(accounts: Account[], token?: string) {
  const results = await Promise.all(
    accounts.map(async (a) => ({
      ...a,
      result: await verifyAccount(a.platform, a.username, { token }),
    })),
  );
  return {
    notFound: results.filter((r) => r.result === "not-found").map((r) => r.platform),
    unavailable: results.some((r) => r.result === "unavailable"),
  };
}

/** Platforms whose username already belongs to a different student. */
export async function findTakenAccounts(
  client: SupabaseClient,
  accounts: Account[],
  ownStudentId?: string,
): Promise<Platform[]> {
  const taken: Platform[] = [];
  for (const a of accounts) {
    const { data } = await client
      .from("student_platforms")
      .select("student_id")
      .eq("platform", a.platform)
      .eq("username_key", a.username.toLowerCase())
      .limit(1);
    const owner = data?.[0]?.student_id as string | undefined;
    if (owner && owner !== ownStudentId) taken.push(a.platform);
  }
  return taken;
}
