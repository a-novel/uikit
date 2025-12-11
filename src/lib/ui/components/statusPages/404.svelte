<script lang="ts">
  import { StatusPage } from "$lib/ui/components";

  import type { HTMLAttributes } from "svelte/elements";

  import Icon from "@iconify/svelte";
  import { getTranslate } from "@tolgee/svelte";

  type Props = Omit<HTMLAttributes<HTMLElement>, "title" | "children">;

  let { ...props }: Props = $props();

  const { t } = getTranslate("common");
</script>

<!-- Kind of a 'normal' error so no need to use alarming color scheme -->
<StatusPage {...props} color="primary">
  {#snippet icon()}
    <Icon icon="nrk:media-404-notfound" />
  {/snippet}
  {#snippet title()}
    {$t("statusPages.404.title", "Page not found.")}
  {/snippet}
  <span>
    {$t("statusPages.404.message", "This page either does not exist or has been removed.")}
  </span>
  <br />
  <span style="color: var(--color-gray-600)">
    {$t("statusPages.404.messageSub", "Please check your browser URL.")}
  </span>
</StatusPage>
