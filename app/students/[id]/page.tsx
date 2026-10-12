import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Heatmap, TrendChart } from "@/components/charts";
import { TierChip } from "@/components/tier-chip";
import { ratingTier } from "@/lib/scoring/tier";
import { describeUpdated } from "@/lib/boards/format";
import { toActivityLevels } from "@/lib/boards/heatmap";
import { loadBoardData } from "@/lib/boards/load";
import { loadProfileExtras } from "@/lib/boards/profile-data";
import { profileRanks, type BoardRanks } from "@/lib/boards/profile-ranks";
import { DOMAIN_LABELS, type Platform } from "@/lib/registration/schema";
import { num } from "@/lib/scoring/types";
import { createServiceClient } from "@/lib/supabase/service";
import { isAnonRegistrationEnabled } from "@/lib/temp-anon/flag";
import { studentYear } from "@/lib/year";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const PROFILE_URL: Record<Platform, (u: string) => string> = {
  leetcode: (u) => `https://leetcode.com/u/${u}/`,
  github: (u) => `https://github.com/${u}`,
  codeforces: (u) => `https://codeforces.com/profile/${u}`,
  codechef: (u) => `https://www.codechef.com/users/${u}`,
};
const PLATFORM_NAME: Record<Platform, string> = {
  leetcode: "LeetCode",
  github: "GitHub",
  codeforces: "Codeforces",
  codechef: "CodeChef",
};

function RankBlock({ ranks, hidden }: { ranks: BoardRanks; hidden: boolean }) {
  if (hidden)
    return <p className="text-muted-foreground text-sm">Hidden from leaderboards</p>;
  if (!ranks.overall)
    return <p className="text-muted-foreground text-sm">Not ranked yet</p>;
  return (
    <div className="flex flex-col gap-2">
      {ranks.inYear && (
        <p>
          <span className="numeral text-7xl leading-none font-extrabold">
            {ranks.inYear.rank}
          </span>
          <span className="text-muted-foreground block text-sm">
            of {ranks.inYear.total} in{" "}
            {["1st", "2nd", "3rd", "4th"][ranks.inYear.year - 1]} year
          </span>
        </p>
      )}
      <p>
        <span className="numeral text-3xl leading-none font-extrabold">
          {ranks.overall.rank}
        </span>
        <span className="text-muted-foreground block text-sm">
          of {ranks.overall.total} overall
        </span>
      </p>
    </div>
  );
}

function Lane({
  title,
  ranks,
  hidden,
  children,
}: {
  title: string;
  ranks: BoardRanks;
  hidden: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border grid gap-6 border-t py-8 md:grid-cols-[11rem_1fr]">
      <div className="flex flex-col gap-3">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <RankBlock ranks={ranks} hidden={hidden} />
      </div>
      <div className="flex min-w-0 flex-col gap-6">{children}</div>
    </section>
  );
}

