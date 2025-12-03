import "$lib/test/setup/base.js";
import { Debounce } from "$lib/utils/debounce";

import { describe, expect, it, vi } from "vitest";

describe("debounce", () => {
  it("calls the function", async () => {
    const callback = vi.fn();

    const debouncer = new Debounce(10);

    debouncer.call(callback);

    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(callback).toHaveBeenCalledOnce();
  });

  it("calls the function multiple times", async () => {
    const callback = vi.fn();

    const debouncer = new Debounce(10);

    debouncer.call(callback);
    await new Promise((resolve) => setTimeout(resolve, 20));
    debouncer.call(callback);
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it("ignores calls that are too close", async () => {
    const callback = vi.fn();

    const debouncer = new Debounce(10);

    debouncer.call(callback);
    debouncer.call(callback); // This call is ignored.
    await new Promise((resolve) => setTimeout(resolve, 20));
    debouncer.call(callback);
    await new Promise((resolve) => setTimeout(resolve, 20));

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
