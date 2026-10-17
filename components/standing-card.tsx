import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BOARD_META } from "@/lib/boards/meta";
import type { BoardRanks } from "@/lib/boards/profile-ranks";
import { BOARD_ACCENT } from "@/lib/boards/theme";
import { BOARD_IDS, type BoardId } from "@/lib/scoring/types";

type State =
  | { kind: "signed-out"; next: string }
  | { kind: "unregistered" }
  | { kind: "registered"; ranks: Record<BoardId, BoardRanks>; studentId: string };

const YEAR = ["1st", "2nd", "3rd", "4th"];

/** Where the viewer stands on each board, or an invitation to join. */
export function StandingCard({
  state,
  current,
  className = "",
  compact = false,
}: {
  state: State;
  current: BoardId;
  className?: string;
  /** A slim one-row version for small screens, so the list is not pushed down. */
  compact?: boolean;
}) {
  const shell = `border-border bg-foreground/[0.03] flex flex-col gap-3 rounded-2xl border p-4 ${className}`;

  if (compact) {
    const slim = `border-border bg-foreground/[0.03] flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-2xl border px-3 py-2.5 ${className}`;
    if (state.kind === "signed-out") {
      return (
        <section className={slim}>
          <p className="text-sm">Sign in to see where you rank.</p>
          <Link
            href={`/login?next=${encodeURIComponent(state.next)}`}
            className={buttonVariants({ size: "sm" })}
          >
            Sign in
          </Link>
        </section>
      );
    }
    if (state.kind === "unregistered") {
      return (
        <section className={slim}>
          <p className="text-sm">Add your accounts to get ranked.</p>
          <Link href="/register" className={buttonVariants({ size: "sm" })}>
            Register
          </Link>
        </section>
      );
    }
    return (
      <section className={slim}>
        <h2 className="text-sm font-semibold">Your standing</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {BOARD_IDS.map((board) => {
            const r = state.ranks[board];
            const pick = r.inYear ?? r.overall;
            return (
              <li key={board} className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ background: BOARD_ACCENT[board] }}
                />
                <span
                  className={
                    board === current ? "font-semibold" : "text-muted-foreground"
                  }
                >
                  {BOARD_META[board].title}
                </span>
                <span className="numeral text-base font-extrabold">
                  {pick ? `#${pick.rank}` : "–"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

  if (state.kind === "signed-out") {
    return (
      <section className={shell}>
        <h2 className="font-display text-lg font-semibold">Join the board</h2>
        <p className="text-muted-foreground text-sm">
          Sign in with Google, add your coding accounts, and see where you rank.
        </p>
        <Link
          href={`/login?next=${encodeURIComponent(state.next)}`}
          className={buttonVariants({ className: "w-full" })}
        >
          Sign in with Google
        </Link>
      </section>
    );
  }

  if (state.kind === "unregistered") {
    return (
      <section className={shell}>
        <h2 className="font-display text-lg font-semibold">
          You are not on the board yet
        </h2>
        <p className="text-muted-foreground text-sm">
          Add your LeetCode and GitHub usernames to get ranked.
        </p>
        <Link href="/register" className={buttonVariants({ className: "w-full" })}>
          Register your accounts
        </Link>
      </section>
    );
  }

  return (
    <section className={shell}>
      <h2 className="font-display text-lg font-semibold">Your standing</h2>
      <ul className="flex flex-col gap-2">
        {BOARD_IDS.map((board) => {
          const r = state.ranks[board];
          const pick = r.inYear ?? r.overall;
          const active = board === current;
          return (
            <li
              key={board}
              className="flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5"
              style={
                active
                  ? {
                      background: `color-mix(in oklab, ${BOARD_ACCENT[board]} 14%, transparent)`,
                    }
                  : undefined
              }
            >
              <span className="flex items-center gap-2 text-sm">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ background: BOARD_ACCENT[board] }}
                />
                {BOARD_META[board].title}
              </span>
              <span className="text-right">
                {pick ? (
                  <>
                    <span className="numeral text-2xl font-extrabold">#{pick.rank}</span>
                    <span className="text-muted-foreground block text-xs">
                      of {pick.total}
                      {r.inYear ? ` in ${YEAR[r.inYear.year - 1]} year` : ""}
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-sm">Not ranked</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <Link
        href={`/students/${state.studentId}`}
        className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
      >
        View my profile
      </Link>
    </section>
  );
}
