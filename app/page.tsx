import Link from "next/link";
import { Suspense } from "react";
import { Climb } from "@/components/climb";
import { LandingCta, LandingCtaFallback } from "@/components/landing-cta";
import { LandingFooter } from "@/components/landing-footer";
import { LandingNav } from "@/components/landing-nav";
import { HeroSkeleton, LiveHero } from "@/components/live-hero";
import { LiveStats } from "@/components/live-stats";
import { ProfileCard } from "@/components/profile-card";
import { DifficultyBar, PercentileGauge, WeeklyBars } from "@/components/row-graphic";
import { StatCards } from "@/components/stat-cards";
import { buttonVariants } from "@/components/ui/button";
import { PLATFORM_BRAND } from "@/lib/boards/theme";

const BOARDS = [
  {
    href: "/leaderboards/problem-solving",
    title: "DSA",
    color: "var(--board-dsa)",
    learn: { label: "Learn DSA", href: "/roadmap/dsa" },
    line: "Every easy, medium and hard counts. LeetCode, Codeforces and CodeChef feed one score.",
    graphic: <DifficultyBar easy={120} medium={160} hard={48} />,
  },
  {
    href: "/leaderboards/contests",
    title: "Contests",
    color: "var(--board-contests)",
    learn: { label: "Practise for contests", href: "/roadmap/dsa" },
    line: "LeetCode contest rating, with a tier from Grey to Red and your top percentage.",
    graphic: <PercentileGauge top={14} color="var(--tier-blue)" />,
  },
  {
    href: "/leaderboards/github",
    title: "GitHub",
    color: "var(--board-github)",
    learn: { label: "Start with open source", href: "/roadmap/open-source" },
    line: "Commits, pull requests and streaks over the last twelve months.",
    graphic: (
      <WeeklyBars
        totals={[3, 6, 4, 9, 7, 12, 8, 5, 11, 14, 10, 16]}
        color="var(--board-github)"
      />
    ),
  },
];

