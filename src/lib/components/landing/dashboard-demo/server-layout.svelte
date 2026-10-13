<script lang="ts">
  import type { Component } from "svelte";
  import { toast } from "svelte-sonner";
  import { Badge } from "#lib/components/ui/badge/index.js";
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Tabs from "#lib/components/ui/tabs/index.js";
  import { cn } from "#lib/utils.js";
  import Loader2 from "~icons/lucide/loader-2";
  import Play from "~icons/nucleo/play";
  import Power from "~icons/nucleo/power";
  import PowerOff from "~icons/nucleo/power-off";
  import RotateCw from "~icons/nucleo/rotate-cw";
  import { confirmDestructive } from "./confirm.svelte";
  import { getDemo } from "./context";
  import type {
    PowerAction,
    ServerStatus,
    ServerTab,
  } from "./demo-state.svelte";
  import { serverTabs, statusStyles } from "./server-detail";

  const powerButtons: {
    action: PowerAction;
    class?: string;
    disabledWhen: ServerStatus[];
    icon: Component<{ class?: string }>;
    label: string;
    success: string;
  }[] = [
    {
      action: "start",
      disabledWhen: ["running", "restarting"],
      icon: Play,
      label: "Start",
      success: "Server started",
    },
    {
      action: "restart",
      disabledWhen: ["stopped", "restarting"],
      icon: RotateCw,
      label: "Restart",
      success: "Server is restarting",
    },
    {
      action: "shutdown",
      disabledWhen: ["stopped"],
      icon: Power,
      label: "Shutdown",
      success: "Server is shutting down",
    },
    {
      action: "kill",
      class:
        "border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950",
      disabledWhen: ["stopped"],
      icon: PowerOff,
      label: "Kill",
      success: "Server powered off",
    },
  ];

  const demo = getDemo();
  let powerAction = $state<PowerAction | null>(null);
  let selectedServer = $derived(demo.selected);

  async function power({ action, success }: (typeof powerButtons)[number]) {
    if (powerAction) {
      return;
    }

    if (action === "kill") {
      const ok = await confirmDestructive({
        confirmLabel: "Force power off",
        description: `This forces ${selectedServer.name} off like pulling the plug, which can corrupt the filesystem or lose unsaved data. Use Shutdown for a clean stop.`,
        title: "Force power off",
      });
      if (!ok) {
        return;
      }
    }

    powerAction = action;
    await demo.power(selectedServer.id, action);
    toast.success(success);
    powerAction = null;
  }
</script>

<div
  class="flex h-10 shrink-0 items-center justify-between gap-2 border-b border-border px-4"
>
  <div class="flex min-w-0 items-center gap-2">
    <span class="truncate text-sm font-medium text-foreground"
      >{selectedServer.name}</span
    >
    <Badge
      class="text-[10px] {statusStyles[selectedServer.status].badge}"
      variant="outline"
    >
      {selectedServer.status}
    </Badge>
  </div>
  <div class="flex shrink-0 items-center gap-1.5">
    {#each powerButtons as button (button.action)}
      <Button
        aria-label={button.label}
        class={cn("h-7 gap-1.5 @min-[40rem]:px-3 px-2.5 text-xs", button.class)}
        disabled={powerAction !== null ||
          button.disabledWhen.includes(selectedServer.status)}
        onclick={() => power(button)}
        size="sm"
        variant="outline"
      >
        {#if powerAction === button.action}
          <Loader2 class="h-3 w-3 animate-spin" />
        {:else}
          <button.icon
            class={cn(
              "h-3 w-3",
              button.action === "restart" &&
                selectedServer.status === "restarting" &&
                "animate-spin"
            )}
          />
        {/if}
        <span class="hidden @min-[40rem]:inline">{button.label}</span>
      </Button>
    {/each}
  </div>
</div>

<Tabs.Root
  class="min-h-0 flex-1 gap-0"
  onValueChange={(tab) => {
    demo.activeTab = tab as ServerTab;
  }}
  value={demo.activeTab}
>
  <Tabs.List
    class="h-auto! w-full shrink-0 justify-start gap-0 overflow-x-auto border-b border-border p-0 px-2"
    variant="line"
  >
    {#each serverTabs as tab (tab.id)}
      <Tabs.Trigger
        class="h-auto flex-none gap-1.5 border-0 px-3 py-2.5 text-xs group-data-horizontal/tabs:after:bottom-0 after:bg-red-500"
        value={tab.id}
      >
        <tab.icon class="h-3 w-3" />
        {tab.label}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>

  {#each serverTabs as tab (tab.id)}
    <Tabs.Content
      class="flex min-h-0 flex-1 flex-col overflow-y-auto @min-[64rem]:overflow-hidden"
      value={tab.id}
    >
      {#if tab.id === demo.activeTab}
        {#key selectedServer.id}
          <tab.page />
        {/key}
      {/if}
    </Tabs.Content>
  {/each}
</Tabs.Root>
