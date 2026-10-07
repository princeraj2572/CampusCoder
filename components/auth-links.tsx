import Link from "next/link";
import { connection } from "next/server";
import { LogInIcon, LogOutIcon } from "@/components/icons";
import { initials } from "@/components/profile-card";
import { createClient } from "@/lib/supabase/server";

const focus = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/**
 * The account area of the header. Server component: it needs the visitor's session.
 * `bar` is the compact desktop version; `menu` is the roomy phone-menu version.
 */
export async function AuthLinks({ variant }: { variant: "bar" | "menu" }) {
  // Depends on the visitor's session, so it is never prerendered.
  await connection();
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return (
      <Link
        href="/login"
        className={`bg-foreground text-background hover:bg-foreground/90 flex items-center gap-2 rounded-lg font-medium ${focus} ${
          variant === "bar" ? "h-9 px-3.5 text-sm" : "h-11 justify-center px-4 text-base"
        }`}
      >
        <LogInIcon size={variant === "bar" ? 16 : 18} />
        Sign in
      </Link>
    );
  }

  const { data: student } = await client
    .from("students")
    .select("full_name, role")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  const isAdmin = student?.role === "admin";
  const name = student?.full_name ?? user.email ?? "You";
  const mark = initials(student?.full_name ?? user.email?.split("@")[0] ?? "You");

  const avatar = (
    <span
      aria-hidden="true"
      className="numeral flex size-7 items-center justify-center rounded-full text-sm leading-none font-extrabold text-[#0b0f17]"
      style={{ background: "var(--board-dsa)" }}
    >
      {mark}
    </span>
  );

  if (variant === "bar") {
    return (
      <>
        {isAdmin && (
          <Link
            href="/admin"
            className={`text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] flex h-9 items-center rounded-lg px-3 text-sm font-medium ${focus}`}
          >
            Admin
          </Link>
        )}
        <Link
          href="/profile"
          title="My profile"
          className={`border-border hover:bg-foreground/[0.06] flex h-9 items-center gap-2 rounded-full border py-1 pr-3.5 pl-1 text-sm font-medium ${focus}`}
        >
          {avatar}
          <span className="max-w-[9rem] truncate">{name.split(" ")[0]}</span>
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            aria-label="Sign out"
            title="Sign out"
            className={`text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-lg p-2 ${focus}`}
          >
            <LogOutIcon size={20} />
          </button>
        </form>
      </>
    );
  }

  return (
    <>
      {isAdmin && (
        <Link
          href="/admin"
          className={`hover:bg-foreground/[0.06] flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium ${focus}`}
        >
          Admin
        </Link>
      )}
      <Link
        href="/profile"
        className={`hover:bg-foreground/[0.06] flex items-center gap-3 rounded-lg px-3 py-2.5 ${focus}`}
      >
        {avatar}
        <span className="flex min-w-0 flex-col">
          <span className="truncate text-base font-medium">{name}</span>
          <span className="text-muted-foreground text-xs">My profile</span>
        </span>
      </Link>
      <form action="/auth/signout" method="post">
        <button
          type="submit"
          className={`text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-base ${focus}`}
        >
          <LogOutIcon size={20} />
          Sign out
        </button>
      </form>
    </>
  );
}
