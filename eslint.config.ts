import svelteConfig from "./svelte.config.js";

import path from "node:path";

import { Eslint } from "@a-novel/nodelib-config";

import { defineConfig } from "eslint/config";

export default defineConfig(
  ...Eslint({
    ignores: ["**/locales/*.{js,ts}", "**/locales/.wuchale"],
    gitIgnorePath: path.join(import.meta.dirname, ".gitignore"),
    svelte: svelteConfig,
    isLib: true,
    storybook: true,
  })
);
