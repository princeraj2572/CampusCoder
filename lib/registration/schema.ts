import { z } from "zod";
import { academicStartYear } from "@/lib/year";

export const DOMAIN_VALUES = [
  "web_dev",
  "app_dev",
  "ai_ml",
  "data_science",
  "dsa_cp",
  "cybersecurity",
  "cloud_devops",
  "iot_embedded",
  "blockchain",
  "game_dev",
  "other",
] as const;
export type Domain = (typeof DOMAIN_VALUES)[number];

export const DOMAIN_LABELS: Record<Domain, string> = {
  web_dev: "Web development",
  app_dev: "App development",
  ai_ml: "AI/ML",
  data_science: "Data science",
  dsa_cp: "DSA/CP",
  cybersecurity: "Cybersecurity",
  cloud_devops: "Cloud/DevOps",
  iot_embedded: "IoT/Embedded",
  blockchain: "Blockchain",
  game_dev: "Game development",
  other: "Other",
};

export type Platform = "leetcode" | "github" | "codeforces" | "codechef";

export const USERNAME_PATTERNS: Record<Platform, RegExp> = {
  leetcode: /^[A-Za-z0-9_-]{1,40}$/,
  github: /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/,
  codeforces: /^[A-Za-z0-9_.-]{3,24}$/,
  codechef: /^[A-Za-z0-9_.]{3,30}$/,
};

const required = (platform: Platform, label: string) =>
  z
    .string()
    .trim()
    .min(1, `Enter your ${label} username`)
    .regex(USERNAME_PATTERNS[platform], `That is not a valid ${label} username`);

const optional = (platform: Platform, label: string) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || USERNAME_PATTERNS[platform].test(v), {
      message: `That is not a valid ${label} username`,
    });

function detailsShape(today: Date) {
  const start = academicStartYear(today);
  return {
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name")
      .max(80, "Keep your name under 80 characters"),
    admissionYear: z
      .number({ message: "Select your admission year" })
      .int()
      .min(start - 3, "Admission year must be for 1st to 4th year students")
      .max(start, "Admission year must be for 1st to 4th year students"),
    section: z.string().trim().max(20, "Keep the section under 20 characters"),
    primaryDomain: z.enum(DOMAIN_VALUES, { message: "Pick a primary domain" }),
    secondaryDomains: z
      .array(z.enum(DOMAIN_VALUES))
      .max(2, "Pick at most two secondary domains"),
    leetcode: required("leetcode", "LeetCode"),
    github: required("github", "GitHub"),
    codeforces: optional("codeforces", "Codeforces"),
    codechef: optional("codechef", "CodeChef"),
  };
}

function checkDomains(
  v: { primaryDomain: Domain; secondaryDomains: Domain[] },
  ctx: z.RefinementCtx,
) {
  if (v.secondaryDomains.includes(v.primaryDomain)) {
    ctx.addIssue({
      code: "custom",
      path: ["secondaryDomains"],
      message: "A secondary domain cannot repeat your primary domain",
    });
  }
  if (new Set(v.secondaryDomains).size !== v.secondaryDomains.length) {
    ctx.addIssue({
      code: "custom",
      path: ["secondaryDomains"],
      message: "Each secondary domain can be picked once",
    });
  }
}

export function makeRegistrationSchema(today: Date) {
  return z
    .object({
      ...detailsShape(today),
      consent: z.boolean().refine((v) => v === true, {
        message: "Confirm you have read the note above",
      }),
    })
    .superRefine(checkDomains);
}

/** Same details as registration, without the consent tick, plus the leaderboard opt-out. */
export function makeEditSchema(today: Date) {
  return z
    .object({ ...detailsShape(today), leaderboardOptOut: z.boolean() })
    .superRefine(checkDomains);
}

export type RegistrationValues = z.infer<ReturnType<typeof makeRegistrationSchema>>;
export type EditValues = z.infer<ReturnType<typeof makeEditSchema>>;

const ORDINALS = ["1st", "2nd", "3rd", "4th"];

export function admissionYearOptions(today: Date): { year: number; label: string }[] {
  const start = academicStartYear(today);
  return ORDINALS.map((ord, i) => ({
    year: start - i,
    label: `${ord} year (joined ${start - i})`,
  }));
}

export function toRegistrationInput(v: Omit<RegistrationValues, "consent">) {
  const accounts: { platform: Platform; username: string }[] = [
    { platform: "leetcode", username: v.leetcode },
    { platform: "github", username: v.github },
  ];
  if (v.codeforces) accounts.push({ platform: "codeforces", username: v.codeforces });
  if (v.codechef) accounts.push({ platform: "codechef", username: v.codechef });
  return {
    fullName: v.fullName,
    admissionYear: v.admissionYear,
    ...(v.section ? { section: v.section } : {}),
    primaryDomain: v.primaryDomain,
    secondaryDomains: v.secondaryDomains,
    accounts,
  };
}
