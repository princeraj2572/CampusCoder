import { describe, expect, it } from "vitest";
import { shareMessage } from "@/lib/boards/share";
import type { BoardRanks } from "@/lib/boards/profile-ranks";
import type { BoardId } from "@/lib/scoring/types";

const none = {} as BoardRanks;
const ranks = (
  over: Partial<Record<BoardId, BoardRanks>>,
): Record<BoardId, BoardRanks> => ({
  "problem-solving": none,
  contests: none,
  github: none,
  ...over,
});

describe("shareMessage", () => {
  it("shares the best rank within the student's own year", () => {
    const m = shareMessage(
      ranks({
        "problem-solving": {
          overall: { rank: 9, total: 40 },
          inYear: { rank: 3, total: 12, year: 2 },
        },
        github: { overall: { rank: 20, total: 40 } },
      }),
    );
    expect(m).toBe(
      "I am #3 of 12 in 2nd year on the CampusCoders DSA board. Come and join!",
    );
  });

  it("falls back to the overall rank when there is no year rank", () => {
    const m = shareMessage(ranks({ github: { overall: { rank: 2, total: 8 } } }));
    expect(m).toBe("I am #2 of 8 on the CampusCoders GitHub board. Come and join!");
  });

  it("picks the best of several boards", () => {
    const m = shareMessage(
      ranks({
        "problem-solving": { overall: { rank: 5, total: 10 } },
        contests: { overall: { rank: 1, total: 4 } },
      }),
    );
    expect(m).toContain("#1 of 4");
    expect(m).toContain("Contests board");
  });

  it("invites people to join when the student is not ranked anywhere yet", () => {
    expect(shareMessage(ranks({}))).toBe(
      "I just joined CampusCoders, our campus coding leaderboard. Come and join!",
    );
  });
});
