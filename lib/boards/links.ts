import type { BoardId } from "@/lib/scoring/types";
import type { BoardParams } from "./params";

/** Board URL for a set of filters; defaults are left out so URLs stay short and shareable. */
export function boardHref(
  board: BoardId,
  params: BoardParams,
  overrides: Partial<BoardParams> = {},
): string {
  const merged: BoardParams = { ...params, ...overrides };
  const search = new URLSearchParams();
  if (merged.year !== "all") search.set("year", String(merged.year));
  if (merged.section) search.set("section", merged.section);
  if (merged.domain) search.set("domain", merged.domain);
  if (merged.q) search.set("q", merged.q);
  if (merged.improved) search.set("improved", merged.improved);
  const query = search.toString();
  return `/leaderboards/${board}${query ? `?${query}` : ""}`;
}
