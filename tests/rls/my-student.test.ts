import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const opts = { auth: { persistSession: false, autoRefreshToken: false } };
const service = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, opts);
const anon = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, opts);

const tag = `me${Date.now()}`;

type TestUser = { id: string; client: SupabaseClient };

async function makeUser(label: string): Promise<TestUser> {
  const email = `${tag}-${label}@example.test`;
  const password = `Pw-${crypto.randomUUID()}`;
  const created = await service.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (created.error) throw created.error;
  const client = createClient(url, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, opts);
  const signedIn = await client.auth.signInWithPassword({ email, password });
  if (signedIn.error) throw signedIn.error;
  return { id: created.data.user.id, client };
}

const payload = (
  name: string,
  leetcode: string,
  extra: Record<string, unknown> = {},
) => ({
  full_name: name,
  admission_year: 2025,
  primary_domain: "web_dev",
  secondary_domains: [],
  accounts: [
    { platform: "leetcode", username: leetcode },
    { platform: "github", username: `${leetcode}-gh` },
  ],
  ...extra,
});

let a: TestUser;
let b: TestUser;
let aStudentId = "";
let bStudentId = "";

beforeAll(async () => {
  a = await makeUser("a");
  b = await makeUser("b");
});

afterAll(async () => {
  await service
    .from("students")
    .delete()
    .in("auth_user_id", [a?.id, b?.id].filter(Boolean));
  for (const u of [a, b]) if (u) await service.auth.admin.deleteUser(u.id);
});

describe("register_my_student", () => {
  it("refuses a signed-out caller", async () => {
    const { error } = await anon.rpc("register_my_student", {
      payload: payload("Nobody", `${tag}x`),
    });
    expect(error).not.toBeNull();
  });

  it("creates a record linked to the signed-in user", async () => {
    const { data, error } = await a.client.rpc("register_my_student", {
      payload: payload("Alice A", `${tag}a`),
    });
    expect(error).toBeNull();
    aStudentId = data as string;
    const row = await service
      .from("students")
      .select("auth_user_id, role, is_alumni")
      .eq("id", aStudentId)
      .single();
    expect(row.data).toMatchObject({
      auth_user_id: a.id,
      role: "student",
      is_alumni: false,
    });

    const { data: bid, error: bErr } = await b.client.rpc("register_my_student", {
      payload: payload("Bob B", `${tag}b`),
    });
    expect(bErr).toBeNull();
    bStudentId = bid as string;
  });

  it("refuses a second registration for the same account", async () => {
    const { error } = await a.client.rpc("register_my_student", {
      payload: payload("Alice Again", `${tag}a2`),
    });
    expect(error?.code).toBe("23505");
  });

  it("refuses a username that is already taken, ignoring letter case", async () => {
    const c = await makeUser("c");
    try {
      const { error } = await c.client.rpc("register_my_student", {
        payload: payload("Carol C", `${tag}A`.toUpperCase()),
      });
      expect(error?.code).toBe("23505");
    } finally {
      await service.auth.admin.deleteUser(c.id);
    }
  });
});

describe("a signed-in student cannot write tables directly", () => {
  it("cannot make themselves admin", async () => {
    await a.client.from("students").update({ role: "admin" }).eq("id", aStudentId);
    const row = await service
      .from("students")
      .select("role")
      .eq("id", aStudentId)
      .single();
    expect(row.data?.role).toBe("student");
  });
  it("cannot edit another student", async () => {
    await a.client.from("students").update({ full_name: "Hacked" }).eq("id", bStudentId);
    const row = await service
      .from("students")
      .select("full_name")
      .eq("id", bStudentId)
      .single();
    expect(row.data?.full_name).toBe("Bob B");
  });
  it("cannot insert or delete rows directly", async () => {
    const ins = await a.client
      .from("students")
      .insert({ full_name: "Intruder", admission_year: 2025, primary_domain: "other" });
    expect(ins.error).not.toBeNull();
    await a.client.from("students").delete().eq("id", bStudentId);
    const row = await service.from("students").select("id").eq("id", bStudentId);
    expect(row.data).toHaveLength(1);
  });
  it("can still read other students", async () => {
    const { data } = await a.client.from("students").select("id").eq("id", bStudentId);
    expect(data).toHaveLength(1);
  });
});

