import "$lib/test/setup/base.js";
import { loadLocalStorage, saveLocalStorage } from "$lib/utils/storageSync.svelte.js";

import { describe, expect, it, vi } from "vitest";

import { z } from "zod";

const TEST_KEY = "test-key";

describe("saveLocalStorage", () => {
  it("saves value to localStorage", () => {
    const value = { a: 1, b: "text" };

    // Save to localStorage
    saveLocalStorage(TEST_KEY, value);

    // Verify it's saved correctly
    const storedValue = localStorage.getItem(TEST_KEY);
    expect(JSON.parse(storedValue!)).toEqual(value);
  });

  it("removes existing key when value is undefined", () => {
    const value = { a: 1, b: "text" };

    // First, save a value to localStorage
    saveLocalStorage(TEST_KEY, value);
    expect(localStorage.getItem(TEST_KEY)).not.toBeNull();

    // Now, remove it by saving undefined
    saveLocalStorage(TEST_KEY, undefined);
    expect(localStorage.getItem(TEST_KEY)).toBeNull();
  });
});

describe("loadLocalStorage", () => {
  it("loads and parses value from localStorage", () => {
    const value = { a: 1, b: "text" };

    // Save to localStorage directly for testing
    localStorage.setItem(TEST_KEY, JSON.stringify(value));

    // Load using the function
    const loadedValue = loadLocalStorage<typeof value>(TEST_KEY);
    expect(loadedValue).toEqual(value);
  });

  it("returns null for non-existing key", () => {
    const loadedValue = loadLocalStorage(TEST_KEY);
    expect(loadedValue).toBeNull();
  });

  it("clears the entry and returns null for invalid JSON", () => {
    // Save invalid JSON directly to localStorage
    localStorage.setItem(TEST_KEY, "invalid-json");

    // Spy on console.warn to verify it's called
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const loadedValue = loadLocalStorage(TEST_KEY);
    expect(loadedValue).toBeNull();
    expect(localStorage.getItem(TEST_KEY)).toBeNull();

    consoleWarnSpy.mockRestore();
  });

  describe("zod validation", () => {
    const schema = z.object({ a: z.number(), b: z.string() });

    it("returns validated value", () => {
      const value = { a: 1, b: "text" };
      localStorage.setItem(TEST_KEY, JSON.stringify(value));

      const loadedValue = loadLocalStorage(TEST_KEY, schema);
      expect(loadedValue).toEqual(value);
    });

    it("clears the entry and returns null for invalid data", () => {
      const invalidValue = { a: "not-a-number", b: "text" };
      localStorage.setItem(TEST_KEY, JSON.stringify(invalidValue));

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const loadedValue = loadLocalStorage(TEST_KEY, schema);
      expect(loadedValue).toBeNull();
      expect(localStorage.getItem(TEST_KEY)).toBeNull();

      consoleWarnSpy.mockRestore();
    });
  });
});
