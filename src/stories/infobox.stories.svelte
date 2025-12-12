<script context="module" lang="ts">
  import { InfoBox, Section } from "$lib/ui/components";
  import { LOREM_IPSUM } from "$lib/utils";

  import { createRawSnippet } from "svelte";

  import Icon from "@iconify/svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/InfoBox",
    component: InfoBox,
    tags: ["autodocs"],
    argTypes: {},
    args: {
      children: createRawSnippet(() => ({
        render: () => LOREM_IPSUM.MEDIUM,
      })),
    },
  });
</script>

<Story name="Primary" />

{#snippet colors()}
  <InfoBox color="default">
    {LOREM_IPSUM.MEDIUM}
  </InfoBox>
  <br /><br />
  <InfoBox color="primary">
    {LOREM_IPSUM.MEDIUM}
  </InfoBox>
  <br /><br />
  <InfoBox color="secondary">
    {LOREM_IPSUM.MEDIUM}
  </InfoBox>
  <br /><br />
  <InfoBox color="accent">
    {LOREM_IPSUM.MEDIUM}
  </InfoBox>
{/snippet}

<Story name="Colors" template={colors} />

{#snippet colorsOnSection()}
  <Section>
    <InfoBox color="default">
      {LOREM_IPSUM.MEDIUM}
    </InfoBox>
    <br /><br />
    <InfoBox color="primary">
      {LOREM_IPSUM.MEDIUM}
    </InfoBox>
    <br /><br />
    <InfoBox color="secondary">
      {LOREM_IPSUM.MEDIUM}
    </InfoBox>
    <br /><br />
    <InfoBox color="accent">
      {LOREM_IPSUM.MEDIUM}
    </InfoBox>
  </Section>
{/snippet}

<Story name="Colors on Section" template={colorsOnSection} />

{#snippet icons()}
  <InfoBox color="default">
    {LOREM_IPSUM.MEDIUM}
    {#snippet icon()}
      <Icon icon="material-symbols:info-outline" />
    {/snippet}
    {#snippet title()}
      Hello world!
    {/snippet}
  </InfoBox>
  <br /><br />
  <InfoBox color="primary">
    {LOREM_IPSUM.MEDIUM}
    {#snippet icon()}
      <Icon icon="material-symbols:info-outline" />
    {/snippet}
    {#snippet title()}
      Hello world!
    {/snippet}
  </InfoBox>
  <br /><br />
  <InfoBox color="secondary">
    {LOREM_IPSUM.MEDIUM}
    {#snippet icon()}
      <Icon icon="material-symbols:info-outline" />
    {/snippet}
    {#snippet title()}
      Hello world!
    {/snippet}
  </InfoBox>
  <br /><br />
  <InfoBox color="accent">
    {LOREM_IPSUM.MEDIUM}
    {#snippet icon()}
      <Icon icon="material-symbols:info-outline" />
    {/snippet}
    {#snippet title()}
      Hello world!
    {/snippet}
  </InfoBox>
{/snippet}

<Story name="Icons" template={icons} />
