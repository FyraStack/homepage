<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { cn } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    orientation = "vertical",
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  class={cn(
    "relative self-stretch bg-input data-horizontal:mx-px data-vertical:my-px data-vertical:h-auto data-horizontal:w-auto",
    className
  )}
  data-slot="button-group-separator"
  {orientation}
  bind:ref
  {...restProps}
/>
