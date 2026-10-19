import { describe, expect, it } from "vitest";
import { isTermsGatedPath } from "./paths";
import { needsAgreement, TERMS_VERSION } from "../legal";

describe("needsAgreement", () => {
  it("asks anyone who has never agreed", () => {
    expect(needsAgreement(null)).toBe(true);
    expect(needsAgreement(undefined)).toBe(true);
  });
  it("asks anyone who agreed to an older version", () => {
    expect(needsAgreement("2020-01-01")).toBe(true);
  });
  it("does not ask anyone who agreed to the current version", () => {
    expect(needsAgreement(TERMS_VERSION)).toBe(false);
  });
});

describe("isTermsGatedPath", () => {
  it("gates the profile and student pages", () => {
    for (const p of ["/profile", "/profile/edit", "/students", "/students/abc"]) {
      expect(isTermsGatedPath(p)).toBe(true);
    }
  });
  it("never gates the agreement page itself, registration or the APIs", () => {
    for (const p of ["/agree", "/register", "/api/me", "/api/terms", "/"]) {
      expect(isTermsGatedPath(p)).toBe(false);
    }
  });
});
