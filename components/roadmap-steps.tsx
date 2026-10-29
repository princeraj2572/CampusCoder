"use client";

import { useSyncExternalStore } from "react";

const CHANGED = "roadmap-steps";
const PREFIX = "roadmap:";

function subscribe(cb: () => void) {
  window.addEventListener(CHANGED, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGED, cb);
    window.removeEventListener("storage", cb);
  };
}

function parse(saved: string): number[] {
  try {
    const v = JSON.parse(saved);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

/** A numbered route of steps the reader can tick off. Ticks live in this browser only. */
export function RoadmapSteps({
  id,
  steps,
  color,
}: {
  id: string;
  steps: string[];
  color: string;
}) {
  const key = PREFIX + id;
  // useSyncExternalStore reads storage after hydration, so the server HTML shows nothing ticked.
  const saved = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return localStorage.getItem(key) ?? "[]";
      } catch {
        return "[]";
      }
    },
    () => "[]",
  );
  const done = parse(saved);

  function toggle(i: number) {
    const next = done.includes(i) ? done.filter((d) => d !== i) : [...done, i];
    try {
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGED));
    } catch {
      // Ticks just won't persist.
    }
  }

  return (
    <ol className="flex flex-col">
      {steps.map((x, i) => {
        const checked = done.includes(i);
        return (
          <li key={x} className="relative flex gap-3 pb-4 last:pb-0">
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="bg-border absolute top-8 bottom-0 left-3 w-0.5 rounded-full"
                style={
                  checked && done.includes(i + 1) ? { background: color } : undefined
                }
              />
            )}
            <span
              aria-hidden="true"
              className="relative mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors"
              style={
                checked
                  ? { background: color, borderColor: color, color: "var(--on-board)" }
                  : { borderColor: color, color: "var(--foreground)" }
              }
            >
              {checked ? "✓" : i + 1}
            </span>
            <label
              className={`hover:bg-foreground/[0.05] has-focus-visible:ring-ring flex flex-1 cursor-pointer items-start gap-2 rounded-lg px-2 py-1 has-focus-visible:ring-2 ${checked ? "opacity-60" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggle(i)}
                className="mt-1.5 shrink-0"
                style={{ accentColor: color }}
              />
              <span className={checked ? "line-through" : ""}>{x}</span>
            </label>
          </li>
        );
      })}
    </ol>
  );
}

const LEVELS = ["Newbie", "Pupil", "Specialist", "Expert", "Master"];

/** How far through a page's steps the reader is, shown as a level and a bar. */
export function RoadmapProgress({
  slug,
  total,
  color,
}: {
  slug: string;
  total: number;
  color: string;
}) {
  const count = useSyncExternalStore(
    subscribe,
    () => {
      try {
        let n = 0;
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k?.startsWith(`${PREFIX}${slug}/`))
            n += parse(localStorage.getItem(k) ?? "[]").length;
        }
        return Math.min(n, total);
      } catch {
        return 0;
      }
    },
    () => 0,
  );
  const pct = Math.round((count / total) * 100);
  const level = LEVELS[count === total ? 4 : Math.min(3, Math.floor(pct / 25))];

  return (
    <div
      className="flex max-w-md flex-col gap-1.5"
      role="group"
      aria-label="Your progress"
    >
      <p className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-semibold">{level}</span>
        <span className="text-muted-foreground">
          {count} of {total} steps done
        </span>
      </p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
        aria-label="Steps done on this page"
        className="bg-border h-2 overflow-hidden rounded-full"
      >
        <div
          className="h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
