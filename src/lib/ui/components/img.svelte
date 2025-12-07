<script lang="ts">
  import { getActiveTheme } from "$lib/ui";

  import type { HTMLImgAttributes } from "svelte/elements";

  interface Props extends HTMLImgAttributes {
    darkModeSrc?: string | undefined | null;
    lightModeSrc?: string | undefined | null;
  }

  let { src, darkModeSrc, lightModeSrc, alt, ...props }: Props = $props();

  let activeTheme = getActiveTheme();

  let actualSrc = $derived.by(() => {
    switch (activeTheme.theme) {
      case "dark":
        return darkModeSrc ?? src;
      case "light":
        return lightModeSrc ?? src;
      default:
        return src;
    }
  });
</script>

<img {...props} {alt} src={actualSrc} />
