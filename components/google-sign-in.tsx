"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

function GoogleLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
      />
      <path
        fill="#FBBC05"
        d="M10.5 28.7c-.5-1.4-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

export function GoogleSignIn({ next }: { next: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);
  // Returning users just sign in. New users agree to the terms first.
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const needsAgreement = mode === "signup";

  async function signIn() {
    if (needsAgreement && !agreed) return;
    setBusy(true);
    setError(null);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        // Always let the person pick which Google account to use.
        queryParams: { prompt: "select_account" },
      },
    });
    if (error) {
      setError("Could not start Google sign-in. Try again in a moment.");
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        role="tablist"
        aria-label="Sign in or create an account"
        className="bg-foreground/[0.06] flex w-fit gap-1 rounded-full p-1"
      >
        {(
          [
            ["signin", "I have an account"],
            ["signup", "I am new here"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={mode === key}
            onClick={() => {
              setMode(key);
              setError(null);
            }}
            className={`focus-visible:ring-ring rounded-full px-4 py-1.5 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none ${
              mode === key
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {needsAgreement && (
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
      )}
      <Button
        type="button"
        onClick={signIn}
        disabled={busy || (needsAgreement && !agreed)}
        className="h-11 w-fit gap-3 border border-black/15 bg-white px-5 text-base font-medium text-[#1f1f1f] hover:bg-white/90"
      >
        <GoogleLogo />
        {busy
          ? "Opening Google…"
          : needsAgreement
            ? "Sign up with Google"
            : "Sign in with Google"}
      </Button>
      {needsAgreement && !agreed && (
        <p className="text-muted-foreground text-sm">
          Tick the box to create your account.
        </p>
      )}
      {error && (
        <p role="alert" className="text-danger text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
