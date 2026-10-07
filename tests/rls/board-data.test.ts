import { createClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { loadBoardData } from "@/lib/boards/load";
import { istDate } from "@/lib/refresh/dates";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const service = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, opts);
const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, opts);

const tag = `boardprobe${Date.now()}`;
const NOW = new Date();
let studentId = "";

beforeAll(async () => {
  const { data, error } = await service.rpc("register_student", {
    payload: {
      full_name: "Board Probe",
      admission_year: 2025,
      primary_domain: "ai_ml",
      secondary_domains: [],
      accounts: [{ platform: "leetcode", username: tag }],
    },
  });
  if (error) throw error;
  studentId = data as string;

  const key = { student_id: studentId, platform: "leetcode" };
  const stats = await service.from("platform_stats").insert({
    ...key,
    rating: 1650,
    solved: 12,
    contests: 3,
    extra: { easy: 6, medium: 5, hard: 1 },
  });
  if (stats.error) throw stats.error;
  const weekAgo = istDate(new Date(NOW.getTime() - 7 * 86_400_000));
  const snap = await service.from("daily_snapshots").insert({
    ...key,
    snapshot_date: weekAgo,
    rating: 1600,
    solved: 8,
    contests: 2,
    extra: { easy: 4, medium: 3, hard: 1 },
  });
  if (snap.error) throw snap.error;
});

afterAll(async () => {
  if (studentId) await service.from("students").delete().eq("id", studentId);
});

describe("loadBoardData", () => {
  it("loads students, usernames, current metrics and weights", async () => {
    const data = await loadBoardData(service, NOW);
    const probe = data.students.find((s) => s.id === studentId);
    expect(probe).toMatchObject({
      fullName: "Board Probe",
      admissionYear: 2025,
      primaryDomain: "ai_ml",
      optOut: false,
      isAlumni: false,
      usernames: { leetcode: tag },
    });
    expect(probe?.metrics.leetcode).toMatchObject({
      rating: 1650,
      solved: 12,
      contests: 3,
    });
    expect(data.weights.leetcodeShare).toBe(0.7);
    expect(data.lastUpdated).toBeInstanceOf(Date);
  });

  it("finds the snapshot from about a week ago in the 7-day history", async () => {
    const data = await loadBoardData(service, NOW);
    expect(data.history[7]?.get(studentId)?.leetcode).toMatchObject({
      rating: 1600,
      solved: 8,
    });
    expect(data.history[28]?.get(studentId)).toBeUndefined();
  });

  it("cannot be called by anon", async () => {
    const { error } = await anon.rpc("snapshots_at", { target: "2026-10-01" });
    expect(error).not.toBeNull();
  });
});
