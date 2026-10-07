import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/**
 * For admin-only pages. Anyone who is not a signed-in admin gets the normal "not found" page,
 * so the existence of the admin area is not advertised.
 */
export async function requireAdmin(): Promise<void> {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) notFound();
  const { data: student } = await client
    .from("students")
    .select("role")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  if (student?.role !== "admin") notFound();
}
