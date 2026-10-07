import { NextResponse } from "next/server";
import { promoteIfAdmin } from "@/lib/auth/promote";
import {
  checkAccountsExist,
  findTakenAccounts,
  PLATFORM_LABELS,
} from "@/lib/me/accounts";
import { TERMS_VERSION } from "@/lib/legal";
import { toRpcPayload } from "@/lib/me/payload";
import {
  makeEditSchema,
  makeRegistrationSchema,
  toRegistrationInput,
  type Platform,
} from "@/lib/registration/schema";
import { createClient } from "@/lib/supabase/server";

type Client = Awaited<ReturnType<typeof createClient>>;
type Fields = Record<string, string>;

const fieldErrors = (issues: { path: PropertyKey[]; message: string }[]): Fields => {
  const fields: Fields = {};
  for (const issue of issues) fields[String(issue.path[0] ?? "form")] ??= issue.message;
  return fields;
};

async function readJson(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function signedIn(client: Client) {
  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}

const unauthorized = () =>
  NextResponse.json({ error: "Sign in to continue." }, { status: 401 });

/** Shared by register and update: the usernames must exist and must not belong to someone else. */
async function checkUsernames(
  client: Client,
  accounts: { platform: Platform; username: string }[],
  ownStudentId?: string,
) {
  const { notFound, unavailable } = await checkAccountsExist(
    accounts,
    process.env.GITHUB_TOKEN,
  );
  if (notFound.length > 0) {
    const fields = Object.fromEntries(
      notFound.map((p) => [p, `We could not find that ${PLATFORM_LABELS[p]} username`]),
    );
    return NextResponse.json(
      { error: "Check the highlighted fields.", fields },
      { status: 422 },
    );
  }
  if (unavailable) {
    return NextResponse.json(
      { error: "We could not check your usernames right now. Try again in a minute." },
      { status: 503 },
    );
  }
  const taken = await findTakenAccounts(client, accounts, ownStudentId);
  if (taken.length > 0) {
    const fields = Object.fromEntries(
      taken.map((p) => [p, `That ${PLATFORM_LABELS[p]} username is already registered`]),
    );
    return NextResponse.json(
      { error: "That account is already registered.", fields },
      { status: 409 },
    );
  }
  return null;
}

async function currentStudentId(client: Client, userId: string) {
  const { data } = await client
    .from("students")
    .select("id")
    .eq("auth_user_id", userId)
    .maybeSingle();
  return data?.id as string | undefined;
}

/** Register the signed-in user. */
export async function POST(request: Request) {
  const client = await createClient();
  const user = await signedIn(client);
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (body === null) {
    return NextResponse.json({ error: "Send the form values as JSON." }, { status: 400 });
  }
  const parsed = makeRegistrationSchema(new Date()).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Check the highlighted fields.",
        fields: fieldErrors(parsed.error.issues),
      },
      { status: 422 },
    );
  }
  if (await currentStudentId(client, user.id)) {
    return NextResponse.json(
      { error: "You are already registered. Edit your details instead." },
      { status: 409 },
    );
  }

  const input = toRegistrationInput(parsed.data);
  const problem = await checkUsernames(client, input.accounts);
  if (problem) return problem;

  const { data, error } = await client.rpc("register_my_student", {
    payload: toRpcPayload(input),
  });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That account is already registered." },
        { status: 409 },
      );
    }
    console.error("register_my_student failed", error);
    return NextResponse.json(
      { error: "Could not save your registration. Try again." },
      { status: 500 },
    );
  }
  // The registration form's consent box is the agreement to the current terms.
  const agreed = await client.rpc("accept_my_terms", { version: TERMS_VERSION });
  if (agreed.error) console.error("accept_my_terms failed", agreed.error);
  await promoteIfAdmin(user);
  return NextResponse.json({ id: data });
}

/** Update the signed-in user's details. */
export async function PUT(request: Request) {
  const client = await createClient();
  const user = await signedIn(client);
  if (!user) return unauthorized();

  const body = await readJson(request);
  if (body === null) {
    return NextResponse.json({ error: "Send the form values as JSON." }, { status: 400 });
  }
  const parsed = makeEditSchema(new Date()).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Check the highlighted fields.",
        fields: fieldErrors(parsed.error.issues),
      },
      { status: 422 },
    );
  }
  const studentId = await currentStudentId(client, user.id);
  if (!studentId) {
    return NextResponse.json(
      { error: "Register first, then you can edit your details." },
      { status: 404 },
    );
  }

  const input = toRegistrationInput(parsed.data);
  const problem = await checkUsernames(client, input.accounts, studentId);
  if (problem) return problem;

  const { error } = await client.rpc("update_my_student", {
    payload: toRpcPayload(input, parsed.data.leaderboardOptOut),
  });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That account is already registered." },
        { status: 409 },
      );
    }
    console.error("update_my_student failed", error);
    return NextResponse.json(
      { error: "Could not save your changes. Try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}

/** Delete the signed-in user's student record and everything attached to it. */
export async function DELETE() {
  const client = await createClient();
  const user = await signedIn(client);
  if (!user) return unauthorized();

  const { error } = await client.rpc("delete_my_student");
  if (error) {
    console.error("delete_my_student failed", error);
    return NextResponse.json(
      { error: "Could not delete your data. Try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
