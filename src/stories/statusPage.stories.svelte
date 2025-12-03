<script context="module" lang="ts">
  import { StatusPage } from "$lib/ui/components";

  import { LOREM_IPSUM } from "./utils";

  import InfoIcon from "virtual:icons/material-symbols/info-outline";

  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/StatusPage",
    component: StatusPage,
    tags: ["autodocs"],
    argTypes: {},
    args: {}
  });
</script>

{#snippet primary()}
  <StatusPage>
    {LOREM_IPSUM.MEDIUM}
  </StatusPage>
{/snippet}

<Story name="Primary" template={primary} />

{#snippet titleAndIcon()}
  <StatusPage>
    {LOREM_IPSUM.MEDIUM}
    {#snippet title()}
      {LOREM_IPSUM.SHORTER}
    {/snippet}
    {#snippet icon()}
      <InfoIcon />
    {/snippet}
  </StatusPage>
{/snippet}

<Story name="Title and Icon" template={titleAndIcon} />

{#snippet colors()}
  <StatusPage color="default">
    {LOREM_IPSUM.MEDIUM}
    {#snippet title()}
      {LOREM_IPSUM.SHORTER}
    {/snippet}
    {#snippet icon()}
      <InfoIcon />
    {/snippet}
  </StatusPage>
  <hr />
  <StatusPage color="primary">
    {LOREM_IPSUM.MEDIUM}
    {#snippet title()}
      {LOREM_IPSUM.SHORTER}
    {/snippet}
    {#snippet icon()}
      <InfoIcon />
    {/snippet}
  </StatusPage>
  <hr />
  <StatusPage color="secondary">
    {LOREM_IPSUM.MEDIUM}
    {#snippet title()}
      {LOREM_IPSUM.SHORTER}
    {/snippet}
    {#snippet icon()}
      <InfoIcon />
    {/snippet}
  </StatusPage>
  <hr />
  <StatusPage color="accent">
    {LOREM_IPSUM.MEDIUM}
    {#snippet title()}
      {LOREM_IPSUM.SHORTER}
    {/snippet}
    {#snippet icon()}
      <InfoIcon />
    {/snippet}
  </StatusPage>
{/snippet}

<Story name="Colors" template={colors} />
