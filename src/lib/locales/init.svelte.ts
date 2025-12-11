import { DevTools, Tolgee } from "@tolgee/svelte";
import { FormatIcu } from "@tolgee/format-icu";
import { LanguageDetector, LanguageStorage } from "@tolgee/web";
import { DEFAULT_LNG, SUPPORTED_LNGS } from "$lib/const";

export const TolgeeConfig = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .use(LanguageDetector())
  .use(LanguageStorage())
  .init({
    defaultLanguage: DEFAULT_LNG,
    fallbackLanguage: DEFAULT_LNG,
    availableLanguages: SUPPORTED_LNGS,
    defaultNs: "common",
    staticData: {
      "en:common": () => import("./tr/common/en.json").then(m => m.default),
      "fr:common": () => import("./tr/common/fr.json").then(m => m.default),
    },
  });
