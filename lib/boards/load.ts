import type { SupabaseClient } from "@supabase/supabase-js";
import type { Domain, Platform } from "@/lib/registration/schema";
import { istDate } from "@/lib/refresh/dates";
import {
  DEFAULT_WEIGHTS,
  parseWeights,
  type ScoreWeights,
} from "@/lib/scoring/problem-solving";
import type { MetricsByPlatform, PlatformMetrics } from "@/lib/scoring/types";
import type { BoardStudent, History } from "./build";

export interface BoardData {
  students: BoardStudent[];
  weights: ScoreWeights;
  history: History;
  /** Most recent time any stat was refreshed; null when nothing has been fetched yet. */
  lastUpdated: Date | null;
}

export const HISTORY_OFFSETS = [7, 14, 21, 28, 30];
const PAGE = 1000;
const DAY_MS = 86_400_000;

type Page<T> = PromiseLike<{ data: T[] | null; error: { message: string } | null }>;

/** PostgREST returns at most 1000 rows per request, so read in pages. */
async function fetchAll<T>(page: (from: number, to: number) => Page<T>): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await page(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

type StatLike = {
  student_id: string;
  platform: string;
  rating: number | null;
  solved: number | null;
  extra: Record<string, unknown> | null;
};

const toMetrics = (r: StatLike): PlatformMetrics => ({
  rating: r.rating,
  solved: r.solved,
  extra: r.extra ?? {},
});

export async function loadBoardData(
  client: SupabaseClient,
  now: Date,
): Promise<BoardData> {
  const [students, platforms, stats, settings, ...snapshots] = await Promise.all([
    fetchAll<{
      id: string;
      full_name: string;
      admission_year: number;
      year_override: number | null;
      section: string | null;
      primary_domain: Domain;
      leaderboard_opt_out: boolean;
      is_alumni: boolean;
    }>((from, to) =>
      client
        .from("students")
        .select(
          "id, full_name, admission_year, year_override, section, primary_domain, leaderboard_opt_out, is_alumni",
        )
        .order("id")
        .range(from, to),
    ),
    fetchAll<{ student_id: string; platform: Platform; username: string }>((from, to) =>
      client
        .from("student_platforms")
        .select("student_id, platform, username")
        .order("student_id")
        .order("platform")
        .range(from, to),
    ),
    fetchAll<StatLike & { last_updated: string }>((from, to) =>
      client
        .from("platform_stats")
        .select("student_id, platform, rating, solved, extra, last_updated")
        .order("student_id")
        .order("platform")
        .range(from, to),
    ),
    client.from("settings").select("value").eq("key", "score_weights").maybeSingle(),
    ...HISTORY_OFFSETS.map((days) =>
      fetchAll<StatLike>((from, to) =>
        client
          .rpc("snapshots_at", {
            target: istDate(new Date(now.getTime() - days * DAY_MS)),
          })
          .order("student_id")
          .order("platform")
          .range(from, to),
      ),
    ),
  ]);

  const usernames = new Map<string, Partial<Record<Platform, string>>>();
  for (const p of platforms) {
    usernames.set(p.student_id, {
      ...usernames.get(p.student_id),
      [p.platform]: p.username,
    });
  }
  const metrics = new Map<string, MetricsByPlatform>();
  let lastUpdated: Date | null = null;
  for (const s of stats) {
    metrics.set(s.student_id, {
      ...metrics.get(s.student_id),
      [s.platform]: toMetrics(s),
    });
    const t = new Date(s.last_updated);
    if (!lastUpdated || t > lastUpdated) lastUpdated = t;
  }

  const history: History = {};
  HISTORY_OFFSETS.forEach((days, i) => {
    const byStudent = new Map<string, MetricsByPlatform>();
    for (const row of snapshots[i]) {
      byStudent.set(row.student_id, {
        ...byStudent.get(row.student_id),
        [row.platform]: toMetrics(row),
      });
    }
    history[days] = byStudent;
  });

  return {
    students: students.map((s): BoardStudent => ({
      id: s.id,
      fullName: s.full_name,
      admissionYear: s.admission_year,
      yearOverride: s.year_override,
      section: s.section,
      primaryDomain: s.primary_domain,
      optOut: s.leaderboard_opt_out,
      isAlumni: s.is_alumni,
      usernames: usernames.get(s.id) ?? {},
      metrics: metrics.get(s.id) ?? {},
    })),
    weights: settings.data ? parseWeights(settings.data.value) : DEFAULT_WEIGHTS,
    history,
    lastUpdated,
  };
}
