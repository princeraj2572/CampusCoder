import { describe, expect, it } from "vitest";
import { isValidCronRequest } from "./cron-auth";

const SECRET = "s3cret-value-of-reasonable-length-1234567890";

describe("isValidCronRequest", () => {
  it("accepts the right bearer token", () => {
    expect(isValidCronRequest(`Bearer ${SECRET}`, SECRET)).toBe(true);
  });
  it("rejects a wrong token, a missing header and other schemes", () => {
    expect(isValidCronRequest("Bearer nope", SECRET)).toBe(false);
    expect(isValidCronRequest(null, SECRET)).toBe(false);
    expect(isValidCronRequest("", SECRET)).toBe(false);
    expect(isValidCronRequest(SECRET, SECRET)).toBe(false);
    expect(isValidCronRequest(`Basic ${SECRET}`, SECRET)).toBe(false);
  });
  it("rejects everything when no secret is configured, even an empty token", () => {
    expect(isValidCronRequest("Bearer ", undefined)).toBe(false);
    expect(isValidCronRequest("Bearer ", "")).toBe(false);
    expect(isValidCronRequest(`Bearer ${SECRET}`, undefined)).toBe(false);
  });
  it("rejects a token that only starts like the secret", () => {
    expect(isValidCronRequest(`Bearer ${SECRET}x`, SECRET)).toBe(false);
    expect(isValidCronRequest(`Bearer ${SECRET.slice(0, -1)}`, SECRET)).toBe(false);
  });
  it("rejects a secret that is too short to be safe", () => {
    expect(isValidCronRequest("Bearer abc", "abc")).toBe(false);
  });
});
