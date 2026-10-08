import { describe, expect, it, vi } from "vitest";
import { callRefresh } from "./index.js";

const env = {
  TARGET_URL: "https://example.test/api/cron/refresh",
  CRON_SECRET: "secret-123",
};

describe("callRefresh", () => {
  it("posts to the target with the secret as a bearer token", async () => {
    const fetchImpl = vi.fn(async () => new Response('{"picked":0}', { status: 200 }));
    await callRefresh(env, fetchImpl as unknown as typeof fetch);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(env.TARGET_URL);
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).Authorization).toBe(
      "Bearer secret-123",
    );
  });

  it("returns what the site answered", async () => {
    const fetchImpl = async () =>
      new Response('{"picked":3,"succeeded":3}', { status: 200 });
    const out = await callRefresh(env, fetchImpl as unknown as typeof fetch);
    expect(out).toEqual({ status: 200, body: '{"picked":3,"succeeded":3}' });
  });

  it("fails loudly when the site rejects the request, so the failure shows in Cloudflare", async () => {
    const fetchImpl = async () => new Response("nope", { status: 401 });
    await expect(callRefresh(env, fetchImpl as unknown as typeof fetch)).rejects.toThrow(
      /401/,
    );
  });

  it("refuses to run without a secret or a target", async () => {
    const fetchImpl = vi.fn();
    await expect(
      callRefresh({ TARGET_URL: env.TARGET_URL }, fetchImpl as unknown as typeof fetch),
    ).rejects.toThrow(/CRON_SECRET/);
    await expect(
      callRefresh({ CRON_SECRET: "x" }, fetchImpl as unknown as typeof fetch),
    ).rejects.toThrow(/TARGET_URL/);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
