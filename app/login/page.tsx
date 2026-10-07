import { connection } from "next/server";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/google-sign-in";
import { safeNext } from "@/lib/auth/safe-next";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Depends on the visitor's session, so it is rendered at request time.
  await connection();
  const params = await searchParams;
  const rawNext = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safeNext(rawNext);

  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  if (user) redirect(next);

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-16">
      <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
        Sign in
      </h1>
      <p className="text-muted-foreground max-w-prose">
        Use your Google account to see the department leaderboards, register your coding
        accounts and manage your details.
      </p>
      {params.error && (
        <p role="alert" className="text-danger text-sm">
          Sign-in did not complete. Try again.
        </p>
      )}
      <GoogleSignIn next={next} />
    </main>
  );
}
