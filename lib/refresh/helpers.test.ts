import { describe, expect, it } from "vitest";
import { backoffMinutes } from "@/lib/refresh/backoff";
import { istDate } from "@/lib/refresh/dates";
import { requestJson } from "@/lib/platforms/http";
import { FetchError } from "@/lib/platforms/types";
import { computeStreaks } from "@/lib/platforms/streaks";

describe("backoffMinutes", () => {
  it("doubles from 15 minutes and caps at one day", () => {
    expect(backoffMinutes(1, "unavailable")).toBe(15);
    expect(backoffMinutes(2, "unavailable")).toBe(30);
    expect(backoffMinutes(3, "unexpected")).toBe(60);
    expect(backoffMinutes(8, "unavailable")).toBe(1440);
    expect(backoffMinutes(50, "unavailable")).toBe(1440);
  });
  it("waits a day when the account was not found", () => {
    expect(backoffMinutes(1, "not-found")).toBe(1440);
  });
});

describe("istDate", () => {
  it("uses the India date, not the UTC date", () => {
    expect(istDate(new Date("2026-10-06T19:00:00Z"))).toBe("2026-10-07");
    expect(istDate(new Date("2026-10-06T18:29:59Z"))).toBe("2026-10-06");
  });
});

describe("requestJson", () => {
  it("wraps a network error as an unavailable FetchError", async () => {
    const f = (async () => {
      throw new Error("down");
    }) as unknown as typeof fetch;
    await expect(requestJson(f, "http://x")).rejects.toMatchObject({
      name: "FetchError",
      kind: "unavailable",
    });
  });
  it("returns a null body when the response is not JSON", async () => {
    const f = (async () =>
      new Response("<html>", { status: 502 })) as unknown as typeof fetch;
    expect(await requestJson(f, "http://x")).toEqual({
      status: 502,
      ok: false,
      body: null,
    });
  });
  it("parses JSON", async () => {
    const f = (async () => new Response('{"a":1}')) as unknown as typeof fetch;
    expect((await requestJson(f, "http://x")).body).toEqual({ a: 1 });
  });
});

describe("FetchError", () => {
  it("carries its kind", () => {
    const e = new FetchError("not-found", "nope");
    expect(e.kind).toBe("not-found");
    expect(e).toBeInstanceOf(Error);
  });
});

const days = (counts: number[]) =>
  counts.map((count, i) => ({
    date: `2026-01-${String(i + 1).padStart(2, "0")}`,
    count,
  }));

describe("computeStreaks", () => {
  it("counts active days and the longest run", () => {
    expect(computeStreaks(days([1, 1, 0, 1, 1, 1, 0]))).toMatchObject({
      activeDays: 5,
      longest: 3,
    });
  });
  it("keeps the current streak when today has no contributions yet", () => {
    expect(computeStreaks(days([0, 1, 1, 0])).current).toBe(2);
  });
  it("includes today when it has contributions", () => {
    expect(computeStreaks(days([0, 1, 1, 1])).current).toBe(3);
  });
  it("is zero after a gap of a full day", () => {
    expect(computeStreaks(days([1, 1, 0, 0])).current).toBe(0);
  });
  it("handles an empty or all-zero calendar", () => {
    expect(computeStreaks([])).toEqual({ activeDays: 0, longest: 0, current: 0 });
    expect(computeStreaks(days([0, 0, 0]))).toEqual({
      activeDays: 0,
      longest: 0,
      current: 0,
    });
  });
  it("sorts unsorted input by date", () => {
    const d = days([1, 1, 0]);
    expect(computeStreaks([d[2], d[0], d[1]]).longest).toBe(2);
  });
});
