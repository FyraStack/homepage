<script lang="ts">
  import { tick } from "svelte";
  import { Button } from "$lib/components/ui/button";

  let {
    dashboardUrl,
    open = $bindable(false),
  }: { dashboardUrl: string; open?: boolean } = $props();

  $effect(() => {
    if (open) {
      tick().then(() => document.getElementById("try-it-open-btn")?.focus());
    }
  });

  function close() {
    open = false;
  }

  function onKeydown(e: KeyboardEvent) {
    if (open && e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if open}
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <button
      aria-label="Close"
      class="absolute inset-0 bg-black/50"
      onclick={close}
      type="button"
    ></button>
    <div
      aria-describedby="try-it-desc"
      aria-labelledby="try-it-title"
      aria-modal="true"
      class="relative z-10 w-full max-w-md border border-border bg-background p-4 text-sm text-foreground ring-1 ring-foreground/10"
      role="dialog"
    >
      <h2 class="text-base font-semibold text-foreground" id="try-it-title">
        Nice try.
      </h2>
      <p class="mt-1 text-sm text-muted-foreground" id="try-it-desc">
        That button doesn't work here, maybe you should try it on your own VPS!
      </p>
      <div class="mt-5 flex justify-end gap-2">
        <Button onclick={close} size="sm" variant="outline">Close</Button>
        <Button href={dashboardUrl} id="try-it-open-btn" size="sm">
          Open dashboard
        </Button>
      </div>
    </div>
  </div>
{/if}
