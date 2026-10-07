import { describe, expect, it } from "vitest";
import type { BoardStudent } from "@/lib/boards/build";
import { rowStats } from "@/lib/boards/meta";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const student = (metrics: MetricsByPlatform): BoardStudent => ({
  id: "a",
  fullName: "A",
  admissionYear: 2025,
  yearOverride: null,
  section: null,
  primaryDomain: "web_dev",
  optOut: false,
  isAlumni: false,
  usernames: {},
  metrics,
});

describe("rowStats for the DSA board", () => {
  it("shows LeetCode easy, medium and hard plus Codeforces and CodeChef ratings", () => {
    const s = student({
      leetcode: {
        rating: null,
        solved: 312,
        extra: { easy: 120, medium: 160, hard: 32 },
      },
      codeforces: { rating: 1420, solved: 96, extra: {} },
      codechef: { rating: 1650, solved: 54, extra: {} },
    });
    expect(rowStats("problem-solving", s)).toEqual([
      { label: "Easy", value: 120 },
      { label: "Medium", value: 160 },
      { label: "Hard", value: 32 },
      { label: "CF", value: 1420 },
      { label: "CC", value: 1650 },
    ]);
  });
  it("leaves out platforms that are not connected or not rated", () => {
    expect(
      rowStats(
        "problem-solving",
        student({ codeforces: { rating: null, solved: 5, extra: {} } }),
      ),
    ).toEqual([]);
    expect(
      rowStats(
        "problem-solving",
        student({ codeforces: { rating: 1300, solved: 5, extra: {} } }),
      ),
    ).toEqual([{ label: "CF", value: 1300 }]);
  });
});

describe("rowStats for the contests board", () => {
  it("shows the top percentage and total solved (contests attended is the caption)", () => {
    const s = student({
      leetcode: {
        rating: 1890,
        solved: 312,
        contests: 11,
        extra: { top_percentage: 12.5 },
      },
    });
    expect(rowStats("contests", s)).toEqual([
      { label: "Top", value: "12.5%" },
      { label: "Solved", value: 312 },
    ]);
  });
  it("omits the top percentage when LeetCode does not report one", () => {
    const s = student({
      leetcode: { rating: 1500, solved: 3, contests: 1, extra: { top_percentage: null } },
    });
    expect(rowStats("contests", s).map((x) => x.label)).toEqual(["Solved"]);
  });
});

describe("rowStats for the GitHub board", () => {
  it("shows commits, pull requests, repos and best streak (active days is the caption)", () => {
    const s = student({
      github: {
        rating: null,
        solved: null,
        extra: {
          commits: 742,
          pull_requests: 21,
          repos_with_code: 12,
          longest_streak: 18,
        },
      },
    });
    expect(rowStats("github", s)).toEqual([
      { label: "Commits", value: 742 },
      { label: "PRs", value: 21 },
      { label: "Repos", value: 12 },
      { label: "Best streak", value: "18 days" },
    ]);
  });
  it("uses the singular for a one-day streak", () => {
    const s = student({
      github: { rating: null, solved: null, extra: { longest_streak: 1 } },
    });
    expect(rowStats("github", s).find((x) => x.label === "Best streak")?.value).toBe(
      "1 day",
    );
  });
});

describe("rowStats without data", () => {
  it("returns nothing", () => {
    expect(rowStats("problem-solving", student({}))).toEqual([]);
    expect(rowStats("contests", student({}))).toEqual([]);
    expect(rowStats("github", student({}))).toEqual([]);
  });
});
