import { describe, expect, it } from "vitest";
import { TERMS_VERSION } from "../legal";
import { summarize, type AdminPlatformRow, type AdminStudentRow } from "./stats";

// 8 Oct 2026, 12:00 IST: the 2026-27 year, so admission 2026 = 1st year, 2023 = 4th year.
const NOW = new Date("2026-10-08T06:30:00Z");

const student = (over: Partial<AdminStudentRow> = {}): AdminStudentRow => ({
  id: crypto.randomUUID(),
  admission_year: 2023,
  year_override: null,
  primary_domain: "web_dev",
  leaderboard_opt_out: false,
  is_alumni: false,
  role: "student",
  created_at: "2026-10-08T01:00:00Z",
  terms_version: TERMS_VERSION,
  ...over,
});

const account = (over: Partial<AdminPlatformRow> = {}): AdminPlatformRow => ({
  student_id: "s1",
  platform: "leetcode",
  last_updated: "2026-10-08T06:00:00Z",
  fail_count: 0,
  last_error: null,
  next_attempt_at: null,
  ...over,
});

describe("summarize: students", () => {
  it("counts hidden, alumni, admins and who has agreed to the terms", () => {
    const s = summarize(
      {
        students: [
          student(),
          student({ leaderboard_opt_out: true }),
          student({ is_alumni: true }),
          student({ role: "admin", terms_version: null }),
        ],
        accounts: [],
      },
      NOW,
    );
    expect(s.students).toEqual({
      total: 4,
      hidden: 1,
      alumni: 1,
      admins: 1,
      agreed: 3,
      notAgreed: 1,
    });
  });

  it("is all zeros with nobody registered", () => {
    const s = summarize({ students: [], accounts: [] }, NOW);
    expect(s.students.total).toBe(0);
    expect(s.byDomain).toEqual([]);
    expect(s.refresh.lastUpdated).toBeNull();
  });
});

describe("summarize: by year and domain", () => {
  it("groups by study year with every year listed, alumni last", () => {
    const s = summarize(
      {
        students: [
          student({ admission_year: 2026 }),
          student({ admission_year: 2026 }),
          student({ admission_year: 2023 }),
          student({ admission_year: 2019 }),
          student({ is_alumni: true }),
        ],
        accounts: [],
      },
      NOW,
    );
    expect(s.byYear).toEqual([
      { key: "1", count: 2 },
      { key: "2", count: 0 },
      { key: "3", count: 0 },
      { key: "4", count: 1 },
      { key: "alumni", count: 2 },
    ]);
  });

  it("counts primary domains, biggest first, leaving out empty ones", () => {
    const s = summarize(
      {
        students: [
          student({ primary_domain: "ai_ml" }),
          student({ primary_domain: "web_dev" }),
          student({ primary_domain: "web_dev" }),
        ],
        accounts: [],
      },
      NOW,
    );
    expect(s.byDomain).toEqual([
      { domain: "web_dev", count: 2 },
      { domain: "ai_ml", count: 1 },
    ]);
  });
});

describe("summarize: signups", () => {
  it("gives 14 days ending today in IST, oldest first, with zero days filled", () => {
    const s = summarize(
      {
        students: [
          student({ created_at: "2026-10-08T01:00:00Z" }),
          student({ created_at: "2026-10-08T05:00:00Z" }),
          student({ created_at: "2026-10-05T10:00:00Z" }),
          // 20:00 UTC on the 6th is already the 7th in IST
          student({ created_at: "2026-10-06T20:00:00Z" }),
          student({ created_at: "2026-08-01T10:00:00Z" }),
        ],
        accounts: [],
      },
      NOW,
    );
    expect(s.signups).toHaveLength(14);
    expect(s.signups[0].date).toBe("2026-09-25");
    expect(s.signups[13]).toEqual({ date: "2026-10-08", count: 2 });
    expect(s.signups.find((d) => d.date === "2026-10-07")?.count).toBe(1);
    expect(s.signups.find((d) => d.date === "2026-10-05")?.count).toBe(1);
    expect(s.signups.find((d) => d.date === "2026-10-06")?.count).toBe(0);
    expect(s.signups.reduce((n, d) => n + d.count, 0)).toBe(4);
  });
});

describe("summarize: platforms and refresh", () => {
  it("lists every platform, with accounts, fetched, never fetched and failing", () => {
    const s = summarize(
      {
        students: [],
        accounts: [
          account({ student_id: "a", platform: "leetcode" }),
          account({ student_id: "b", platform: "leetcode", last_updated: null }),
          account({
            student_id: "c",
            platform: "leetcode",
            fail_count: 3,
            last_error: "boom",
          }),
          account({ student_id: "a", platform: "github" }),
        ],
      },
      NOW,
    );
    expect(s.platforms.map((p) => p.platform)).toEqual([
      "leetcode",
      "github",
      "codeforces",
      "codechef",
    ]);
    const lc = s.platforms.find((p) => p.platform === "leetcode")!;
    expect(lc).toMatchObject({ accounts: 3, fetched: 2, neverFetched: 1, failing: 1 });
    expect(s.platforms.find((p) => p.platform === "codechef")).toMatchObject({
      accounts: 0,
      fetched: 0,
      neverFetched: 0,
      failing: 0,
    });
  });

  it("reports the latest refresh, stale accounts and the worst failures first", () => {
    const s = summarize(
      {
        students: [],
        accounts: [
          account({ student_id: "a", last_updated: "2026-10-08T06:20:00Z" }),
          account({ student_id: "b", last_updated: "2026-10-07T01:00:00Z" }),
          account({ student_id: "c", last_updated: null }),
          account({ student_id: "d", fail_count: 2, last_error: "timeout" }),
          account({ student_id: "e", fail_count: 5, last_error: "not found" }),
        ],
      },
      NOW,
    );
    expect(s.refresh.lastUpdated?.toISOString()).toBe("2026-10-08T06:20:00.000Z");
    expect(s.refresh.stale).toBe(2);
    expect(s.refresh.failing.map((f) => [f.studentId, f.failCount])).toEqual([
      ["e", 5],
      ["d", 2],
    ]);
    expect(s.refresh.failing[0].lastError).toBe("not found");
  });

  it("shows at most ten failing accounts", () => {
    const accounts = Array.from({ length: 15 }, (_, i) =>
      account({ student_id: `s${i}`, fail_count: i + 1, last_error: "x" }),
    );
    const s = summarize({ students: [], accounts }, NOW);
    expect(s.refresh.failing).toHaveLength(10);
    expect(s.refresh.failingTotal).toBe(15);
  });
});
