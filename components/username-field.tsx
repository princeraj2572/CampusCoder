"use client";

import { useState } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USERNAME_PATTERNS, type Platform } from "@/lib/registration/schema";

type Status = "idle" | "checking" | "found" | "not-found" | "unavailable";

export function UsernameField({
  platform,
  label,
  required,
  registration,
  error,
  value,
}: {
  platform: Platform;
  label: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  value: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function check() {
    const username = value.trim();
    if (!USERNAME_PATTERNS[platform].test(username) || platform === "codechef") {
      setStatus("idle");
      return;
    }
    setStatus("checking");
    try {
      const res = await fetch(
        `/api/verify?platform=${platform}&username=${encodeURIComponent(username)}`,
      );
      const body = await res.json();
      setStatus(
        body.result === "found" || body.result === "not-found"
          ? body.result
          : "unavailable",
      );
    } catch {
      setStatus("unavailable");
    }
  }

  const message =
    error?.message ??
    (status === "checking"
      ? "Checking…"
      : status === "found"
        ? `Found on ${label}`
        : status === "not-found"
          ? `We could not find that ${label} username`
          : status === "unavailable"
            ? `Could not check ${label} right now. You can still register.`
            : null);
  const tone =
    error || status === "not-found"
      ? "text-danger"
      : status === "found"
        ? "text-success"
        : "text-muted-foreground";

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={platform}>
        {label} username{required ? "" : " (optional)"}
      </Label>
      <Input
        id={platform}
        autoComplete="off"
        aria-invalid={error ? true : undefined}
        aria-describedby={`${platform}-msg`}
        {...registration}
        onBlur={(e) => {
          registration.onBlur(e);
          void check();
        }}
      />
      <p id={`${platform}-msg`} className={`min-h-5 text-sm ${tone}`}>
        {message}
      </p>
    </div>
  );
}