function Facts({ items }: { items: [string, string | number][] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt className="text-muted-foreground text-sm">{label}</dt>
          <dd className="numeral text-3xl font-bold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

const days = (n: number) => `${n} ${n === 1 ? "day" : "days"}`;

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  if (!isAnonRegistrationEnabled()) notFound();
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const now = new Date();
  const client = createServiceClient();
  const [data, extras] = await Promise.all([
    loadBoardData(client, now),
    loadProfileExtras(client, id, now),
  ]);
  const student = extras.student;
  if (!student) notFound();

  const board = data.students.find((s) => s.id === id);
  const m = board?.metrics ?? {};
  const ranks = profileRanks(data, id, now);
  const hidden = student.optOut;
  const y = studentYear(student.admissionYear, now, student.yearOverride);
  const yearLabel =
    y.kind === "active"
      ? `${["1st", "2nd", "3rd", "4th"][y.year - 1]} year`
      : y.kind === "alumni"
        ? "Alumni"
        : "Not started";
  const updated = describeUpdated(data.lastUpdated, now);

  // Problems solved over time, summed across platforms, one point per day.
  const solvedByDay = new Map<string, number>();
  for (const s of extras.snapshots) {
    if (["leetcode", "codeforces", "codechef"].includes(s.platform)) {
      solvedByDay.set(s.date, (solvedByDay.get(s.date) ?? 0) + num(s.solved));
    }
  }
  const solvedPoints = [...solvedByDay].map(([date, value]) => ({ date, value }));

  const lc = m.leetcode;
  const gh = m.github?.extra;
  const easy = num(lc?.extra.easy);
  const medium = num(lc?.extra.medium);
  const hard = num(lc?.extra.hard);
  const lcTotal = easy + medium + hard;
  const languages =
    (gh?.languages as { name: string; repos: number }[] | undefined) ?? [];
  const maxRepos = Math.max(1, ...languages.map((l) => l.repos));
  const ranksSeen = extras.contests
    .map((c) => c.rank)
    .filter((r): r is number => r !== null && r > 0);
  const bestFinish = ranksSeen.length ? Math.min(...ranksSeen) : null;
  const topPercentage =
    typeof lc?.extra.top_percentage === "number"
      ? (lc.extra.top_percentage as number)
      : null;
  const contestPoints = extras.contests
    .filter((c) => c.ratingAfter !== null)
    .map((c) => ({ date: c.contestDate, value: c.ratingAfter as number }));

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col px-4 py-8">
      <header className="flex flex-col gap-3 pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
            {student.fullName}
          </h1>
          <TierChip rating={lc?.rating} />
        </div>
        <p className="text-muted-foreground">
          {[
            yearLabel,
            DOMAIN_LABELS[student.primaryDomain],
            ...student.secondaryDomains.map((d) => DOMAIN_LABELS[d]),
            student.section ? `Section ${student.section}` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {(Object.keys(PROFILE_URL) as Platform[])
            .filter((p) => board?.usernames[p])
            .map((p) => (
              <li key={p}>
                <a
                  href={PROFILE_URL[p](board!.usernames[p]!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {PLATFORM_NAME[p]}: {board!.usernames[p]}
                </a>
              </li>
            ))}
        </ul>
      </header>

      <Lane title="Problem solving" ranks={ranks["problem-solving"]} hidden={hidden}>
        {!lc && !m.codeforces && !m.codechef ? (
          <Empty>No problem-solving data yet. It appears after the next refresh.</Empty>
        ) : (
          <>
            <Facts
              items={[
                ["LeetCode solved", num(lc?.solved)],
                ["Codeforces solved", num(m.codeforces?.solved)],
                ["CodeChef solved", num(m.codechef?.solved)],
                ["LeetCode global rank", num(lc?.extra.problem_rank) || "–"],
              ]}
            />
            {lcTotal > 0 && (
              <div className="flex flex-col gap-2">
                <div
                  className="flex h-3 w-full overflow-hidden rounded-full"
                  role="img"
                  aria-label={`LeetCode: ${easy} easy, ${medium} medium, ${hard} hard`}
                >
                  <div
                    style={{
                      width: `${(easy / lcTotal) * 100}%`,
                      background: "var(--success)",
                    }}
                  />
                  <div
                    style={{
                      width: `${(medium / lcTotal) * 100}%`,
                      background: "var(--warning)",
                    }}
                  />
                  <div
                    style={{
                      width: `${(hard / lcTotal) * 100}%`,
                      background: "var(--danger)",
                    }}
                  />
                </div>
                <p className="text-muted-foreground text-sm tabular-nums">
                  {easy} easy · {medium} medium · {hard} hard
                </p>
              </div>
            )}
            {solvedPoints.length >= 2 ? (
              <TrendChart points={solvedPoints} label="Problems solved" />
            ) : (
              <Empty>The growth chart appears after a few days of daily snapshots.</Empty>
            )}
          </>
        )}
      </Lane>

      <Lane title="Contests" ranks={ranks.contests} hidden={hidden}>
        {typeof lc?.rating !== "number" ? (
          <Empty>
            No LeetCode contest rating yet. It appears after the first contest.
          </Empty>
        ) : (
          <>
            <Facts
              items={[
                ["Rating", lc.rating],
                ["Contests", num(lc.contests)],
                ["Top percentage", topPercentage === null ? "–" : `${topPercentage}%`],
                ["Best finish", bestFinish === null ? "–" : bestFinish],
              ]}
            />
            {contestPoints.length >= 2 ? (
              <TrendChart
                points={contestPoints}
                label="Contest rating"
                color={`var(--tier-${ratingTier(lc.rating).key})`}
              />
            ) : (
              <Empty>The rating chart needs at least two contests.</Empty>
            )}
            {extras.contests.length > 0 && (
              <ul className="divide-border divide-y text-sm">
                {[...extras.contests]
                  .reverse()
                  .slice(0, 5)
                  .map((c) => (
                    <li
                      key={c.contestName + c.contestDate}
                      className="flex justify-between gap-4 py-2"
                    >
                      <span className="truncate">{c.contestName}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {c.rank !== null ? `rank ${c.rank}` : ""}
                        {c.ratingChange !== null && (
                          <span
                            className={
                              c.ratingChange >= 0 ? "text-success" : "text-danger"
                            }
                          >
                            {" "}
                            {c.ratingChange >= 0 ? "+" : ""}
                            {c.ratingChange}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </Lane>

      <Lane title="GitHub" ranks={ranks.github} hidden={hidden}>
        {!gh ? (
          <Empty>No GitHub data yet. It appears after the next refresh.</Empty>
        ) : (
          <>
            <Facts
              items={[
                ["Contributions (12 months)", num(gh.contributions_12m)],
                ["Active days", num(gh.active_days)],
                ["Current streak", days(num(gh.current_streak))],
                ["Longest streak", days(num(gh.longest_streak))],
                ["Commits", num(gh.commits)],
                ["Pull requests", num(gh.pull_requests)],
                ["Reviews", num(gh.reviews)],
                ["Merged PRs to others", num(gh.merged_prs_external)],
              ]}
            />
            <Heatmap
              data={toActivityLevels((gh.daily as [string, number][] | undefined) ?? [])}
            />
            {languages.length > 0 && (
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Top languages</h3>
                <ul className="flex flex-col gap-1.5">
                  {languages.map((l) => (
                    <li key={l.name} className="flex items-center gap-3 text-sm">
                      <span className="w-28 shrink-0 truncate">{l.name}</span>
                      <span
                        className="bg-foreground h-2 rounded-full"
                        style={{ width: `${(l.repos / maxRepos) * 60}%` }}
                      />
                      <span className="text-muted-foreground tabular-nums">
                        {l.repos} {l.repos === 1 ? "repo" : "repos"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </Lane>

      <p
        className={`border-border border-t pt-4 text-xs ${updated.stale ? "text-warning" : "text-muted-foreground"}`}
      >
        {updated.text} ·{" "}
        <Link
          href="/leaderboards/problem-solving"
          className="underline underline-offset-4"
        >
          Back to leaderboards
        </Link>
      </p>
    </main>
  );
}
