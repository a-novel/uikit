import { peerDependencies } from "./package.json";

import os from "node:os";
import path from "node:path";

import { defineConfig } from "vitest/config";

import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { CookieJar } from "jsdom";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [sveltekit(), svelteTesting(), Icons({ autoInstall: true, compiler: "svelte" })],
  build: {
    sourcemap: true,
    rollupOptions: {
      external: Object.keys(peerDependencies)
    }
  },
  resolve: process.env.VITEST
    ? {
        conditions: ["browser"]
      }
    : undefined,
  test: {
    expect: { requireAssertions: true },
    environmentOptions: {
      cookieJar: new CookieJar(undefined, { allowSpecialUseDomain: true })
    },
    projects: [
      {
        extends: "./vite.config.ts",
        test: {
          globals: true,
          name: "client",
          environment: "jsdom",
          execArgv: ["--localstorage-file", path.resolve(os.tmpdir(), `vitest-${process.pid}.localstorage`)],
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
      clean: true,
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx,svelte}"],
      // No tests on storybook stories.
      // No tests on purely visual components (unless absolutely required).
      exclude: ["src/stories", "src/lib/ui/components", "src/scripts"]
    }
  }
});
