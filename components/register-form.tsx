"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { UsernameField } from "@/components/username-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DOMAIN_LABELS,
  DOMAIN_VALUES,
  admissionYearOptions,
  makeRegistrationSchema,
  type RegistrationValues,
} from "@/lib/registration/schema";

const selectClass =
  "border-input bg-background h-9 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export function RegisterForm() {
  const today = useMemo(() => new Date(), []);
  const schema = useMemo(() => makeRegistrationSchema(today), [today]);
  const years = useMemo(() => admissionYearOptions(today), [today]);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      section: "",
      secondaryDomains: [],
      leetcode: "",
      github: "",
      codeforces: "",
      codechef: "",
    },
  });

  async function onSubmit(values: RegistrationValues) {
    setFormError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setDone(true);
        return;
      }
      if (body.fields) {
        for (const [name, message] of Object.entries(body.fields)) {
          setError(name as keyof RegistrationValues, { message: String(message) });
        }
      }
      setFormError(body.error ?? "Could not save your registration. Try again.");
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    }
  }

  if (done) {
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-bold">Registered</h2>
        <p>Your accounts are saved. Scores appear after the next refresh.</p>
        <Link href="/students" className="underline underline-offset-4">
          View registered students
        </Link>
      </div>
    );
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
            defaultValue=""
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
          defaultValue=""
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

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-0.5 size-4" {...register("consent")} />
          <span>
            Your name, year, domain and coding scores are visible to other students in the
            department.
          </span>
        </label>
        <p className="text-danger min-h-5 text-sm">{errors.consent?.message}</p>
      </div>

      {formError && (
        <p role="alert" className="text-danger text-sm">
          {formError}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-fit">
        {isSubmitting ? "Registering…" : "Register"}
      </Button>
    </form>
  );
}
