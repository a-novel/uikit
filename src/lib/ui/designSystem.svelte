<script lang="ts">
  import { THEME_CONTEXT_KEY, THEME_STORAGE_KEY, Theme, loadTheme } from "$lib/ui/designSystem.helper.svelte.js";
  import { saveLocalStorage } from "$lib/utils/index.js";

  import "./designSystem.css";

  import { type Snippet, setContext } from "svelte";

  import { z } from "zod";

  interface Props {
    theme?: z.infer<typeof Theme>;
    children?: Snippet;
  }

  let { children, theme = $bindable(loadTheme()) }: Props = $props();

  setContext(THEME_CONTEXT_KEY, {
    get theme() {
      return theme;
    },
    set theme(value: z.infer<typeof Theme>) {
      theme = value;
    },
  });

  // Sync theme updates with localStorage.
  $effect(() => {
    saveLocalStorage(THEME_STORAGE_KEY, theme);
  });
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css?family=Arimo" rel="stylesheet" />
</svelte:head>

<div data-theme={theme}></div>

{@render children?.()}
