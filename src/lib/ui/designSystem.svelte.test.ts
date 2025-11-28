import "$lib/test/setup/base.js";
import { DesignSystemComponent, THEME_STORAGE_KEY } from "$lib/ui/index.js";

import { expect, describe, it } from "vitest";

import { render, waitFor } from "@testing-library/svelte";

describe("DesignSystemComponent", () => {
  it("renders theme correctly", async () => {
    const proxyTheme = {
      get element() {
        return document.querySelector("div");
      }
    };

    const component = render(DesignSystemComponent, {
      target: document.body,
      props: {
        theme: "dark"
      }
    });

    await waitFor(() => {
      expect(proxyTheme.element!.getAttribute("data-theme")).toBe("dark");
    });

    await component.rerender({
      theme: "light"
    });

    await waitFor(() => {
      expect(proxyTheme.element!.getAttribute("data-theme")).toBe("light");
    });
  });

  it("loads theme from local storage", async () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify("dark"));

    const proxyTheme = {
      get element() {
        return document.querySelector("div");
      }
    };

    render(DesignSystemComponent, {
      target: document.body
    });

    await waitFor(() => {
      expect(proxyTheme.element!.getAttribute("data-theme")).toBe("dark");
    });
  });
});
