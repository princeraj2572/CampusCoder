import type { BoardParams } from "./params";
import type { BoardStudent } from "./build";
import { studentYear } from "@/lib/year";

type View = Pick<BoardParams, "year" | "section" | "domain" | "q">;

/** Active, ranked students matching the view. Alumni and opted-out students never appear. */
export function filterStudents(
  students: BoardStudent[],
  view: View,
  today: Date,
): BoardStudent[] {
  const q = view.q?.toLowerCase();
  const section = view.section?.toLowerCase();
  return students.filter((s) => {
    if (s.optOut || s.isAlumni) return false;
    const y = studentYear(s.admissionYear, today, s.yearOverride);
    if (y.kind !== "active") return false;
    if (view.year !== "all" && y.year !== view.year) return false;
    if (section && (s.section ?? "").toLowerCase() !== section) return false;
    if (view.domain && s.primaryDomain !== view.domain) return false;
    if (q) {
      const haystack = [s.fullName, ...Object.values(s.usernames)]
        .join("\n")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
