"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Each request refreshes a small batch, so the button keeps asking until nothing is left.
const MAX_ROUNDS = 40;

type Batch = { picked?: number; succeeded?: number; failed?: number; error?: string };

/** Refreshes every account that is due, batch after batch, then reloads the numbers on the page. */
export function RefreshButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  async function run() {
    setBusy(true);
    setMessage(null);
    const since = new Date().toISOString();
    let succeeded = 0;
    let failed = 0;
    try {
      for (let round = 0; round < MAX_ROUNDS; round++) {
        const res = await fetch("/api/admin/refresh", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ since }),
        });
        const body = (await res.json().catch(() => null)) as Batch | null;
        if (!res.ok || !body || body.picked === undefined) {
          setMessage({ text: body?.error ?? "The refresh did not run.", ok: false });
          return;
        }
        if (body.picked === 0) break;
        succeeded += body.succeeded ?? 0;
        failed += body.failed ?? 0;
        setMessage({
          text: `Refreshing… ${succeeded + failed} accounts done so far.`,
          ok: true,
        });
      }
      const total = succeeded + failed;
      setMessage(
        total === 0
          ? { text: "No accounts are due right now.", ok: true }
          : {
              text: `Refreshed ${succeeded} of ${total} accounts${
                failed ? `, ${failed} failed (see below)` : ""
              }.`,
              ok: failed === 0,
            },
      );
    } catch {
      setMessage({ text: "Could not reach the server. Try again.", ok: false });
    } finally {
      setBusy(false);
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button type="button" onClick={run} disabled={busy}>
        {busy ? "Refreshing…" : "Refresh now"}
      </Button>
      {message && (
        <p
          role="status"
          className="text-sm"
          style={{ color: message.ok ? "var(--foreground)" : "var(--danger)" }}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
