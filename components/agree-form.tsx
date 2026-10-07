"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function AgreeForm({ next }: { next: string }) {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!agreed) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/terms", { method: "POST" });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error ?? "Could not save your agreement. Try again.");
        setBusy(false);
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex max-w-prose items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 size-4 shrink-0"
        />
        <span>
          I have read and agree to the{" "}
          <Link
            href="/terms"
            target="_blank"
            className="text-foreground underline underline-offset-4"
          >
            Terms and Conditions
          </Link>{" "}
          and the{" "}
          <Link
            href="/privacy"
            target="_blank"
            className="text-foreground underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      <Button type="button" onClick={submit} disabled={!agreed || busy} className="w-fit">
        {busy ? "Saving…" : "Agree and continue"}
      </Button>
      {error && (
        <p role="alert" className="text-danger text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
