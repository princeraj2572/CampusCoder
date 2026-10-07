import { describe, expect, it } from "vitest";
import { isAnonRegistrationEnabled } from "@/lib/temp-anon/flag";

describe("isAnonRegistrationEnabled", () => {
  it("is on only for the exact string true", () => {
    expect(isAnonRegistrationEnabled({ ALLOW_ANON_REGISTRATION: "true" })).toBe(true);
    expect(isAnonRegistrationEnabled({ ALLOW_ANON_REGISTRATION: "TRUE" })).toBe(false);
    expect(isAnonRegistrationEnabled({ ALLOW_ANON_REGISTRATION: "1" })).toBe(false);
    expect(isAnonRegistrationEnabled({ ALLOW_ANON_REGISTRATION: "" })).toBe(false);
    expect(isAnonRegistrationEnabled({})).toBe(false);
  });
});
