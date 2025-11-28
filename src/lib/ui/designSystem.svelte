<script lang="ts">
  import { loadTheme, Theme, THEME_STORAGE_KEY } from "$lib/ui/designSystem.svelte.js";
  import { saveLocalStorage } from "$lib/utils/index.js";

  import "./designSystem.css";

  import type { Snippet } from "svelte";

  import { z } from "zod";

  interface Props {
    theme?: z.infer<typeof Theme>;
    children?: Snippet;
  }

  let { theme = loadTheme(), children }: Props = $props();

  // Sync theme updates with localStorage.
  $effect(() => {
    saveLocalStorage(THEME_STORAGE_KEY, theme);
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet" />
</svelte:head>

<div data-theme={theme}>
  {@render children?.()}
</div>
