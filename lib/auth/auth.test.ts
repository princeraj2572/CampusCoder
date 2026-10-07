import { describe, expect, it } from "vitest";
import { isAdminEmail } from "@/lib/auth/admin";
import { isProtectedPath } from "@/lib/auth/paths";
import { safeNext } from "@/lib/auth/safe-next";

describe("safeNext", () => {
  it("keeps same-site paths, including their query", () => {
    expect(safeNext("/profile")).toBe("/profile");
    expect(safeNext("/leaderboards/github?year=2")).toBe("/leaderboards/github?year=2");
  });
  it("falls back to /profile for missing or empty values", () => {
    expect(safeNext(null)).toBe("/profile");
    expect(safeNext(undefined)).toBe("/profile");
    expect(safeNext("")).toBe("/profile");
  });
  it("never redirects off-site", () => {
    for (const bad of [
      "//evil.com",
      "https://evil.com",
      "http://evil.com/x",
      "/\\evil.com",
      "\\\\evil.com",
      "javascript:alert(1)",
      "evil.com",
      "/%2F%2Fevil.com",
      " //evil.com",
    ]) {
      expect(safeNext(bad), bad).toBe("/profile");
    }
  });
  it("does not loop back to the login or callback pages", () => {
    expect(safeNext("/login")).toBe("/profile");
    expect(safeNext("/auth/callback?code=1")).toBe("/profile");
  });
});

describe("isProtectedPath", () => {
  it("leaves the landing, login, auth routes and leaderboards public", () => {
    expect(isProtectedPath("/")).toBe(false);
    expect(isProtectedPath("/leaderboards/github")).toBe(false);
    expect(isProtectedPath("/leaderboards/problem-solving")).toBe(false);
    expect(isProtectedPath("/privacy")).toBe(false);
    expect(isProtectedPath("/terms")).toBe(false);
    expect(isProtectedPath("/login")).toBe(false);
    expect(isProtectedPath("/auth/callback")).toBe(false);
    expect(isProtectedPath("/auth/signout")).toBe(false);
  });
  it("protects every app page", () => {
    for (const p of [
      "/students",
      "/students/abc",
      "/profile",
      "/profile/edit",
      "/register",
      "/api/me",
      "/api/verify",
    ]) {
      expect(isProtectedPath(p), p).toBe(true);
    }
  });
  it("does not treat lookalike public prefixes as public", () => {
    expect(isProtectedPath("/loginx")).toBe(true);
    expect(isProtectedPath("/authority")).toBe(true);
    expect(isProtectedPath("/leaderboardsx")).toBe(true);
    expect(isProtectedPath("/privacy-settings")).toBe(true);
  });
});

describe("isAdminEmail", () => {
  it("matches the configured email ignoring case and spaces", () => {
    expect(isAdminEmail("Boss@Example.com", " boss@example.com ")).toBe(true);
  });
  it("rejects other, missing or empty emails", () => {
    expect(isAdminEmail("other@example.com", "boss@example.com")).toBe(false);
    expect(isAdminEmail(undefined, "boss@example.com")).toBe(false);
    expect(isAdminEmail("boss@example.com", undefined)).toBe(false);
    expect(isAdminEmail("", "")).toBe(false);
  });
});