const ROADMAP_TOPICS = [
  {
    href: "/roadmap",
    title: "Start here",
    color: "var(--board-dsa)",
    text: "The order to learn things in, with a plan for your first weeks.",
  },
  {
    href: "/roadmap/dsa",
    title: "DSA",
    color: "var(--board-contests)",
    text: "Striver, NeetCode and how to practise so it sticks.",
  },
  {
    href: "/roadmap/roles",
    title: "Roles and jobs",
    color: "var(--board-github)",
    text: "14 roles, from backend to UI/UX design: what to study and build for each.",
  },
  {
    href: "/roadmap/ai",
    title: "Learning with AI",
    color: "var(--board-dsa)",
    text: "Use AI to learn faster without skipping the basics, and build with it.",
  },
  {
    href: "/roadmap/project-ideas",
    title: "Project ideas",
    color: "var(--board-contests)",
    text: "Beginner to advanced ideas, and how to finish them.",
  },
  {
    href: "/roadmap/interview-qa",
    title: "Interview Q&A",
    color: "var(--board-github)",
    text: "About 50 common questions with short answers.",
  },
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

const USERNAMES = [
  {
    name: "LeetCode",
    color: PLATFORM_BRAND.leetcode,
    need: "Needed",
    where:
      "Open your profile. Your username is the last part of the address: leetcode.com/u/yourname.",
  },
  {
    name: "GitHub",
    color: PLATFORM_BRAND.github,
    need: "Needed",
    where: "Your username is in your profile address: github.com/yourname.",
  },
  {
    name: "Codeforces",
    color: PLATFORM_BRAND.codeforces,
    need: "Optional",
    where: "Your handle is in your profile address: codeforces.com/profile/yourname.",
  },
  {
    name: "CodeChef",
    color: PLATFORM_BRAND.codechef,
    need: "Optional",
    where: "Your username is in your profile address: codechef.com/users/yourname.",
  },
];

const SCORES = [
  {
    title: "DSA",
    color: "var(--board-dsa)",
    text: "Problems you have solved. Harder ones count more, and LeetCode makes up most of the score, with Codeforces and CodeChef adding the rest.",
  },
  {
    title: "Contests",
    color: "var(--board-contests)",
    text: "Your LeetCode contest rating. You get one after solving at least one problem in a rated contest, so new students start unrated.",
  },
  {
    title: "GitHub",
    color: "var(--board-github)",
    text: "Your public contributions over the last 12 months: commits, pull requests and more.",
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

export default function LandingPage() {
  return (
    <>
      <main className="overflow-x-clip">
        <LandingNav />
        {/* Hero */}
        <div className="relative isolate">
          <section
            id="live"
            className="mx-auto grid w-full max-w-6xl scroll-mt-28 items-center gap-10 px-4 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16"
          >
            <div className="flex flex-col gap-6">
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
                className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-1 text-sm"
                aria-label="Pulls data from"
              >
                {PLATFORMS.map((p) => (
                  <li key={p.name} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ background: p.color }}
                    />
                    {p.name}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm">
                Not sure where to start?{" "}
                <Link
                  href="/roadmap"
                  className="text-foreground font-medium underline underline-offset-4"
                >
                  Follow the learning roadmap
                </Link>
              </p>
            </div>
            <Suspense fallback={<HeroSkeleton />}>
              <LiveHero />
            </Suspense>
          </section>
        </div>

        <Suspense fallback={null}>
          <LiveStats />
        </Suspense>

        {/* Boards, each with the roadmap page that improves it */}
        <section id="boards" className="border-border scroll-mt-28 border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
            <div className="mb-8 flex max-w-xl flex-col gap-2">
              <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
                Rank, then improve
              </h2>
              <p className="text-muted-foreground">
                Each board ranks one thing, so everyone has somewhere to shine. Next to
                it, the roadmap page that helps you climb.
              </p>
            </div>
            <ul className="divide-border border-border divide-y border-y">
              {BOARDS.map((b) => (
                <li
                  key={b.title}
                  className="grid items-center gap-x-8 gap-y-4 border-l-4 py-6 pl-5 md:grid-cols-[minmax(0,1fr)_14rem_11rem]"
                  style={{ borderLeftColor: b.color }}
                >
                  <div className="flex flex-col gap-2">
                    <h3
                      className="numeral text-5xl leading-none font-extrabold sm:text-6xl"
                      style={{ color: b.color }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-muted-foreground max-w-md text-sm">{b.line}</p>
                  </div>
                  <div>{b.graphic}</div>
                  <div className="flex flex-col items-start gap-2 text-sm">
                    <Link
                      href={b.href}
                      className="text-foreground font-semibold underline underline-offset-4"
                    >
                      Open the {b.title} board
                    </Link>
                    <Link
                      href={b.learn.href}
                      className="text-muted-foreground hover:text-foreground underline underline-offset-4"
                    >
                      {b.learn.label}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Learning roadmap */}
        <section id="roadmap" className="border-border scroll-mt-28 border-t">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div className="flex flex-col gap-4">
              <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
                Not sure what to learn? Follow the roadmap
              </h2>
              <p className="text-muted-foreground max-w-md">
                A free guide for students: DSA, core subjects, development, open source
                and placements, with a path for each role and free resources for every
                step. No sign-in needed.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/roadmap" className={buttonVariants({ size: "lg" })}>
                  Open the roadmap
                </Link>
                <Link
                  href="/roadmap/roles"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Pick a role
                </Link>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {ROADMAP_TOPICS.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group focus-visible:ring-ring hover:bg-foreground/[0.05] flex h-full flex-col gap-1 border-l-4 py-2 pr-2 pl-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
                    style={{ borderLeftColor: t.color }}
                  >
                    <span className="font-display text-lg font-semibold underline-offset-4 group-hover:underline">
                      {t.title}
                    </span>
                    <span className="text-muted-foreground text-sm">{t.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
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
                    { label: "Best rank", value: "#1", color: "var(--medal-gold-ink)" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* The climb: tiers on the board, with the roadmap steps for each */}
        <section id="levels" className="border-border scroll-mt-28 border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
            <div className="mb-8 flex max-w-xl flex-col gap-2">
              <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
                The climb
              </h2>
              <p className="text-muted-foreground">
                Your LeetCode contest rating gives you a colour on every board. Pick a
                tier to see what it looks like, and what to learn to reach it.
              </p>
            </div>
            <Climb />
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
            <ol className="grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => {
                const color = [
                  "var(--board-dsa)",
                  "var(--board-contests)",
                  "var(--board-github)",
                ][i];
                return (
                  <li
                    key={s.title}
                    className="flex flex-col gap-2 border-t-4 pt-4"
                    style={{ borderTopColor: color }}
                  >
                    <span
                      className="numeral text-5xl leading-none font-extrabold"
                      style={{ color }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                    <p className="text-muted-foreground text-sm">{s.text}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Getting started */}
        <section id="guide" className="border-border scroll-mt-28 border-t">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
            <h2 className="numeral text-4xl leading-none font-extrabold sm:text-5xl">
              New to this? Start here
            </h2>
            <p className="text-muted-foreground mt-3 max-w-prose">
              You do not need to be good at coding contests to join. Add the usernames you
              have, and your scores will appear within a minute.
            </p>

            <h3 className="font-display mt-8 mb-3 text-lg font-semibold">
              Where to find your usernames
            </h3>
            <ul className="divide-border border-border divide-y border-y">
              {USERNAMES.map((u) => (
                <li
                  key={u.name}
                  className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[11rem_minmax(0,1fr)]"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <span
                      aria-hidden="true"
                      className="size-2.5 rounded-full"
                      style={{ background: u.color }}
                    />
                    {u.name}
                    <span className="text-muted-foreground text-xs font-normal">
                      {u.need}
                    </span>
                  </span>
                  <p className="text-muted-foreground text-sm">{u.where}</p>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mt-3 text-sm">
              Type only the username, not the whole link, and keep your profiles public so
              we can read them.
            </p>

            <h3 className="font-display mt-8 mb-3 text-lg font-semibold">
              What the scores mean
            </h3>
            <ul className="grid gap-x-8 gap-y-5 md:grid-cols-3">
              {SCORES.map((sc) => (
                <li
                  key={sc.title}
                  className="flex flex-col gap-1 border-l-4 pl-3"
                  style={{ borderLeftColor: sc.color }}
                >
                  <span className="font-display text-lg font-semibold">{sc.title}</span>
                  <p className="text-muted-foreground text-sm">{sc.text}</p>
                </li>
              ))}
            </ul>
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
          <div className="relative flex flex-col items-start gap-5 overflow-hidden rounded-3xl border border-white/15 bg-[#252628] p-7 text-[#e3e4e6] sm:p-10">
            <h2 className="numeral max-w-xl text-5xl leading-[0.95] font-extrabold sm:text-6xl">
              Your rank is waiting.
            </h2>
            <p className="max-w-md text-[#e3e4e6]/75">
              Join the board and find out where you stand. It takes a minute, and your
              scores appear within a minute after that.
            </p>
            <Link
              href="/login"
              className="inline-flex h-10 items-center rounded-lg bg-[#f1f4f8] px-5 text-sm font-semibold text-[#0b0f17] transition-colors hover:bg-[#f1f4f8]/90 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
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
