import type { RoadmapLink } from "../types";

export interface RoleStage {
  title: string;
  /** Rough time to spend here, for someone studying alongside college. */
  time: string;
  study: string[];
  /** What to make before moving on. */
  build: string;
}

export interface RoleProject {
  level: "Starter" | "Intermediate" | "Advanced";
  name: string;
  what: string;
  /** What a reviewer learns about you from it. */
  proves: string;
}

export interface BaseRole {
  slug: string;
  name: string;
  /** A CSS colour variable from the theme. */
  color: string;
  tagline: string;
  /** Plain words: what this person does all day. */
  job: string;
  daily: string[];
  suits: string;
  /** Main language or tools, for the comparison table. */
  stack: string;
  stages: RoleStage[];
  projects: RoleProject[];
  senior: { do: string[]; avoid: string[] };
  interview: string[];
  /** The ideas a student must understand, in plain words. */
  concepts: { name: string; what: string; why: string }[];
  links: RoadmapLink[];
}

export interface RoleExtra {
  /** Tools to install and get comfortable with. */
  tools: string[];
  /** What the job asks at each level, so a student knows where the road goes. */
  ladder: { level: string; focus: string }[];
  /** What to aim for in the first three months of a job or internship. */
  first90: { days: string; goal: string }[];
  /** A realistic week of study alongside college. */
  week: { when: string; what: string }[];
  /** Mistakes juniors make in this role. */
  mistakes: string[];
  /** Questions worth asking a senior. */
  ask: string[];
}

export interface RoleInfo {
  /** The kinds of employer, so a student knows where to apply. */
  where: { type: string; what: string }[];
  /** Common beliefs that are wrong, and what is true. */
  myths: { myth: string; truth: string }[];
}

export type Role = BaseRole & RoleExtra & RoleInfo;
