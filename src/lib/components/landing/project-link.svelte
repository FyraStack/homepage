<script lang="ts">
  import { LinkPreview } from "bits-ui";
  import type { Snippet } from "svelte";

  let {
    href,
    logo,
    preview,
    color,
    children,
  }: {
    href: string;
    logo: string;
    preview: string;
    color: string;
    children: Snippet;
  } = $props();

  const host = $derived(new URL(href).host);
</script>

<LinkPreview.Root closeDelay={100} openDelay={300}>
  <LinkPreview.Trigger
    class="inline-flex items-center gap-1.5 px-1.5 whitespace-nowrap text-white transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    {href}
    rel="noopener"
    style="background-color: {color}"
    target="_blank"
  >
    <img
      alt=""
      class="size-[0.9em] shrink-0 drop-shadow-[0_1px_1px_rgb(0_0_0/0.25)]"
      height="16"
      src={logo}
      width="16"
    >
    {@render children()}
  </LinkPreview.Trigger><LinkPreview.Portal>
    <LinkPreview.Content
      class="z-50 w-80 overflow-hidden border border-border bg-popover shadow-xl data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95"
      side="top"
      sideOffset={8}
    >
      <img
        alt=""
        class="aspect-video w-full object-cover object-top"
        height="180"
        src={preview}
        width="320"
      >
      <div
        class="flex items-center gap-2 border-t border-border px-3 py-2 text-xs text-muted-foreground"
      >
        <img alt="" class="size-3.5" height="14" src={logo} width="14">
        {host}
      </div>
    </LinkPreview.Content>
  </LinkPreview.Portal>
</LinkPreview.Root>
