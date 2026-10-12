<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import Plus from "~icons/lucide/plus";
  import HardDrive from "~icons/nucleo/hard-drive";
  import { getDemo } from "./context";
  import { statusStyles } from "./server-detail";
  import ServerLayout from "./server-layout.svelte";

  let { dashboardUrl }: { dashboardUrl: string } = $props();

  const demo = getDemo();
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
          >{demo.servers.length}</Badge
        >
      </div>
      <div class="flex shrink-0 items-center gap-1">
        <Button
          aria-label="Create server"
          class="relative h-8 w-8 border-red-500/50 p-0 text-red-700 hover:border-red-500 hover:bg-red-100 hover:text-foreground @min-[64rem]:h-6 @min-[64rem]:w-6 dark:text-red-400 dark:hover:bg-red-950"
          href={dashboardUrl}
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
      {#each demo.servers as server (server.id)}
        <button
          class="flex w-full items-start justify-between border-b border-border px-4 py-3 text-left transition-colors duration-100 {demo.selectedId ===
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
              {server.plan.vcpu}
              vCPU &bull; {server.plan.memoryGb}GB &bull;
              {server.ip}
            </p>
          </div>
          <span
            aria-label={`Status: ${statusStyles[server.status].label}`}
            class="mt-1 ml-2 h-2 w-2 shrink-0 rounded-full {statusStyles[
              server.status
            ].dot}"
            role="img"
            title={statusStyles[server.status].label}
          ></span>
        </button>
      {/each}

      {#if demo.servers.length === 0}
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
