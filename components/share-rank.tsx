"use client";

import { useState } from "react";

/**
 * "Share my rank". Opens the phone's share sheet where there is one, otherwise copies the message
 * and the link. The link goes to the public leaderboards, so friends can open it without signing in.
 */
export function ShareRank({ message }: { message: string }) {
  const [note, setNote] = useState<string | null>(null);

  async function share() {
    const url = `${location.origin}/leaderboards/problem-solving`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "CampusCoders", text: message, url });
        return;
      }
      await navigator.clipboard.writeText(`${message} ${url}`);
      setNote("Copied. Paste it in your group chat.");
    } catch (e) {
      // Closing the share sheet is not an error.
      if (e instanceof DOMException && e.name === "AbortError") return;
      setNote("Could not share. Copy the page link instead.");
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex h-9 items-center rounded-lg border border-black/15 bg-white px-4 text-sm font-semibold text-[#0f1623] transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#0f1623]/50 focus-visible:outline-none dark:border-white/25 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
      >
        Share my rank
      </button>
      {note && (
        <span role="status" className="text-xs text-black/70 dark:text-white/80">
          {note}
        </span>
      )}
    </span>
  );
}
