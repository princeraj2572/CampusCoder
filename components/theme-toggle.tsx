"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

const subscribe = () => () => {};

/** An icon button that switches between light and dark. Shows a sun while dark, a moon while light. */
export function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  // False on the server and during hydration, true afterwards, so the markup always matches.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="text-muted-foreground hover:text-foreground hover:bg-foreground/10 focus-visible:ring-ring flex items-center gap-3 rounded-lg p-2 focus-visible:ring-2 focus-visible:outline-none"
    >
      {mounted ? (
        dark ? (
          <SunIcon size={20} />
        ) : (
          <MoonIcon size={20} />
        )
      ) : (
        <span className="size-5" />
      )}
      {withLabel && (
        <span className="text-base">{dark ? "Light theme" : "Dark theme"}</span>
      )}
    </button>
  );
}
