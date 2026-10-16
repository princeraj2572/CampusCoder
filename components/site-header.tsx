"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BranchIcon,
  CloseIcon,
  CodeIcon,
  MenuIcon,
  TrophyIcon,
  UsersIcon,
} from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";

const BOARDS = [
  {
    href: "/leaderboards/problem-solving",
    label: "DSA",
    Icon: CodeIcon,
    color: "var(--board-dsa)",
  },
  {
    href: "/leaderboards/contests",
    label: "Contests",
    Icon: TrophyIcon,
    color: "var(--board-contests)",
  },
  {
    href: "/leaderboards/github",
    label: "GitHub",
    Icon: BranchIcon,
    color: "var(--board-github)",
  },
];

const focus = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";
const idle = "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06]";

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
export function SiteHeader(props: HeaderSlots) {
  return <HeaderView pathname={usePathname()} {...props} />;
}

/** Same header without the active-tab highlight, shown while the path is unknown. */
export function SiteHeaderFallback(props: HeaderSlots) {
  return <HeaderView pathname={null} {...props} />;
}

interface HeaderSlots {
  /** Compact account area for the bar (server-rendered). */
  authBar?: React.ReactNode;
  /** Roomy account area for the phone menu (server-rendered). */
  authMenu?: React.ReactNode;
}

function HeaderView({
  pathname,
  authBar,
  authMenu,
}: HeaderSlots & {
  pathname: string | null;
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
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className={`mr-1 flex items-center gap-2 rounded-md ${focus}`}>
          <Mark />
          <span className="numeral text-xl font-extrabold">CampusCoders</span>
        </Link>

        <nav aria-label="Leaderboards" className="hidden items-center gap-1 md:flex">
          {BOARDS.map(({ href, label, Icon, color }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition-colors ${focus} ${active ? "" : idle}`}
                style={
                  active ? { background: color, color: "var(--on-board)" } : undefined
                }
              >
                <Icon size={16} style={active ? undefined : { color }} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-1.5 md:flex">
          <Link
            href="/students"
            className={`flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium ${focus} ${
              pathname?.startsWith("/students") ? "bg-foreground/10" : idle
            }`}
          >
            <UsersIcon size={16} />
            Students
          </Link>
          <span aria-hidden="true" className="bg-border mx-1 h-6 w-px" />
          {authBar}
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
            className={`text-foreground hover:bg-foreground/10 rounded-lg p-2 ${focus}`}
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-border bg-background border-t md:hidden">
          <nav
            aria-label="Menu"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3"
          >
            {BOARDS.map(({ href, label, Icon, color }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium ${focus} ${active ? "" : idle}`}
                  style={
                    active ? { background: color, color: "var(--on-board)" } : undefined
                  }
                >
                  <Icon size={20} style={active ? undefined : { color }} />
                  {label}
                </Link>
              );
            })}
            <Link
              href="/students"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium ${focus} ${
                pathname?.startsWith("/students") ? "bg-foreground/10" : idle
              }`}
            >
              <UsersIcon size={20} />
              Students
            </Link>
            <div className="border-border my-1 border-t" />
            {authMenu}
          </nav>
        </div>
      )}
    </header>
  );
}
