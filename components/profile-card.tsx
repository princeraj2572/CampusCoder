import { TierChip } from "@/components/tier-chip";
import { describeUpdated } from "@/lib/boards/format";
import { PLATFORM_NAME, PLATFORM_ORDER, PROFILE_URL } from "@/lib/boards/platform-links";
import type { ProfileAccount, ProfileStudent } from "@/lib/boards/profile-data";
import { DOMAIN_LABELS } from "@/lib/registration/schema";

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className="mt-0.5 text-base font-medium">{children}</dd>
    </div>
  );
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

/** The student's profile card: who they are, everything they registered, and their accounts. */
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
    <section className="border-border bg-foreground/[0.03] flex flex-col gap-6 rounded-xl border p-5 sm:p-6">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
            {student.fullName}
          </h1>
          <TierChip rating={contestRating} />
        </div>
        <p className="text-muted-foreground">
          {[yearLabel, DOMAIN_LABELS[student.primaryDomain]].join(" · ")}
        </p>
        {actions}
      </div>

      <dl className="border-border grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-5 sm:grid-cols-3">
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
              <span className="text-muted-foreground block text-xs font-normal">
                Only you can see this.
              </span>
            </Fact>
            <Fact label="Leaderboards">{student.optOut ? "Hidden" : "Shown"}</Fact>
          </>
        )}
      </dl>

      <div className="border-border flex flex-col gap-2 border-t pt-5">
        <h2 className="text-sm font-medium">Coding accounts</h2>
        <ul className="divide-border divide-y text-sm">
          {connected.map((p) => {
            const a = byPlatform.get(p)!;
            const updated = a.lastUpdated
              ? describeUpdated(new Date(a.lastUpdated), now).text
              : "Not fetched yet";
            return (
              <li
                key={p}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2"
              >
                <span>
                  <span className="text-muted-foreground">{PLATFORM_NAME[p]}</span>{" "}
                  <a
                    href={PROFILE_URL[p](a.username)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    {a.username}
                  </a>
                </span>
                <span className="text-muted-foreground text-xs">{updated}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
