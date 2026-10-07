import { describe, expect, it } from "vitest";
import { parsePublicEnv, parseServerEnv, parseServiceEnv } from "@/lib/env";

const validPublic = {
  NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
};
const validServer = {
  SUPABASE_SERVICE_ROLE_KEY: "service-key",
  GITHUB_TOKEN: "ghp_x",
  ADMIN_BOOTSTRAP_EMAIL: "admin@example.com",
};

describe("parsePublicEnv", () => {
  it("accepts valid values", () => {
    expect(parsePublicEnv(validPublic)).toEqual(validPublic);
  });
  it("names the missing variable", () => {
    expect(() => parsePublicEnv({ NEXT_PUBLIC_SUPABASE_ANON_KEY: "k" })).toThrow(
      /NEXT_PUBLIC_SUPABASE_URL/,
    );
  });
  it("rejects empty strings", () => {
    expect(() =>
      parsePublicEnv({ ...validPublic, NEXT_PUBLIC_SUPABASE_ANON_KEY: "" }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_ANON_KEY/);
  });
  it("rejects a malformed URL", () => {
    expect(() =>
      parsePublicEnv({ ...validPublic, NEXT_PUBLIC_SUPABASE_URL: "not a url" }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_URL/);
  });
});

describe("parseServerEnv", () => {
  it("accepts valid values", () => {
    expect(parseServerEnv(validServer)).toEqual(validServer);
  });
  it("rejects a malformed admin email", () => {
    expect(() =>
      parseServerEnv({ ...validServer, ADMIN_BOOTSTRAP_EMAIL: "nope" }),
    ).toThrow(/ADMIN_BOOTSTRAP_EMAIL/);
  });
  it("does not accept a NEXT_PUBLIC_-named secret in place of the real one", () => {
    const { SUPABASE_SERVICE_ROLE_KEY: _drop, ...rest } = validServer;
    expect(() =>
      parseServerEnv({ ...rest, NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: "leaked" }),
    ).toThrow(/SUPABASE_SERVICE_ROLE_KEY/);
  });
});

describe("parseServiceEnv", () => {
  it("needs only the URL and the service-role key", () => {
    const env = {
      NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co",
      SUPABASE_SERVICE_ROLE_KEY: "service-key",
    };
    expect(parseServiceEnv(env)).toEqual(env);
  });
  it("names what is missing", () => {
    expect(() =>
      parseServiceEnv({ NEXT_PUBLIC_SUPABASE_URL: "https://abc.supabase.co" }),
    ).toThrow(/SUPABASE_SERVICE_ROLE_KEY/);
    expect(() => parseServiceEnv({ SUPABASE_SERVICE_ROLE_KEY: "k" })).toThrow(
      /NEXT_PUBLIC_SUPABASE_URL/,
    );
  });
});
