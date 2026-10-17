import { connection } from "next/server";
import { redirect } from "next/navigation";
import { StudentForm } from "@/components/student-form";
import { createClient } from "@/lib/supabase/server";

export default async function RegisterPage() {
  // Depends on the visitor's session, so it is rendered at request time.
  await connection();
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) redirect("/login?next=/register");

  const { data: existing } = await client
    .from("students")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (existing) redirect("/profile");

  // Google usually supplies the person's name, so they do not have to type it.
  const googleName = user.user_metadata?.full_name ?? user.user_metadata?.name;
  const prefill = typeof googleName === "string" ? googleName.trim().slice(0, 80) : "";

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-2">
        <h1 className="numeral text-5xl leading-none font-extrabold">
          Welcome to CampusCoders
        </h1>
        <p className="text-muted-foreground max-w-prose">
          You are signed in. Add your details and your coding usernames to join the
          leaderboards. It takes about a minute, and you can change or delete everything
          later.
        </p>
        <ul className="text-muted-foreground flex flex-col gap-1 text-sm">
          <li>Have your LeetCode and GitHub usernames ready.</li>
          <li>Codeforces and CodeChef are optional.</li>
          <li>Your Google email is never shown to anyone else.</li>
        </ul>
      </header>
      <StudentForm
        mode="register"
        todayIso={new Date().toISOString()}
        initial={prefill ? { fullName: prefill } : undefined}
      />
    </main>
  );
}
