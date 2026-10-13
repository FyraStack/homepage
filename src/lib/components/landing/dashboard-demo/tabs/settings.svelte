<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Dialog from "#lib/components/ui/dialog/index.js";
  import { Input } from "#lib/components/ui/input/index.js";
  import { Label } from "#lib/components/ui/label/index.js";
  import { Switch } from "#lib/components/ui/switch/index.js";
  import Check from "~icons/lucide/check";
  import X from "~icons/lucide/x";
  import Pencil from "~icons/nucleo/pencil";
  import { confirmDestructive } from "../confirm.svelte";
  import { getDemo } from "../context";

  const hostnameLabelPattern = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;

  function isValidHostname(value: string) {
    return (
      value.length <= 253 &&
      value.split(".").every((label) => hostnameLabelPattern.test(label))
    );
  }

  const demo = getDemo();
  let selectedServer = $derived(demo.selected);
  let nameValue = $state(demo.selected.name);
  let editingName = $state(false);
  let renameDialogOpen = $state(false);
  let updateHostname = $state(false);
  let renaming = $state(false);
  let deleting = $state(false);
  let nameChanged = $derived(
    Boolean(nameValue.trim()) && nameValue.trim() !== selectedServer.name
  );
  let hostnameValid = $derived(isValidHostname(nameValue.trim()));

  function openRenameDialog() {
    if (!(editingName && nameChanged) || renaming) {
      return;
    }
    updateHostname = false;
    renameDialogOpen = true;
  }

  function cancelNameEdit() {
    nameValue = selectedServer.name;
    editingName = false;
  }

  function closeRenameDialog() {
    if (renaming) {
      return;
    }
    renameDialogOpen = false;
    updateHostname = false;
  }

  async function handleRename() {
    const name = nameValue.trim();
    const shouldUpdateHostname = updateHostname;
    if (!nameChanged || renaming || (shouldUpdateHostname && !hostnameValid)) {
      return;
    }

    renaming = true;
    await demo.rename(selectedServer.id, name);
    nameValue = name;
    editingName = false;
    renameDialogOpen = false;
    renaming = false;
    toast.success(
      shouldUpdateHostname
        ? "Server renamed. The hostname will update after the next reboot."
        : "Server renamed."
    );
  }

  async function handleDelete() {
    if (deleting) {
      return;
    }
    const server = selectedServer;
    const ok = await confirmDestructive({
      confirmLabel: "Delete server",
      confirmWord: server.name,
      description: `This permanently deletes ${server.name} and all of its data. This cannot be undone.`,
      title: "Delete server",
    });
    if (!ok) {
      return;
    }

    deleting = true;
    await demo.delete(server.id);
  }
</script>

<div class="max-w-xl space-y-5 p-5">
  <div>
    <h2 class="text-base font-semibold text-foreground @min-[40rem]:text-sm">
      Server settings
    </h2>
    <p
      class="mt-1 text-base text-pretty text-muted-foreground @min-[40rem]:text-sm"
    >
      Manage basic settings for {selectedServer.name}.
    </p>
  </div>
  <div class="space-y-2">
    <Label for="server-name-input">Server name</Label>
    <div class="flex items-center gap-1.5">
      <Input
        disabled={!editingName || renaming}
        id="server-name-input"
        name="serverName"
        onkeydown={(event) => {
          if (event.key === "Enter") {
            openRenameDialog();
          }
          if (event.key === "Escape") {
            cancelNameEdit();
          }
        }}
        bind:value={nameValue}
      />
      {#if editingName}
        <Button
          aria-label="Save server name"
          class="size-7 p-0 text-emerald-500"
          disabled={!nameChanged || renaming}
          onclick={openRenameDialog}
          size="sm"
          variant="ghost"
        >
          <Check class="size-3" />
        </Button>
        <Button
          aria-label="Cancel server name edit"
          class="size-7 p-0"
          disabled={renaming}
          onclick={cancelNameEdit}
          size="sm"
          variant="ghost"
        >
          <X class="size-3" />
        </Button>
      {:else}
        <Button
          aria-label="Edit server name"
          class="size-7 p-0"
          onclick={() => {
            editingName = true;
          }}
          size="sm"
          variant="ghost"
        >
          <Pencil class="size-3" />
        </Button>
      {/if}
    </div>
    <p class="text-base text-pretty text-muted-foreground @min-[40rem]:text-sm">
      This is the name shown in the dashboard.
    </p>
  </div>
  <div class="space-y-2">
    <Label for="server-id-input">Server ID</Label>
    <Input
      class="font-mono"
      disabled
      id="server-id-input"
      name="serverId"
      value={selectedServer.id}
    />
  </div>
  <div class="border-t border-border pt-4">
    <Button
      class="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
      disabled={deleting}
      onclick={handleDelete}
      size="sm"
      variant="outline"
    >
      {deleting ? "Deleting..." : "Delete Server"}</Button
    >
  </div>
</div>

<Dialog.Root
  onOpenChange={(open) => {
    if (!open) {
      closeRenameDialog();
    }
  }}
  bind:open={renameDialogOpen}
>
  <Dialog.Content class="border-border bg-background @min-[40rem]:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Rename server?</Dialog.Title>
      <Dialog.Description class="text-base text-pretty @min-[40rem]:text-sm">
        This changes <strong>{selectedServer.name}</strong> to
        <strong>{nameValue.trim()}</strong>
        in the dashboard.
      </Dialog.Description>
    </Dialog.Header>

    <div class="py-2">
      <div class="flex items-start justify-between gap-4 bg-muted/50 p-3">
        <div class="min-w-0 space-y-1">
          <Label for="update-server-hostname">Update guest hostname</Label>
          <p
            class="text-base text-pretty text-muted-foreground @min-[40rem]:text-sm"
            id="update-server-hostname-description"
          >
            Also set the VM hostname to
            <span class="font-mono text-foreground">{nameValue.trim()}</span>.
            This takes effect after the next reboot and re-runs first-boot
            setup.
          </p>
        </div>
        <Switch
          aria-describedby="update-server-hostname-description"
          aria-invalid={updateHostname && !hostnameValid}
          disabled={renaming}
          id="update-server-hostname"
          bind:checked={updateHostname}
        />
      </div>
      {#if updateHostname && !hostnameValid}
        <p
          class="pt-2 text-base text-pretty text-destructive @min-[40rem]:text-sm"
        >
          Use a valid hostname with letters, numbers, dots, or hyphens, or leave
          this option off.
        </p>
      {/if}
    </div>

    <Dialog.Footer>
      <Button
        disabled={renaming}
        onclick={closeRenameDialog}
        size="sm"
        variant="outline"
        >Cancel</Button
      >
      <Button
        disabled={!nameChanged || (updateHostname && !hostnameValid)}
        loading={renaming}
        onclick={handleRename}
        size="sm"
        >Rename</Button
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
