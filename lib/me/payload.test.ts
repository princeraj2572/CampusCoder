import { describe, expect, it } from "vitest";
import { toRpcPayload } from "@/lib/me/payload";

const input = {
  fullName: "Aarav Singh",
  admissionYear: 2024,
  primaryDomain: "web_dev" as const,
  secondaryDomains: ["ai_ml" as const],
  accounts: [
    { platform: "leetcode" as const, username: "aarav_s" },
    { platform: "github" as const, username: "aarav-s" },
  ],
};

describe("toRpcPayload", () => {
  it("maps to the snake_case keys the database functions expect", () => {
    expect(toRpcPayload({ ...input, section: "B" })).toEqual({
      full_name: "Aarav Singh",
      admission_year: 2024,
      section: "B",
      primary_domain: "web_dev",
      secondary_domains: ["ai_ml"],
      accounts: input.accounts,
    });
  });
  it("sends a null section when none was given", () => {
    expect(toRpcPayload(input).section).toBeNull();
  });
  it("includes the opt-out only when it is provided", () => {
    expect(toRpcPayload(input)).not.toHaveProperty("leaderboard_opt_out");
    expect(toRpcPayload(input, true).leaderboard_opt_out).toBe(true);
    expect(toRpcPayload(input, false).leaderboard_opt_out).toBe(false);
  });
  it("never sends role or alumni fields", () => {
    const keys = Object.keys(toRpcPayload(input, true));
    expect(keys).not.toContain("role");
    expect(keys).not.toContain("is_alumni");
  });
});
