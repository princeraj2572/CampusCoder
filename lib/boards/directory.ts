import type { Domain } from "@/lib/registration/schema";
import { studentYear } from "@/lib/year";
import type { BoardStudent } from "./build";

export type SectionKey = "1" | "2" | "3" | "4" | "alumni";

export interface DirectorySection {
  key: SectionKey;
  title: string;
  students: BoardStudent[];
}

const ORDER: SectionKey[] = ["1", "2", "3", "4", "alumni"];
const TITLES: Record<SectionKey, string> = {
  "1": "1st year",
  "2": "2nd year",
  "3": "3rd year",
  "4": "4th year",
  alumni: "Alumni",
};

function sectionOf(s: BoardStudent, today: Date): SectionKey {
  if (s.isAlumni) return "alumni";
  const y = studentYear(s.admissionYear, today, s.yearOverride);
  if (y.kind === "alumni") return "alumni";
  if (y.kind === "not-started") return "1";
  return String(y.year) as SectionKey;
}

/**
 * The student directory: everyone registered, grouped by year and sorted by name.
 * Students hidden from the leaderboards still appear here, because their profiles stay visible.
 */
export function groupDirectory(
  students: BoardStudent[],
  view: { q?: string; domain?: Domain },
  today: Date,
): DirectorySection[] {
  const q = view.q?.trim().toLowerCase();
  const matches = students.filter((s) => {
    if (view.domain && s.primaryDomain !== view.domain) return false;
    if (q) {
      const haystack = [s.fullName, s.section ?? "", ...Object.values(s.usernames)]
        .join("\n")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const groups = new Map<SectionKey, BoardStudent[]>();
  for (const s of matches) {
    const key = sectionOf(s, today);
    groups.set(key, [...(groups.get(key) ?? []), s]);
  }
  return ORDER.filter((key) => groups.has(key)).map((key) => ({
    key,
    title: TITLES[key],
    students: groups
      .get(key)!
      .sort((a, b) =>
        a.fullName.localeCompare(b.fullName, undefined, { sensitivity: "base" }),
      ),
  }));
}
