import { describe, expect, it } from "vitest";
import {
  admissionYearOptions,
  makeRegistrationSchema,
  toRegistrationInput,
} from "@/lib/registration/schema";

const today = new Date("2026-10-07T12:00:00+05:30"); // academic start year 2026
const schema = makeRegistrationSchema(today);

const valid = {
  fullName: "Aarav Singh",
  admissionYear: 2024,
  section: "",
  primaryDomain: "web_dev" as const,
  secondaryDomains: [] as ("web_dev" | "ai_ml" | "dsa_cp")[],
  leetcode: "aarav_s",
  github: "aarav-s",
  codeforces: "",
  codechef: "",
  consent: true as const,
};

const fails = (patch: object, field: string) => {
  const r = schema.safeParse({ ...valid, ...patch });
  expect(r.success).toBe(false);
  if (!r.success) expect(r.error.issues.some((i) => i.path[0] === field)).toBe(true);
};

describe("registration schema", () => {
  it("accepts a valid registration", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });
  it("rejects a short name", () => fails({ fullName: "A" }, "fullName"));
  it("rejects an admission year that would make the student alumni", () =>
    fails({ admissionYear: 2022 }, "admissionYear"));
  it("rejects an admission year in the future", () => fails({ admissionYear: 2027 }, "admissionYear"));
  it("accepts the 1st-year admission year", () => {
    expect(schema.safeParse({ ...valid, admissionYear: 2026 }).success).toBe(true);
  });
  it("rejects a secondary domain equal to the primary", () =>
    fails({ secondaryDomains: ["web_dev"] }, "secondaryDomains"));
  it("rejects more than two secondary domains", () =>
    fails({ secondaryDomains: ["ai_ml", "dsa_cp", "other"] }, "secondaryDomains"));
  it("rejects duplicate secondary domains", () =>
    fails({ secondaryDomains: ["ai_ml", "ai_ml"] }, "secondaryDomains"));
  it("requires LeetCode and GitHub usernames", () => {
    fails({ leetcode: "" }, "leetcode");
    fails({ github: "  " }, "github");
  });
  it("rejects malformed usernames", () => {
    fails({ github: "-bad-" }, "github");
    fails({ leetcode: "has space" }, "leetcode");
    fails({ codeforces: "ab" }, "codeforces");
  });
  it("allows empty optional platforms", () => {
    expect(schema.safeParse({ ...valid, codeforces: "", codechef: "" }).success).toBe(true);
  });
  it("requires consent", () => fails({ consent: false }, "consent"));
});

describe("admissionYearOptions", () => {
  it("lists 1st to 4th year, newest admission first", () => {
    expect(admissionYearOptions(today)).toEqual([
      { year: 2026, label: "1st year (joined 2026)" },
      { year: 2025, label: "2nd year (joined 2025)" },
      { year: 2024, label: "3rd year (joined 2024)" },
      { year: 2023, label: "4th year (joined 2023)" },
    ]);
  });
});

describe("toRegistrationInput", () => {
  it("omits empty optional fields and builds the account list", () => {
    const parsed = schema.parse(valid);
    expect(toRegistrationInput(parsed)).toEqual({
      fullName: "Aarav Singh",
      admissionYear: 2024,
      primaryDomain: "web_dev",
      secondaryDomains: [],
      accounts: [
        { platform: "leetcode", username: "aarav_s" },
        { platform: "github", username: "aarav-s" },
      ],
    });
  });
  it("includes section and optional platforms when filled", () => {
    const parsed = schema.parse({ ...valid, section: " B ", codeforces: "aarav_cf", codechef: "aarav_cc" });
    const out = toRegistrationInput(parsed);
    expect(out.section).toBe("B");
    expect(out.accounts.map((a) => a.platform)).toEqual(["leetcode", "github", "codeforces", "codechef"]);
  });
});
