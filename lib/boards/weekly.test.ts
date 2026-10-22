import { describe, expect, it } from "vitest";
import { solvedThisWeek, solvedTotal } from "@/lib/boards/weekly";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const m = (lc: number, cf = 0, cc = 0): MetricsByPlatform => ({
  leetcode: { rating: null, solved: lc, extra: {} },
  codeforces: { rating: null, solved: cf, extra: {} },
  codechef: { rating: null, solved: cc, extra: {} },
});

describe("solvedTotal", () => {
  it("adds LeetCode, Codeforces and CodeChef", () => {
    expect(solvedTotal(m(10, 5, 2))).toBe(17);
  });
  it("treats a missing platform as zero", () => {
    expect(solvedTotal({ leetcode: { rating: null, solved: 4, extra: {} } })).toBe(4);
    expect(solvedTotal({})).toBe(0);
  });
});

describe("solvedThisWeek", () => {
  it("is the growth since the snapshot a week ago", () => {
    expect(solvedThisWeek(m(30, 5), m(20, 3))).toBe(12);
  });
  it("is null when there is no snapshot to compare with yet", () => {
    expect(solvedThisWeek(m(30), undefined)).toBeNull();
  });
  it("never goes below zero if a platform corrected its count downwards", () => {
    expect(solvedThisWeek(m(18), m(20))).toBe(0);
  });
});
