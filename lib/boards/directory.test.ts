import { describe, expect, it } from "vitest";
import type { BoardStudent } from "@/lib/boards/build";
import { groupDirectory } from "@/lib/boards/directory";

const TODAY = new Date("2026-10-07T12:00:00+05:30"); // academic start 2026

const student = (id: string, over: Partial<BoardStudent> = {}): BoardStudent => ({
  id,
  fullName: id,
  admissionYear: 2025, // 2nd year
  yearOverride: null,
  section: null,
  primaryDomain: "web_dev",
  optOut: false,
  isAlumni: false,
  usernames: {},
  metrics: {},
  ...over,
});

const keys = (s: BoardStudent[], view = {}) =>
  groupDirectory(s, view, TODAY).map((g) => [g.key, g.students.map((x) => x.id)]);

describe("groupDirectory", () => {
  it("groups by year, 1st to 4th, then alumni", () => {
    const result = keys([
      student("old", { admissionYear: 2019 }),
      student("fourth", { admissionYear: 2023 }),
      student("first", { admissionYear: 2026 }),
      student("second", { admissionYear: 2025 }),
      student("third", { admissionYear: 2024 }),
    ]);
    expect(result).toEqual([
      ["1", ["first"]],
      ["2", ["second"]],
      ["3", ["third"]],
      ["4", ["fourth"]],
      ["alumni", ["old"]],
    ]);
  });

  it("omits empty sections", () => {
    expect(keys([student("a", { admissionYear: 2024 })])).toEqual([["3", ["a"]]]);
  });

  it("sorts students by name within a section, ignoring case", () => {
    const result = groupDirectory(
      [
        student("x", { fullName: "zoya" }),
        student("y", { fullName: "Aarav" }),
        student("z", { fullName: "meera" }),
      ],
      {},
      TODAY,
    );
    expect(result[0].students.map((s) => s.fullName)).toEqual(["Aarav", "meera", "zoya"]);
  });

  it("puts flagged alumni in the alumni section whatever their year", () => {
    expect(keys([student("a", { isAlumni: true })])).toEqual([["alumni", ["a"]]]);
  });

  it("respects a year override", () => {
    expect(keys([student("a", { admissionYear: 2019, yearOverride: 4 })])).toEqual([
      ["4", ["a"]],
    ]);
  });

  it("lists students hidden from the leaderboards too", () => {
    expect(keys([student("h", { optOut: true })])).toEqual([["2", ["h"]]]);
  });

  it("counts students who have not started yet with the 1st year", () => {
    expect(keys([student("n", { admissionYear: 2027 })])).toEqual([["1", ["n"]]]);
  });

  it("filters by domain", () => {
    const list = [student("a"), student("b", { primaryDomain: "ai_ml" })];
    expect(keys(list, { domain: "ai_ml" })).toEqual([["2", ["b"]]]);
  });

  it("searches names, usernames and sections case-insensitively, as plain text", () => {
    const list = [
      student("a", {
        fullName: "Aarav Singh",
        usernames: { github: "aarav-s" },
        section: "B",
      }),
      student("b", { fullName: "Meera Rao" }),
    ];
    expect(keys(list, { q: "AARAV" })).toEqual([["2", ["a"]]]);
    expect(keys(list, { q: "aarav-s" })).toEqual([["2", ["a"]]]);
    expect(keys(list, { q: "b" }).flat(2)).toContain("a");
    expect(keys(list, { q: ".*" })).toEqual([]);
    expect(keys(list, { q: "(" })).toEqual([]);
  });

  it("returns nothing for an empty department", () => {
    expect(groupDirectory([], {}, TODAY)).toEqual([]);
  });
});
