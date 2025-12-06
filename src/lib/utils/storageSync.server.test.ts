import "$lib/test/setup/base.js";
import { loadLocalStorage, saveLocalStorage } from "$lib/utils/storageSync.svelte.js";

import { describe, expect, it } from "vitest";

const TEST_KEY = "test-key";

describe("local storage sync", () => {
  it("is ineffective (but doesn't crash) on SSR", () => {
    const value = { a: 1, b: "text" };
    saveLocalStorage(TEST_KEY, value);
    expect(loadLocalStorage(TEST_KEY)).toBeNull();
  });
  it("returns placeholder", () => {
    const value = { a: 1, b: "text" };
    saveLocalStorage(TEST_KEY, value);
    expect(loadLocalStorage(TEST_KEY, undefined, "foo")).toBe("foo");
  });
});
