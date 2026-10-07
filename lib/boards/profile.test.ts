import { describe, expect, it } from "vitest";
import type { BoardStudent } from "@/lib/boards/build";
import { toActivityLevels } from "@/lib/boards/heatmap";
import { profileRanks } from "@/lib/boards/profile-ranks";
import { DEFAULT_WEIGHTS } from "@/lib/scoring/problem-solving";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const TODAY = new Date("2026-10-07T12:00:00+05:30"); // academic start 2026

const lc = (easy: number, rating: number | null = null): MetricsByPlatform => ({
  leetcode: { rating, solved: easy, extra: { easy, medium: 0, hard: 0 } },
});

const student = (
  id: string,
  admissionYear: number,
  metrics: MetricsByPlatform,
): BoardStudent => ({
  id,
  fullName: id,
  admissionYear,
  yearOverride: null,
  section: null,
  primaryDomain: "web_dev",
  optOut: false,
  isAlumni: false,
  usernames: {},
  metrics,
});

describe("profileRanks", () => {
  const students = [
    student("a", 2025, lc(30, 1900)), // 2nd year
    student("b", 2025, lc(20, null)), // 2nd year, unrated
    student("c", 2024, lc(50, 2100)), // 3rd year
  ];
  const ranks = (id: string, list = students) =>
    profileRanks({ students: list, weights: DEFAULT_WEIGHTS, history: {} }, id, TODAY);

  it("ranks overall and within the student's year", () => {
    const r = ranks("a")["problem-solving"];
    expect(r.overall).toEqual({ rank: 2, total: 3 });
    expect(r.inYear).toEqual({ rank: 1, total: 2, year: 2 });
  });

  it("omits a board the student has no data for", () => {
    const r = ranks("b").contests;
    expect(r.overall).toBeUndefined();
    expect(r.inYear).toBeUndefined();
  });

  it("returns no ranks for opted-out students", () => {
    const list = students.map((s) => (s.id === "a" ? { ...s, optOut: true } : s));
    expect(ranks("a", list)["problem-solving"].overall).toBeUndefined();
  });
});

describe("toActivityLevels", () => {
  it("maps counts to levels 0 to 4 relative to the busiest day", () => {
    const out = toActivityLevels([
      ["2026-01-01", 0],
      ["2026-01-02", 1],
      ["2026-01-03", 5],
      ["2026-01-04", 10],
    ]);
    expect(out.map((d) => d.level)).toEqual([0, 1, 2, 4]);
    expect(out[3]).toEqual({ date: "2026-01-04", count: 10, level: 4 });
  });
  it("does not let one extreme day wash out every other day", () => {
    const out = toActivityLevels([
      ["2026-01-01", 1],
      ["2026-01-02", 2],
      ["2026-01-03", 3],
      ["2026-01-04", 4],
      ["2026-01-05", 100],
    ]);
    expect(out.map((d) => d.level)).toEqual([1, 2, 3, 4, 4]);
  });
  it("gives level 0 everywhere when nothing was contributed", () => {
    expect(toActivityLevels([["2026-01-01", 0]]).map((d) => d.level)).toEqual([0]);
  });
  it("handles an empty calendar", () => {
    expect(toActivityLevels([])).toEqual([]);
  });
});
