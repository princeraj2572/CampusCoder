import { describe, expect, it } from "vitest";

describe("test runner", () => {
  it("runs and resolves the @ alias", async () => {
    const mod = await import("@/lib/smoke");
    expect(mod.ok()).toBe(true);
  });
});
