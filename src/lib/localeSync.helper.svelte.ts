import { DEFAULT_LNG, LNG, LngSchema, SUPPORTED_LNGS } from "$lib/const";
import { loadLocalStorage } from "$lib/utils/index.js";

import { getContext } from "svelte";

import { loadLocale as loadLocaleInternal } from "wuchale/load-utils";

export const LOCALE_STORAGE_KEY = "app_locale";
export const LOCALE_CONTEXT_KEY = LOCALE_STORAGE_KEY;

/**
 * Update the user application locale.
 */
export async function setLocale(locale: LNG, localesData: string[]) {
  if (typeof window === "undefined" || !localesData.includes(locale)) {
    return;
  }

  window.document.documentElement.lang = locale;
  await loadLocaleInternal(locale);
}

/**
 * Retrieve locale based on user browser preferences.
 */
function loadPreferredLocale(): LNG {
  if (typeof navigator !== "undefined") {
    const navigatorLangs = navigator.languages;

    for (const lang of navigatorLangs) {
      const lowerLang = lang.toLowerCase();
      const match = SUPPORTED_LNGS.find((supportedLang) => lowerLang.startsWith(supportedLang));

      if (match) {
        return match;
      }
    }
  }

  return DEFAULT_LNG;
}

/**
 * Load configured locale if set, and fallback to browser settings to select a relevant default locale.
 */
export function loadLocale(): LNG {
  return loadLocalStorage(LOCALE_STORAGE_KEY, LngSchema, loadPreferredLocale());
}

/**
 * Get the currently active locale.
 */
export function getActiveLocale(): { locale: LNG } {
  const locale = getContext(LOCALE_CONTEXT_KEY) as { locale: LNG };
  if (!locale) {
    throw new Error(`Unable to find locale: ${LOCALE_CONTEXT_KEY}`);
  }

  return locale;
}
