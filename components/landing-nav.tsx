"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "live", label: "Live board", color: "var(--board-github)" },
  { id: "boards", label: "Boards", color: "var(--board-dsa)" },
  { id: "profile", label: "Profile", color: "var(--board-contests)" },
  { id: "levels", label: "Levels", color: "var(--tier-blue)" },
  { id: "how", label: "How it works", color: "var(--board-dsa)" },
  { id: "guide", label: "Get started", color: "var(--board-contests)" },
  { id: "privacy", label: "Privacy", color: "var(--board-github)" },
];

/** A slim menu of the landing page's sections. Highlights the one in view and scrolls to the one clicked. */
export function LandingNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        // The first section (in page order) that crosses the reading line wins.
        const current = SECTIONS.find((s) => visible.has(s.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="border-border bg-background/85 sticky top-14 z-10 border-b backdrop-blur"
    >
      <ul className="mx-auto flex w-full max-w-6xl [scrollbar-width:none] gap-1 overflow-x-auto px-4 py-2 [&::-webkit-scrollbar]:hidden">
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={on ? "true" : undefined}
                className={`focus-visible:ring-ring flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none ${
                  on
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] border-transparent"
                }`}
                style={
                  on
                    ? {
                        borderColor: `color-mix(in oklab, ${s.color} 55%, transparent)`,
                        backgroundColor: `color-mix(in oklab, ${s.color} 14%, transparent)`,
                      }
                    : undefined
                }
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ background: s.color }}
                />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
