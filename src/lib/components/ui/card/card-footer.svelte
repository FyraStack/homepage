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
  class={cn(
    "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
    className
  )}
  data-slot="card-footer"
  bind:this={ref}
  {...restProps}
>
  {@render children?.()}
</div>
