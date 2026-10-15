import Link from "next/link";
import { Suspense } from "react";
import { HeroPreview } from "@/components/hero-preview";
import { LandingCta, LandingCtaFallback } from "@/components/landing-cta";
import { DifficultyBar, PercentileGauge, WeeklyBars } from "@/components/row-graphic";
import { TierChip } from "@/components/tier-chip";

const BOARDS = [
  {
    href: "/leaderboards/problem-solving",
    title: "DSA",
    color: "var(--board-dsa)",
    line: "Every easy, medium and hard counts. LeetCode, Codeforces and CodeChef feed one score.",
    graphic: <DifficultyBar easy={120} medium={160} hard={48} />,
  },
  {
    href: "/leaderboards/contests",
    title: "Contests",
    color: "var(--board-contests)",
    line: "LeetCode contest rating, with a tier from Grey to Red and your top percentage.",
    graphic: <PercentileGauge top={14} color="var(--tier-blue)" />,
  },
  {
    href: "/leaderboards/github",
    title: "GitHub",
    color: "var(--board-github)",
    line: "Commits, pull requests and streaks over the last twelve months.",
    graphic: (
      <WeeklyBars
        totals={[3, 6, 4, 9, 7, 12, 8, 5, 11, 14, 10, 16]}
        color="var(--board-github)"
      />
    ),
  },
];

const TIERS = [
  { rating: 1300, from: "Under 1400" },
  { rating: 1400, from: "1400" },
  { rating: 1600, from: "1600" },
  { rating: 1800, from: "1800" },
  { rating: 2000, from: "2000" },
  { rating: 2200, from: "2200" },
  { rating: 2400, from: "2400+" },
];

const STEPS = [
  {
    title: "Sign in with Google",
    text: "One click. No new password, and any Google account works.",
  },
  {
    title: "Add your accounts",
    text: "Your LeetCode and GitHub usernames, plus Codeforces and CodeChef if you use them. We check each one exists.",
  },
  {
    title: "Watch your rank move",
    text: "Scores refresh through the day. Your rank, your year and your streaks update with them.",
  },
];

const PLATFORMS = ["LeetCode", "Codeforces", "CodeChef", "GitHub"];

export default function LandingPage() {
  return (
    <main className="overflow-x-clip">
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-20">
        <div className="flex flex-col gap-6">
          <p className="bg-foreground/[0.06] w-fit rounded-full px-3 py-1 text-sm font-medium">
            For our department, by our department
          </p>
          <h1 className="numeral text-6xl leading-[0.88] font-extrabold sm:text-7xl lg:text-8xl">
            Code.
            <br />
            Compete.
            <br />
            Climb.
          </h1>
          <p className="text-muted-foreground max-w-lg text-lg">
            CampusCoders ranks the department on DSA, contests and GitHub, straight from
            the platforms you already use. Find your name, chase the people above you, and
            watch your streak grow.
          </p>
          <Suspense fallback={<LandingCtaFallback />}>
            <LandingCta />
          </Suspense>
          <ul className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <li className="text-foreground font-medium">Pulls from</li>
            {PLATFORMS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
        <HeroPreview />
      </section>

      {/* Three boards */}
      <section id="boards" className="border-border border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
          <div className="mb-8 flex max-w-xl flex-col gap-2">
            <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
              Three boards, three ways to win
            </h2>
            <p className="text-muted-foreground">
              Strong at problem solving, contests or open source? Each board ranks one
              thing, so everyone has somewhere to shine.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {BOARDS.map((b) => (
              <Link
                key={b.title}
                href={b.href}
                className="group border-border bg-foreground/[0.03] hover:bg-foreground/[0.06] focus-visible:ring-ring relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-colors focus-visible:ring-2 focus-visible:outline-none"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ background: b.color }}
                />
                <h3
                  className="numeral text-4xl leading-none font-extrabold"
                  style={{ color: b.color }}
                >
                  {b.title}
                </h3>
                <p className="text-muted-foreground text-sm">{b.line}</p>
                <div className="mt-auto pt-2">{b.graphic}</div>
                <span className="text-sm font-medium underline-offset-4 group-hover:underline">
                  Open the {b.title} board
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tier ladder */}
      <section className="border-border border-t">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-2">
            <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
              Level up your name
            </h2>
            <p className="text-muted-foreground">
              Your LeetCode contest rating gives you a colour that follows you across
              every board. Seven tiers, from Grey to Red. Which one will you wear?
            </p>
          </div>
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Rating tiers">
            {TIERS.map((t) => (
              <li
                key={t.rating}
                className="border-border bg-foreground/[0.03] flex flex-col items-start gap-2 rounded-xl border p-3"
              >
                <TierChip rating={t.rating} />
                <span className="numeral text-2xl font-extrabold">{t.from}</span>
              </li>
            ))}
            <li className="border-border text-muted-foreground flex flex-col justify-center rounded-xl border-2 border-dashed p-3 text-sm">
              <span className="text-foreground font-display font-semibold">
                Where will you land?
              </span>
              Play a contest to find out.
            </li>
          </ol>
        </div>
      </section>

      {/* How it works */}
      <section className="border-border border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
          <h2 className="numeral mb-8 text-4xl leading-none font-extrabold sm:text-5xl">
            Up and running in a minute
          </h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="border-border bg-foreground/[0.03] flex gap-4 rounded-2xl border p-5"
              >
                <span className="numeral text-6xl leading-none font-extrabold opacity-30">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <p className="text-muted-foreground text-sm">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-border border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
            Your data, your call
          </h2>
          <ul className="text-muted-foreground flex flex-col gap-3">
            <li>
              <span className="text-foreground font-medium">What is public.</span> The
              leaderboards show your name, year, domain and scores. Profiles with your
              account details need a sign-in.
            </li>
            <li>
              <span className="text-foreground font-medium">What stays private.</span>{" "}
              Your Google email is only ever shown to you.
            </li>
            <li>
              <span className="text-foreground font-medium">You are in control.</span>{" "}
              Hide yourself from the boards, change your details or delete everything, any
              time.
            </li>
          </ul>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:pb-16">
        <div className="bg-foreground text-background relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl p-7 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 flex h-full gap-1 opacity-90"
          >
            <span className="w-3 sm:w-4" style={{ background: "var(--board-dsa)" }} />
            <span
              className="w-3 sm:w-4"
              style={{ background: "var(--board-contests)" }}
            />
            <span className="w-3 sm:w-4" style={{ background: "var(--board-github)" }} />
          </div>
          <h2 className="numeral max-w-xl text-5xl leading-[0.95] font-extrabold sm:text-6xl">
            Your rank is waiting.
          </h2>
          <p className="max-w-md opacity-80">
            Join the board and find out where you stand. It takes a minute, and the first
            refresh fills in the rest.
          </p>
          <Link
            href="/login"
            className="bg-background text-foreground hover:bg-background/90 focus-visible:ring-ring inline-flex h-10 items-center rounded-lg px-5 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
          >
            Sign in with Google
          </Link>
        </div>
      </section>

      <footer className="border-border border-t">
        <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm">
          <span>CampusCoders</span>
          <nav aria-label="Footer" className="flex flex-wrap gap-4">
            <Link href="/leaderboards/problem-solving" className="hover:text-foreground">
              DSA
            </Link>
            <Link href="/leaderboards/contests" className="hover:text-foreground">
              Contests
            </Link>
            <Link href="/leaderboards/github" className="hover:text-foreground">
              GitHub
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
