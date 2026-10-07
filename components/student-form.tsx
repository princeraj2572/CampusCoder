"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { UsernameField } from "@/components/username-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DOMAIN_LABELS,
  DOMAIN_VALUES,
  admissionYearOptions,
  makeEditSchema,
  makeRegistrationSchema,
  type RegistrationValues,
} from "@/lib/registration/schema";

export type StudentFormValues = Omit<RegistrationValues, "consent"> & {
  consent?: boolean;
  leaderboardOptOut?: boolean;
};

const selectClass =
  "border-input bg-background h-9 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

const EMPTY: Partial<StudentFormValues> = {
  fullName: "",
  section: "",
  secondaryDomains: [],
  leetcode: "",
  github: "",
  codeforces: "",
  codechef: "",
};

/** One form for both registering and editing details; the mode picks the rules and the request. */
export function StudentForm({
  mode,
  initial,
  todayIso,
}: {
  mode: "register" | "edit";
  initial?: Partial<StudentFormValues>;
  /** The current time, supplied by the server at request time. */
  todayIso: string;
}) {
  const router = useRouter();
  const today = useMemo(() => new Date(todayIso), [todayIso]);
  const resolver = useMemo(
    () =>
      zodResolver(
        mode === "register" ? makeRegistrationSchema(today) : makeEditSchema(today),
      ) as unknown as Resolver<StudentFormValues>,
    [mode, today],
  );
  const years = useMemo(() => {
    const options = admissionYearOptions(today);
    const current = initial?.admissionYear;
    // A student who has left the 1st to 4th year window still sees their own year.
    if (current && !options.some((o) => o.year === current)) {
      options.push({ year: current, label: `Joined ${current}` });
    }
    return options;
  }, [today, initial?.admissionYear]);

  const [formError, setFormError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormValues>({
    resolver,
    defaultValues: {
      ...EMPTY,
      ...(mode === "edit" ? { leaderboardOptOut: false } : { consent: false }),
      ...initial,
    },
  });

  async function onSubmit(values: StudentFormValues) {
    setFormError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/me", {
        method: mode === "register" ? "POST" : "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        if (mode === "register") {
          router.push("/profile?welcome=1");
        } else {
          setSaved(true);
        }
        router.refresh();
        return;
      }
      if (body.fields) {
        for (const [name, message] of Object.entries(body.fields)) {
          setError(name as keyof StudentFormValues, { message: String(message) });
        }
      }
      setFormError(
        body.error ??
          (mode === "register"
            ? "Could not save your registration. Try again."
            : "Could not save your changes. Try again."),
      );
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          autoComplete="name"
          aria-invalid={errors.fullName ? true : undefined}
          {...register("fullName")}
        />
        <p className="text-danger min-h-5 text-sm">{errors.fullName?.message}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="admissionYear">Year</Label>
          <select
            id="admissionYear"
            defaultValue={initial?.admissionYear ?? ""}
            className={selectClass}
            {...register("admissionYear", { valueAsNumber: true })}
          >
            <option value="" disabled>
              Select your year
            </option>
            {years.map((y) => (
              <option key={y.year} value={y.year}>
                {y.label}
              </option>
            ))}
          </select>
          <p className="text-danger min-h-5 text-sm">{errors.admissionYear?.message}</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="section">Section or batch (optional)</Label>
          <Input id="section" {...register("section")} />
          <p className="text-danger min-h-5 text-sm">{errors.section?.message}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="primaryDomain">Primary domain</Label>
        <select
          id="primaryDomain"
          defaultValue={initial?.primaryDomain ?? ""}
          className={selectClass}
          {...register("primaryDomain")}
        >
          <option value="" disabled>
            Pick one
          </option>
          {DOMAIN_VALUES.map((d) => (
            <option key={d} value={d}>
              {DOMAIN_LABELS[d]}
            </option>
          ))}
        </select>
        <p className="text-danger min-h-5 text-sm">{errors.primaryDomain?.message}</p>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium">Secondary domains (up to two)</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {DOMAIN_VALUES.map((d) => (
            <label key={d} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                value={d}
                className="size-4"
                {...register("secondaryDomains")}
              />
              {DOMAIN_LABELS[d]}
            </label>
          ))}
        </div>
        <p className="text-danger min-h-5 text-sm">{errors.secondaryDomains?.message}</p>
      </fieldset>

      <UsernameField
        platform="leetcode"
        label="LeetCode"
        required
        registration={register("leetcode")}
        error={errors.leetcode}
        value={watch("leetcode")}
      />
      <UsernameField
        platform="github"
        label="GitHub"
        required
        registration={register("github")}
        error={errors.github}
        value={watch("github")}
      />
      <UsernameField
        platform="codeforces"
        label="Codeforces"
        registration={register("codeforces")}
        error={errors.codeforces}
        value={watch("codeforces")}
      />
      <UsernameField
        platform="codechef"
        label="CodeChef"
        registration={register("codechef")}
        error={errors.codechef}
        value={watch("codechef")}
      />
      {mode === "edit" && (
        <p className="text-muted-foreground -mt-2 text-sm">
          Changing a username clears that platform&apos;s old scores. The new
          account&apos;s scores appear after the next refresh.
        </p>
      )}

      {mode === "register" ? (
        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-0.5 size-4" {...register("consent")} />
            <span>
              I agree to the{" "}
              <Link
                href="/terms"
                target="_blank"
                className="underline underline-offset-4"
              >
                Terms and Conditions
              </Link>{" "}
              and the{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </Link>
              . My name, year, domain and coding scores are shown on the public
              leaderboards, which anyone can see.
            </span>
          </label>
          <p className="text-danger min-h-5 text-sm">{errors.consent?.message}</p>
        </div>
      ) : (
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-0.5 size-4"
            {...register("leaderboardOptOut")}
          />
          <span>
            Hide me from the leaderboards. Your profile stays visible to other students,
            but you are not ranked.
          </span>
        </label>
      )}

      {formError && (
        <p role="alert" className="text-danger text-sm">
          {formError}
        </p>
      )}
      {saved && (
        <p role="status" className="text-success text-sm">
          Changes saved.{" "}
          <Link href="/profile" className="underline underline-offset-4">
            View your profile
          </Link>
        </p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting
          ? mode === "register"
            ? "Registering…"
            : "Saving…"
          : mode === "register"
            ? "Register"
            : "Save changes"}
      </Button>
    </form>
  );
}
