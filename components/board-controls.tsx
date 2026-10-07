import Link from "next/link";
import { Button } from "@/components/ui/button";
import { boardHref } from "@/lib/boards/links";
import type { BoardParams } from "@/lib/boards/params";
import { DOMAIN_LABELS, DOMAIN_VALUES } from "@/lib/registration/schema";
import type { BoardId } from "@/lib/scoring/types";

export type YearCounts = Record<"all" | 1 | 2 | 3 | 4, number>;

const YEARS: { value: BoardParams["year"]; label: string }[] = [
  { value: "all", label: "All years" },
  { value: 1, label: "1st year" },
  { value: 2, label: "2nd year" },
  { value: 3, label: "3rd year" },
  { value: 4, label: "4th year" },
];

const fieldClass =
  "border-input bg-background h-9 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function BoardControls({
  board,
  params,
  counts,
}: {
  board: BoardId;
  params: BoardParams;
  counts: YearCounts;
}) {
  const advancedActive = [params.section, params.domain, params.improved].filter(
    Boolean,
  ).length;
  const anyActive = advancedActive > 0 || Boolean(params.q);
  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Year" className="-mx-1 flex flex-wrap gap-x-1 gap-y-1">
        {YEARS.map((y) => {
          const active = params.year === y.value;
          return (
            <Link
              key={y.label}
              href={boardHref(board, params, { year: y.value })}
              aria-current={active ? "page" : undefined}
              className={`focus-visible:ring-ring flex items-baseline gap-1.5 rounded-md px-3 py-1.5 text-sm focus-visible:ring-2 focus-visible:outline-none ${
                active
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {y.label}
              <span
                className={`text-xs tabular-nums ${active ? "opacity-70" : "opacity-60"}`}
              >
                {counts[y.value]}
              </span>
            </Link>
          );
        })}
      </nav>

      <form
        method="get"
        action={`/leaderboards/${board}`}
        className="flex flex-col gap-3"
      >
        {params.year !== "all" && <input type="hidden" name="year" value={params.year} />}
        <div className="flex gap-2">
          <input
            type="search"
            name="q"
            aria-label="Search by name or username"
            defaultValue={params.q ?? ""}
            placeholder="Search students"
            maxLength={60}
            className={`${fieldClass} flex-1`}
          />
          <Button type="submit">Apply</Button>
          {anyActive && (
            <Link
              href={boardHref(board, { year: params.year })}
              className="text-muted-foreground hover:text-foreground flex items-center px-1 text-sm whitespace-nowrap underline underline-offset-4"
            >
              Clear
            </Link>
          )}
        </div>
        <details open={advancedActive > 0} className="group">
          <summary className="text-muted-foreground hover:text-foreground focus-visible:ring-ring w-fit cursor-pointer list-none rounded-md py-1 text-sm focus-visible:ring-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">More filters</span>
            <span className="hidden group-open:inline">Fewer filters</span>
            {advancedActive > 0 && (
              <span className="bg-foreground text-background ml-2 rounded-full px-1.5 text-xs">
                {advancedActive}
              </span>
            )}
          </summary>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">Section</span>
              <input
                name="section"
                defaultValue={params.section ?? ""}
                maxLength={20}
                className={fieldClass}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm">
              <span className="text-muted-foreground">Domain</span>
              <select
                name="domain"
                defaultValue={params.domain ?? ""}
                className={fieldClass}
              >
                <option value="">Any</option>
                {DOMAIN_VALUES.map((d) => (
                  <option key={d} value={d}>
                    {DOMAIN_LABELS[d]}
                  </option>
                ))}
              </select>
            </label>
            <label className="col-span-2 flex flex-col gap-1 text-sm sm:col-span-1">
              <span className="text-muted-foreground">Show</span>
              <select
                name="improved"
                defaultValue={params.improved ?? ""}
                className={fieldClass}
              >
                <option value="">Current ranking</option>
                <option value="week">Most improved this week</option>
                <option value="month">Most improved this month</option>
              </select>
            </label>
          </div>
        </details>
      </form>
    </div>
  );
}
