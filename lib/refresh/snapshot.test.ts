import { describe, expect, it } from "vitest";
import { toSnapshotExtra } from "@/lib/refresh/supabase-db";

describe("toSnapshotExtra", () => {
  it("drops the bulky daily calendar and keeps everything else", () => {
    const extra = { commits: 5, daily: [["2026-01-01", 1]], languages: [] };
    expect(toSnapshotExtra(extra)).toEqual({ commits: 5, languages: [] });
  });
  it("does not modify the original", () => {
    const extra = { daily: [1] };
    toSnapshotExtra(extra);
    expect(extra).toEqual({ daily: [1] });
  });
});
