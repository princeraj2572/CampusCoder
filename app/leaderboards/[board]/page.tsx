import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { BoardControls } from "@/components/board-controls";
import { BoardRow } from "@/components/board-row";
import { buildBoard } from "@/lib/boards/build";
import { describeUpdated } from "@/lib/boards/format";
import { boardHref } from "@/lib/boards/links";
import { loadBoardData } from "@/lib/boards/load";
import { BOARD_META } from "@/lib/boards/meta";
import { parseBoardParams } from "@/lib/boards/params";
import { BOARD_IDS, type BoardId } from "@/lib/scoring/types";
import { createServiceClient } from "@/lib/supabase/service";
import { isAnonRegistrationEnabled } from "@/lib/temp-anon/flag";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  if (!isAnonRegistrationEnabled()) notFound();

  const { board: boardParam } = await params;
  if (!BOARD_IDS.includes(boardParam as BoardId)) notFound();
  const board = boardParam as BoardId;
  const filters = parseBoardParams(await searchParams);

  const now = new Date();
  const data = await loadBoardData(createServiceClient(), now);
  const rows = buildBoard({
    board,
    students: data.students,
    weights: data.weights,
    today: now,
    params: filters,
    history: data.history,
  });
  const updated = describeUpdated(data.lastUpdated, now);
  const meta = BOARD_META[board];
  const filtered = Boolean(
    filters.q || filters.section || filters.domain || filters.year !== "all",
  );

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-bold">{meta.title}</h1>
        <p className="text-muted-foreground max-w-prose text-sm">{meta.blurb}</p>
      </header>

      <BoardControls board={board} params={filters} />

      {rows.length === 0 ? (
        <div className="border-border rounded-md border border-dashed p-6 text-sm">
          {filters.improved ? (
            <p>
              No one has improved over the last {filters.improved} yet. Rankings need
              daily snapshots to compare against, so check back after a few days.
            </p>
          ) : filtered ? (
            <p>
              No one matches these filters.{" "}
              <Link
                href={boardHref(board, { year: "all" })}
                className="underline underline-offset-4"
              >
                Clear the filters
              </Link>
            </p>
          ) : (
            <p>
              No scores yet. They appear after the first refresh, or{" "}
              <Link href="/register" className="underline underline-offset-4">
                add your accounts to appear here
              </Link>
              .
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="text-muted-foreground flex justify-between text-xs">
            <span>{filters.improved ? meta.improvedLabel : meta.valueLabel}</span>
            <span>{rows.length === 1 ? "1 student" : `${rows.length} students`}</span>
          </div>
          <ol className="-mt-4">
            {rows.map((row) => (
              <BoardRow
                key={row.id}
                row={row}
                board={board}
                improved={Boolean(filters.improved)}
                today={now}
              />
            ))}
          </ol>
        </>
      )}

      <p
        className={`text-xs ${updated.stale ? "text-warning" : "text-muted-foreground"}`}
      >
        {updated.text}
      </p>
    </main>
  );
}
