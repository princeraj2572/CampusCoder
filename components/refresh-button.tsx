"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/** Runs a refresh of the most overdue accounts, then reloads the numbers on the page. */
export function RefreshButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  async function run() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/refresh", { method: "POST" });
      const body = (await res.json().catch(() => null)) as {
        picked?: number;
        succeeded?: number;
        failed?: number;
        error?: string;
      } | null;
      if (!res.ok || !body || body.picked === undefined) {
        setMessage({ text: body?.error ?? "The refresh did not run.", ok: false });
      } else if (body.picked === 0) {
        setMessage({ text: "No accounts are due right now.", ok: true });
      } else {
        const failed = body.failed ?? 0;
        setMessage({
          text: `Refreshed ${body.succeeded} of ${body.picked} accounts${
            failed ? `, ${failed} failed (see below)` : ""
          }.`,
          ok: failed === 0,
        });
      }
      router.refresh();
    } catch {
      setMessage({ text: "Could not reach the server. Try again.", ok: false });
    } finally {
      setBusy(false);
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
