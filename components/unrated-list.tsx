import Link from "next/link";
import type { BoardStudent } from "@/lib/boards/build";
import { initials } from "@/components/profile-card";
import { DOMAIN_LABELS } from "@/lib/registration/schema";
import { studentYear } from "@/lib/year";

const ORDINAL = { 1: "1st", 2: "2nd", 3: "3rd", 4: "4th" } as const;

/** Students on the Contests board who have no LeetCode contest rating yet. */
export function UnratedList({
  students,
  today,
  meId,
}: {
  students: BoardStudent[];
  today: Date;
  meId?: string;
}) {
  if (students.length === 0) return null;
  return (
    <section aria-labelledby="unrated-heading" className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h2
            id="unrated-heading"
            className="numeral text-3xl leading-none font-extrabold"
          >
            Not rated yet
          </h2>
          <span className="bg-foreground/[0.06] rounded-full px-2.5 py-0.5 text-sm font-medium tabular-nums">
            {students.length}
          </span>
        </div>
        <p className="text-muted-foreground max-w-prose text-sm">
          These students have no LeetCode contest rating so far. They join the ranking
          after their first rated contest.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {students.map((s) => {
          const y = studentYear(s.admissionYear, today, s.yearOverride);
          const year = y.kind === "active" ? `${ORDINAL[y.year]} year` : null;
          return (
            <li
              key={s.id}
              className="border-border relative flex items-center gap-3 rounded-2xl border p-3"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--board-contests) 8%, var(--background))",
              }}
            >
              <span
                aria-hidden="true"
                className="numeral flex size-11 shrink-0 items-center justify-center rounded-xl text-lg leading-none font-extrabold text-[#0b0f17]"
                style={{ background: "var(--board-contests)" }}
              >
                {initials(s.fullName)}
              </span>
              <div className="flex min-w-0 flex-col">
                <Link
                  href={`/students/${s.id}`}
                  className="font-display truncate text-base font-semibold after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {s.fullName}
                  {s.id === meId ? " (you)" : ""}
                </Link>
                <span className="text-muted-foreground truncate text-sm">
                  {[year, DOMAIN_LABELS[s.primaryDomain]].filter(Boolean).join(" · ")}
                </span>
              </div>
              <span className="text-muted-foreground ml-auto shrink-0 text-xs">
                Unrated
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
