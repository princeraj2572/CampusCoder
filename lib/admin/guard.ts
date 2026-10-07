import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Whether the current visitor is a signed-in admin. */
export async function isAdmin(): Promise<boolean> {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return false;
  const { data: student } = await client
    .from("students")
    .select("role")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  return student?.role === "admin";
}

/**
 * For admin-only pages. Anyone who is not a signed-in admin gets the normal "not found" page,
 * so the existence of the admin area is not advertised.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) notFound();
}
