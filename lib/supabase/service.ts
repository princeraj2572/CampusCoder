import { createClient } from "@supabase/supabase-js";
import { parseServiceEnv } from "@/lib/env";

// Server and scripts only: the service-role key bypasses RLS. Never import from client components.
export function createServiceClient() {
  const env = parseServiceEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
