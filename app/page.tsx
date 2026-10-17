import Link from "next/link";
import { Suspense } from "react";
import { LandingCta, LandingCtaFallback } from "@/components/landing-cta";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNav } from "@/components/landing-nav";
import { HeroSkeleton, LiveHero } from "@/components/live-hero";
import { LiveStats } from "@/components/live-stats";
import { ProfileCard } from "@/components/profile-card";
import { DifficultyBar, PercentileGauge, WeeklyBars } from "@/components/row-graphic";
import { StatCards } from "@/components/stat-cards";
import { TierChip } from "@/components/tier-chip";
import { PLATFORM_BRAND } from "@/lib/boards/theme";

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
  { rating: 1300, from: "Under 1400", height: 56 },
  { rating: 1400, from: "1400", height: 80 },
  { rating: 1600, from: "1600", height: 104 },
  { rating: 1800, from: "1800", height: 128 },
  { rating: 2000, from: "2000", height: 152 },
  { rating: 2200, from: "2200", height: 176 },
  { rating: 2400, from: "2400+", height: 200 },
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

const PLATFORMS = [
  { name: "LeetCode", color: PLATFORM_BRAND.leetcode },
  { name: "Codeforces", color: PLATFORM_BRAND.codeforces },
  { name: "CodeChef", color: PLATFORM_BRAND.codechef },
  { name: "GitHub", color: PLATFORM_BRAND.github },
];

const PERKS = [
  {
    color: "var(--board-dsa)",
    title: "Every account in one place",
    text: "LeetCode, Codeforces, CodeChef and GitHub, each in its own colours.",
  },
  {
    color: "var(--board-contests)",
    title: "Your contest story",
    text: "Rating chart, tier and your last contests, with the wins in green.",
  },
  {
    color: "var(--board-github)",
    title: "A year of activity",
    text: "A contribution heatmap, streaks and your most-used languages.",
  },
];

// A fictional student for the showcase. The clock is fixed so this page stays static.
const SAMPLE_NOW = new Date("2026-10-07T10:00:00Z");
const SAMPLE_STUDENT = {
  id: "sample",
  fullName: "Aarav Singh",
  admissionYear: 2024,
  yearOverride: null,
  section: "A",
  primaryDomain: "dsa_cp" as const,
  secondaryDomains: ["web_dev" as const, "ai_ml" as const],
  optOut: false,
  authUserId: null,
  createdAt: "2026-08-12T10:00:00Z",
};
const SAMPLE_ACCOUNTS = [
  { platform: "leetcode", username: "aarav_s", lastUpdated: "2026-10-07T09:46:00Z" },
  { platform: "github", username: "aarav-s", lastUpdated: "2026-10-07T09:46:00Z" },
  { platform: "codeforces", username: "aarav_cf", lastUpdated: "2026-10-07T09:46:00Z" },
];

/** Soft coloured glows behind the hero: the same style and strength as the profile card. */
function Glows() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 [--glow:16%] dark:[--glow:22%]"
      style={{
        backgroundImage: [
          "radial-gradient(45% 75% at 0% 0%, color-mix(in oklab, var(--board-dsa) var(--glow), transparent), transparent 70%)",
          "radial-gradient(45% 75% at 100% 5%, color-mix(in oklab, var(--board-contests) var(--glow), transparent), transparent 70%)",
          "radial-gradient(50% 60% at 55% 100%, color-mix(in oklab, var(--board-github) 12%, transparent), transparent 70%)",
        ].join(", "),
      }}
    />
  );
}

