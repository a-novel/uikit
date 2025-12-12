<script
  lang="ts"
  generics="
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    ComponentPropsType extends Record<string, any> = {},
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    ComponentExportsType extends Record<string, any> = {},
    ComponentBindingsType extends keyof ComponentPropsType | '' = string
  "
>
  import { type Component, type Snippet } from "svelte";

  interface BaseProps {
    component: Component<ComponentPropsType, ComponentExportsType, ComponentBindingsType> | string | Snippet;
  }

  type Props = BaseProps &
    //eslint-disable-next-line @typescript-eslint/no-empty-object-type
    (BaseProps["component"] extends Component ? ComponentPropsType : {});

  let { component, ...props }: Props = $props();

  function isStringProps(baseComponent: any): baseComponent is string {
    return typeof baseComponent.component === "string";
  }

  const EmptySnippetKey = Object.getOwnPropertyNames(EmptySnippet).join("");

  export function isSnippetProps(t: any): t is Snippet {
    return Object.getOwnPropertyNames(t).join("") == EmptySnippetKey;
  }
</script>

{#snippet EmptySnippet()}{/snippet}

{#if isStringProps(component)}
  {component}
{:else if isSnippetProps(component)}
  {@render component()}
{:else}
  <component {...props}></component>
{/if}
