<script lang="ts">
  import { LNG } from "$lib/const";
  import {
    loadTheme,
    setLocale,
    Theme,
    THEME_CONTEXT_KEY,
    LOCALE_CONTEXT_KEY,
    THEME_STORAGE_KEY,
    LOCALE_STORAGE_KEY,
    loadLocale,
  } from "$lib/ui/designSystem.svelte.js";
  import { saveLocalStorage } from "$lib/utils/index.js";

  import "./designSystem.css";

  import { setContext, type Snippet } from "svelte";

  import { z } from "zod";

  interface Props {
    theme?: z.infer<typeof Theme>;
    children?: Snippet;
    locale?: LNG;
  }

  let { children, theme = $bindable(loadTheme()), locale = $bindable(loadLocale()) }: Props = $props();

  setContext(THEME_CONTEXT_KEY, {
    get theme() {
      return theme;
    },
    set theme(value: z.infer<typeof Theme>) {
      theme = value;
    },
  });
  setContext(LOCALE_CONTEXT_KEY, {
    get locale() {
      return locale;
    },
    set locale(value: LNG) {
      locale = value;
    },
  });

  // Sync theme updates with localStorage.
  $effect(() => {
    saveLocalStorage(THEME_STORAGE_KEY, theme);
  });
  // Sync external locale with the package lang.
  $effect(() => {
    saveLocalStorage(LOCALE_STORAGE_KEY, locale);
    setLocale(locale);
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet" />
</svelte:head>

<div data-theme={theme}></div>

{@render children?.()}
