import Link from "next/link";
import { BoardRow } from "@/components/board-row";
import { HeroPreview } from "@/components/hero-preview";
import { describeUpdated } from "@/lib/boards/format";
import { getLandingSnapshot } from "@/lib/boards/landing";

/** Neutral placeholder while the live board loads, so no invented names ever flash on screen. */
export function HeroSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-foreground/[0.06] h-24 rounded-2xl motion-safe:animate-pulse"
        />
      ))}
    </div>
  );
}

/** The real top of the DSA board. Falls back to a labelled sample only when nobody is ranked yet. */
export async function LiveHero() {
  const snap = await getLandingSnapshot();
  if (snap.rows.length === 0) return <HeroPreview />;

  const now = new Date(snap.nowIso);
  const updated = describeUpdated(
    snap.updatedIso ? new Date(snap.updatedIso) : null,
    now,
  );

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="bg-foreground text-background inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold">
          <span
            aria-hidden="true"
            className="size-2 rounded-full motion-safe:animate-pulse"
            style={{ background: "var(--board-github)" }}
          />
          Live leaderboard
        </span>
        <span className="text-muted-foreground text-xs">{updated.text}</span>
      </div>
      <ol className="flex flex-col gap-3" aria-label="Top of the DSA leaderboard">
        {snap.rows.map((row) => (
          <BoardRow
            key={row.id}
            row={row}
            board="problem-solving"
            improved={false}
            today={now}
            max={snap.max}
          />
        ))}
        {Array.from({ length: Math.max(0, 4 - snap.rows.length) }, (_, i) => (
          <li key={`open-${i}`}>
            <Link
              href="/register"
              className="border-border text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] focus-visible:ring-ring flex items-center gap-3 rounded-2xl border-2 border-dashed px-4 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="numeral flex size-12 shrink-0 items-center justify-center text-3xl font-extrabold opacity-40">
                {snap.rows.length + i + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-foreground font-display font-semibold">
                  Open spot
                </span>
                <span className="text-sm">Register your accounts to claim it</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <Link
        href="/leaderboards/problem-solving"
        className="text-muted-foreground hover:text-foreground mt-3 inline-block text-sm underline underline-offset-4"
      >
        See the full DSA board
      </Link>
    </div>
  );
}
