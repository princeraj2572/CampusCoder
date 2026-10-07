import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { StudentCard } from "@/components/student-card";
import { Button } from "@/components/ui/button";
import { groupDirectory, type SectionKey } from "@/lib/boards/directory";
import { loadStudentDirectory } from "@/lib/boards/load";
import { parseBoardParams } from "@/lib/boards/params";
import { DOMAIN_LABELS, DOMAIN_VALUES } from "@/lib/registration/schema";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Students · CampusCoders" };

// One colour per year, from the platform palette.
const ACCENT: Record<SectionKey, string> = {
  "1": "var(--brand-codeforces)",
  "2": "var(--board-contests)",
  "3": "var(--board-dsa)",
  "4": "var(--board-github)",
  alumni: "var(--muted-foreground)",
};

const fieldClass =
  "border-input bg-background h-9 rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const view = parseBoardParams(await searchParams);
  const now = new Date();
  const students = await loadStudentDirectory(await createClient());
  const sections = groupDirectory(students, { q: view.q, domain: view.domain }, now);
  const shown = sections.reduce((n, s) => n + s.students.length, 0);
  const filtered = Boolean(view.q || view.domain);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 lg:py-8">
      <header className="mb-5 flex flex-col gap-2">
        <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
          Students
        </h1>
        <span aria-hidden="true" className="flex h-1.5 w-24 overflow-hidden rounded-full">
          <span className="flex-1" style={{ background: ACCENT["1"] }} />
          <span className="flex-1" style={{ background: ACCENT["2"] }} />
          <span className="flex-1" style={{ background: ACCENT["3"] }} />
          <span className="flex-1" style={{ background: ACCENT["4"] }} />
        </span>
        <p className="text-muted-foreground text-sm">
          {students.length === 0
            ? "Nobody has registered yet."
            : `${students.length} ${students.length === 1 ? "student" : "students"} in the department, grouped by year.`}
        </p>
      </header>

      <form method="get" action="/students" className="mb-5 flex flex-wrap gap-2">
        <input
          type="search"
          name="q"
          aria-label="Search by name, username or section"
          defaultValue={view.q ?? ""}
          placeholder="Search by name, username or section"
          maxLength={60}
          className={`${fieldClass} w-full min-w-48 flex-1`}
        />
        <select
          name="domain"
          aria-label="Domain"
          defaultValue={view.domain ?? ""}
          className={`${fieldClass} w-full sm:w-auto`}
        >
          <option value="">Any domain</option>
          {DOMAIN_VALUES.map((d) => (
            <option key={d} value={d}>
              {DOMAIN_LABELS[d]}
            </option>
          ))}
        </select>
        <Button type="submit">Apply</Button>
        {filtered && (
          <Link
            href="/students"
            className="text-muted-foreground hover:text-foreground flex items-center px-1 text-sm underline underline-offset-4"
          >
            Clear
          </Link>
        )}
      </form>

      {sections.length > 1 && (
        <nav aria-label="Jump to a year" className="mb-6 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.key}
              href={`#year-${s.key}`}
              className="border-border hover:bg-foreground/[0.06] focus-visible:ring-ring flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ background: ACCENT[s.key] }}
              />
              {s.title}
              <span className="text-muted-foreground tabular-nums">
                {s.students.length}
              </span>
            </a>
          ))}
        </nav>
      )}

      {shown === 0 ? (
        <div className="border-border rounded-xl border border-dashed p-6 text-sm">
          {filtered ? (
            <p>
              No one matches that search.{" "}
              <Link href="/students" className="underline underline-offset-4">
                Clear the filters
              </Link>
            </p>
          ) : (
            <p>
              No one has registered yet.{" "}
              <Link href="/register" className="underline underline-offset-4">
                Add your accounts to appear here.
              </Link>
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section
              key={s.key}
              id={`year-${s.key}`}
              aria-labelledby={`heading-${s.key}`}
              className="scroll-mt-20"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-8 w-1.5 rounded-full"
                  style={{ background: ACCENT[s.key] }}
                />
                <h2
                  id={`heading-${s.key}`}
                  className="numeral text-3xl leading-none font-extrabold"
                >
                  {s.title}
                </h2>
                <span className="bg-foreground/[0.06] rounded-full px-2.5 py-0.5 text-sm font-medium tabular-nums">
                  {s.students.length}
                </span>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {s.students.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    accent={ACCENT[s.key]}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
