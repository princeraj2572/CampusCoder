import { describe, expect, it } from "vitest";
import { boardHref } from "@/lib/boards/links";

describe("boardHref", () => {
  it("omits default values", () => {
    expect(boardHref("github", { year: "all" })).toBe("/leaderboards/github");
  });
  it("includes active filters, URL-encoded", () => {
    expect(
      boardHref("contests", {
        year: 2,
        section: "B 1",
        domain: "ai_ml",
        q: "a&b",
        improved: "week",
      }),
    ).toBe(
      "/leaderboards/contests?year=2&section=B+1&domain=ai_ml&q=a%26b&improved=week",
    );
  });
  it("applies overrides and clears a value with undefined", () => {
    expect(
      boardHref("problem-solving", { year: 2, q: "x" }, { year: 3, q: undefined }),
    ).toBe("/leaderboards/problem-solving?year=3");
    expect(boardHref("problem-solving", { year: 2 }, { year: "all" })).toBe(
      "/leaderboards/problem-solving",
    );
  });
});
