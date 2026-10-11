"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // False on the server and during hydration, true afterwards, so the markup always matches.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md px-2 py-1 text-sm focus-visible:ring-2 focus-visible:outline-none"
    >
      {mounted ? (dark ? "Light" : "Dark") : "Theme"}
    </button>
  );
}
