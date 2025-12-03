<script lang="ts">
  import { LNG } from "$lib/const";
  import { loadTheme, setLocale, Theme, THEME_CONTEXT_KEY, THEME_STORAGE_KEY } from "$lib/ui/designSystem.svelte.js";
  import { saveLocalStorage } from "$lib/utils/index.js";

  import "./designSystem.css";

  import { setContext, type Snippet } from "svelte";

  import { z } from "zod";

  interface Props {
    theme?: z.infer<typeof Theme>;
    children?: Snippet;
    locale?: LNG;
  }

  let { theme = loadTheme(), children, locale = LNG.EN }: Props = $props();

  setContext(THEME_CONTEXT_KEY, () => theme);

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
