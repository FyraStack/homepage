<script lang="ts">
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Dialog from "#lib/components/ui/dialog/index.js";
  import { Input } from "#lib/components/ui/input/index.js";
  import { Label } from "#lib/components/ui/label/index.js";
  import { confirmController } from "./confirm.svelte";

  let typed = $state("");

  const req = $derived(confirmController.request);
  const canConfirm = $derived(
    !req?.confirmWord || typed.trim() === req.confirmWord
  );

  function decide(ok: boolean) {
    if (ok && !canConfirm) {
      return;
    }
    confirmController.settleOnce(ok);
    confirmController.open = false;
    typed = "";
  }
</script>

<Dialog.Root
  onOpenChange={(open) => {
    if (!open) {
      decide(false);
    }
  }}
  bind:open={confirmController.open}
>
  <Dialog.Content
    class="border-border bg-background @min-[40rem]:max-w-md"
    showCloseButton={false}
  >
    <Dialog.Header>
      <Dialog.Title>{req?.title}</Dialog.Title>
      <Dialog.Description>{req?.description}</Dialog.Description>
    </Dialog.Header>
    {#if req?.confirmWord}
      <div class="space-y-1.5">
        <Label
          class="block text-xs/4 font-normal text-muted-foreground"
          for="confirm-name-input"
        >
          Type
          <span class="font-mono text-foreground">{req.confirmWord}</span>
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
    <Dialog.Footer>
      <Button onclick={() => decide(false)} size="sm" variant="outline"
        >Cancel</Button
      >
      <Button
        disabled={!canConfirm}
        onclick={() => decide(true)}
        size="sm"
        variant="destructive"
      >
        {req?.confirmLabel}
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
