<script lang="ts">
  import { cn } from "#lib/utils.js";
  import Check from "~icons/lucide/check";
  import Copy from "~icons/nucleo/copy";

  let {
    text,
    label,
    iconClass = "size-3",
  }: { text: string; label: string; iconClass?: string } = $props();

  let copied = $state(false);
  let resetTimer: ReturnType<typeof setTimeout> | undefined;

  function copy() {
    navigator.clipboard.writeText(text);
    copied = true;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      copied = false;
    }, 1500);
  }
</script>

<button
  aria-label={label}
  class="text-muted-foreground hover:text-foreground"
  onclick={copy}
  type="button"
>
  {#if copied}
    <Check class={cn(iconClass, "text-emerald-500")} />
  {:else}
    <Copy class={iconClass} />
  {/if}
</button>
