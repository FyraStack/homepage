<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import * as InputGroup from "$lib/components/ui/input-group";
  import Check from "~icons/lucide/check";
  import Loader2 from "~icons/lucide/loader-2";
  import Plus from "~icons/lucide/plus";
  import X from "~icons/lucide/x";
  import Pencil from "~icons/nucleo/pencil";
  import { getDemo } from "../context";
  import CopyButton from "../copy-button.svelte";

  interface PtrEntry {
    key: number;
    suffix: string;
    value: string;
  }

  const demo = getDemo();
  let selectedServer = $derived(demo.selected);
  let prefixBase = $derived(selectedServer.ipv6Prefix.replace(/\/\d+$/, ""));

  let editingIpv4Ptr = $state(false);
  let ipv4PtrValue = $state("");
  let savingIpv4Ptr = $state(false);

  let subnetDialogOpen = $state(false);
  let subnetEntries = $state<PtrEntry[]>([]);
  let subnetSaving = $state(false);
  let nextEntryKey = 0;

  const subnetEntriesValid = $derived(
    subnetEntries.every((entry) => entry.suffix.trim() && entry.value.trim())
  );

  function startEditingIpv4Ptr() {
    ipv4PtrValue = selectedServer.ipv4Ptr;
    editingIpv4Ptr = true;
  }

  async function saveIpv4Ptr() {
    savingIpv4Ptr = true;
    await demo.setIpv4Ptr(selectedServer.id, ipv4PtrValue.trim());
    savingIpv4Ptr = false;
    editingIpv4Ptr = false;
  }

  function subnetEntry(suffix = "", value = ""): PtrEntry {
    nextEntryKey += 1;
    return { key: nextEntryKey, suffix, value };
  }

  function openSubnetDialog() {
    subnetEntries = selectedServer.ipv6Ptrs.map((record) =>
      subnetEntry(record.address.slice(prefixBase.length), record.value)
    );
    if (subnetEntries.length === 0) {
      subnetEntries = [subnetEntry()];
    }
    subnetDialogOpen = true;
  }

  async function saveSubnetEntries() {
    if (!subnetEntriesValid) {
      return;
    }
    subnetSaving = true;
    const recordsByAddress = new Map(
      subnetEntries.map((entry) => {
        const address = `${prefixBase}${entry.suffix.trim()}`;
        return [address, { address, value: entry.value.trim() }];
      })
    );
    await demo.setIpv6Ptrs(
      selectedServer.id,
      [...recordsByAddress.values()].sort((a, b) =>
        a.address.localeCompare(b.address)
      )
    );
    subnetSaving = false;
    subnetDialogOpen = false;
  }
</script>

