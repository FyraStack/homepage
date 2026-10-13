<script lang="ts" module>
  import { tv, type VariantProps } from "tailwind-variants";

  const inputGroupButtonVariants = tv({
    base: "flex items-center gap-2 text-sm shadow-none",
    defaultVariants: {
      size: "xs",
    },
    variants: {
      size: {
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        sm: "cn-input-group-button-size-sm",
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
      },
    },
  });

  export type InputGroupButtonSize = VariantProps<
    typeof inputGroupButtonVariants
  >["size"];
</script>

<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Button } from "#lib/components/ui/button/index.js";
  import { cn } from "#lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    type = "button",
    variant = "ghost",
    size = "xs",
    ...restProps
  }: Omit<ComponentProps<typeof Button>, "href" | "size"> & {
    size?: InputGroupButtonSize;
  } = $props();
</script>

<Button
  class={cn(inputGroupButtonVariants({ size }), className)}
  data-size={size}
  {type}
  {variant}
  bind:ref
  {...restProps}
>
  {@render children?.()}
</Button>
