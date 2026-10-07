import { describe, expect, it } from "vitest";
import { difficultySegments, percentileMarker, weeklyTotals } from "@/lib/boards/visuals";

const days = (counts: number[]): [string, number][] =>
  counts.map((c, i) => [`2026-01-${String(i + 1).padStart(2, "0")}`, c]);

describe("weeklyTotals", () => {
  it("sums the most recent days in blocks of seven, oldest block first", () => {
    // 14 days: first week sums to 7, second to 14
    expect(weeklyTotals(days([...Array(7).fill(1), ...Array(7).fill(2)]), 12)).toEqual([
      7, 14,
    ]);
  });
  it("counts blocks back from the latest day and ignores older days beyond the window", () => {
    const calendar = days([
      ...Array(7).fill(9),
      ...Array(7).fill(1),
      ...Array(7).fill(2),
    ]);
    expect(weeklyTotals(calendar, 2)).toEqual([7, 14]);
  });
  it("keeps a partial oldest block", () => {
    expect(weeklyTotals(days([5, 5, 5, ...Array(7).fill(1)]), 12)).toEqual([15, 7]);
  });
  it("handles empty input and zero weeks", () => {
    expect(weeklyTotals([], 12)).toEqual([]);
    expect(weeklyTotals(days([1, 2, 3]), 0)).toEqual([]);
  });
});

describe("difficultySegments", () => {
  it("returns each difficulty with its share of the total", () => {
    const s = difficultySegments(50, 30, 20);
    expect(s.map((x) => x.key)).toEqual(["easy", "medium", "hard"]);
    expect(s.map((x) => x.percent)).toEqual([50, 30, 20]);
    expect(s.reduce((a, x) => a + x.percent, 0)).toBeCloseTo(100);
  });
  it("returns nothing when there are no solves", () => {
    expect(difficultySegments(0, 0, 0)).toEqual([]);
  });
  it("copes with a single difficulty", () => {
    expect(difficultySegments(10, 0, 0).map((x) => x.percent)).toEqual([100, 0, 0]);
  });
});

describe("percentileMarker", () => {
  it("puts better ranks further right", () => {
    expect(percentileMarker(1)).toBe(99);
    expect(percentileMarker(50)).toBe(50);
    expect(percentileMarker(95)).toBe(5);
  });
  it("stays inside the track", () => {
    expect(percentileMarker(0)).toBe(100);
    expect(percentileMarker(120)).toBe(0);
    expect(percentileMarker(-5)).toBe(100);
  });
});
