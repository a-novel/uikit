<script lang="ts">
  interface Props {
    callback: () => void;
  }

  const { callback }: Props = $props();
  callback();
</script>
