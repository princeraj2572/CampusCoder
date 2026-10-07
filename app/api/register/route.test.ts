import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/register/route";

afterEach(() => vi.unstubAllEnvs());

describe("POST /api/register", () => {
  it("returns 404 when the flag is off", async () => {
    vi.stubEnv("ALLOW_ANON_REGISTRATION", "false");
    const res = await POST(
      new Request("http://x/api/register", { method: "POST", body: "{}" }),
    );
    expect(res.status).toBe(404);
  });
  it("returns 400 for a body that is not JSON", async () => {
    vi.stubEnv("ALLOW_ANON_REGISTRATION", "true");
    const res = await POST(
      new Request("http://x/api/register", { method: "POST", body: "nope" }),
    );
    expect(res.status).toBe(400);
  });
  it("returns 422 with field errors for invalid values", async () => {
    vi.stubEnv("ALLOW_ANON_REGISTRATION", "true");
    const res = await POST(
      new Request("http://x/api/register", {
        method: "POST",
        body: JSON.stringify({ fullName: "A" }),
      }),
    );
    expect(res.status).toBe(422);
    const body = await res.json();
    expect(body.fields.fullName).toBeTruthy();
  });
});
