import { createClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { DueRow } from "@/lib/refresh/batch";
import { createSupabaseRefreshDb } from "@/lib/refresh/supabase-db";

const service = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false, autoRefreshToken: false } },
);
const db = createSupabaseRefreshDb(service);

const tag = `refreshprobe${Date.now()}`;
const NOW = new Date("2026-10-07T10:00:00Z");
let studentId = "";
let row: DueRow;

const profile = {
  stats: {
    rating: 1500,
    solved: 42,
    rank: 99,
    contests: 2,
    extra: { commits: 5, daily: [["2026-10-07", 3]] },
  },
  contests: [
    {
      contestId: "c1",
      contestName: "Contest 1",
      contestDate: new Date("2026-09-01T00:00:00Z"),
      rank: 10,
      ratingAfter: 1500,
      ratingChange: 25,
    },
  ],
};

const mine = async (limit: number, at: Date) =>
  (await db.pickDue(limit, at)).filter((r) => r.studentId === studentId);

beforeAll(async () => {
  const { data, error } = await service.rpc("register_student", {
    payload: {
      full_name: "Refresh Probe",
      admission_year: 2025,
      primary_domain: "other",
      secondary_domains: [],
      accounts: [{ platform: "leetcode", username: tag }],
    },
  });
  if (error) throw error;
  studentId = data as string;
  row = { studentId, platform: "leetcode", username: tag, failCount: 0 };
});

afterAll(async () => {
  if (studentId) await service.from("students").delete().eq("id", studentId);
});

describe("supabase refresh db", () => {
  it("picks a never-refreshed row", async () => {
    expect(await mine(1000, NOW)).toHaveLength(1);
  });

  it("saves stats, contest history and a snapshot without the daily calendar", async () => {
    await db.saveSuccess(row, profile, NOW);

    const stats = await service
      .from("platform_stats")
      .select("*")
      .eq("student_id", studentId)
      .single();
    expect(stats.data).toMatchObject({ rating: 1500, solved: 42, rank: 99, contests: 2 });
    expect(stats.data?.extra.daily).toEqual([["2026-10-07", 3]]);

    const contests = await service
      .from("contest_history")
      .select("*")
      .eq("student_id", studentId);
    expect(contests.data).toHaveLength(1);
    expect(contests.data?.[0]).toMatchObject({ contest_id: "c1", rating_change: 25 });

    const snap = await service
      .from("daily_snapshots")
      .select("*")
      .eq("student_id", studentId)
      .single();
    expect(snap.data?.snapshot_date).toBe("2026-10-07");
    expect(snap.data?.extra).toEqual({ commits: 5 });

    const sp = await service
      .from("student_platforms")
      .select("*")
      .eq("student_id", studentId)
      .single();
    expect(sp.data).toMatchObject({
      fail_count: 0,
      last_error: null,
      next_attempt_at: null,
    });
    expect(new Date(sp.data!.last_updated).toISOString()).toBe(NOW.toISOString());
  });

  it("updates in place when saved again on the same day (one snapshot per day)", async () => {
    await db.saveSuccess(
      row,
      { ...profile, stats: { ...profile.stats, solved: 43 } },
      NOW,
    );
    const snaps = await service
      .from("daily_snapshots")
      .select("solved")
      .eq("student_id", studentId);
    expect(snaps.data).toEqual([{ solved: 43 }]);
    const contests = await service
      .from("contest_history")
      .select("id")
      .eq("student_id", studentId);
    expect(contests.data).toHaveLength(1);
  });

  it("keeps the last good stats and does not advance last_updated on failure, then backs off", async () => {
    const later = new Date("2026-10-07T12:00:00Z");
    await db.saveFailure(
      row,
      { kind: "unavailable", message: "rate limited" },
      new Date("2026-10-07T12:15:00Z"),
      later,
    );

    const stats = await service
      .from("platform_stats")
      .select("solved")
      .eq("student_id", studentId)
      .single();
    expect(stats.data?.solved).toBe(43);

    const sp = await service
      .from("student_platforms")
      .select("*")
      .eq("student_id", studentId)
      .single();
    expect(sp.data).toMatchObject({ fail_count: 1, last_error: "rate limited" });
    expect(new Date(sp.data!.last_updated).toISOString()).toBe(NOW.toISOString());

    expect(await mine(1000, later)).toHaveLength(0); // backed off
    expect(await mine(1000, new Date("2026-10-07T12:16:00Z"))).toHaveLength(1); // due again
  });

  it("does not pick alumni", async () => {
    await service.from("students").update({ is_alumni: true }).eq("id", studentId);
    expect(await mine(1000, new Date("2030-01-01T00:00:00Z"))).toHaveLength(0);
    await service.from("students").update({ is_alumni: false }).eq("id", studentId);
    expect(await mine(1000, new Date("2030-01-01T00:00:00Z"))).toHaveLength(1);
  });
});
