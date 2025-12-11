<script lang="ts">
  import { LNG } from "$lib/const";
  import { TolgeeConfig } from "$lib/locales";
  import { DesignSystemComponent } from "$lib/ui";

  import { LocaleSyncComponent } from "./index";

  import type { ComponentProps, Snippet } from "svelte";

  import { TolgeeProvider } from "@tolgee/svelte";

  interface Props {
    theme: ComponentProps<typeof DesignSystemComponent>["theme"];
    locale: LNG;
    children?: Snippet;
  }

  let { children, locale, theme }: Props = $props();
</script>

<TolgeeProvider tolgee={TolgeeConfig}>
  <LocaleSyncComponent {locale} />
  <DesignSystemComponent {theme}>
    {@render children?.()}
  </DesignSystemComponent>
</TolgeeProvider>
