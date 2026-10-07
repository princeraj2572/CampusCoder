import type { Metadata } from "next";
import { connection } from "next/server";
import { DB_LIMIT_BYTES, loadAdminData } from "@/lib/admin/load";
import { requireAdmin } from "@/lib/admin/guard";
import { describeUpdated } from "@/lib/boards/format";
import { PLATFORM_NAME } from "@/lib/boards/platform-links";
import { PLATFORM_BRAND } from "@/lib/boards/theme";
import { DOMAIN_LABELS } from "@/lib/registration/schema";
import { createServiceClient } from "@/lib/supabase/service";

export const metadata: Metadata = {
  title: "Admin · CampusCoders",
  robots: { index: false, follow: false },
};

const YEAR_TITLES = {
  "1": "1st year",
  "2": "2nd year",
  "3": "3rd year",
  "4": "4th year",
  alumni: "Alumni",
} as const;

const mb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

function Card({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string | number;
  note?: string;
  color: string;
}) {
  return (
    <div
      className="border-border relative flex flex-col gap-1 overflow-hidden rounded-2xl border p-4 pt-5"
      style={{ backgroundColor: `color-mix(in oklab, ${color} 10%, var(--background))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: color }}
      />
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd className="numeral text-4xl leading-none font-extrabold" style={{ color }}>
        {value}
      </dd>
      {note && <p className="text-muted-foreground text-xs">{note}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border flex flex-col gap-4 rounded-2xl border p-5">
      <h2 className="numeral text-3xl leading-none font-extrabold">{title}</h2>
      {children}
    </section>
  );
}

function Bars({
  rows,
  color,
}: {
  rows: { label: string; count: number }[];
  color: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  if (rows.every((r) => r.count === 0)) {
    return <p className="text-muted-foreground text-sm">Nobody yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-3 text-sm">
          <span className="w-36 shrink-0 truncate">{r.label}</span>
          <span className="bg-foreground/[0.06] h-3 flex-1 overflow-hidden rounded-full">
            <span
              className="block h-full rounded-full"
              style={{ width: `${(r.count / max) * 100}%`, background: color }}
            />
          </span>
          <span className="w-8 text-right tabular-nums">{r.count}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function AdminPage() {
  // Depends on the visitor's session and live data, so it is rendered at request time.
  await connection();
  await requireAdmin();
  const now = new Date();
  const data = await loadAdminData(createServiceClient(), now);
  const { summary, db, authUsers, names } = data;
  const refreshed = describeUpdated(summary.refresh.lastUpdated, now);
  const totalAccounts = summary.platforms.reduce((n, p) => n + p.accounts, 0);
  const sizePct = db.sizeBytes === null ? 0 : (db.sizeBytes / DB_LIMIT_BYTES) * 100;
  const signupMax = Math.max(1, ...summary.signups.map((d) => d.count));

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 lg:py-8">
      <header className="flex flex-col gap-2">
        <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
          Admin
        </h1>
        <p className="text-muted-foreground text-sm">
          Database status, student totals and activity. Only admins can see this page.
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card
          label="Students"
          value={summary.students.total}
          note={`${summary.students.hidden} hidden · ${summary.students.alumni} alumni`}
          color="var(--board-dsa)"
        />
        <Card
          label="Coding accounts"
          value={totalAccounts}
          note={`${summary.refresh.failingTotal} failing`}
          color="var(--board-github)"
        />
        <Card
          label="Database"
          value={db.sizeBytes === null ? "–" : mb(db.sizeBytes)}
          note={
            db.sizeBytes === null
              ? "Add the size function to see this"
              : `${sizePct.toFixed(1)}% of 500 MB`
          }
          color="var(--board-contests)"
        />
        <Card
          label="Last refresh"
          value={
            summary.refresh.lastUpdated ? refreshed.text.replace("Updated ", "") : "–"
          }
          note={`${summary.refresh.stale} accounts overdue`}
          color="var(--brand-codeforces)"
        />
      </dl>

      <div className="grid gap-6 lg:grid-cols-2">
        <Section title="Database">
          <p className="flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ background: db.ok ? "var(--board-github)" : "var(--danger)" }}
            />
            {db.ok ? "Reachable" : "Not reachable"} · loaded in {db.latencyMs} ms
          </p>
          {db.sizeBytes !== null && (
            <div className="flex flex-col gap-1.5">
              <span className="bg-foreground/[0.06] h-3 overflow-hidden rounded-full">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${Math.min(100, sizePct)}%`,
                    background: sizePct > 80 ? "var(--danger)" : "var(--board-contests)",
                  }}
                />
              </span>
              <p className="text-muted-foreground text-xs">
                {mb(db.sizeBytes)} used of 500 MB (free plan)
              </p>
            </div>
          )}
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-left">
                <th className="py-1 font-normal">Table</th>
                <th className="py-1 text-right font-normal">Rows</th>
              </tr>
            </thead>
            <tbody>
              {db.tables.map((t) => (
                <tr key={t.table} className="border-border border-t">
                  <td className="py-1.5">{t.table}</td>
                  <td className="py-1.5 text-right tabular-nums">
                    {t.rows.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Sign-ups, last 14 days">
          <div
            className="flex h-32 items-end gap-1.5"
            role="img"
            aria-label={`Sign-ups per day, ${summary.signups.reduce((n, d) => n + d.count, 0)} in total`}
          >
            {summary.signups.map((d) => (
              <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-muted-foreground text-[10px] tabular-nums">
                  {d.count || ""}
                </span>
                <span
                  className="w-full rounded-t"
                  title={`${d.date}: ${d.count}`}
                  style={{
                    height: `${Math.max(d.count ? 8 : 2, (d.count / signupMax) * 80)}px`,
                    background: d.count ? "var(--board-dsa)" : "var(--border)",
                  }}
                />
              </div>
            ))}
          </div>
          <p className="text-muted-foreground flex justify-between text-xs">
            <span>{summary.signups[0].date}</span>
            <span>{summary.signups[summary.signups.length - 1].date}</span>
          </p>
        </Section>

        <Section title="Students by year">
          <Bars
            rows={summary.byYear.map((y) => ({
              label: YEAR_TITLES[y.key],
              count: y.count,
            }))}
            color="var(--board-contests)"
          />
        </Section>

        <Section title="Students by domain">
          <Bars
            rows={summary.byDomain.map((d) => ({
              label: DOMAIN_LABELS[d.domain],
              count: d.count,
            }))}
            color="var(--board-github)"
          />
        </Section>

        <Section title="Platforms">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground text-left">
                <th className="py-1 font-normal">Platform</th>
                <th className="py-1 text-right font-normal">Accounts</th>
                <th className="py-1 text-right font-normal">Fetched</th>
                <th className="py-1 text-right font-normal">Waiting</th>
                <th className="py-1 text-right font-normal">Failing</th>
              </tr>
            </thead>
            <tbody>
              {summary.platforms.map((p) => (
                <tr key={p.platform} className="border-border border-t">
                  <td className="flex items-center gap-2 py-1.5">
                    <span
                      aria-hidden="true"
                      className="size-2 rounded-full"
                      style={{ background: PLATFORM_BRAND[p.platform] }}
                    />
                    {PLATFORM_NAME[p.platform]}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{p.accounts}</td>
                  <td className="py-1.5 text-right tabular-nums">{p.fetched}</td>
                  <td className="py-1.5 text-right tabular-nums">{p.neverFetched}</td>
                  <td
                    className="py-1.5 text-right tabular-nums"
                    style={p.failing ? { color: "var(--danger)" } : undefined}
                  >
                    {p.failing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Refresh health">
          <p className="text-sm">
            {summary.refresh.lastUpdated
              ? `${refreshed.text}.`
              : "Nothing has been refreshed yet."}{" "}
            {summary.refresh.stale === 0
              ? "No account is overdue."
              : `${summary.refresh.stale} ${summary.refresh.stale === 1 ? "account is" : "accounts are"} overdue (never fetched or older than 6 hours).`}
          </p>
          {summary.refresh.failing.length === 0 ? (
            <p className="text-muted-foreground text-sm">No account is failing.</p>
          ) : (
            <ul className="flex flex-col gap-2 text-sm">
              {summary.refresh.failing.map((f) => (
                <li
                  key={`${f.studentId}-${f.platform}`}
                  className="border-border rounded-lg border p-3"
                >
                  <p className="font-medium">
                    {names[f.studentId] ?? "Unknown"} · {PLATFORM_NAME[f.platform]}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Failed {f.failCount} {f.failCount === 1 ? "time" : "times"}
                    {f.lastError ? `: ${f.lastError}` : ""}
                  </p>
                </li>
              ))}
              {summary.refresh.failingTotal > summary.refresh.failing.length && (
                <li className="text-muted-foreground text-xs">
                  and {summary.refresh.failingTotal - summary.refresh.failing.length} more
                </li>
              )}
            </ul>
          )}
        </Section>

        <Section title="Accounts and agreement">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Google sign-ins</dt>
              <dd className="numeral text-3xl font-extrabold">{authUsers.total}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Not registered yet</dt>
              <dd className="numeral text-3xl font-extrabold">
                {authUsers.unregistered.length}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Agreed to the terms</dt>
              <dd className="numeral text-3xl font-extrabold">
                {summary.students.agreed}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Still to agree</dt>
              <dd className="numeral text-3xl font-extrabold">
                {summary.students.notAgreed}
              </dd>
            </div>
          </dl>
          {authUsers.unregistered.length > 0 && (
            <ul className="text-muted-foreground flex flex-col gap-1 text-xs">
              {authUsers.unregistered.map((u) => (
                <li key={u.email}>
                  {u.email} · signed in {u.createdAt.slice(0, 10)}
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </main>
  );
}
