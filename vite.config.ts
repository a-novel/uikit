import { peerDependencies } from "./package.json";

import { defineConfig } from "vitest/config";

import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { CookieJar } from "jsdom";

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: Object.keys(peerDependencies)
    }
  },
  test: {
    expect: { requireAssertions: true },
    environmentOptions: {
      cookieJar: new CookieJar(undefined, { allowSpecialUseDomain: true })
    },
    projects: [
      {
        extends: "./vite.config.ts",
        resolve: {
          conditions: ["browser"]
        },
        test: {
          globals: true,
          name: "client",
          environment: "jsdom",
          include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
          exclude: ["src/lib/server/**"]
        }
      },
      {
        extends: "./vite.config.ts",
        test: {
          name: "server",
          environment: "node",
          include: ["src/**/*.{test,spec}.{js,ts}", "src/lib/server/**"],
          exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"]
        }
      }
    ],
    coverage: {
      enabled: true,
      clean: false,
      provider: "v8",
      reporter: ["json"],
      reportsDirectory: "./coverage/unit",
      include: ["src/**/*.{ts,tsx,svelte}"]
    }
  }
});
