import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const linkClass =
  "rounded-md px-2 py-1 text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/** Header links that depend on whether someone is signed in. Server component. */
export async function AuthLinks() {
  const {
    data: { user },
  } = await (await createClient()).auth.getUser();

  if (!user) {
    return (
      <Link href="/login" className={linkClass}>
        Sign in
      </Link>
    );
  }
  return (
    <>
      <Link href="/profile" className={linkClass}>
        My profile
      </Link>
      <form action="/auth/signout" method="post">
        <button type="submit" className={linkClass}>
          Sign out
        </button>
      </form>
    </>
  );
}
