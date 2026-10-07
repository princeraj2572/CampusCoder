import type { SupabaseClient } from "@supabase/supabase-js";
import { fetchAll } from "@/lib/boards/load";
import {
  summarize,
  type AdminPlatformRow,
  type AdminStudentRow,
  type AdminSummary,
} from "./stats";

const TABLES = [
  "students",
  "student_platforms",
  "platform_stats",
  "contest_history",
  "daily_snapshots",
] as const;

/** The free plan's database limit, for the size meter. */
export const DB_LIMIT_BYTES = 500 * 1024 * 1024;

type StudentWithName = AdminStudentRow & {
  full_name: string;
  auth_user_id: string | null;
};

export interface AdminData {
  summary: AdminSummary;
  names: Record<string, string>;
  db: {
    ok: boolean;
    latencyMs: number;
    /** Null when the size function has not been added to the database yet. */
    sizeBytes: number | null;
    tables: { table: string; rows: number }[];
  };
  authUsers: {
    total: number;
    /** Signed in with Google but never registered. */
    unregistered: { email: string; createdAt: string }[];
  };
}

async function countRows(client: SupabaseClient, table: string): Promise<number> {
  const { count, error } = await client
    .from(table)
    .select("*", { count: "exact", head: true });
  if (error) throw new Error(`${table}: ${error.message}`);
  return count ?? 0;
}

/** Everything the admin page shows. Server only: it uses the service-role client. */
export async function loadAdminData(
  client: SupabaseClient,
  now: Date,
): Promise<AdminData> {
  const started = Date.now();
  const [students, accounts, counts, size, authList] = await Promise.all([
    fetchAll<StudentWithName>((from, to) =>
      client
        .from("students")
        .select(
          "id, full_name, auth_user_id, admission_year, year_override, primary_domain, leaderboard_opt_out, is_alumni, role, created_at, terms_version",
        )
        .order("id")
        .range(from, to),
    ),
    fetchAll<AdminPlatformRow>((from, to) =>
      client
        .from("student_platforms")
        .select(
          "student_id, platform, last_updated, fail_count, last_error, next_attempt_at",
        )
        .order("student_id")
        .order("platform")
        .range(from, to),
    ),
    Promise.all(TABLES.map((table) => countRows(client, table))),
    client.rpc("db_size_bytes"),
    client.auth.admin.listUsers({ page: 1, perPage: 1000 }),
  ]);
  const latencyMs = Date.now() - started;

  const registeredAuthIds = new Set(
    students.map((s) => s.auth_user_id).filter((id): id is string => Boolean(id)),
  );
  const users = authList.data?.users ?? [];

  return {
    summary: summarize({ students, accounts }, now),
    names: Object.fromEntries(students.map((s) => [s.id, s.full_name])),
    db: {
      ok: true,
      latencyMs,
      sizeBytes: size.error ? null : Number(size.data),
      tables: TABLES.map((table, i) => ({ table, rows: counts[i] })),
    },
    authUsers: {
      total: users.length,
      unregistered: users
        .filter((u) => !registeredAuthIds.has(u.id))
        .map((u) => ({ email: u.email ?? "(no email)", createdAt: u.created_at })),
    },
  };
}
