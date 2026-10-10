import type { Domain, Platform } from "@/lib/registration/schema";
import { scoreBoard } from "@/lib/scoring/boards";
import type { ScoreWeights } from "@/lib/scoring/problem-solving";
import type { BoardId, MetricsByPlatform } from "@/lib/scoring/types";
import { filterStudents } from "./filter";
import type { BoardParams } from "./params";
import { movement, rankDescending } from "./rank";

export interface BoardStudent {
  id: string;
  fullName: string;
  admissionYear: number;
  yearOverride: number | null;
  section: string | null;
  primaryDomain: Domain;
  optOut: boolean;
  isAlumni: boolean;
  usernames: Partial<Record<Platform, string>>;
  metrics: MetricsByPlatform;
}

/** Metrics from the nearest snapshot N days ago, keyed by days (7, 14, 21, 28, 30). */
export type History = Partial<Record<number, Map<string, MetricsByPlatform>>>;

export interface BoardRow {
  id: string;
  student: BoardStudent;
  rank: number;
  value: number;
  movement: number | null;
  trend: number[];
}

const TREND_OFFSETS = [28, 21, 14, 7];
const round1 = (n: number) => Math.round(n * 10) / 10;

export function buildBoard(input: {
  board: BoardId;
  students: BoardStudent[];
  weights: ScoreWeights;
  today: Date;
  params: BoardParams;
  history: History;
}): BoardRow[] {
  const { board, students, weights, today, params, history } = input;

  // Scores are computed over the whole active cohort so filters never change a score.
  const cohort = filterStudents(students, { year: "all" }, today);
  const cohortIds = new Set(cohort.map((s) => s.id));
  const current = scoreBoard(
    board,
    cohort.map((s) => ({ id: s.id, metrics: s.metrics })),
    weights,
  );

  const cohortEntries = cohort.map((s) => ({ id: s.id, metrics: s.metrics }));
  const scoresAt = (
    days: number,
    onTodaysScale = false,
  ): Map<string, number> | undefined => {
    const snap = history[days];
    if (!snap) return undefined;
    const entries = [...snap.entries()]
      .filter(([id]) => cohortIds.has(id))
      .map(([id, metrics]) => ({ id, metrics }));
    return scoreBoard(board, entries, weights, onTodaysScale ? cohortEntries : undefined);
  };

  const overallRank = new Map(
    rankDescending([...current].map(([id, value]) => ({ id, value }))).map((r) => [
      r.id,
      r.rank,
    ]),
  );
  const previous = scoresAt(7);
  const previousRank = previous
    ? new Map(
        rankDescending([...previous].map(([id, value]) => ({ id, value }))).map((r) => [
          r.id,
          r.rank,
        ]),
      )
    : undefined;

  // Most improved ranks by score gain; otherwise by the score itself.
  let values = current;
  if (params.improved) {
    // Score the old snapshot on today's scale so a gain means real progress, not rivals' movement.
    const earlier = scoresAt(params.improved === "week" ? 7 : 30, true);
    values = new Map();
    if (earlier) {
      for (const [id, now] of current) {
        const before = earlier.get(id);
        if (before !== undefined && now - before > 0)
          values.set(id, round1(now - before));
      }
    }
  }

  const trendScores = TREND_OFFSETS.map((d) => scoresAt(d));
  const inView = filterStudents(students, params, today).filter((s) => values.has(s.id));
  const ranked = rankDescending(
    inView.map((s) => ({ id: s.id, value: values.get(s.id)! })),
  );
  const byId = new Map(inView.map((s) => [s.id, s]));

  return ranked.map((r) => {
    const points = [...trendScores.map((m) => m?.get(r.id)), current.get(r.id)].filter(
      (v): v is number => v !== undefined,
    );
    return {
      id: r.id,
      student: byId.get(r.id)!,
      rank: r.rank,
      value: r.value,
      movement: params.improved
        ? null
        : movement(overallRank.get(r.id), previousRank?.get(r.id)),
      trend: points.length >= 2 ? points : [],
    };
  });
}
