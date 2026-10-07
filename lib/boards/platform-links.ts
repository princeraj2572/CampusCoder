import type { Platform } from "@/lib/registration/schema";

export const PLATFORM_ORDER: Platform[] = [
  "leetcode",
  "github",
  "codeforces",
  "codechef",
];

export const PLATFORM_NAME: Record<Platform, string> = {
  leetcode: "LeetCode",
  github: "GitHub",
  codeforces: "Codeforces",
  codechef: "CodeChef",
};

export const PROFILE_URL: Record<Platform, (username: string) => string> = {
  leetcode: (u) => `https://leetcode.com/u/${u}/`,
  github: (u) => `https://github.com/${u}`,
  codeforces: (u) => `https://codeforces.com/profile/${u}`,
  codechef: (u) => `https://www.codechef.com/users/${u}`,
};
