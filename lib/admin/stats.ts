import { PLATFORM_ORDER } from "@/lib/boards/platform-links";
import { istDate } from "@/lib/refresh/dates";
import type { Domain, Platform } from "@/lib/registration/schema";
import { needsAgreement } from "@/lib/legal";
import { studentYear } from "@/lib/year";

export interface AdminStudentRow {
  id: string;
  admission_year: number;
  year_override: number | null;
  primary_domain: Domain;
  leaderboard_opt_out: boolean;
  is_alumni: boolean;
  role: "student" | "admin";
  created_at: string;
  terms_version: string | null;
}

export interface AdminPlatformRow {
  student_id: string;
  platform: Platform;
  last_updated: string | null;
  fail_count: number;
  last_error: string | null;
  next_attempt_at: string | null;
}

export type YearKey = "1" | "2" | "3" | "4" | "alumni";

export interface AdminSummary {
  students: {
    total: number;
    hidden: number;
    alumni: number;
    admins: number;
    agreed: number;
    notAgreed: number;
  };
  byYear: { key: YearKey; count: number }[];
  byDomain: { domain: Domain; count: number }[];
  /** The last 14 days in IST, oldest first, with zero days included. */
  signups: { date: string; count: number }[];
  platforms: {
    platform: Platform;
    accounts: number;
    fetched: number;
    neverFetched: number;
    failing: number;
  }[];
  refresh: {
    lastUpdated: Date | null;
    /** Accounts never fetched, or not refreshed for STALE_HOURS. */
    stale: number;
    failingTotal: number;
    /** The worst offenders, most failures first. */
    failing: {
      studentId: string;
      platform: Platform;
      failCount: number;
      lastError: string | null;
    }[];
  };
}

export const STALE_HOURS = 6;
const SIGNUP_DAYS = 14;
const FAILING_SHOWN = 10;
const DAY_MS = 86_400_000;
const YEARS: YearKey[] = ["1", "2", "3", "4", "alumni"];

function yearKey(s: AdminStudentRow, now: Date): YearKey {
  if (s.is_alumni) return "alumni";
  const y = studentYear(s.admission_year, now, s.year_override);
  if (y.kind === "alumni") return "alumni";
  if (y.kind === "not-started") return "1";
  return String(y.year) as YearKey;
}

/** The numbers behind the admin page. Pure: rows in, summary out. */
export function summarize(
  input: { students: AdminStudentRow[]; accounts: AdminPlatformRow[] },
  now: Date,
): AdminSummary {
  const { students, accounts } = input;

  const yearCounts = new Map<YearKey, number>(YEARS.map((k) => [k, 0]));
  const domainCounts = new Map<Domain, number>();
  const signupCounts = new Map<string, number>();
  for (const s of students) {
    const k = yearKey(s, now);
    yearCounts.set(k, (yearCounts.get(k) ?? 0) + 1);
    domainCounts.set(s.primary_domain, (domainCounts.get(s.primary_domain) ?? 0) + 1);
    const day = istDate(new Date(s.created_at));
    signupCounts.set(day, (signupCounts.get(day) ?? 0) + 1);
  }

  const signups = Array.from({ length: SIGNUP_DAYS }, (_, i) => {
    const date = istDate(new Date(now.getTime() - (SIGNUP_DAYS - 1 - i) * DAY_MS));
    return { date, count: signupCounts.get(date) ?? 0 };
  });

  const staleBefore = now.getTime() - STALE_HOURS * 3_600_000;
  let lastUpdated: Date | null = null;
  let stale = 0;
  for (const a of accounts) {
    if (!a.last_updated) {
      stale += 1;
      continue;
    }
    const t = new Date(a.last_updated);
    if (!lastUpdated || t > lastUpdated) lastUpdated = t;
    if (t.getTime() < staleBefore) stale += 1;
  }

  const failingAll = accounts
    .filter((a) => a.fail_count > 0)
    .sort((x, y) => y.fail_count - x.fail_count);

  return {
    students: {
      total: students.length,
      hidden: students.filter((s) => s.leaderboard_opt_out).length,
      alumni: students.filter((s) => s.is_alumni).length,
      admins: students.filter((s) => s.role === "admin").length,
      agreed: students.filter((s) => !needsAgreement(s.terms_version)).length,
      notAgreed: students.filter((s) => needsAgreement(s.terms_version)).length,
    },
    byYear: YEARS.map((key) => ({ key, count: yearCounts.get(key) ?? 0 })),
    byDomain: [...domainCounts]
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count),
    signups,
    platforms: PLATFORM_ORDER.map((platform) => {
      const mine = accounts.filter((a) => a.platform === platform);
      return {
        platform,
        accounts: mine.length,
        fetched: mine.filter((a) => a.last_updated).length,
        neverFetched: mine.filter((a) => !a.last_updated).length,
        failing: mine.filter((a) => a.fail_count > 0).length,
      };
    }),
    refresh: {
      lastUpdated,
      stale,
      failingTotal: failingAll.length,
      failing: failingAll.slice(0, FAILING_SHOWN).map((a) => ({
        studentId: a.student_id,
        platform: a.platform,
        failCount: a.fail_count,
        lastError: a.last_error,
      })),
    },
  };
}
