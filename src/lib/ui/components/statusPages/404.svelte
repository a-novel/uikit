<script lang="ts">
  import { StatusPage } from "$lib/ui/components";

  import NotFoundIcon from "virtual:icons/nrk/media-404-notfound";

  import type { HTMLAttributes } from "svelte/elements";

  type Props = Omit<HTMLAttributes<HTMLElement>, "title" | "children">;

  let { ...props }: Props = $props();
</script>

<!-- Kind of a 'normal' error so no need to use alarming color scheme -->
<StatusPage {...props} color="primary">
  {#snippet icon()}
    <NotFoundIcon />
  {/snippet}
  {#snippet title()}
    Page not found.
  {/snippet}
  <span>This page either does not exist or has been removed.</span>
  <br />
  <span style="color: var(--color-gray-600)">Please check your browser URL.</span>
</StatusPage>
