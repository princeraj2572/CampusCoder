import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AgreeForm } from "@/components/agree-form";
import { safeNext } from "@/lib/auth/safe-next";
import { needsAgreement } from "@/lib/legal";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Agree to the terms · CampusCoders" };

export default async function AgreePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Depends on the visitor's session, so it is rendered at request time.
  await connection();
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safeNext(rawNext);

  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) redirect("/login");

  const { data: student } = await client
    .from("students")
    .select("terms_version")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  // Nobody to ask yet (they register first), or they already agreed.
  if (!student || !needsAgreement(student.terms_version)) redirect(next);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-16">
      <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
        Before you continue
      </h1>
      <p className="text-muted-foreground max-w-prose">
        We added Terms and Conditions and a Privacy Policy. Please read them and agree to
        keep using CampusCoders. You only need to do this once.
      </p>
      <AgreeForm next={next} />
    </main>
  );
}
