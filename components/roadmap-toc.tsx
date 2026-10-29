"use client";

import { useEffect, useState } from "react";

/** The "On this page" index, with the section being read highlighted. */
export function RoadmapToc({
  items,
  focus,
}: {
  items: { id: string; label: string }[];
  focus: string;
}) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const seen = new Set<string>();
    const pick = () => {
      // The first section on screen is the one being read.
      const first = items.find((i) => seen.has(i.id));
      if (first) setActive(first.id);
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) seen.add(e.target.id);
          else seen.delete(e.target.id);
        }
        pick();
      },
      { rootMargin: "-80px 0px -60% 0px" },
    );
    for (const i of items) {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <ul className="border-border flex flex-col gap-0.5 border-l">
      {items.map((i) => (
        <li key={i.id}>
          <a
            href={`#${i.id}`}
            aria-current={active === i.id ? "location" : undefined}
            className={`-ml-px block border-l py-1 pl-3 text-sm ${
              active === i.id
                ? "text-foreground border-current font-semibold"
                : "text-muted-foreground hover:text-foreground border-transparent hover:border-current"
            } ${focus}`}
          >
            {i.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
