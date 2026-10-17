import { TierChip } from "@/components/tier-chip";
import { describeUpdated } from "@/lib/boards/format";
import { PLATFORM_NAME, PLATFORM_ORDER, PROFILE_URL } from "@/lib/boards/platform-links";
import type { ProfileAccount, ProfileStudent } from "@/lib/boards/profile-data";
import { PLATFORM_BRAND } from "@/lib/boards/theme";
import { DOMAIN_LABELS } from "@/lib/registration/schema";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

/** Up to two initials for the monogram. */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-sm text-black/55 dark:text-white/55">{label}</dt>
      <dd className="mt-0.5 text-base font-medium">{children}</dd>
    </div>
  );
}

function Chip({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <li className="flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-sm font-medium backdrop-blur dark:border-white/20 dark:bg-white/10">
      <span
        aria-hidden="true"
        className="size-2 rounded-full"
        style={{ background: color }}
      />
      {children}
    </li>
  );
}

/** The student's profile card: a dark, layered card with their details and coding accounts. */
export function ProfileCard({
  student,
  yearLabel,
  contestRating,
  accounts,
  now,
  ownerEmail,
  actions,
}: {
  student: ProfileStudent;
  yearLabel: string;
  contestRating: number | null | undefined;
  accounts: ProfileAccount[];
  now: Date;
  /** Only passed to the student themselves; nobody else sees an email. */
  ownerEmail?: string | null;
  actions?: React.ReactNode;
}) {
  const byPlatform = new Map(accounts.map((a) => [a.platform, a]));
  const connected = PLATFORM_ORDER.filter((p) => byPlatform.has(p));

  return (
    <section className="relative isolate overflow-hidden rounded-3xl border border-black/10 bg-white p-6 text-[#0f1623] shadow-[0_24px_60px_-30px_rgba(15,22,35,0.35)] sm:p-8 dark:border-white/15 dark:bg-[#161616] dark:text-white dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]">
      <div className="flex flex-wrap items-start gap-5">
        <span
          aria-hidden="true"
          className="numeral flex size-20 shrink-0 items-center justify-center rounded-2xl text-4xl leading-none font-extrabold text-[#0b0f17] ring-2 ring-white/40 sm:size-24 sm:text-5xl"
          style={{ background: "var(--board-dsa)" }}
        >
          {initials(student.fullName)}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
              {student.fullName}
            </h1>
            <span className="rounded-full p-0.5 empty:hidden dark:bg-white/90">
              <TierChip rating={contestRating} />
            </span>
          </div>
          <ul className="flex flex-wrap gap-2">
            <Chip color="var(--board-dsa)">{yearLabel}</Chip>
            <Chip color="var(--board-contests)">
              {DOMAIN_LABELS[student.primaryDomain]}
            </Chip>
            {student.secondaryDomains.map((d) => (
              <Chip key={d} color="var(--board-github)">
                {DOMAIN_LABELS[d]}
              </Chip>
            ))}
          </ul>
          {actions}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-black/10 pt-6 sm:grid-cols-3 dark:border-white/10">
        <Fact label="Year">{yearLabel}</Fact>
        <Fact label="Joined">{student.admissionYear}</Fact>
        <Fact label="Section">{student.section || "–"}</Fact>
        <Fact label="Primary domain">{DOMAIN_LABELS[student.primaryDomain]}</Fact>
        <Fact label="Secondary domains">
          {student.secondaryDomains.length > 0
            ? student.secondaryDomains.map((d) => DOMAIN_LABELS[d]).join(", ")
            : "None"}
        </Fact>
        <Fact label="Registered">{formatDate(student.createdAt)}</Fact>
        {ownerEmail !== undefined && (
          <>
            <Fact label="Google account">
              {ownerEmail ?? "–"}
              <span className="block text-xs font-normal text-black/50 dark:text-white/50">
                Only you can see this.
              </span>
            </Fact>
            <Fact label="Leaderboards">{student.optOut ? "Hidden" : "Shown"}</Fact>
          </>
        )}
      </dl>

      <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 dark:border-white/10">
        <h2 className="text-sm font-medium text-black/65 dark:text-white/70">
          Coding accounts
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {connected.map((p) => {
            const a = byPlatform.get(p)!;
            const brand = PLATFORM_BRAND[p];
            const updated = a.lastUpdated
              ? describeUpdated(new Date(a.lastUpdated), now).text
              : "Not fetched yet";
            return (
              <li
                key={p}
                className="relative flex flex-col gap-0.5 overflow-hidden rounded-xl border bg-black/[0.03] py-3 pr-4 pl-5 backdrop-blur dark:bg-white/[0.06]"
                style={{ borderColor: `color-mix(in oklab, ${brand} 55%, transparent)` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1.5"
                  style={{ background: brand }}
                />
                <span className="text-sm font-semibold" style={{ color: brand }}>
                  {PLATFORM_NAME[p]}
                </span>
                <a
                  href={PROFILE_URL[p](a.username)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-base font-medium underline-offset-4 hover:underline"
                >
                  {a.username}
                </a>
                <span className="text-xs text-black/50 dark:text-white/50">
                  {updated}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
