import { DOMAIN_VALUES, type Domain } from "@/lib/registration/schema";

export interface BoardParams {
  year: "all" | 1 | 2 | 3 | 4;
  section?: string;
  domain?: Domain;
  q?: string;
  improved?: "week" | "month";
}

type Raw = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined): string | undefined =>
  (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

/** Reads URL search params; anything invalid falls back to the default view. */
export function parseBoardParams(raw: Raw): BoardParams {
  const year = first(raw.year);
  const section = first(raw.section);
  const domain = first(raw.domain);
  const q = first(raw.q);
  const improved = first(raw.improved);
  return {
    year:
      year && ["1", "2", "3", "4"].includes(year)
        ? (Number(year) as 1 | 2 | 3 | 4)
        : "all",
    section: section && section.length <= 20 ? section : undefined,
    domain: DOMAIN_VALUES.find((d) => d === domain),
    q: q && q.length <= 60 ? q : undefined,
    improved: improved === "week" || improved === "month" ? improved : undefined,
  };
}
