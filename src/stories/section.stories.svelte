<script context="module" lang="ts">
  import { Section } from "$lib/ui/components";
  import { LOREM_IPSUM } from "$lib/utils";

  import { createRawSnippet } from "svelte";

  import { defineMeta } from "@storybook/addon-svelte-csf";
  import { fn } from "storybook/test";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/Section",
    component: Section,
    tags: ["autodocs"],
    argTypes: {},
    args: {
      onclick: fn(),
      children: createRawSnippet(() => ({
        render: () => LOREM_IPSUM.LONG,
      })),
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{}} />
