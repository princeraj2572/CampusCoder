import type { Platform } from "@/lib/registration/schema";
import { fetchCodeChefProfile } from "./codechef";
import { fetchCodeforcesProfile } from "./codeforces";
import { fetchGitHubProfile } from "./github";
import { fetchLeetCodeProfile } from "./leetcode";
import type { FetchOptions, PlatformProfile, ProfileFetcher } from "./types";

export const FETCHERS: Record<Platform, ProfileFetcher> = {
  leetcode: fetchLeetCodeProfile,
  github: fetchGitHubProfile,
  codeforces: fetchCodeforcesProfile,
  codechef: fetchCodeChefProfile,
};

export function fetchProfile(
  platform: Platform,
  username: string,
  opts?: FetchOptions,
): Promise<PlatformProfile> {
  return FETCHERS[platform](username, opts);
}
