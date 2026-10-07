import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** "My profile": your public profile page, or the registration form if you have not registered. */
export default async function MyProfilePage() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) redirect("/login?next=/profile");

  const { data: student } = await client
    .from("students")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();
  redirect(student ? `/students/${student.id}` : "/register");
}
