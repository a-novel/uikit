import { afterEach, vi } from "vitest";

afterEach(() => {
  if (global.window) {
    window.localStorage.clear(); // Clear if available.
  }

  vi.clearAllMocks();
});
