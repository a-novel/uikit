<script lang="ts">
  import { ComponentColor } from "$lib/ui";

  import type { SVGAttributes } from "svelte/elements";

  import { z } from "zod";

  interface Props extends SVGAttributes<SVGElement> {
    color?: z.infer<typeof ComponentColor> | "invert";
  }

  let { color = "default", ...props }: Props = $props();
</script>

<!-- Credits to: https://github.com/rharkor/check-mark-animation -->
<svg
  data-icon="true"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 214 214"
  class="check-circle"
  data-color={color}
  {...props}
>
  <g fill="none" stroke="currentColor" stroke-width="2">
    <circle class="semi-transparent" fill="currentColor" opacity="0.15" cx="107" cy="107" r="72"></circle>
    <circle class="colored" fill="currentColor" cx="107" cy="107" r="72" opacity="0.8"></circle>
    <polyline
      stroke="var(--text)"
      stroke-width="10"
      points="73.5,107.8 93.7,127.9 142.2,79.4"
      style="stroke-dasharray: 50%, 50%; stroke-dashoffset: 100%"
    />
  </g>
</svg>

<style>
  svg.check-circle {
    color: var(--color-500);
  }

  /* BELOW IS THE ESSENTIAL CODE FOR THE ANIMATION */
  @keyframes checkmark {
    0% {
      stroke-dashoffset: 50%;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  svg.check-circle polyline {
    animation: checkmark 0.5s cubic-bezier(0.55, 0.2, 0.71, -0.04) 0.7s backwards;
  }

  @keyframes grow-circle {
    0% {
      r: 0;
    }
  }
  @keyframes grow-circle-bigger {
    50% {
      opacity: 0.11;
    }
    100% {
      opacity: 0;
      r: 100px;
    }
  }
  svg.check-circle circle.semi-transparent {
    animation:
      grow-circle 0.45s cubic-bezier(0.66, 0.23, 0.51, 1.23) backwards,
      grow-circle-bigger 0.9s linear 1.1s forwards;
  }
  svg.check-circle circle.colored {
    animation: grow-circle 0.5s cubic-bezier(0.66, 0.23, 0.51, 1.23) 0.25s backwards;
  }
</style>
