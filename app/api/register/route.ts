import { NextResponse } from "next/server";
import { verifyAccount } from "@/lib/platforms";
import { makeRegistrationSchema, toRegistrationInput } from "@/lib/registration/schema";
import { isAnonRegistrationEnabled } from "@/lib/temp-anon/flag";
import { createServiceClient } from "@/lib/supabase/service";

const LABELS = {
  leetcode: "LeetCode",
  github: "GitHub",
  codeforces: "Codeforces",
  codechef: "CodeChef",
};

export async function POST(request: Request) {
  if (!isAnonRegistrationEnabled()) return new NextResponse(null, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the form values as JSON." }, { status: 400 });
  }

  const parsed = makeRegistrationSchema(new Date()).safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] ??= issue.message;
    }
    return NextResponse.json(
      { error: "Check the highlighted fields.", fields },
      { status: 422 },
    );
  }

  const input = toRegistrationInput(parsed.data);
  const results = await Promise.all(
    input.accounts.map(async (a) => ({
      ...a,
      result: await verifyAccount(a.platform, a.username, {
        token: process.env.GITHUB_TOKEN,
      }),
    })),
  );

  const missing = results.filter((r) => r.result === "not-found");
  if (missing.length > 0) {
    const fields = Object.fromEntries(
      missing.map((r) => [
        r.platform,
        `We could not find that ${LABELS[r.platform]} username`,
      ]),
    );
    return NextResponse.json(
      { error: "Check the highlighted fields.", fields },
      { status: 422 },
    );
  }
  if (results.some((r) => r.result === "unavailable")) {
    return NextResponse.json(
      { error: "We could not check your usernames right now. Try again in a minute." },
      { status: 503 },
    );
  }

  const service = createServiceClient();
  for (const a of input.accounts) {
    const { data } = await service
      .from("student_platforms")
      .select("platform")
      .eq("platform", a.platform)
      .eq("username_key", a.username.toLowerCase())
      .limit(1);
    if (data && data.length > 0) {
      return NextResponse.json(
        {
          error: "That account is already registered.",
          fields: {
            [a.platform]: `That ${LABELS[a.platform]} username is already registered`,
          },
        },
        { status: 409 },
      );
    }
  }

  const { data, error } = await service.rpc("register_student", {
    payload: {
      full_name: input.fullName,
      admission_year: input.admissionYear,
      section: input.section ?? null,
      primary_domain: input.primaryDomain,
      secondary_domains: input.secondaryDomains,
      accounts: input.accounts,
    },
  });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That account is already registered." },
        { status: 409 },
      );
    }
    console.error("register_student failed", error);
    return NextResponse.json(
      { error: "Could not save your registration. Try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ id: data });
}
