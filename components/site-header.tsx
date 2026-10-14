"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const BOARDS = [
  { href: "/leaderboards/problem-solving", label: "DSA" },
  { href: "/leaderboards/contests", label: "Contests" },
  { href: "/leaderboards/github", label: "GitHub" },
];

const linkClass =
  "rounded-md px-2 py-1 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/** Three bars, second place on the left and third on the right of the leader. */
function Mark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      aria-hidden="true"
      fill="currentColor"
    >
      <rect x="1" y="9" width="6" height="12" rx="1.5" opacity="0.55" />
      <rect x="8" y="2" width="6" height="19" rx="1.5" />
      <rect x="15" y="13" width="6" height="8" rx="1.5" opacity="0.35" />
    </svg>
  );
}

/** Reads the current path; must sit inside a Suspense boundary (see SiteHeaderFallback). */
export function SiteHeader({ children }: { children?: React.ReactNode }) {
  return <HeaderView pathname={usePathname()}>{children}</HeaderView>;
}

/** Same header without the active-tab highlight, shown while the path is unknown. */
export function SiteHeaderFallback({ children }: { children?: React.ReactNode }) {
  return <HeaderView pathname={null}>{children}</HeaderView>;
}

function HeaderView({
  pathname,
  children,
}: {
  pathname: string | null;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Mark />
          <span className="numeral text-xl font-extrabold">CampusCoders</span>
        </Link>
        <nav aria-label="Leaderboards" className="flex flex-wrap gap-1">
          {BOARDS.map((b) => {
            const active = pathname === b.href;
            return (
              <Link
                key={b.href}
                href={b.href}
                aria-current={active ? "page" : undefined}
                className={`${linkClass} ${active ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                {b.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/students"
            className={`${linkClass} text-muted-foreground hover:text-foreground`}
          >
            Students
          </Link>
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
