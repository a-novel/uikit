<script context="module" lang="ts">
  import { ErrorBox } from "$lib/ui/components";
  import { LOREM_IPSUM } from "$lib/utils";

  import { createRawSnippet } from "svelte";

  import Icon from "@iconify/svelte";
  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/ErrorBox",
    component: ErrorBox,
    tags: ["autodocs"],
    argTypes: {},
    args: {
      children: createRawSnippet(() => ({
        render: () => LOREM_IPSUM.MEDIUM,
      })),
    },
  });
</script>

{#snippet title()}
  Oops, some error happened!
{/snippet}

{#snippet icon()}
  <Icon icon="material-symbols:heart-broken-outline" />
{/snippet}

<Story name="Primary" />

<Story name="Title" args={{ title }} />

<Story name="Title with Icon" args={{ title, icon }} />

<Story name="Error details" args={{ title, icon, error: new TypeError(LOREM_IPSUM.SHORT) }} />
