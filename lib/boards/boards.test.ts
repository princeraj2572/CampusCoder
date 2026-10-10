import { describe, expect, it } from "vitest";
import { buildBoard, type BoardStudent } from "@/lib/boards/build";
import { filterStudents } from "@/lib/boards/filter";
import { parseBoardParams } from "@/lib/boards/params";
import { movement, rankDescending } from "@/lib/boards/rank";
import { DEFAULT_WEIGHTS } from "@/lib/scoring/problem-solving";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const TODAY = new Date("2026-10-07T12:00:00+05:30"); // academic start 2026

const lc = (
  easy: number,
  medium: number,
  hard: number,
  rating: number | null = null,
): MetricsByPlatform => ({
  leetcode: { rating, solved: easy + medium + hard, extra: { easy, medium, hard } },
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
  usernames: {},
  metrics: lc(10, 0, 0),
  ...over,
});

describe("rankDescending", () => {
  it("ranks by value with ties sharing a rank (1, 2, 2, 4)", () => {
    const ranked = rankDescending([
      { id: "a", value: 10 },
      { id: "b", value: 30 },
      { id: "c", value: 30 },
      { id: "d", value: 5 },
    ]);
    expect(ranked.map((r) => [r.id, r.rank])).toEqual([
      ["b", 1],
      ["c", 1],
      ["a", 3],
      ["d", 4],
    ]);
  });
  it("gives everyone rank 1 when all values are equal", () => {
    const ranked = rankDescending([
      { id: "a", value: 1 },
      { id: "b", value: 1 },
    ]);
    expect(ranked.map((r) => r.rank)).toEqual([1, 1]);
  });
  it("handles an empty list", () => {
    expect(rankDescending([])).toEqual([]);
  });
});

describe("movement", () => {
  it("is positive when moving up and negative when moving down", () => {
    expect(movement(2, 5)).toBe(3);
    expect(movement(5, 2)).toBe(-3);
    expect(movement(3, 3)).toBe(0);
  });
  it("is null without a previous rank", () => {
    expect(movement(2, undefined)).toBeNull();
    expect(movement(undefined, 2)).toBeNull();
  });
});

describe("parseBoardParams", () => {
  it("parses valid values", () => {
    expect(
      parseBoardParams({
        year: "2",
        section: "B",
        domain: "ai_ml",
        q: " aarav ",
        improved: "week",
      }),
    ).toEqual({ year: 2, section: "B", domain: "ai_ml", q: "aarav", improved: "week" });
  });
  it("falls back to defaults for garbage", () => {
    expect(
      parseBoardParams({
        year: "9",
        domain: "nope",
        improved: "year",
        section: "x".repeat(50),
      }),
    ).toEqual({
      year: "all",
      section: undefined,
      domain: undefined,
      q: undefined,
      improved: undefined,
    });
  });
  it("uses the first value of repeated parameters and defaults when empty", () => {
    expect(parseBoardParams({ year: ["3", "1"] }).year).toBe(3);
    expect(parseBoardParams({}).year).toBe("all");
  });
});

describe("filterStudents", () => {
  const list = [
    student("a", {
      fullName: "Aarav Singh",
      admissionYear: 2025,
      section: "A",
      usernames: { github: "aarav-s" },
    }),
    student("b", {
      fullName: "Meera Rao",
      admissionYear: 2024,
      section: "B",
      primaryDomain: "ai_ml",
    }),
    student("c", { fullName: "Old Timer", admissionYear: 2021 }), // alumni by year
    student("d", { fullName: "Hidden", optOut: true }),
  ];
  const f = (p: Parameters<typeof filterStudents>[1]) =>
    filterStudents(list, p, TODAY).map((s) => s.id);

  it("never includes alumni or opted-out students", () => {
    expect(f({ year: "all" })).toEqual(["a", "b"]);
  });
  it("filters by year tab", () => {
    expect(f({ year: 2 })).toEqual(["a"]);
    expect(f({ year: 3 })).toEqual(["b"]);
    expect(f({ year: 4 })).toEqual([]);
  });
  it("filters by section and domain", () => {
    expect(f({ year: "all", section: "b" })).toEqual(["b"]);
    expect(f({ year: "all", domain: "ai_ml" })).toEqual(["b"]);
  });
  it("searches names and usernames case-insensitively", () => {
    expect(f({ year: "all", q: "AARAV" })).toEqual(["a"]);
    expect(f({ year: "all", q: "aarav-s" })).toEqual(["a"]);
  });
  it("treats regex characters in the search as plain text", () => {
    expect(f({ year: "all", q: ".*" })).toEqual([]);
    expect(f({ year: "all", q: "(" })).toEqual([]);
  });
});

