<script lang="ts">
  import { tick } from "svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { confirmController } from "./confirm.svelte";

  let typed = $state("");

  const req = $derived(confirmController.request);
  const needsWord = $derived(!!req?.confirmWord);
  const canConfirm = $derived(!needsWord || typed.trim() === req?.confirmWord);

  $effect(() => {
    if (confirmController.open) {
      typed = "";
      tick().then(() => {
        (
          document.getElementById("confirm-name-input") ??
          document.getElementById("confirm-ok-btn")
        )?.focus();
      });
    }
  });

  function decide(ok: boolean) {
    if (ok && !canConfirm) {
      return;
    }
    confirmController.resolve(ok);
    confirmController.open = false;
  }

  function onKeydown(e: KeyboardEvent) {
    if (!confirmController.open) {
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      decide(false);
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

{#if confirmController.open}
  <!-- z above bits-ui dialogs (z-50) so a confirm opened from another dialog sits on top -->
  <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <button
      aria-label="Cancel"
      class="absolute inset-0 bg-black/50"
      onclick={() => decide(false)}
      type="button"
    ></button>
    <div
      aria-describedby="confirm-desc"
      aria-labelledby="confirm-title"
      aria-modal="true"
      class="relative z-10 w-full max-w-md border border-border bg-background p-4 text-sm text-foreground ring-1 ring-foreground/10"
      role="dialog"
    >
      <h2 class="text-base font-semibold text-foreground" id="confirm-title">
        {req?.title}
      </h2>
      <p class="mt-1 text-sm text-muted-foreground" id="confirm-desc">
        {req?.description}
      </p>
      {#if needsWord}
        <div class="mt-4 space-y-1.5">
          <Label
            class="block text-xs/4 font-normal text-muted-foreground"
            for="confirm-name-input"
          >
            Type
            <span class="font-mono text-foreground">{req?.confirmWord}</span>
            to confirm
          </Label>
          <Input
            autocapitalize="off"
            autocomplete="off"
            id="confirm-name-input"
            onkeydown={(e) => {
              if (e.key === "Enter") {
                decide(true);
              }
            }}
            spellcheck={false}
            bind:value={typed}
          />
        </div>
      {/if}
      <div class="mt-5 flex justify-end gap-2">
        <Button onclick={() => decide(false)} size="sm" variant="outline"
          >Cancel</Button
        >
        <Button
          disabled={!canConfirm}
          id="confirm-ok-btn"
          onclick={() => decide(true)}
          size="sm"
          variant="destructive"
        >
          {req?.confirmLabel ?? "Delete"}
        </Button>
      </div>
    </div>
  </div>
{/if}
