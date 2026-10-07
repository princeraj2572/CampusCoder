import Link from "next/link";
import { connection } from "next/server";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

const PRIMARY = "/login";

/** The main call to action: sign in, or jump to the boards when already signed in. */
export async function LandingCta({ size = "lg" }: { size?: "default" | "lg" }) {
  await connection();
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {user ? (
        <Link href="/profile" className={buttonVariants({ size })}>
          Go to my profile
        </Link>
      ) : (
        <Link href={PRIMARY} className={buttonVariants({ size })}>
          Continue with Google
        </Link>
      )}
      <Link
        href="/leaderboards/problem-solving"
        className={buttonVariants({ variant: "outline", size })}
      >
        See the leaderboards
      </Link>
    </div>
  );
}

/** Shown while the session check runs, and as a fallback if it cannot. */
export function LandingCtaFallback({ size = "lg" }: { size?: "default" | "lg" }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={PRIMARY} className={buttonVariants({ size })}>
        Continue with Google
      </Link>
      <Link
        href="/leaderboards/problem-solving"
        className={buttonVariants({ variant: "outline", size })}
      >
        See the leaderboards
      </Link>
    </div>
  );
}