<div class="flex-1 divide-y divide-border/50 overflow-auto">
  <div class="px-5 py-3">
    <span
      class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
      >Public Network</span
    >
  </div>
  <div class="px-5 py-3">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-foreground">IPv4 Address</p>
        <p class="mt-0.5 font-mono text-xs text-muted-foreground">
          {selectedServer.ip}
        </p>
      </div>
      <CopyButton
        iconClass="size-4"
        label="Copy IPv4 address"
        text={selectedServer.ip}
      />
    </div>
    <div class="mt-2 flex items-center justify-between">
      <span class="text-xs text-muted-foreground">Reverse DNS</span>
      {#if editingIpv4Ptr}
        <div class="flex items-center gap-1.5">
          <Input
            class="h-7 w-56 text-xs"
            placeholder="hostname.example.com"
            bind:value={ipv4PtrValue}
          />
          <Button
            aria-label="Save reverse DNS"
            class="h-7 w-7 p-0 text-emerald-500"
            disabled={savingIpv4Ptr}
            onclick={saveIpv4Ptr}
            size="sm"
            variant="ghost"
          >
            {#if savingIpv4Ptr}
              <Loader2 class="h-3 w-3 animate-spin" />
            {:else}
              <Check class="h-3 w-3" />
            {/if}
          </Button>
          <Button
            aria-label="Cancel reverse DNS edit"
            class="h-7 w-7 p-0"
            disabled={savingIpv4Ptr}
            onclick={() => {
              editingIpv4Ptr = false;
            }}
            size="sm"
            variant="ghost"
          >
            <X class="h-3 w-3" />
          </Button>
        </div>
      {:else}
        <div class="flex items-center gap-1.5">
          <span class="font-mono text-xs text-muted-foreground"
            >{selectedServer.ipv4Ptr || "-"}</span
          >
          <Button
            aria-label="Edit reverse DNS"
            class="h-7 w-7 p-0"
            onclick={startEditingIpv4Ptr}
            size="sm"
            variant="ghost"
          >
            <Pencil class="h-3 w-3" />
          </Button>
        </div>
      {/if}
    </div>
  </div>
  <div class="px-5 py-3">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-foreground">IPv6 Subnet</p>
        <p class="mt-0.5 font-mono text-xs text-muted-foreground">
          {selectedServer.ipv6Prefix}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <Button
          class="h-7 gap-1.5 px-3 text-xs"
          onclick={openSubnetDialog}
          size="sm"
          variant="outline"
        >
          {#if selectedServer.ipv6Ptrs.length > 0}
            <Pencil class="h-3 w-3" />Edit Reverse DNS
          {:else}
            <Plus class="h-3 w-3" />Add Reverse DNS
          {/if}
        </Button>
        <CopyButton
          iconClass="size-4"
          label="Copy IPv6 subnet"
          text={selectedServer.ipv6Prefix}
        />
      </div>
    </div>
  </div>
  {#each selectedServer.ipv6Ptrs as record (record.address)}
    <div class="flex items-center justify-between px-5 py-2.5">
      <div class="flex items-center gap-3">
        <span class="font-mono text-xs text-foreground">{record.address}</span>
        <span class="font-mono text-xs text-muted-foreground"
          >{record.value}</span
        >
      </div>
    </div>
  {/each}
</div>

<Dialog.Root bind:open={subnetDialogOpen}>
  <Dialog.Content class="border-border bg-background @min-[40rem]:max-w-lg">
    <Dialog.Header>
      <Dialog.Title>Edit Reverse DNS</Dialog.Title>
      <Dialog.Description>
        PTR records for addresses in
        <span class="font-mono">{selectedServer.ipv6Prefix}</span>.
      </Dialog.Description>
    </Dialog.Header>
    <div class="grid gap-3 py-4">
      {#each subnetEntries as entry (entry.key)}
        <div class="flex items-start gap-2">
          <div class="grid flex-1 gap-2">
            <InputGroup.Root>
              <InputGroup.Addon class="font-mono">
                {prefixBase}
              </InputGroup.Addon>
              <InputGroup.Input
                aria-label="IPv6 address suffix"
                class="font-mono"
                placeholder="::1"
                bind:value={entry.suffix}
              />
            </InputGroup.Root>
            <Input
              aria-label="Reverse DNS hostname"
              placeholder="hostname.example.com"
              bind:value={entry.value}
            />
          </div>
          <Button
            aria-label="Remove entry"
            class="mt-1 h-7 w-7 p-0"
            disabled={subnetSaving}
            onclick={() => {
              subnetEntries = subnetEntries.filter(
                (other) => other.key !== entry.key
              );
            }}
            size="sm"
            variant="ghost"
          >
            <X class="h-3 w-3" />
          </Button>
        </div>
      {/each}
      <button
        class="flex w-full items-center justify-center gap-1.5 border border-dashed border-border py-2 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        disabled={subnetSaving}
        onclick={() => {
          subnetEntries.push(subnetEntry());
        }}
        type="button"
      >
        <Plus class="h-3 w-3" />Add entry
      </button>
    </div>
    <Dialog.Footer>
      <Button
        disabled={subnetSaving}
        onclick={() => {
          subnetDialogOpen = false;
        }}
        variant="outline"
        >Cancel</Button
      >
      <Button
        disabled={subnetSaving || !subnetEntriesValid}
        onclick={saveSubnetEntries}
      >
        {#if subnetSaving}
          <Loader2 class="mr-2 h-3 w-3 animate-spin" />
        {/if}
        Save
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
