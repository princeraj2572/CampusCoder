import Link from "next/link";

const link =
  "hover:text-foreground focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none";

/** A small footer for the landing page only: credit, and the legal pages. */
export function LandingFooter() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-4 text-xs">
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
        <nav aria-label="Legal" className="flex gap-4">
          <Link href="/privacy" className={link}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={link}>
            Terms and Conditions
          </Link>
        </nav>
      </div>
    </footer>
  );
}
