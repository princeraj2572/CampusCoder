import { describe, expect, it } from "vitest";
import type { BoardStudent } from "@/lib/boards/build";
import { landingStats } from "@/lib/boards/landing-stats";
import type { MetricsByPlatform } from "@/lib/scoring/types";

const TODAY = new Date("2026-10-07T12:00:00+05:30"); // academic start 2026

const student = (
  id: string,
  metrics: MetricsByPlatform,
  over: Partial<BoardStudent> = {},
): BoardStudent => ({
  id,
  fullName: id,
  admissionYear: 2025,
  yearOverride: null,
  section: null,
  primaryDomain: "web_dev",
  optOut: false,
  isAlumni: false,
  usernames: {},
  metrics,
  ...over,
});

describe("landingStats", () => {
  it("totals the active students' solves and contributions and finds the top rating", () => {
    const stats = landingStats(
      [
        student("a", {
          leetcode: { rating: 1900, solved: 100, extra: {} },
          codeforces: { rating: 1200, solved: 20, extra: {} },
          github: { rating: null, solved: null, extra: { contributions_12m: 500 } },
        }),
        student("b", {
          leetcode: { rating: 1600, solved: 50, extra: {} },
          codechef: { rating: null, solved: 5, extra: {} },
          github: { rating: null, solved: null, extra: { contributions_12m: 250 } },
        }),
      ],
      TODAY,
    );
    expect(stats).toEqual({
      students: 2,
      solved: 175,
      contributions: 750,
      topRating: 1900,
    });
  });

  it("leaves out alumni and students who opted out", () => {
    const stats = landingStats(
      [
        student("a", { leetcode: { rating: 1500, solved: 10, extra: {} } }),
        student(
          "hidden",
          { leetcode: { rating: 2400, solved: 999, extra: {} } },
          { optOut: true },
        ),
        student(
          "old",
          { leetcode: { rating: 2300, solved: 500, extra: {} } },
          { admissionYear: 2019 },
        ),
      ],
      TODAY,
    );
    expect(stats).toEqual({ students: 1, solved: 10, contributions: 0, topRating: 1500 });
  });

  it("counts only students who have any stats", () => {
    const stats = landingStats(
      [
        student("fresh", {}),
        student("a", {
          github: { rating: null, solved: null, extra: { contributions_12m: 5 } },
        }),
      ],
      TODAY,
    );
    expect(stats.students).toBe(1);
  });

  it("returns zeros and no top rating for an empty department", () => {
    expect(landingStats([], TODAY)).toEqual({
      students: 0,
      solved: 0,
      contributions: 0,
      topRating: null,
    });
  });

  it("treats missing or non-numeric values as zero", () => {
    const stats = landingStats(
      [
        student("a", {
          leetcode: { rating: null, solved: null, extra: {} },
          github: { rating: null, solved: null, extra: { contributions_12m: "many" } },
        }),
      ],
      TODAY,
    );
    expect(stats).toEqual({ students: 1, solved: 0, contributions: 0, topRating: null });
  });
});
