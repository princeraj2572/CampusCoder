import Link from "next/link";
import type { BoardStudent } from "@/lib/boards/build";
import { initials } from "@/components/profile-card";
import { TierChip } from "@/components/tier-chip";
import { PLATFORM_NAME, PLATFORM_ORDER } from "@/lib/boards/platform-links";
import { PLATFORM_BRAND } from "@/lib/boards/theme";
import { DOMAIN_LABELS } from "@/lib/registration/schema";
import { ratingTier } from "@/lib/scoring/tier";
import { num } from "@/lib/scoring/types";

function Mini({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="flex flex-col">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="numeral text-xl leading-tight font-bold" style={{ color }}>
        {value}
      </dd>
    </div>
  );
}

/** One student in the directory. The whole card is a link to their profile. */
export function StudentCard({
  student,
  accent,
}: {
  student: BoardStudent;
  accent: string;
}) {
  const m = student.metrics;
  const hasStats = Object.keys(m).length > 0;
  const solved =
    num(m.leetcode?.solved) + num(m.codeforces?.solved) + num(m.codechef?.solved);
  const rating = m.leetcode?.rating;
  const tier = ratingTier(rating ?? null);
  const accounts = PLATFORM_ORDER.filter((p) => student.usernames[p]);

  return (
    <li
      className="group border-border relative flex flex-col gap-3 overflow-hidden rounded-2xl border p-4 transition-transform hover:-translate-y-0.5"
      style={{
        backgroundImage: `linear-gradient(160deg, color-mix(in oklab, ${accent} 12%, var(--background)) 0%, var(--background) 65%)`,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent }}
      />
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="numeral flex size-12 shrink-0 items-center justify-center rounded-xl text-xl leading-none font-extrabold text-[#0b0f17]"
          style={{
            background: `linear-gradient(135deg, color-mix(in oklab, ${accent} 55%, white) 0%, ${accent} 100%)`,
          }}
        >
          {initials(student.fullName)}
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              href={`/students/${student.id}`}
              className="font-display text-base font-semibold break-words after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {student.fullName}
            </Link>
            <TierChip rating={rating} />
          </div>
          <p className="text-muted-foreground text-sm">
            {DOMAIN_LABELS[student.primaryDomain]}
            {student.section ? ` · Section ${student.section}` : ""}
          </p>
        </div>
      </div>

      {hasStats ? (
        <dl className="grid grid-cols-3 gap-2">
          <Mini label="Solved" value={solved} color="var(--board-dsa)" />
          <Mini
            label="Rating"
            value={typeof rating === "number" ? rating : "–"}
            color={
              tier.key === "unrated" ? "var(--board-contests)" : `var(--tier-${tier.key})`
            }
          />
          <Mini
            label="Contributions"
            value={num(m.github?.extra.contributions_12m).toLocaleString("en-IN")}
            color="var(--board-github)"
          />
        </dl>
      ) : (
        <p className="text-muted-foreground text-sm">
          Scores appear after the next refresh.
        </p>
      )}

      {accounts.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Coding accounts">
          {accounts.map((p) => (
            <li
              key={p}
              title={`${PLATFORM_NAME[p]}: ${student.usernames[p]}`}
              className="bg-foreground/[0.05] flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ background: PLATFORM_BRAND[p] }}
              />
              <span className="truncate">{student.usernames[p]}</span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
