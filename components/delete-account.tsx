"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Deleting removes the student record and all scores and history. The name must be typed to confirm. */
export function DeleteAccount({ fullName }: { fullName: string }) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const matches = typed.trim() === fullName.trim();

  async function remove() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/me", { method: "DELETE" });
      if (res.ok) {
        window.location.assign("/register");
        return;
      }
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? "Could not delete your data. Try again.");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    }
    setBusy(false);
  }

  return (
    <section className="border-danger/40 flex flex-col gap-4 rounded-md border p-4">
      <h2 className="font-display text-lg font-semibold">Delete my data</h2>
      <p className="text-muted-foreground text-sm">
        This removes your registration, scores and history from CampusCoders. It cannot be
        undone. You can register again later.
      </p>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmName">Type your full name ({fullName}) to confirm</Label>
        <Input
          id="confirmName"
          autoComplete="off"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
        />
      </div>
      {error && (
        <p role="alert" className="text-danger text-sm">
          {error}
        </p>
      )}
      <Button
        type="button"
        variant="destructive"
        disabled={!matches || busy}
        onClick={remove}
        className="w-fit"
      >
        {busy ? "Deleting…" : "Delete my data"}
      </Button>
    </section>
  );
}
