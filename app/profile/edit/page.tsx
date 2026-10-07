import { connection } from "next/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DeleteAccount } from "@/components/delete-account";
import { StudentForm, type StudentFormValues } from "@/components/student-form";
import type { Domain } from "@/lib/registration/schema";
import { createClient } from "@/lib/supabase/server";

export default async function EditProfilePage() {
  // Depends on the visitor's session, so it is rendered at request time.
  await connection();
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) redirect("/login?next=/profile/edit");

  const { data: student } = await client
    .from("students")
    .select(
      "id, full_name, admission_year, section, primary_domain, secondary_domains, leaderboard_opt_out, student_platforms(platform, username)",
    )
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (!student) redirect("/register");

  const username = (platform: string) =>
    (student.student_platforms as { platform: string; username: string }[]).find(
      (p) => p.platform === platform,
    )?.username ?? "";

  const initial: Partial<StudentFormValues> = {
    fullName: student.full_name,
    admissionYear: student.admission_year,
    section: student.section ?? "",
    primaryDomain: student.primary_domain as Domain,
    secondaryDomains: (student.secondary_domains ?? []) as Domain[],
    leetcode: username("leetcode"),
    github: username("github"),
    codeforces: username("codeforces"),
    codechef: username("codechef"),
    leaderboardOptOut: student.leaderboard_opt_out,
  };

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="numeral text-5xl leading-none font-extrabold">
          Edit your details
        </h1>
        <Link
          href={`/students/${student.id}`}
          className="text-muted-foreground text-sm underline underline-offset-4"
        >
          View your public profile
        </Link>
      </div>
      <StudentForm mode="edit" initial={initial} todayIso={new Date().toISOString()} />
      <DeleteAccount fullName={student.full_name} />
    </main>
  );
}
