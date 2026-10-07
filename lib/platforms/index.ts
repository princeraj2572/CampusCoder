import type { Platform } from "@/lib/registration/schema";
import { verifyCodeforces } from "./codeforces";
import { verifyGitHub } from "./github";
import { verifyLeetCode } from "./leetcode";
import type { VerifyOptions, VerifyResult } from "./types";

export type { VerifyOptions, VerifyResult } from "./types";

export async function verifyAccount(
  platform: Platform,
  username: string,
  opts: VerifyOptions = {},
): Promise<VerifyResult> {
  switch (platform) {
    case "leetcode":
      return verifyLeetCode(username, opts);
    case "github":
      return verifyGitHub(username, opts);
    case "codeforces":
      return verifyCodeforces(username, opts);
    case "codechef":
      return "unchecked"; // no reliable public API; format is checked at registration
  }
}
