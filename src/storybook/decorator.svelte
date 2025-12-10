<script lang="ts">
  import { LocaleSyncComponent } from "$lib";
  import { LNG } from "$lib/const";
  import "$lib/locales/kit.loader.svelte.js";
  import { DesignSystemComponent } from "$lib/ui";

  import type { ComponentProps, Snippet } from "svelte";

  interface Props {
    theme: ComponentProps<typeof DesignSystemComponent>["theme"];
    locale: LNG;
    children?: Snippet;
  }

  let { children, locale, theme }: Props = $props();
</script>

<DesignSystemComponent {theme}>
  <LocaleSyncComponent {locale}>
    {@render children?.()}
  </LocaleSyncComponent>
</DesignSystemComponent>
