<script lang="ts">
  import { loadTheme, Theme, THEME_STORAGE_KEY } from "$lib/ui/designSystem.svelte.js";
  import { saveLocalStorage } from "$lib/utils/index.js";
  import { setLocale } from "$paraglide/runtime";

  import "./designSystem.css";

  import type { Snippet } from "svelte";

  import { z } from "zod";

  interface Props {
    theme?: z.infer<typeof Theme>;
    children?: Snippet;
    locale?: Parameters<typeof setLocale>[0];
  }

  let { theme = loadTheme(), children, locale = "en" }: Props = $props();

  // Sync theme updates with localStorage.
  $effect(() => {
    saveLocalStorage(THEME_STORAGE_KEY, theme);
  });

  // Sync external locale with the package lang.
  $effect(() => {
    setLocale(locale);
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet" />
</svelte:head>

<div data-theme={theme}>
  {@render children?.()}
</div>
