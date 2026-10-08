import { createClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, opts);
const service = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, opts);

const tag = `rlsprobe${Date.now()}`;
const payload = (username: string) => ({
  full_name: "RLS Probe",
  admission_year: 2025,
  primary_domain: "other",
  secondary_domains: [],
  accounts: [{ platform: "leetcode", username }],
});
let probeId = "";

beforeAll(async () => {
  const { data, error } = await service.rpc("register_student", {
    payload: payload(tag),
  });
  if (error) throw error;
  probeId = data as string;
});

afterAll(async () => {
  if (probeId) await service.from("students").delete().eq("id", probeId);
});

const TABLES = [
  "students",
  "platforms",
  "student_platforms",
  "platform_stats",
  "contest_history",
  "daily_snapshots",
  "badges",
  "settings",
];

describe("service role (sanity)", () => {
  it("can read the probe, so the anon checks are not vacuous", async () => {
    const { data, error } = await service.from("students").select("id").eq("id", probeId);
    expect(error).toBeNull();
    expect(data).toHaveLength(1);
  });
});

describe("anon access is denied", () => {
  for (const table of TABLES) {
    it(`cannot read ${table}`, async () => {
      const { data } = await anon.from(table).select("*").limit(1);
      expect(data ?? []).toHaveLength(0);
    });
  }
  it("cannot see the probe student", async () => {
    const { data } = await anon.from("students").select("id").eq("id", probeId);
    expect(data ?? []).toHaveLength(0);
  });
  it("cannot insert a student", async () => {
    const { error } = await anon.from("students").insert({
      full_name: "Intruder",
      admission_year: 2025,
      primary_domain: "other",
    });
    expect(error).not.toBeNull();
  });
  it("cannot call register_student", async () => {
    const { error } = await anon.rpc("register_student", { payload: payload(`${tag}x`) });
    expect(error).not.toBeNull();
  });
});

describe("schema rules", () => {
  it("rejects the same username in a different letter case", async () => {
    const { error } = await service.rpc("register_student", {
      payload: payload(tag.toUpperCase()),
    });
    expect(error?.code).toBe("23505");
  });
  it("rejects more than two secondary domains", async () => {
    const p = {
      ...payload(`${tag}b`),
      secondary_domains: ["ai_ml", "dsa_cp", "web_dev"],
    };
    const { error } = await service.rpc("register_student", { payload: p });
    expect(error).not.toBeNull();
  });
  it("rejects a secondary domain equal to the primary", async () => {
    const p = { ...payload(`${tag}c`), secondary_domains: ["other"] };
    const { error } = await service.rpc("register_student", { payload: p });
    expect(error).not.toBeNull();
  });
  it("rolls back the student when an account insert fails", async () => {
    const p = {
      ...payload(`${tag}d`),
      full_name: "Rollback Probe",
      accounts: [
        { platform: "leetcode", username: `${tag}d` },
        { platform: "nope", username: "x" },
      ],
    };
    const { error } = await service.rpc("register_student", { payload: p });
    expect(error).not.toBeNull();
    const { data } = await service
      .from("students")
      .select("id")
      .eq("full_name", "Rollback Probe");
    expect(data).toHaveLength(0);
  });
});
