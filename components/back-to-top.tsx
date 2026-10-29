"use client";

import { useEffect, useState } from "react";

/** A button that appears after scrolling down and jumps back to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      className="border-border bg-background hover:bg-muted focus-visible:ring-ring fixed right-4 bottom-4 z-20 rounded-full border px-4 py-2 text-sm font-medium shadow-sm focus-visible:ring-2 focus-visible:outline-none"
    >
      Back to top
    </button>
  );
}
