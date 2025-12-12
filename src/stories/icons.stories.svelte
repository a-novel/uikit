<script context="module" lang="ts">
  import { CheckIcon, LoadingIcon } from "$lib/ui/icons";

  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Icons",
    tags: ["autodocs"],
  });
</script>

{#snippet loading()}
  <div
    style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m); font-size: var(--font-size-h1)"
  >
    <LoadingIcon />
    <LoadingIcon color="primary" />
    <LoadingIcon color="secondary" />
    <LoadingIcon color="accent" />
  </div>
{/snippet}

<Story name="Loading" template={loading} />

{#snippet check()}
  <div
    style="display: flex; align-items: center; justify-content: center; flex-direction: row; gap: var(--spacing-m); font-size: var(--font-size-h1)"
  >
    <CheckIcon />
    <CheckIcon color="primary" />
    <CheckIcon color="secondary" />
    <CheckIcon color="accent" />
  </div>
{/snippet}

<Story name="Check" template={check} />
