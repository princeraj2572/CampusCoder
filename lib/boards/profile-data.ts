import type { SupabaseClient } from "@supabase/supabase-js";
import type { Domain } from "@/lib/registration/schema";

export interface ProfileStudent {
  id: string;
  fullName: string;
  admissionYear: number;
  yearOverride: number | null;
  section: string | null;
  primaryDomain: Domain;
  secondaryDomains: Domain[];
  optOut: boolean;
  authUserId: string | null;
}

export interface ProfileContest {
  contestName: string;
  contestDate: string;
  rank: number | null;
  ratingAfter: number | null;
  ratingChange: number | null;
}

export interface ProfileSnapshot {
  date: string;
  platform: string;
  solved: number | null;
  rating: number | null;
}

export interface ProfileExtras {
  student: ProfileStudent | null;
  contests: ProfileContest[]; // oldest first, most recent 15
  snapshots: ProfileSnapshot[]; // oldest first, last 90 days
}

const DAY_MS = 86_400_000;

export async function loadProfileExtras(
  client: SupabaseClient,
  studentId: string,
  now: Date,
): Promise<ProfileExtras> {
  const since = new Date(now.getTime() - 90 * DAY_MS).toISOString().slice(0, 10);
  const [student, contests, snapshots] = await Promise.all([
    client
      .from("students")
      .select(
        "id, auth_user_id, full_name, admission_year, year_override, section, primary_domain, secondary_domains, leaderboard_opt_out",
      )
      .eq("id", studentId)
      .maybeSingle(),
    client
      .from("contest_history")
      .select("contest_name, contest_date, rank, rating_after, rating_change")
      .eq("student_id", studentId)
      .order("contest_date", { ascending: false })
      .limit(15),
    client
      .from("daily_snapshots")
      .select("snapshot_date, platform, solved, rating")
      .eq("student_id", studentId)
      .gte("snapshot_date", since)
      .order("snapshot_date", { ascending: true }),
  ]);
  for (const r of [student, contests, snapshots]) {
    if (r.error) throw new Error(r.error.message);
  }

  const s = student.data;
  return {
    student: s
      ? {
          id: s.id,
          fullName: s.full_name,
          admissionYear: s.admission_year,
          yearOverride: s.year_override,
          section: s.section,
          primaryDomain: s.primary_domain,
          secondaryDomains: s.secondary_domains ?? [],
          optOut: s.leaderboard_opt_out,
          authUserId: s.auth_user_id,
        }
      : null,
    contests: (contests.data ?? [])
      .map((c) => ({
        contestName: c.contest_name ?? "",
        contestDate: c.contest_date,
        rank: c.rank,
        ratingAfter: c.rating_after,
        ratingChange: c.rating_change,
      }))
      .reverse(),
    snapshots: (snapshots.data ?? []).map((r) => ({
      date: r.snapshot_date,
      platform: r.platform,
      solved: r.solved,
      rating: r.rating,
    })),
  };
}
