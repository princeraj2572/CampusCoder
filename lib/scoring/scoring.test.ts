import { describe, expect, it } from "vitest";
import { scoreBoard } from "@/lib/scoring/boards";
import {
  DEFAULT_WEIGHTS,
  parseWeights,
  problemSolvingScores,
} from "@/lib/scoring/problem-solving";
import { ratingTier } from "@/lib/scoring/tier";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const lc = (easy: number, medium: number, hard: number): MetricsByPlatform => ({
  leetcode: { rating: null, solved: easy + medium + hard, extra: { easy, medium, hard } },
});
const w = DEFAULT_WEIGHTS;

describe("parseWeights", () => {
  it("reads the settings value", () => {
    const parsed = parseWeights({
      leetcode_vs_other: [0.6, 0.4],
      difficulty: { easy: 2, medium: 4, hard: 8 },
    });
    expect(parsed).toEqual({
      leetcodeShare: 0.6,
      otherShare: 0.4,
      difficulty: { easy: 2, medium: 4, hard: 8 },
    });
  });
  it("falls back to the defaults for missing or malformed values", () => {
    expect(parseWeights(null)).toEqual(DEFAULT_WEIGHTS);
    expect(parseWeights({ leetcode_vs_other: ["a"], difficulty: 5 })).toEqual(
      DEFAULT_WEIGHTS,
    );
    expect(
      parseWeights({
        leetcode_vs_other: [-1, 2],
        difficulty: { easy: 1, medium: 3, hard: 5 },
      }),
    ).toEqual(DEFAULT_WEIGHTS);
  });
});

describe("problemSolvingScores", () => {
  it("scales each part against the cohort best", () => {
    // LeetCode weighted: a = 10*1 + 10*3 = 40, b = 20*1 + 10*5 = 70 (best), c = 0.
    // Other solved: a = 15 + 10 = 25, b = 0, c = 50 (best).
    const cohort = [
      {
        id: "a",
        metrics: {
          ...lc(10, 10, 0),
          codeforces: { rating: null, solved: 15, extra: {} },
          codechef: { rating: null, solved: 10, extra: {} },
        },
      },
      { id: "b", metrics: lc(20, 0, 10) },
      {
        id: "c",
        metrics: { ...lc(0, 0, 0), codeforces: { rating: null, solved: 50, extra: {} } },
      },
    ];
    const scores = problemSolvingScores(cohort, w);
    expect(scores.get("a")).toBe(55); // 100 * (0.7 * 40/70 + 0.3 * 25/50)
    expect(scores.get("b")).toBe(70); // 100 * (0.7 * 1 + 0)
    expect(scores.get("c")).toBe(30); // 100 * (0 + 0.3 * 1)
  });

  it("gives a student with only one platform a score from that platform", () => {
    const cohort = [
      {
        id: "a",
        metrics: {
          codeforces: { rating: null, solved: 40, extra: {} },
        } as MetricsByPlatform,
      },
    ];
    expect(problemSolvingScores(cohort, w).get("a")).toBe(30);
  });

  it("omits students with no problem-solving data and survives an all-zero cohort", () => {
    const cohort = [
      { id: "none", metrics: {} as MetricsByPlatform },
      { id: "zero", metrics: lc(0, 0, 0) },
    ];
    const scores = problemSolvingScores(cohort, w);
    expect(scores.has("none")).toBe(false);
    expect(scores.get("zero")).toBe(0);
  });

  it("returns an empty map for an empty cohort", () => {
    expect(problemSolvingScores([], w).size).toBe(0);
  });

  it("treats missing or non-numeric fields as zero", () => {
    const cohort = [
      {
        id: "a",
        metrics: {
          leetcode: { rating: null, solved: null, extra: { easy: "x" } },
        } as MetricsByPlatform,
      },
    ];
    expect(problemSolvingScores(cohort, w).get("a")).toBe(0);
  });
});

describe("scoreBoard", () => {
  const cohort = [
    {
      id: "a",
      metrics: {
        leetcode: { rating: 1900, solved: 5, extra: {} },
        github: { rating: null, solved: null, extra: { contributions_12m: 120 } },
      } as MetricsByPlatform,
    },
    {
      id: "b",
      metrics: { leetcode: { rating: null, solved: 5, extra: {} } } as MetricsByPlatform,
    },
  ];
  it("contests uses the LeetCode contest rating and skips unrated students", () => {
    const s = scoreBoard("contests", cohort, w);
    expect(s.get("a")).toBe(1900);
    expect(s.has("b")).toBe(false);
  });
  it("github uses contributions and skips students without GitHub data", () => {
    const s = scoreBoard("github", cohort, w);
    expect(s.get("a")).toBe(120);
    expect(s.has("b")).toBe(false);
  });
});

describe("ratingTier", () => {
  it("maps rating bands", () => {
    expect(ratingTier(null).key).toBe("unrated");
    expect(ratingTier(1399).key).toBe("grey");
    expect(ratingTier(1400).key).toBe("green");
    expect(ratingTier(1600).key).toBe("cyan");
    expect(ratingTier(1800).key).toBe("blue");
    expect(ratingTier(2000).key).toBe("violet");
    expect(ratingTier(2200).key).toBe("orange");
    expect(ratingTier(2400).key).toBe("red");
    expect(ratingTier(3000).key).toBe("red");
  });
  it("has a readable label for every tier", () => {
    expect(ratingTier(1500).label).toBeTruthy();
    expect(ratingTier(null).label).toBe("Unrated");
  });
});
