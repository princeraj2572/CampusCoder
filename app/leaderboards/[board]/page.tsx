import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { BoardControls, type YearCounts } from "@/components/board-controls";
import { BoardRow } from "@/components/board-row";
import { StandingCard } from "@/components/standing-card";
import { buildBoard } from "@/lib/boards/build";
import { describeUpdated } from "@/lib/boards/format";
import { boardHref } from "@/lib/boards/links";
import { loadBoardData } from "@/lib/boards/load";
import { BOARD_META } from "@/lib/boards/meta";
import { parseBoardParams, type BoardParams } from "@/lib/boards/params";
import { profileRanks } from "@/lib/boards/profile-ranks";
import { BOARD_ACCENT } from "@/lib/boards/theme";
import { BOARD_IDS, type BoardId } from "@/lib/scoring/types";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: Promise<{ board: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();

  const { board: boardParam } = await params;
  if (!BOARD_IDS.includes(boardParam as BoardId)) notFound();
  const board = boardParam as BoardId;
  const filters = parseBoardParams(await searchParams);

  const now = new Date();
  // The boards are public, so the server reads them with its own key. Only what a board shows is
  // sent to the page: names, year, section, domain and scores. Hidden and alumni students are
  // dropped by the board logic, and no emails are ever loaded.
  const service = createServiceClient();
  const data = await loadBoardData(service, now);

  const {
    data: { user },
  } = await (await createClient()).auth.getUser();
  const me = user
    ? (
        await service
          .from("students")
          .select("id")
          .eq("auth_user_id", user.id)
          .maybeSingle()
      ).data
    : null;

  const rows = buildBoard({
    board,
    students: data.students,
    weights: data.weights,
    today: now,
    params: filters,
    history: data.history,
  });
  const countFor = (year: BoardParams["year"]) =>
    buildBoard({
      board,
      students: data.students,
      weights: data.weights,
      today: now,
      params: { ...filters, year },
      history: data.history,
    }).length;
  const counts: YearCounts = {
    all: countFor("all"),
    1: countFor(1),
    2: countFor(2),
    3: countFor(3),
    4: countFor(4),
  };
  const max = Math.max(0, ...rows.map((r) => r.value));
  const updated = describeUpdated(data.lastUpdated, now);
  const meta = BOARD_META[board];
  const filtered = Boolean(
    filters.q || filters.section || filters.domain || filters.year !== "all",
  );

  const standing = !user
    ? ({ kind: "signed-out", next: boardHref(board, filters) } as const)
    : !me
      ? ({ kind: "unregistered" } as const)
      : ({
          kind: "registered",
          studentId: me.id,
          ranks: profileRanks(data, me.id, now),
        } as const);

  return (
    <main
      className="mx-auto w-full max-w-6xl px-4 py-6 lg:py-8"
      style={{ "--board": BOARD_ACCENT[board] } as React.CSSProperties}
    >
      <header className="mb-5 flex flex-col gap-2">
        <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
          {meta.title}
        </h1>
        <span
          aria-hidden="true"
          className="h-1.5 w-16 rounded-full"
          style={{ background: "var(--board)" }}
        />
        <p className="text-muted-foreground max-w-prose text-sm">{meta.blurb}</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
        <aside className="flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start">
          <BoardControls board={board} params={filters} counts={counts} />
          <StandingCard state={standing} current={board} className="hidden lg:flex" />
        </aside>

        <section className="flex min-w-0 flex-col gap-3">
          <StandingCard state={standing} current={board} compact className="lg:hidden" />

          {rows.length === 0 ? (
            <div className="border-border rounded-xl border border-dashed p-6 text-sm">
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
              ) : board === "contests" ? (
                <p>
                  No one has a LeetCode contest rating yet. This board lists students who
                  have taken part in at least one rated LeetCode contest, so it fills in
                  after the first one. Registered students are on the{" "}
                  <Link
                    href={boardHref("problem-solving", { year: "all" })}
                    className="underline underline-offset-4"
                  >
                    DSA board
                  </Link>
                  .
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
              <ol className="flex flex-col gap-3">
                {rows.map((row) => (
                  <BoardRow
                    key={row.id}
                    row={row}
                    board={board}
                    improved={Boolean(filters.improved)}
                    today={now}
                    max={max}
                    isMe={row.id === me?.id}
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
        </section>
      </div>
    </main>
  );
}
