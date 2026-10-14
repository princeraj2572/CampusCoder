"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const BOARDS = [
  { href: "/leaderboards/problem-solving", label: "DSA" },
  { href: "/leaderboards/contests", label: "Contests" },
  { href: "/leaderboards/github", label: "GitHub" },
];

const focus = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const linkClass = `rounded-md px-3 py-1.5 text-sm ${focus}`;
const idle = "text-muted-foreground hover:text-foreground";

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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
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
  /** The sign-in or profile links; rendered once in the bar and once in the phone menu. */
  children?: React.ReactNode;
}) {
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = pathname !== null && openFor === pathname;

  return (
    <header
      className="border-border bg-background/85 sticky top-0 z-20 border-b backdrop-blur"
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpenFor(null);
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className={`flex items-center gap-2 rounded-md ${focus}`}>
          <Mark />
          <span className="numeral text-xl font-extrabold">CampusCoders</span>
        </Link>

        <nav aria-label="Leaderboards" className="hidden items-center gap-1 md:flex">
          {BOARDS.map((b) => {
            const active = pathname === b.href;
            return (
              <Link
                key={b.href}
                href={b.href}
                aria-current={active ? "page" : undefined}
                className={`${linkClass} ${active ? "bg-foreground text-background font-medium" : idle}`}
              >
                {b.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <Link href="/students" className={`${linkClass} ${idle}`}>
            Students
          </Link>
          {children}
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenFor(open ? null : pathname)}
            disabled={pathname === null}
            className={`text-foreground hover:bg-foreground/10 rounded-md p-2 ${focus}`}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-border bg-background border-t md:hidden">
          <nav
            aria-label="Menu"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 [&_a]:block [&_a]:px-3 [&_a]:py-2.5 [&_a]:text-base [&_button]:block [&_button]:w-full [&_button]:px-3 [&_button]:py-2.5 [&_button]:text-left [&_button]:text-base"
          >
            {BOARDS.map((b) => {
              const active = pathname === b.href;
              return (
                <Link
                  key={b.href}
                  href={b.href}
                  aria-current={active ? "page" : undefined}
                  className={`${linkClass} ${active ? "bg-foreground text-background font-medium" : idle}`}
                >
                  {b.label}
                </Link>
              );
            })}
            <Link href="/students" className={`${linkClass} ${idle}`}>
              Students
            </Link>
            <div className="border-border my-1 border-t" />
            {children}
          </nav>
        </div>
      )}
    </header>
  );
}
