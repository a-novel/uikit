import { BROWSER } from "esm-env";
import type { ZodType } from "zod";

/**
 * Save a value to localStorage as JSON. If the value is nullish, the localStorage key is cleared instead.
 *
 * This method is safe to run server-side, and will result in a no-op.
 */
export function saveLocalStorage<T>(key: string, value?: T) {
  // Never save anything to localStorage during server-side rendering.
  if (!BROWSER) return;

  if (value == null) {
    window.localStorage.removeItem(key);
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Load a value from localStorage and parse it as JSON.
 *
 * If a validator is provided, the value will be validated and parsed using it. If
 * validation fails, the entry will be removed from localStorage and the placeholder will be returned.
 *
 * This method is safe to run server-side, and will result in a no-op.
 */
export function loadLocalStorage<T, P = null>(key: string, validator?: ZodType<T>, placeholder: P = null as P): T | P {
  // Never load anything from localStorage during server-side rendering.
  if (!BROWSER) return placeholder;

  const raw = window.localStorage.getItem(key);
  if (!raw) return placeholder;

  try {
    // If any of the following operations throw, we clear the entry from window.localStorage.
    const parsed = JSON.parse(raw);
    return validator ? validator.parse(parsed) : (parsed as T);
  } catch (e) {
    console.warn(
      `Failed to load local storage storage '${key}', invalid value found. The key will be cleared. Error detail: ${e}`
    );
    window.localStorage.removeItem(key);
    return placeholder;
  }
}
