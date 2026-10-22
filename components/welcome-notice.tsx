"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CHECKS = 8;
const EVERY_MS = 4000;

/**
 * Shown on someone's own profile right after they register. Their scores are fetched in the
 * background, so until they arrive the page quietly checks again a few times.
 */
export function WelcomeNotice({ hasScores }: { hasScores: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (hasScores) return;
    let checks = 0;
    const timer = setInterval(() => {
      checks += 1;
      router.refresh();
      if (checks >= CHECKS) clearInterval(timer);
    }, EVERY_MS);
    return () => clearInterval(timer);
  }, [hasScores, router]);

  return (
    <div
      role="status"
      className="border-border flex flex-col gap-1 rounded-2xl border p-4 text-sm"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--board-github) 10%, var(--background))",
      }}
    >
      <p className="font-semibold">You are in. Welcome to CampusCoders.</p>
      <p>
        {hasScores
          ? "Your scores are here. They refresh about every 20 minutes, so your rank will move as you solve more."
          : "We are fetching your scores now. Your rank usually shows within a minute, and this page updates by itself."}
      </p>
    </div>
  );
}
