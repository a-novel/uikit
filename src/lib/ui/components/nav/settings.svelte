<script lang="ts">
  import { ActionSection, LangSelector } from "$lib/ui/components/nav/index";

  import type { ComponentProps } from "svelte";

  import { getTranslate } from "@tolgee/svelte";

  let { children, ...props }: Omit<ComponentProps<typeof ActionSection>, "title"> = $props();

  const { t } = getTranslate("common");
</script>

<ActionSection {...props} title={$t("settings", "Settings")}>
  <LangSelector fullWidth={props.mobile} />
  {@render children?.()}
</ActionSection>
