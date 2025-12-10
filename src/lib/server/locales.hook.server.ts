import { DEFAULT_LNG } from "$lib/const";
import { locales } from "$lib/locales/data.js";

import type { Handle } from "@sveltejs/kit";
import { runWithLocale } from "wuchale/load-utils/server";

export function localeHandler(): Handle {
  return async function handle({ event, resolve }) {
    const locale = event.url.searchParams.get("locale");
    if (!locales.includes(locale ?? "")) {
      return await runWithLocale(DEFAULT_LNG, () => resolve(event));
    }

    return await runWithLocale(locale!, () => resolve(event));
  };
}