export default function LandingPage() {
  return (
    <>
      <main className="overflow-x-clip">
        <LandingNav />
        {/* Hero */}
        <div className="relative isolate">
          <Glows />
          <section
            id="live"
            className="mx-auto grid w-full max-w-6xl scroll-mt-28 items-center gap-10 px-4 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16"
          >
            <div className="flex flex-col gap-6">
              <p className="border-border bg-background/70 w-fit rounded-full border px-3 py-1 text-sm font-medium backdrop-blur">
                For our department, by our department
              </p>
              <h1 className="numeral text-6xl leading-[0.88] font-extrabold sm:text-7xl lg:text-8xl">
                Code<span style={{ color: "var(--board-dsa)" }}>.</span>
                <br />
                Compete<span style={{ color: "var(--board-contests)" }}>.</span>
                <br />
                Climb<span style={{ color: "var(--board-github)" }}>.</span>
              </h1>
              <p className="text-muted-foreground max-w-lg text-lg">
                CampusCoders ranks the department on DSA, contests and GitHub, straight
                from the platforms you already use. Find your name, chase the people above
                you, and watch your streak grow.
              </p>
              <Suspense fallback={<LandingCtaFallback />}>
                <LandingCta />
              </Suspense>
              <ul
                className="flex flex-wrap items-center gap-2 text-sm"
                aria-label="Pulls data from"
              >
                {PLATFORMS.map((p) => (
                  <li
                    key={p.name}
                    className="border-border bg-background/70 flex items-center gap-2 rounded-full border px-3 py-1 backdrop-blur"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ background: p.color }}
                    />
                    {p.name}
                  </li>
                ))}
              </ul>
            </div>
            <Suspense fallback={<HeroSkeleton />}>
              <LiveHero />
            </Suspense>
          </section>
        </div>

        <Suspense fallback={null}>
          <LiveStats />
        </Suspense>

        {/* Three boards */}
        <section id="boards" className="border-border scroll-mt-28 border-t">
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
                  className="group border-border focus-visible:ring-ring relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-transform [--tint:14%] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none dark:[--tint:22%]"
                  style={{
                    backgroundImage: `linear-gradient(160deg, color-mix(in oklab, ${b.color} var(--tint), var(--background)) 0%, var(--background) 60%)`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1.5"
                    style={{ background: b.color }}
                  />
                  <h3
                    className="numeral text-5xl leading-none font-extrabold"
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

        {/* Profile showcase */}
        <section
          id="profile"
          className="border-border bg-foreground/[0.025] scroll-mt-28 border-t"
        >
          <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div className="flex flex-col gap-6">
              <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
                A profile worth showing off
              </h2>
              <p className="text-muted-foreground max-w-md">
                Sign in once and your whole coding story lives on one page, themed after
                the platforms you use.
              </p>
              <ul className="flex flex-col gap-4">
                {PERKS.map((p) => (
                  <li key={p.title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-8 w-1.5 shrink-0 rounded-full"
                      style={{ background: p.color }}
                    />
                    <span className="flex flex-col">
                      <span className="font-display font-semibold">{p.title}</span>
                      <span className="text-muted-foreground text-sm">{p.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <span className="bg-foreground text-background absolute -top-3 right-3 z-10 rotate-2 rounded-full px-3 py-1 text-xs font-semibold">
                Sample profile
              </span>
              <div className="flex flex-col gap-3">
                <ProfileCard
                  student={SAMPLE_STUDENT}
                  yearLabel="3rd year"
                  contestRating={1890}
                  accounts={SAMPLE_ACCOUNTS}
                  now={SAMPLE_NOW}
                />
                <StatCards
                  items={[
                    { label: "Problems solved", value: 462, color: "var(--board-dsa)" },
                    { label: "Contest rating", value: 1890, color: "var(--tier-blue)" },
                    {
                      label: "GitHub contributions",
                      value: 928,
                      color: "var(--board-github)",
                    },
                    { label: "Best rank", value: "#1", color: "var(--medal-gold)" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tier ladder */}
        <section id="levels" className="border-border scroll-mt-28 border-t">
          <div className="mx-auto grid w-full max-w-6xl items-end gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="flex flex-col gap-2 lg:self-center">
              <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
                Level up your name
              </h2>
              <p className="text-muted-foreground max-w-md">
                Your LeetCode contest rating gives you a colour that follows you across
                every board. Seven steps, from Grey to Red. Which one will you stand on?
              </p>
            </div>

            <ol aria-label="Rating tiers" className="hidden items-end gap-2 sm:flex">
              {TIERS.map((t) => (
                <li key={t.rating} className="flex flex-1 flex-col items-center gap-2">
                  <TierChip rating={t.rating} />
                  <span
                    className="w-full rounded-t-lg"
                    style={{
                      height: t.height,
                      background: `linear-gradient(180deg, var(--tier-${
                        t.rating < 1400
                          ? "grey"
                          : t.rating < 1600
                            ? "green"
                            : t.rating < 1800
                              ? "cyan"
                              : t.rating < 2000
                                ? "blue"
                                : t.rating < 2200
                                  ? "violet"
                                  : t.rating < 2400
                                    ? "orange"
                                    : "red"
                      }), color-mix(in oklab, var(--background) 70%, transparent))`,
                    }}
                  />
                  <span className="numeral text-lg font-extrabold">{t.from}</span>
                </li>
              ))}
            </ol>
            <ol aria-label="Rating tiers" className="grid grid-cols-2 gap-3 sm:hidden">
              {TIERS.map((t) => (
                <li
                  key={t.rating}
                  className="border-border bg-foreground/[0.03] flex flex-col items-start gap-2 rounded-2xl border p-3"
                >
                  <TierChip rating={t.rating} />
                  <span className="numeral text-2xl font-extrabold">{t.from}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* How it works */}
        <section
          id="how"
          className="border-border bg-foreground/[0.025] scroll-mt-28 border-t"
        >
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
            <h2 className="numeral mb-8 text-4xl leading-none font-extrabold sm:text-5xl">
              Up and running in a minute
            </h2>
            <ol className="grid gap-4 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="border-border bg-background flex gap-4 rounded-2xl border p-5"
                >
                  <span
                    className="numeral text-6xl leading-none font-extrabold"
                    style={{
                      color: [
                        "var(--board-dsa)",
                        "var(--board-contests)",
                        "var(--board-github)",
                      ][i],
                    }}
                  >
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
        <section id="privacy" className="border-border scroll-mt-28 border-t">
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
                Hide yourself from the boards, change your details or delete everything,
                any time. Read the{" "}
                <Link
                  href="/privacy"
                  className="text-foreground underline underline-offset-4"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-foreground underline underline-offset-4"
                >
                  Terms
                </Link>
                .
              </li>
            </ul>
          </div>
        </section>

        {/* Closing call to action */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-12 sm:pb-16">
          <div
            className="relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl border border-white/15 bg-[#161616] p-7 text-white [--glow:34%] sm:p-10"
            style={{
              backgroundImage: [
                "radial-gradient(60% 90% at 0% 0%, color-mix(in oklab, var(--board-dsa) var(--glow), transparent), transparent 60%)",
                "radial-gradient(55% 80% at 100% 0%, color-mix(in oklab, var(--board-contests) var(--glow), transparent), transparent 60%)",
                "radial-gradient(60% 80% at 60% 120%, color-mix(in oklab, var(--board-github) var(--glow), transparent), transparent 60%)",
              ].join(", "),
            }}
          >
            <h2 className="numeral max-w-xl text-5xl leading-[0.95] font-extrabold sm:text-6xl">
              Your rank is waiting.
            </h2>
            <p className="max-w-md text-white/75">
              Join the board and find out where you stand. It takes a minute, and the
              first refresh fills in the rest.
            </p>
            <Link
              href="/login"
              className="inline-flex h-10 items-center rounded-lg bg-white px-5 text-sm font-semibold text-[#0b0f17] transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
            >
              Sign in with Google
            </Link>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
