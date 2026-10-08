export type StudentYear =
  | { kind: "active"; year: 1 | 2 | 3 | 4 }
  | { kind: "alumni" }
  | { kind: "not-started" };

function istYearMonth(date: Date): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
  }).formatToParts(date);
  const pick = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: pick("year"), month: pick("month") };
}

/** The calendar year in which the current academic year began (rolls over on 1 July IST). */
export function academicStartYear(today: Date): number {
  const { year, month } = istYearMonth(today);
  return month >= 7 ? year : year - 1;
}

export function studentYear(
  admissionYear: number,
  today: Date,
  override?: number | null,
): StudentYear {
  if (override != null) {
    if (!Number.isInteger(override) || override < 1 || override > 4) {
      throw new RangeError("year override must be an integer from 1 to 4");
    }
    return { kind: "active", year: override as 1 | 2 | 3 | 4 };
  }
  const raw = academicStartYear(today) - admissionYear + 1;
  if (raw < 1) return { kind: "not-started" };
  if (raw > 4) return { kind: "alumni" };
  return { kind: "active", year: raw as 1 | 2 | 3 | 4 };
}
