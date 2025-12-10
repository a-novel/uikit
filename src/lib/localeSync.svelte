<script lang="ts">
  import { LNG } from "$lib/const";
  import { LOCALE_CONTEXT_KEY, LOCALE_STORAGE_KEY, loadLocale, setLocale } from "$lib/localeSync.helper.svelte";
  import { locales } from "$lib/locales/data";
  import "$lib/locales/main.loader.svelte.js";
  import { saveLocalStorage } from "$lib/utils";

  import { type Snippet, setContext } from "svelte";

  interface Props {
    children?: Snippet;
    locale?: LNG;
  }

  let { children, locale = $bindable(loadLocale()) }: Props = $props();

  setContext(LOCALE_CONTEXT_KEY, {
    get locale() {
      return locale;
    },
    set locale(value: LNG) {
      locale = value;
    },
  });
  // Sync external locale with the package lang.
  $effect(() => {
    saveLocalStorage(LOCALE_STORAGE_KEY, locale);
    setLocale(locale, locales);
  });
</script>

{@render children?.()}
