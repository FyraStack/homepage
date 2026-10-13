<script lang="ts">
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Dialog from "#lib/components/ui/dialog/index.js";

  let {
    dashboardUrl,
    open = $bindable(false),
  }: { dashboardUrl: string; open?: boolean } = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content
    class="border-border bg-background @min-[40rem]:max-w-md"
    showCloseButton={false}
  >
    <Dialog.Header>
      <Dialog.Title>Nice try.</Dialog.Title>
      <Dialog.Description>
        That button doesn't work here, maybe you should try it on your own VPS!
      </Dialog.Description>
    </Dialog.Header>
    <Dialog.Footer>
      <Dialog.Close>
        {#snippet child({
          props,
        })}
          <Button {...props} size="sm" variant="outline">Close</Button>
        {/snippet}
      </Dialog.Close>
      <Button href={dashboardUrl} size="sm">Open dashboard</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
