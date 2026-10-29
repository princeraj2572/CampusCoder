"use client";

import Link from "next/link";
import { useState } from "react";
import { TierChip } from "@/components/tier-chip";

const LEVELS = [
  {
    key: "grey",
    name: "Grey",
    from: "Under 1400",
    rating: 1300,
    board:
      "Everyone starts here. About 50 easy problems solved and no rated contest yet.",
    steps: [
      "Pick one language and finish a basic course.",
      "Solve one easy problem a day and keep the streak.",
      "Enter your first weekly contest, even if you only solve one problem.",
    ],
    next: { label: "Start here", href: "/roadmap" },
  },
  {
    key: "green",
    name: "Green",
    from: "1400",
    rating: 1400,
    board:
      "Around 150 problems solved, mostly easy and some medium. A rated contest or two.",
    steps: [
      "Work through arrays, strings, hashing and binary search.",
      "Follow one sheet in order instead of jumping between lists.",
      "Upsolve every contest problem you missed.",
    ],
    next: { label: "The DSA roadmap", href: "/roadmap/dsa" },
  },
  {
    key: "cyan",
    name: "Cyan",
    from: "1600",
    rating: 1600,
    board:
      "Around 250 problems, comfortable with mediums. Roughly the top third of rated contestants.",
    steps: [
      "Learn sliding window, two pointers and stacks well enough to spot them from the wording.",
      "Add trees and BFS/DFS on graphs.",
      "Talk through each solution and its complexity out loud.",
    ],
    next: { label: "DSA patterns", href: "/roadmap/dsa-patterns" },
  },
  {
    key: "blue",
    name: "Blue",
    from: "1800",
    rating: 1800,
    board:
      "Around 350 problems with some hards. A steady contest history and a clear profile.",
    steps: [
      "Get dynamic programming and graphs to a point where you can write the recurrence.",
      "Practise speed: solve the first two contest problems quickly and accurately.",
      "Build one project and put it on GitHub.",
    ],
    next: { label: "DSA patterns", href: "/roadmap/dsa-patterns" },
  },
  {
    key: "violet",
    name: "Violet",
    from: "2000",
    rating: 2000,
    board:
      "Top of the department for most batches. Hard problems and strong contest results.",
    steps: [
      "Study advanced topics: segment trees, shortest paths and number theory.",
      "Compete on Codeforces as well as LeetCode.",
      "Start contributing to open source.",
    ],
    next: { label: "Open source", href: "/roadmap/open-source" },
  },
  {
    key: "orange",
    name: "Orange",
    from: "2200",
    rating: 2200,
    board: "Among the top few percent of all LeetCode contestants.",
    steps: [
      "Balance contests with system design and a real-world project.",
      "Apply for internships and programmes such as Google Summer of Code.",
      "Help others: explain a problem each week.",
    ],
    next: { label: "Placements and career", href: "/roadmap/career" },
  },
  {
    key: "red",
    name: "Red",
    from: "2400+",
    rating: 2400,
    board: "The very top. Your name on the board is a reference for everyone below.",
    steps: [
      "Mentor juniors and run a session for your year.",
      "Go deep in one track: backend, AI, security or research.",
      "Keep the streak alive, because the climb never fully ends.",
    ],
    next: { label: "Roles and jobs", href: "/roadmap/roles" },
  },
];

/** A ladder of the seven rating tiers. Pick one to see its board standing and roadmap steps. */
export function Climb() {
  const [i, setI] = useState(1);
  const level = LEVELS[i];
  const color = `var(--tier-${level.key})`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <ul aria-label="Rating tiers" className="flex flex-col gap-1.5">
        {LEVELS.map((l, n) => (
          <li key={l.key}>
            <button
              type="button"
              aria-pressed={n === i}
              onClick={() => setI(n)}
              className="focus-visible:ring-ring hover:bg-foreground/[0.05] group flex w-full items-center gap-3 rounded-lg py-1.5 pr-2 pl-1 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              <span className="w-32 shrink-0 sm:w-48">
                <span
                  aria-hidden="true"
                  className="block h-7 rounded-r-md transition-[width,opacity] duration-200 motion-reduce:transition-none"
                  style={{
                    width: `${28 + n * 12}%`,
                    background: `var(--tier-${l.key})`,
                    opacity: n === i ? 1 : 0.45,
                  }}
                />
              </span>
              <span
                className={`numeral text-2xl leading-none ${n === i ? "font-extrabold" : "text-muted-foreground font-bold"}`}
              >
                {l.name}
              </span>
              <span className="text-muted-foreground ml-auto text-sm">{l.from}</span>
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-live="polite"
        className="flex flex-col gap-5 border-t-4 pt-5"
        style={{ borderTopColor: color }}
      >
        <div className="flex items-center gap-3">
          <TierChip rating={level.rating} />
          <h3 className="numeral text-4xl leading-none font-extrabold">{level.from}</h3>
        </div>

        <div>
          <p className="font-display font-semibold">On the board</p>
          <p className="text-muted-foreground mt-1">{level.board}</p>
        </div>

        <div>
          <p className="font-display font-semibold">On the roadmap</p>
          <ol className="mt-2 flex flex-col gap-2">
            {level.steps.map((s, n) => (
              <li key={s} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  style={{ background: color, color: "var(--on-board)" }}
                >
                  {n + 1}
                </span>
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href={level.next.href}
          className="text-foreground w-fit font-semibold underline underline-offset-4"
        >
          Open: {level.next.label}
        </Link>
      </div>
    </div>
  );
}
