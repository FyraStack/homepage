<script lang="ts">
  import { Slider as SliderPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    value = $bindable(),
    orientation = "horizontal",
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<SliderPrimitive.RootProps> = $props();
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<SliderPrimitive.Root
  class={cn(
    "relative flex w-full touch-none select-none items-center data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col data-disabled:opacity-50",
    className
  )}
  data-slot="slider"
  {orientation}
  bind:ref
  bind:value={value as never}
  {...restProps}
>
  {#snippet children({
    thumbItems,
  })}
    <span
      class={cn(
    "relative grow overflow-hidden rounded-full bg-muted data-horizontal:h-1 data-vertical:h-full data-vertical:h-full data-horizontal:w-full data-horizontal:w-full data-vertical:w-1"
  )}
      data-orientation={orientation}
      data-slot="slider-track"
    >
      <SliderPrimitive.Range
        class={cn(
    "absolute select-none bg-primary data-horizontal:h-full data-vertical:w-full"
  )}
        data-slot="slider-range"
      />
    </span>
    {#each thumbItems as thumb (thumb.index)}
      <SliderPrimitive.Thumb
        class="relative block size-3 shrink-0 rounded-full border border-ring bg-white ring-ring/50 transition-[color,box-shadow] select-none after:absolute after:-inset-2 hover:ring-3 focus-visible:ring-3 focus-visible:outline-hidden active:ring-3 disabled:pointer-events-none disabled:opacity-50"
        data-slot="slider-thumb"
        index={thumb.index}
      />
    {/each}
  {/snippet}
</SliderPrimitive.Root>
