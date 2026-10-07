import { describe, expect, it } from "vitest";
import { academicStartYear, studentYear } from "@/lib/year";

const d = (iso: string) => new Date(iso);

describe("academicStartYear", () => {
  it("is last year before 1 July IST", () => {
    expect(academicStartYear(d("2026-06-30T12:00:00+05:30"))).toBe(2025);
  });
  it("is this year from 1 July IST", () => {
    expect(academicStartYear(d("2026-07-01T00:00:00+05:30"))).toBe(2026);
  });
  it("rolls over at midnight IST, not UTC", () => {
    // 2026-06-30 19:00 UTC is 00:30 IST on 1 July
    expect(academicStartYear(d("2026-06-30T19:00:00Z"))).toBe(2026);
    // 2026-06-30 18:29:59 UTC is 23:59:59 IST on 30 June
    expect(academicStartYear(d("2026-06-30T18:29:59Z"))).toBe(2025);
  });
});

describe("studentYear", () => {
  it("counts years from the admission year", () => {
    expect(studentYear(2024, d("2026-06-30T12:00:00+05:30"))).toEqual({ kind: "active", year: 2 });
    expect(studentYear(2024, d("2026-07-01T12:00:00+05:30"))).toEqual({ kind: "active", year: 3 });
  });
  it("treats the fourth year as active and the fifth as alumni", () => {
    expect(studentYear(2023, d("2026-07-01T12:00:00+05:30"))).toEqual({ kind: "active", year: 4 });
    expect(studentYear(2022, d("2026-07-01T12:00:00+05:30"))).toEqual({ kind: "alumni" });
  });
  it("is not-started for an admission year that has not begun", () => {
    expect(studentYear(2026, d("2026-06-30T12:00:00+05:30"))).toEqual({ kind: "not-started" });
    expect(studentYear(2026, d("2026-07-01T12:00:00+05:30"))).toEqual({ kind: "active", year: 1 });
  });
  it("lets an override win, even over alumni", () => {
    expect(studentYear(2020, d("2026-07-01T12:00:00+05:30"), 2)).toEqual({ kind: "active", year: 2 });
  });
  it("rejects an override outside 1 to 4", () => {
    expect(() => studentYear(2024, d("2026-07-01T12:00:00+05:30"), 5)).toThrow(RangeError);
    expect(() => studentYear(2024, d("2026-07-01T12:00:00+05:30"), 2.5)).toThrow(RangeError);
  });
});
