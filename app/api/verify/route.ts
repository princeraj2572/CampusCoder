import { NextResponse } from "next/server";
import { verifyAccount } from "@/lib/platforms";
import { USERNAME_PATTERNS, type Platform } from "@/lib/registration/schema";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const platform = params.get("platform") as Platform | null;
  const username = (params.get("username") ?? "").trim();
  if (
    !platform ||
    !(platform in USERNAME_PATTERNS) ||
    !USERNAME_PATTERNS[platform].test(username)
  ) {
    return NextResponse.json(
      { error: "Enter a valid platform and username." },
      { status: 400 },
    );
  }
  const result = await verifyAccount(platform, username, {
    token: process.env.GITHUB_TOKEN,
  });
  return NextResponse.json({ result });
}
