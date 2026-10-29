"use client";

import { useSyncExternalStore } from "react";

const CHANGED = "roadmap-steps";

function subscribe(cb: () => void) {
  window.addEventListener(CHANGED, cb);
  return () => window.removeEventListener(CHANGED, cb);
}

/** A numbered list of steps the reader can tick off. Ticks live in this browser only. */
export function RoadmapSteps({ id, steps }: { id: string; steps: string[] }) {
  const key = `roadmap:${id}`;
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
  let done: number[] = [];
  try {
    done = JSON.parse(saved);
  } catch {
    // Corrupt value: start with nothing ticked.
  }

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
    <div className="flex flex-col gap-2">
      <p className="text-sm">
        {done.length} of {steps.length} done
      </p>
      <ol className="flex flex-col">
        {steps.map((x, i) => {
          const checked = done.includes(i);
          return (
            <li key={x} className="relative flex gap-3 pb-4 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="bg-border absolute top-8 bottom-0 left-3 w-px"
                />
              )}
              <span
                aria-hidden="true"
                className="bg-foreground text-background relative mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              >
                {checked ? "✓" : i + 1}
              </span>
              <label
                className={`border-border flex flex-1 cursor-pointer items-start gap-2 rounded-lg border px-3 py-2 ${checked ? "opacity-60" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(i)}
                  className="mt-1.5 shrink-0"
                />
                <span className={checked ? "line-through" : ""}>{x}</span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
