import { describe, expect, it } from "vitest";
import { verifyAccount } from "@/lib/platforms";
import { verifyCodeforces } from "@/lib/platforms/codeforces";
import { verifyGitHub } from "@/lib/platforms/github";
import { verifyLeetCode } from "@/lib/platforms/leetcode";

const json = (body: unknown, status = 200) =>
  (async () => new Response(JSON.stringify(body), { status })) as unknown as typeof fetch;
const throws = (async () => {
  throw new Error("network down");
}) as unknown as typeof fetch;
const text = (body: string, status = 200) =>
  (async () => new Response(body, { status })) as unknown as typeof fetch;

describe("verifyLeetCode", () => {
  it("found when matchedUser has a username", async () => {
    const f = json({ data: { matchedUser: { username: "aarav" } } });
    expect(await verifyLeetCode("aarav", { fetchImpl: f })).toBe("found");
  });
  it("not-found when matchedUser is null", async () => {
    const f = json({
      errors: [{ message: "That user does not exist." }],
      data: { matchedUser: null },
    });
    expect(await verifyLeetCode("nobody", { fetchImpl: f })).toBe("not-found");
  });
  it("unavailable on HTTP error, network error or odd body", async () => {
    expect(await verifyLeetCode("x", { fetchImpl: json({}, 429) })).toBe("unavailable");
    expect(await verifyLeetCode("x", { fetchImpl: throws })).toBe("unavailable");
    expect(await verifyLeetCode("x", { fetchImpl: json({ unexpected: true }) })).toBe(
      "unavailable",
    );
    expect(await verifyLeetCode("x", { fetchImpl: text("<html>blocked</html>") })).toBe(
      "unavailable",
    );
  });
});

describe("verifyGitHub", () => {
  it("found for a User account", async () => {
    expect(await verifyGitHub("aarav", { fetchImpl: json({ type: "User" }) })).toBe(
      "found",
    );
  });
  it("not-found for an Organization", async () => {
    expect(
      await verifyGitHub("acme", { fetchImpl: json({ type: "Organization" }) }),
    ).toBe("not-found");
  });
  it("not-found on 404", async () => {
    expect(await verifyGitHub("nobody", { fetchImpl: json({}, 404) })).toBe("not-found");
  });
  it("unavailable on rate limit, server error or network error", async () => {
    expect(await verifyGitHub("x", { fetchImpl: json({}, 403) })).toBe("unavailable");
    expect(await verifyGitHub("x", { fetchImpl: json({}, 500) })).toBe("unavailable");
    expect(await verifyGitHub("x", { fetchImpl: throws })).toBe("unavailable");
  });
  it("sends the token when given", async () => {
    let auth: string | null = null;
    const f = (async (_u: unknown, init?: RequestInit) => {
      auth = new Headers(init?.headers).get("authorization");
      return new Response(JSON.stringify({ type: "User" }), { status: 200 });
    }) as unknown as typeof fetch;
    await verifyGitHub("aarav", { fetchImpl: f, token: "tok" });
    expect(auth).toBe("Bearer tok");
  });
});

describe("verifyCodeforces", () => {
  it("found on status OK", async () => {
    expect(
      await verifyCodeforces("tourist", {
        fetchImpl: json({ status: "OK", result: [{}] }),
      }),
    ).toBe("found");
  });
  it("not-found on FAILED with a not found comment (HTTP 400)", async () => {
    const f = json(
      { status: "FAILED", comment: "handles: User with handle nobody not found" },
      400,
    );
    expect(await verifyCodeforces("nobody", { fetchImpl: f })).toBe("not-found");
  });
  it("unavailable on other failures", async () => {
    expect(
      await verifyCodeforces("x", {
        fetchImpl: json({ status: "FAILED", comment: "Call limit exceeded" }, 503),
      }),
    ).toBe("unavailable");
    expect(await verifyCodeforces("x", { fetchImpl: throws })).toBe("unavailable");
    expect(await verifyCodeforces("x", { fetchImpl: text("oops", 502) })).toBe(
      "unavailable",
    );
  });
});

describe("verifyAccount", () => {
  it("does not check CodeChef", async () => {
    expect(await verifyAccount("codechef", "someone", { fetchImpl: throws })).toBe(
      "unchecked",
    );
  });
  it("routes to the right platform", async () => {
    const f = json({ data: { matchedUser: { username: "a" } } });
    expect(await verifyAccount("leetcode", "a", { fetchImpl: f })).toBe("found");
  });
});
