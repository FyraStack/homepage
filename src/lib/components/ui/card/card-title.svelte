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
    "font-medium text-base leading-snug group-data-[size=sm]/card:text-sm",
    className
  )}
  data-slot="card-title"
  bind:this={ref}
  {...restProps}
>
  {@render children?.()}
</div>
