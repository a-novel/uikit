import { adapter as svelte } from "@wuchale/svelte";
import { defineConfig } from "wuchale";

export default defineConfig({
  sourceLocale: "en",
  otherLocales: ["fr"],
  adapters: {
    kit: svelte({
      localesDir: "./src/lib/locales",
      loader: "sveltekit",
      files: ["src/lib/**/*.svelte"],
    }),
  },
});
