<script context="module" lang="ts">
  import { StatusPageNotFound } from "$lib/ui/components/statusPages";

  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/StatusPages/StatusPageNotFound",
    component: StatusPageNotFound,
    tags: ["autodocs"],
    argTypes: {},
    args: {}
  });
</script>

<Story name="Primary" />
