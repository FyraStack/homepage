<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  class={cn("px-(--card-spacing)", className)}
  data-slot="card-content"
  bind:this={ref}
  {...restProps}
>
  {@render children?.()}
</div>
