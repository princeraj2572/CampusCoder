"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const BOARDS = [
  { href: "/leaderboards/problem-solving", label: "Problem solving" },
  { href: "/leaderboards/contests", label: "Contests" },
  { href: "/leaderboards/github", label: "GitHub" },
];

const linkClass =
  "rounded-md px-2 py-1 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

/** Reads the current path; must sit inside a Suspense boundary (see SiteHeaderFallback). */
export function SiteHeader() {
  return <HeaderView pathname={usePathname()} />;
}

/** Same header without the active-tab highlight, shown while the path is unknown. */
export function SiteHeaderFallback() {
  return <HeaderView pathname={null} />;
}

function HeaderView({ pathname }: { pathname: string | null }) {
  return (
    <header className="border-border border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
        <Link href="/" className="font-display text-lg font-bold">
          CampusCoders
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
          <Link
            href="/register"
            className={`${linkClass} text-muted-foreground hover:text-foreground`}
          >
            Register
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
