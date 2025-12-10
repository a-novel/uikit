import { DEFAULT_LNG } from "$lib/const";
import { locales } from "$lib/locales/data.js";
import * as main from "$lib/locales/main.loader.server.svelte.js";

import type { Handle } from "@sveltejs/kit";
import { loadLocales, runWithLocale } from "wuchale/load-utils/server";

// load at server startup
await loadLocales(main.key, main.loadIDs, main.loadCatalog, locales);

export function localeHandler(): Handle {
  return async function handle({ event, resolve }) {
    const locale = event.url.searchParams.get("locale");
    if (!locales.includes(locale ?? "")) {
      return await runWithLocale(DEFAULT_LNG, () => resolve(event));
    }

    return await runWithLocale(locale!, () => resolve(event));
  };
}
