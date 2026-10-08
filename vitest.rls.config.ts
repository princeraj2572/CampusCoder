import { loadEnv } from "vite";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  test: {
    environment: "node",
    include: ["tests/rls/**/*.test.ts"],
    env: loadEnv(mode, process.cwd(), ""),
    testTimeout: 30000,
  },
  resolve: { alias: { "@": path.resolve(__dirname) } },
}));
