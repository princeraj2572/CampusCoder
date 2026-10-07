import { isAdminEmail } from "@/lib/auth/admin";
import { createServiceClient } from "@/lib/supabase/service";

/**
 * Makes the ADMIN_BOOTSTRAP_EMAIL account an admin once it has a student record.
 * Safe to call repeatedly; does nothing for everyone else.
 */
export async function promoteIfAdmin(user: {
  id: string;
  email?: string | null;
}): Promise<void> {
  if (!isAdminEmail(user.email, process.env.ADMIN_BOOTSTRAP_EMAIL)) return;
  await createServiceClient()
    .from("students")
    .update({ role: "admin" })
    .eq("auth_user_id", user.id);
}