describe("update_my_student", () => {
  it("updates only the caller's own record and ignores role fields in the payload", async () => {
    const { error } = await a.client.rpc("update_my_student", {
      payload: payload("Alice Updated", `${tag}a`, {
        section: "B",
        primary_domain: "ai_ml",
        secondary_domains: ["dsa_cp"],
        leaderboard_opt_out: true,
        role: "admin",
        is_alumni: true,
      }),
    });
    expect(error).toBeNull();
    const row = await service.from("students").select("*").eq("id", aStudentId).single();
    expect(row.data).toMatchObject({
      full_name: "Alice Updated",
      section: "B",
      primary_domain: "ai_ml",
      secondary_domains: ["dsa_cp"],
      leaderboard_opt_out: true,
      role: "student",
      is_alumni: false,
    });
    const bob = await service
      .from("students")
      .select("full_name")
      .eq("id", bStudentId)
      .single();
    expect(bob.data?.full_name).toBe("Bob B");
  });

  it("keeps stats when the username is unchanged, even with different letter case", async () => {
    await service
      .from("student_platforms")
      .update({ last_updated: new Date().toISOString() })
      .match({ student_id: aStudentId, platform: "leetcode" });
    await service
      .from("platform_stats")
      .upsert({ student_id: aStudentId, platform: "leetcode", solved: 7, extra: {} });
    const { error } = await a.client.rpc("update_my_student", {
      payload: payload("Alice Updated", `${tag}A`),
    });
    expect(error).toBeNull();
    const stats = await service
      .from("platform_stats")
      .select("solved")
      .eq("student_id", aStudentId)
      .eq("platform", "leetcode");
    expect(stats.data).toHaveLength(1);
  });

  it("clears the old stats when a username changes", async () => {
    const { error } = await a.client.rpc("update_my_student", {
      payload: payload("Alice Updated", `${tag}new`),
    });
    expect(error).toBeNull();
    const sp = await service
      .from("student_platforms")
      .select("username")
      .eq("student_id", aStudentId)
      .eq("platform", "leetcode")
      .single();
    expect(sp.data?.username).toBe(`${tag}new`);
    const stats = await service
      .from("platform_stats")
      .select("solved")
      .eq("student_id", aStudentId)
      .eq("platform", "leetcode");
    expect(stats.data).toEqual([]);
  });

  it("adds and removes optional platforms but requires LeetCode and GitHub", async () => {
    const withCf = payload("Alice Updated", `${tag}new`);
    (withCf.accounts as object[]).push({ platform: "codeforces", username: `${tag}cf` });
    expect(
      (await a.client.rpc("update_my_student", { payload: withCf })).error,
    ).toBeNull();
    const added = await service
      .from("student_platforms")
      .select("platform")
      .eq("student_id", aStudentId);
    expect(added.data?.map((r) => r.platform).sort()).toEqual([
      "codeforces",
      "github",
      "leetcode",
    ]);

    expect(
      (
        await a.client.rpc("update_my_student", {
          payload: payload("Alice Updated", `${tag}new`),
        })
      ).error,
    ).toBeNull();
    const removed = await service
      .from("student_platforms")
      .select("platform")
      .eq("student_id", aStudentId);
    expect(removed.data?.map((r) => r.platform).sort()).toEqual(["github", "leetcode"]);

    const missing = payload("Alice Updated", `${tag}new`);
    missing.accounts = missing.accounts.filter((x) => x.platform !== "github");
    expect(
      (await a.client.rpc("update_my_student", { payload: missing })).error?.code,
    ).toBe("22023");
  });

  it("refuses a username belonging to someone else", async () => {
    const { error } = await a.client.rpc("update_my_student", {
      payload: payload("Alice Updated", `${tag}b`),
    });
    expect(error?.code).toBe("23505");
  });

  it("refuses a signed-out caller", async () => {
    const { error } = await anon.rpc("update_my_student", {
      payload: payload("X", `${tag}z`),
    });
    expect(error).not.toBeNull();
  });
});

describe("delete_my_student", () => {
  it("deletes the caller's record and cascades, leaving others alone", async () => {
    await service
      .from("platform_stats")
      .upsert({ student_id: bStudentId, platform: "leetcode", solved: 3, extra: {} });
    const { error } = await b.client.rpc("delete_my_student");
    expect(error).toBeNull();
    expect(
      (await service.from("students").select("id").eq("id", bStudentId)).data,
    ).toEqual([]);
    expect(
      (
        await service
          .from("platform_stats")
          .select("student_id")
          .eq("student_id", bStudentId)
      ).data,
    ).toEqual([]);
    expect(
      (await service.from("students").select("id").eq("id", aStudentId)).data,
    ).toHaveLength(1);
  });
  it("refuses a signed-out caller", async () => {
    expect((await anon.rpc("delete_my_student")).error).not.toBeNull();
  });
});

describe("accept_my_terms", () => {
  it("refuses a signed-out caller", async () => {
    const { error } = await anon.rpc("accept_my_terms", { version: "v-test" });
    expect(error).not.toBeNull();
  });

  it("starts empty for a new record", async () => {
    const row = await service
      .from("students")
      .select("terms_version, terms_accepted_at")
      .eq("id", aStudentId)
      .single();
    expect(row.data).toEqual({ terms_version: null, terms_accepted_at: null });
  });

  it("records the version for the caller only", async () => {
    const { error } = await a.client.rpc("accept_my_terms", { version: "v-test" });
    expect(error).toBeNull();
    const rows = await service
      .from("students")
      .select("id, terms_accepted_at")
      .eq("terms_version", "v-test");
    expect(rows.data?.map((r) => r.id)).toEqual([aStudentId]);
    expect(rows.data?.[0].terms_accepted_at).not.toBeNull();
  });

  it("refuses someone who has not registered", async () => {
    const stranger = await makeUser("stranger");
    const { error } = await stranger.client.rpc("accept_my_terms", { version: "v-test" });
    expect(error?.code).toBe("P0002");
    await service.auth.admin.deleteUser(stranger.id);
  });
});