describe("buildBoard", () => {
  const base = (over = {}) => ({
    board: "problem-solving" as const,
    weights: DEFAULT_WEIGHTS,
    today: TODAY,
    params: { year: "all" as const },
    ...over,
  });

  it("returns an empty board when nobody has data", () => {
    const rows = buildBoard({
      ...base(),
      students: [student("a", { metrics: {} })],
      history: {},
    });
    expect(rows).toEqual([]);
  });

  it("ranks by score, highest first", () => {
    const students = [
      student("a", { metrics: lc(10, 0, 0) }),
      student("b", { metrics: lc(10, 10, 10) }),
    ];
    const rows = buildBoard({ ...base(), students, history: {} });
    expect(rows.map((r) => [r.id, r.rank])).toEqual([
      ["b", 1],
      ["a", 2],
    ]);
    expect(rows[0].value).toBe(70);
  });

  it("ranks within the filtered view but scores against the whole cohort", () => {
    const students = [
      student("a", { admissionYear: 2025, metrics: lc(0, 0, 10) }), // best overall
      student("b", { admissionYear: 2024, metrics: lc(0, 0, 5) }),
    ];
    const all = buildBoard({ ...base(), students, history: {} });
    const third = buildBoard({ ...base({ params: { year: 3 } }), students, history: {} });
    expect(all.find((r) => r.id === "b")?.value).toBe(35);
    expect(third).toHaveLength(1);
    expect(third[0]).toMatchObject({ id: "b", rank: 1, value: 35 });
  });

  it("shows no movement for students without an earlier snapshot", () => {
    const students = [
      student("a", { metrics: lc(10, 0, 0) }),
      student("b", { metrics: lc(30, 0, 0) }),
    ];
    const history = { 7: new Map<string, MetricsByPlatform>([["a", lc(50, 0, 0)]]) };
    const rows = buildBoard({ ...base(), students, history });
    expect(rows.find((r) => r.id === "b")?.movement).toBeNull();
  });

  it("reports movement when both have earlier snapshots", () => {
    const students = [
      student("a", { metrics: lc(10, 0, 0) }),
      student("b", { metrics: lc(30, 0, 0) }),
    ];
    const history = {
      7: new Map<string, MetricsByPlatform>([
        ["a", lc(50, 0, 0)],
        ["b", lc(20, 0, 0)],
      ]),
    };
    const rows = buildBoard({ ...base(), students, history });
    expect(rows.find((r) => r.id === "b")).toMatchObject({ rank: 1, movement: 1 }); // 2 -> 1
    expect(rows.find((r) => r.id === "a")).toMatchObject({ rank: 2, movement: -1 }); // 1 -> 2
  });

  it("most improved ranks by score gain and leaves out students without an earlier snapshot", () => {
    const students = [
      student("a", { metrics: lc(10, 0, 0) }),
      student("b", { metrics: lc(30, 0, 0) }),
      student("c", { metrics: lc(40, 0, 0) }),
    ];
    const history = {
      7: new Map<string, MetricsByPlatform>([
        ["a", lc(0, 0, 0)],
        ["b", lc(20, 0, 0)],
      ]),
    };
    const rows = buildBoard({
      ...base({ params: { year: "all", improved: "week" } }),
      students,
      history,
    });
    expect(rows.map((r) => r.id).sort()).toEqual(["a", "b"]);
    expect(rows.every((r) => r.value > 0)).toBe(true);
    expect(rows[0].value).toBeGreaterThanOrEqual(rows[1].value);
  });

  it("builds a short trend from the weekly snapshots, oldest first", () => {
    const students = [student("a", { metrics: lc(30, 0, 0) })];
    const history = {
      7: new Map<string, MetricsByPlatform>([["a", lc(20, 0, 0)]]),
      14: new Map<string, MetricsByPlatform>([["a", lc(10, 0, 0)]]),
    };
    const rows = buildBoard({ ...base(), students, history });
    expect(rows[0].trend).toHaveLength(3);
  });

  it("has no trend when there is only the current value", () => {
    const rows = buildBoard({ ...base(), students: [student("a")], history: {} });
    expect(rows[0].trend).toEqual([]);
  });

  it("uses the contest rating on the contests board and skips unrated students", () => {
    const students = [
      student("a", { metrics: lc(1, 0, 0, 1900) }),
      student("b", { metrics: lc(1, 0, 0, null) }),
    ];
    const rows = buildBoard({ ...base({ board: "contests" }), students, history: {} });
    expect(rows.map((r) => [r.id, r.value])).toEqual([["a", 1900]]);
  });
});
