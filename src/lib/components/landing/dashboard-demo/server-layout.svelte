<script lang="ts">
  import { type Component, onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import * as Tabs from "$lib/components/ui/tabs";
  import Loader2 from "~icons/lucide/loader-2";
  import Play from "~icons/nucleo/play";
  import Power from "~icons/nucleo/power";
  import PowerOff from "~icons/nucleo/power-off";
  import RotateCw from "~icons/nucleo/rotate-cw";
  import { confirmDestructive } from "./confirm.svelte";
  import { getDemo } from "./context";
  import type { ServerTab } from "./demo-state.svelte";
  import { getErrorMessage } from "./format";
  import { serverTabs } from "./server-detail";
  import Overview from "./tabs/overview.svelte";

  type PowerAction = "start" | "shutdown" | "kill" | "restart";

  const deferredTabPages = {
    networking: () => import("./tabs/networking.svelte"),
    resize: () => import("./tabs/resize.svelte"),
    settings: () => import("./tabs/settings.svelte"),
  };

  const tabPages = $state<Partial<Record<ServerTab, Component>>>({
    overview: Overview,
  });

  function loadDeferredTabPages() {
    for (const [tab, load] of Object.entries(deferredTabPages)) {
      load().then((module) => {
        tabPages[tab as ServerTab] = module.default;
      });
    }
  }

  onMount(() => {
    const timer = setTimeout(loadDeferredTabPages, 1000);
    return () => clearTimeout(timer);
  });

  interface StatusSource {
    liveLoaded?: boolean;
    status: string;
  }

  const stoppedBadgeClass =
    "border-red-300 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400";

  function statusBadgeClass(s: StatusSource) {
    if (s.status === "deleting") {
      return stoppedBadgeClass;
    }
    if (!s.liveLoaded) {
      return "border-border bg-background/40 text-muted-foreground";
    }
    if (s.status === "running") {
      return "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400";
    }
    if (s.status === "provisioning") {
      return "border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400";
    }
    if (s.status === "restarting") {
      return "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400";
    }
    return stoppedBadgeClass;
  }

  function statusBadgeLabel(s: StatusSource) {
    if (s.status === "deleting") {
      return "deleting...";
    }
    if (!s.liveLoaded) {
      return "unknown";
    }
    if (s.status === "provisioning") {
      return "provisioning...";
    }
    return s.status;
  }

  const demo = getDemo();
  let powerAction = $state<PowerAction | null>(null);
  const powerLoading = $derived(powerAction !== null);
  const visibleServerTabs = $derived(
    serverTabs.filter(
      (tab) => !tab.featureFlag || demo.featureFlags[tab.featureFlag]
    )
  );
  let selectedServer = $derived(demo.selected);
  let activeTab = $derived(demo.activeTab);
  const TabPage = $derived(tabPages[activeTab]);

  const powerMessages = {
    kill: {
      error: "Failed to power off server",
      success: "Server powered off",
    },
    restart: {
      error: "Failed to restart server",
      success: "Server is restarting",
    },
    shutdown: {
      error: "Failed to shut down server",
      success: "Server is shutting down",
    },
    start: { error: "Failed to start server", success: "Server started" },
  } as const;

  async function power(action: PowerAction) {
    if (!selectedServer || powerLoading) {
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

    try {
      if (action === "start") {
        await demo.startVm({ vmId: selectedServer.id });
      } else if (action === "shutdown") {
        await demo.stopVm({ vmId: selectedServer.id });
      } else if (action === "restart") {
        await demo.rebootVm({ vmId: selectedServer.id });
      } else {
        await demo.killVm({ vmId: selectedServer.id });
      }
      toast.success(powerMessages[action].success);
    } catch (error) {
      toast.error(getErrorMessage(error, powerMessages[action].error));
    } finally {
      powerAction = null;
    }
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
      class="text-[10px] {statusBadgeClass(selectedServer)}"
      variant="outline"
    >
      {statusBadgeLabel(selectedServer)}
    </Badge>
  </div>
  <div class="flex shrink-0 items-center gap-1.5">
    <Button
      aria-label="Start"
      class="h-7 gap-1.5 px-2.5 text-xs @min-[40rem]:px-3"
      disabled={powerLoading ||
        selectedServer.status === "running" ||
        selectedServer.status === "restarting" ||
        selectedServer.status === "provisioning" ||
        selectedServer.status === "deleting"}
      onclick={() => power("start")}
      size="sm"
      variant="outline"
    >
      {#if powerAction === "start"}
        <Loader2 class="h-3 w-3 animate-spin" />
      {:else}
        <Play class="h-3 w-3" />
      {/if}
      <span class="hidden @min-[40rem]:inline">Start</span>
    </Button>
    <Button
      aria-label="Restart"
      class="h-7 gap-1.5 px-2.5 text-xs @min-[40rem]:px-3"
      disabled={powerLoading ||
        selectedServer.status === "stopped" ||
        selectedServer.status === "restarting" ||
        selectedServer.status === "provisioning" ||
        selectedServer.status === "deleting"}
      onclick={() => power("restart")}
      size="sm"
      variant="outline"
    >
      {#if powerAction === "restart"}
        <Loader2 class="h-3 w-3 animate-spin" />
      {:else}
        <RotateCw
          class="h-3 w-3 {selectedServer.status === "restarting"
            ? "animate-spin"
            : ""}"
        />
      {/if}
      <span class="hidden @min-[40rem]:inline">Restart</span>
    </Button>
    <Button
      aria-label="Shutdown"
      class="h-7 gap-1.5 px-2.5 text-xs @min-[40rem]:px-3"
      disabled={powerLoading ||
        selectedServer.status === "stopped" ||
        selectedServer.status === "provisioning" ||
        selectedServer.status === "deleting"}
      onclick={() => power("shutdown")}
      size="sm"
      variant="outline"
    >
      {#if powerAction === "shutdown"}
        <Loader2 class="h-3 w-3 animate-spin" />
      {:else}
        <Power class="h-3 w-3" />
      {/if}
      <span class="hidden @min-[40rem]:inline">Shutdown</span>
    </Button>
    <Button
      aria-label="Kill"
      class="h-7 gap-1.5 border-red-300 px-2.5 text-xs text-red-700 hover:bg-red-100 @min-[40rem]:px-3 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
      disabled={powerLoading ||
        selectedServer.status === "stopped" ||
        selectedServer.status === "provisioning" ||
        selectedServer.status === "deleting"}
      onclick={() => power("kill")}
      size="sm"
      variant="outline"
    >
      {#if powerAction === "kill"}
        <Loader2 class="h-3 w-3 animate-spin" />
      {:else}
        <PowerOff class="h-3 w-3" />
      {/if}
      <span class="hidden @min-[40rem]:inline">Kill</span>
    </Button>
  </div>
</div>

<Tabs.Root
  class="min-h-0 flex-1 gap-0"
  onValueChange={(tab) => {
    loadDeferredTabPages();
    demo.activeTab = tab as ServerTab;
  }}
  value={activeTab}
>
  <Tabs.List
    class="h-auto! w-full shrink-0 justify-start gap-0 overflow-x-auto border-b border-border p-0 px-2"
    variant="line"
  >
    {#each visibleServerTabs as tab (tab.id)}
      <Tabs.Trigger
        class="h-auto flex-none gap-1.5 rounded-none border-0 px-3 py-2.5 text-xs group-data-horizontal/tabs:after:bottom-0 after:bg-red-500"
        value={tab.id}
      >
        <tab.icon class="h-3 w-3" />
        {tab.label}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>

  {#each visibleServerTabs as tab (tab.id)}
    <Tabs.Content
      class="flex min-h-0 flex-1 flex-col overflow-y-auto @min-[64rem]:overflow-hidden"
      value={tab.id}
    >
      {#if tab.id === activeTab}
        {#key selectedServer.id}
          {#if TabPage}
            <TabPage />
          {/if}
        {/key}
      {/if}
    </Tabs.Content>
  {/each}
</Tabs.Root>
