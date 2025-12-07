import { DEFAULT_LNG, LNG, LngSchema, SUPPORTED_LNGS } from "$lib/const";
import { locales } from "$lib/locales/data";
import "$lib/locales/main.loader.svelte.js";
import { loadLocalStorage } from "$lib/utils/index.js";

import { getContext } from "svelte";

import { loadLocale as loadLocaleInternal } from "wuchale/load-utils";
import { z } from "zod";

export const Theme = z.enum(["dark", "light"]);
export const Color = z.enum(["primary", "secondary", "accent"]);
export const ComponentColor = z.enum(["default", ...Color.options]);

export const THEME_STORAGE_KEY = "app_theme";
export const THEME_CONTEXT_KEY = THEME_STORAGE_KEY;

export const LOCALE_STORAGE_KEY = "app_locale";
export const LOCALE_CONTEXT_KEY = LOCALE_STORAGE_KEY;

/**
 * Load theme from browser preferences.
 *
 * Prefer the usage of {@link loadTheme} to retrieve the most relevant theme.
 */
export function loadPreferredTheme(): z.infer<typeof Theme> {
  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

/**
 * Load relevant user theme from environment.
 */
export function loadTheme(): z.infer<typeof Theme> {
  return loadLocalStorage(THEME_STORAGE_KEY, Theme, loadPreferredTheme());
}

/**
 * Get the currently active theme.
 */
export function getActiveTheme(): { theme: z.infer<typeof Theme> } {
  const theme = getContext(THEME_CONTEXT_KEY) as { theme: z.infer<typeof Theme> };
  if (!theme) {
    throw new Error(`Unable to find theme: ${THEME_CONTEXT_KEY}`);
  }

  return theme;
}

/**
 * Update the user application locale.
 */
export async function setLocale(locale: LNG) {
  if (typeof window === "undefined" || !locales.includes(locale)) {
    return;
  }

  window.document.documentElement.lang = locale;
  await loadLocaleInternal(locale);
}

export function loadPreferredLocale(): LNG {
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
