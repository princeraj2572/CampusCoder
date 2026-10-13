import { redirect } from "next/navigation";
import { StudentForm } from "@/components/student-form";
import { createClient } from "@/lib/supabase/server";

export default async function RegisterPage() {
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

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-8">
      <h1 className="numeral text-5xl leading-none font-extrabold">
        Register your accounts
      </h1>
      <StudentForm mode="register" />
    </main>
  );
}
