import { NextResponse } from "next/server";
import { TERMS_VERSION } from "@/lib/legal";
import { createClient } from "@/lib/supabase/server";

/** Record that the signed-in student agreed to the current Terms and Privacy Policy. */
export async function POST() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return NextResponse.json({ error: "Sign in to continue." }, { status: 401 });

  const { error } = await client.rpc("accept_my_terms", { version: TERMS_VERSION });
  if (error) {
    if (error.code === "P0002") {
      return NextResponse.json({ error: "Register first." }, { status: 404 });
    }
    console.error("accept_my_terms failed", error);
    return NextResponse.json(
      { error: "Could not save your agreement. Try again." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
