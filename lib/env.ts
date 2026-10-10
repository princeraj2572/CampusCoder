import { z } from "zod";

const publicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1).url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const serverSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  GITHUB_TOKEN: z.string().min(1),
  ADMIN_BOOTSTRAP_EMAIL: z.string().min(1).email(),
});

const serviceSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1).url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
});

type Source = Record<string, string | undefined>;

function parse<T extends z.ZodTypeAny>(schema: T, source: Source): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    const names = result.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Invalid or missing environment variables: ${names}`);
  }
  return result.data;
}

export function parsePublicEnv(source: Source) {
  return parse(publicSchema, source);
}

export function parseServerEnv(source: Source) {
  return parse(serverSchema, source);
}

export function parseServiceEnv(source: Source) {
  return parse(serviceSchema, source);
}
