import type { Config } from "prettier";

const config: Config = {
  useTabs: false,
  tabWidth: 2,
  trailingComma: "es5",
  semi: true,
  singleQuote: false,
  printWidth: 120,
  importOrder: [
    "^\\$",
    "^\\.(\\.)?\\/",
    "^node\\:",
    "^virtual\\:",
    "^svelte",
    "^(vite|vitest)",
    "^@a-novel",
    "<THIRD_PARTY_MODULES>",
  ],
  importOrderSeparation: true,
  plugins: ["prettier-plugin-svelte", "@trivago/prettier-plugin-sort-imports", "prettier-plugin-packagejson"],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
      },
    },
  ],
};

export default config;
