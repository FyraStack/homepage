<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    href,
    children,
  }: {
    href: string;
    children: Snippet;
  } = $props();

  const isExternal = $derived(href.startsWith("http"));
</script>

<a
  class="text-foreground underline decoration-gray-600 underline-offset-4 transition-colors hover:decoration-foreground"
  {href}
  rel={isExternal ? "noopener" : undefined}
  target={isExternal ? "_blank" : undefined}
  >{@render children()}</a
>
