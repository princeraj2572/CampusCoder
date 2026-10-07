import Link from "next/link";

const link =
  "hover:text-foreground focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none";

/** The footer on every page: where to go, and who made it. */
export function SiteFooter() {
  return (
    <footer className="border-border mt-auto border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-6 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-foreground font-display font-semibold">CampusCoders</span>
          <span>
            Developed by{" "}
            <a
              href="https://github.com/princeraj2572"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-foreground font-medium underline underline-offset-4 ${link}`}
            >
              Prince Raj
            </a>
          </span>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/leaderboards/problem-solving" className={link}>
            DSA
          </Link>
          <Link href="/leaderboards/contests" className={link}>
            Contests
          </Link>
          <Link href="/leaderboards/github" className={link}>
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
