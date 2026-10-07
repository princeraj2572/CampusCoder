import { describe, expect, it } from "vitest";
import {
  BOARD_ACCENT,
  PLATFORM_BRAND,
  medalColor,
  medalGradient,
} from "@/lib/boards/theme";
import { BOARD_IDS } from "@/lib/scoring/types";

describe("medalColor", () => {
  it("gives gold, silver and bronze to the top three", () => {
    expect(medalColor(1)).toBe("var(--medal-gold)");
    expect(medalColor(2)).toBe("var(--medal-silver)");
    expect(medalColor(3)).toBe("var(--medal-bronze)");
  });
  it("gives nothing to everyone else", () => {
    expect(medalColor(4)).toBeNull();
    expect(medalColor(0)).toBeNull();
    expect(medalColor(99)).toBeNull();
  });
});

describe("BOARD_ACCENT", () => {
  it("has a distinct accent for every board", () => {
    const colors = BOARD_IDS.map((b) => BOARD_ACCENT[b]);
    expect(new Set(colors).size).toBe(BOARD_IDS.length);
  });
});

describe("medalGradient", () => {
  it("gives a distinct gradient to each of the top three", () => {
    const g = [1, 2, 3].map((r) => medalGradient(r));
    expect(g.every((x) => typeof x === "string" && x.includes("linear-gradient"))).toBe(
      true,
    );
    expect(new Set(g).size).toBe(3);
  });
  it("gives nothing to everyone else", () => {
    expect(medalGradient(4)).toBeNull();
    expect(medalGradient(0)).toBeNull();
  });
});

describe("PLATFORM_BRAND", () => {
  it("has a brand colour for every coding platform", () => {
    for (const p of ["leetcode", "codeforces", "codechef", "github"] as const) {
      expect(PLATFORM_BRAND[p]).toMatch(/^var\(--/);
    }
  });
});
