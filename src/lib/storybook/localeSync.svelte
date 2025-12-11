<script lang="ts">
  import { LNG } from "$lib/const";

  import { getTolgee } from "@tolgee/svelte";

  interface Props {
    locale: LNG;
  }

  let { locale }: Props = $props();
  const tolgee = getTolgee(["language"]);

  $effect(() => {
    $tolgee.changeLanguage(locale).then(() => {
      console.log("changed locale to:", locale);
    });
  });
</script>
