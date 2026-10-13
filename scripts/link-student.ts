import { createServiceClient } from "@/lib/supabase/service";

/**
 * One-off: attach a student record created before accounts existed to the Google account that
 * has signed in with a given email.
 *
 *   pnpm link-student "Full Name" you@gmail.com
 */
async function main() {
  const [name, email] = process.argv.slice(2);
  if (!name || !email) {
    console.error('Usage: pnpm link-student "Full Name" you@gmail.com');
    process.exit(1);
  }
  const client = createServiceClient();

  const { data: students, error } = await client
    .from("students")
    .select("id, full_name, auth_user_id")
    .eq("full_name", name);
  if (error) throw new Error(error.message);
  const unlinked = (students ?? []).filter((s) => s.auth_user_id === null);
  if (unlinked.length !== 1) {
    console.error(
      `Expected exactly one unlinked student named "${name}", found ${unlinked.length} ` +
        `(${students?.length ?? 0} with that name in total).`,
    );
    process.exit(1);
  }

  let userId: string | null = null;
  for (let page = 1; !userId; page++) {
    const { data, error: listError } = await client.auth.admin.listUsers({
      page,
      perPage: 200,
    });
    if (listError) throw new Error(listError.message);
    userId =
      data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id ?? null;
    if (data.users.length < 200) break;
  }
  if (!userId) {
    console.error(
      `No account has signed in with ${email} yet. Sign in with Google first.`,
    );
    process.exit(1);
  }

  const taken = await client
    .from("students")
    .select("id")
    .eq("auth_user_id", userId)
    .maybeSingle();
  if (taken.data) {
    console.error(
      `That account is already linked to a student record (${taken.data.id}).`,
    );
    process.exit(1);
  }

  const { error: updateError } = await client
    .from("students")
    .update({ auth_user_id: userId })
    .eq("id", unlinked[0].id);
  if (updateError) throw new Error(updateError.message);
  console.log(`Linked "${name}" (${unlinked[0].id}) to ${email}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
