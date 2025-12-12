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

  function isString(baseComponent: any): baseComponent is string {
    return typeof baseComponent === "string";
  }

  const EmptySnippetKey = Object.getOwnPropertyNames(EmptySnippet).join("");

  function isSnippet(baseComponent: any): baseComponent is Snippet {
    return Object.getOwnPropertyNames(baseComponent).join("") == EmptySnippetKey;
  }
</script>

{#snippet EmptySnippet()}{/snippet}

{#if isString(component)}
  {component}
{:else if isSnippet(component)}
  {@render component()}
{:else}
  <component {...props}></component>
{/if}
