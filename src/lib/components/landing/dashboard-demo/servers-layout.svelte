<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import Plus from "~icons/lucide/plus";
  import HardDrive from "~icons/nucleo/hard-drive";
  import { getDemo } from "./context";
  import ServerLayout from "./server-layout.svelte";

  let { createServerUrl }: { createServerUrl: string } = $props();

  function statusDotClass(s: { liveLoaded?: boolean; status: string }) {
    if (s.status === "deleting") {
      return "animate-pulse bg-red-500";
    }
    if (!s.liveLoaded || s.status === "unknown") {
      return "bg-muted-foreground";
    }
    if (s.status === "running") {
      return "bg-emerald-500";
    }
    if (s.status === "provisioning") {
      return "animate-pulse bg-blue-500";
    }
    if (s.status === "restarting") {
      return "animate-pulse bg-amber-500";
    }
    return "bg-red-500";
  }

  function statusLabel(s: { liveLoaded?: boolean; status: string }): string {
    if (s.status === "deleting") {
      return "Deleting";
    }
    if (!s.liveLoaded) {
      return "Unknown";
    }
    if (s.status === "running") {
      return "Running";
    }
    if (s.status === "provisioning") {
      return "Provisioning";
    }
    if (s.status === "restarting") {
      return "Restarting";
    }
    if (s.status === "unknown") {
      return "Unknown";
    }
    return "Stopped";
  }

  const demo = getDemo();
  const currentServers = $derived(
    demo.servers.filter(
      (server) => server.status !== "deleting" && server.status !== "error"
    )
  );
  const selectedServerId = $derived(demo.selectedId);
</script>

<div class="flex h-full w-full flex-col overflow-hidden @min-[64rem]:flex-row">
  <div
    class="flex w-full shrink-0 flex-col border-b border-border @min-[64rem]:max-h-none @min-[64rem]:w-64 @min-[64rem]:border-r @min-[64rem]:border-b-0"
  >
    <div
      class="flex h-12 shrink-0 items-center justify-between border-b border-border px-4 @min-[64rem]:h-10"
    >
      <div class="flex min-w-0 items-center">
        <span
          class="text-base font-semibold text-foreground @min-[64rem]:text-sm"
          >Servers</span
        >
        <Badge class="ml-2 text-xs @min-[64rem]:text-[10px]" variant="secondary"
          >{currentServers.length}</Badge
        >
      </div>
      <div class="flex shrink-0 items-center gap-1">
        <Button
          aria-label="Create server"
          class="relative h-8 w-8 border-red-500/50 p-0 text-red-700 hover:border-red-500 hover:bg-red-100 hover:text-foreground @min-[64rem]:h-6 @min-[64rem]:w-6 dark:text-red-400 dark:hover:bg-red-950"
          href={createServerUrl}
          size="sm"
          variant="outline"
        >
          <span
            aria-hidden="true"
            class="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
          ></span>
          <Plus class="h-4 w-4 @min-[64rem]:h-3.5 @min-[64rem]:w-3.5" />
        </Button>
      </div>
    </div>
    <div class="flex-1 overflow-y-auto">
      {#each currentServers as server (server.id)}
        <button
          class="flex w-full items-start justify-between border-b border-border px-4 py-3 text-left transition-colors duration-100 {selectedServerId ===
          server.id
            ? "bg-muted/60"
            : "hover:bg-muted/30"}"
          onclick={() => demo.select(server.id)}
          type="button"
        >
          <div class="min-w-0">
            <p
              class="truncate text-base font-semibold text-foreground @min-[64rem]:text-sm"
            >
              {server.name}
            </p>
            <p
              class="mt-0.5 truncate text-sm text-muted-foreground @min-[64rem]:text-xs"
            >
              {server.vcpu}
              vCPU &bull; {server.ram} &bull;
              {server.ip}
            </p>
          </div>
          <span
            aria-label={`Status: ${statusLabel(server)}`}
            class="mt-1 ml-2 h-2 w-2 shrink-0 rounded-full {statusDotClass(
              server
            )}"
            role="img"
            title={statusLabel(server)}
          ></span>
        </button>
      {/each}

      {#if currentServers.length === 0}
        <div
          class="flex flex-col items-center justify-center py-8 text-muted-foreground @min-[64rem]:py-16"
        >
          <HardDrive class="mb-3 h-6 w-6" />
          <p class="text-sm @min-[64rem]:text-xs">No servers</p>
        </div>
      {/if}
    </div>
  </div>

  <div class="flex flex-1 flex-col overflow-hidden">
    {#if demo.servers.length > 0}
      <ServerLayout />
    {/if}
  </div>
</div>
