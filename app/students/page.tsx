import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { DOMAIN_LABELS, type Domain } from "@/lib/registration/schema";
import { createClient } from "@/lib/supabase/server";
import { studentYear } from "@/lib/year";

type Row = {
  id: string;
  full_name: string;
  admission_year: number;
  section: string | null;
  primary_domain: Domain;
  year_override: number | null;
  student_platforms: { platform: string; username: string }[];
};

function yearLabel(r: Row, today: Date) {
  const y = studentYear(r.admission_year, today, r.year_override);
  if (y.kind === "active") return `${["1st", "2nd", "3rd", "4th"][y.year - 1]} year`;
  return y.kind === "alumni" ? "Alumni" : "Not started";
}

export default async function StudentsPage() {
  await connection();

  const client = await createClient();
  const { data, error } = await client
    .from("students")
    .select(
      "id, full_name, admission_year, section, primary_domain, year_override, student_platforms(platform, username)",
    )
    .order("created_at", { ascending: false });

  const today = new Date();
  const rows = (data ?? []) as Row[];

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <h1 className="font-display text-3xl font-bold">Students</h1>
      {error ? (
        <p role="alert" className="text-danger">
          Could not load students. Refresh the page to try again.
        </p>
      ) : rows.length === 0 ? (
        <p>
          No one has registered yet.{" "}
          <Link href="/register" className="underline underline-offset-4">
            Add your accounts to appear here.
          </Link>
        </p>
      ) : (
        <ul className="divide-border divide-y">
          {rows.map((r) => (
            <li key={r.id} className="flex flex-col gap-1 py-3">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <Link
                  href={`/students/${r.id}`}
                  className="font-display text-lg font-semibold underline-offset-4 hover:underline"
                >
                  {r.full_name}
                </Link>
                <span className="text-muted-foreground text-sm">
                  {yearLabel(r, today)}
                  {r.section ? ` · ${r.section}` : ""} · {DOMAIN_LABELS[r.primary_domain]}
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                {r.student_platforms
                  .map((p) => `${p.platform}: ${p.username}`)
                  .join("   ")}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
