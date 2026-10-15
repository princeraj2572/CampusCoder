import { describe, expect, it } from "vitest";
import { BOARD_ACCENT, medalColor } from "@/lib/boards/theme";
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
