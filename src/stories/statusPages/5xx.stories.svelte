<script context="module" lang="ts">
  import { StatusPageInternalError } from "$lib/ui/components/statusPages";
  import { LOREM_IPSUM } from "$lib/utils";

  import { defineMeta } from "@storybook/addon-svelte-csf";

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: "Components/StatusPages/StatusPageInternalError",
    component: StatusPageInternalError,
    tags: ["autodocs"],
    argTypes: {},
    args: {},
  });
</script>

<Story name="Primary" />

<Story name="With Error Details" args={{ error: new TypeError(LOREM_IPSUM.SHORT) }} />
