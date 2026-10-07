import { describe, expect, it } from "vitest";
import type { BoardStudent } from "@/lib/boards/build";
import { parseBoardParams } from "@/lib/boards/params";
import { unratedStudents } from "@/lib/boards/unrated";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const TODAY = new Date("2026-10-07T12:00:00+05:30"); // academic start 2026

const metrics = (rating: number | null): MetricsByPlatform => ({
  leetcode: { rating, solved: 10, contests: rating === null ? 0 : 3, extra: {} },
});

const student = (id: string, over: Partial<BoardStudent> = {}): BoardStudent => ({
  id,
  fullName: `Student ${id}`,
  admissionYear: 2025, // 2nd year
  yearOverride: null,
  section: null,
  primaryDomain: "web_dev",
  optOut: false,
  isAlumni: false,
  usernames: { leetcode: id },
  metrics: metrics(null),
  ...over,
});

const view = (query: Record<string, string> = {}) => parseBoardParams(query);

describe("unratedStudents", () => {
  it("lists students without a LeetCode contest rating, sorted by name", () => {
    const list = unratedStudents(
      [
        student("c", { fullName: "Carol" }),
        student("a", { fullName: "alice" }),
        student("b", { fullName: "Bob", metrics: metrics(1700) }),
      ],
      view(),
      TODAY,
    );
    expect(list.map((s) => s.fullName)).toEqual(["alice", "Carol"]);
  });

  it("includes students who have no LeetCode data at all yet", () => {
    const list = unratedStudents([student("a", { metrics: {} })], view(), TODAY);
    expect(list).toHaveLength(1);
  });

  it("never lists hidden students or alumni", () => {
    const list = unratedStudents(
      [student("a", { optOut: true }), student("b", { isAlumni: true }), student("c")],
      view(),
      TODAY,
    );
    expect(list.map((s) => s.id)).toEqual(["c"]);
  });

  it("follows the year, domain and search filters", () => {
    const students = [
      student("a", { fullName: "Asha", admissionYear: 2026 }), // 1st year
      student("b", { fullName: "Bala", admissionYear: 2025, primaryDomain: "ai_ml" }),
      student("c", { fullName: "Chitra", admissionYear: 2025 }),
    ];
    expect(
      unratedStudents(students, view({ year: "1" }), TODAY).map((s) => s.id),
    ).toEqual(["a"]);
    expect(
      unratedStudents(students, view({ domain: "ai_ml" }), TODAY).map((s) => s.id),
    ).toEqual(["b"]);
    expect(
      unratedStudents(students, view({ q: "chit" }), TODAY).map((s) => s.id),
    ).toEqual(["c"]);
  });

  it("is empty when everyone is rated", () => {
    expect(
      unratedStudents([student("a", { metrics: metrics(1500) })], view(), TODAY),
    ).toEqual([]);
  });
});
