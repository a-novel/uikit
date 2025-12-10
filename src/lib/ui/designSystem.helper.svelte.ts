import { loadLocalStorage } from "$lib/utils/index.js";

import { getContext } from "svelte";

import { z } from "zod";

export const Theme = z.enum(["dark", "light"]);
export const Color = z.enum(["primary", "secondary", "accent"]);
export const ComponentColor = z.enum(["default", ...Color.options]);

export const THEME_STORAGE_KEY = "app_theme";
export const THEME_CONTEXT_KEY = THEME_STORAGE_KEY;

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
