<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button";
  import Loader2 from "~icons/lucide/loader-2";
  import { confirmDestructive } from "../confirm.svelte";
  import { getDemo } from "../context";
  import type { VmPlan } from "../demo-state.svelte";
  import { vmTypes } from "../demo-state.svelte";
  import { formatBytes, getErrorMessage } from "../format";
  import { findPlanDowngrades } from "../vm-plans";

  const resizeCaveats =
    "You cannot resize your server to a smaller size. For a resize to take effect, you will need to restart your server. You will need to manually expand your filesystem after a server resize.";

  const demo = getDemo();
  let selectedServer = $derived(demo.selected);
  let vmType = $derived(demo.vmTypeFor(selectedServer));
  let resizingId = $state<string | null>(null);
  let resizeError = $state("");
  let serverBusy = $derived(
    selectedServer.status === "provisioning" ||
      selectedServer.status === "deleting"
  );

  function formatRam(mb: number): string {
    return formatBytes(mb * 1024 * 1024);
  }

  function describePlan(plan: VmPlan): string {
    return `${plan.cores} vCPU, ${formatRam(plan.ramCapacity)} RAM, ${plan.storageAmount}GB disk`;
  }

  function isDowngrade(plan: VmPlan): boolean {
    return vmType !== null && findPlanDowngrades(vmType, plan).length > 0;
  }

  async function handleResize(plan: VmPlan) {
    if (
      resizingId ||
      plan.id === selectedServer.vmTypeId ||
      isDowngrade(plan)
    ) {
      return;
    }
    const ok = await confirmDestructive({
      confirmLabel: `Resize to ${plan.name}`,
      description: `This changes ${selectedServer.name} to ${describePlan(plan)}. ${resizeCaveats}`,
      title: `Resize to ${plan.name}?`,
    });
    if (!ok) {
      return;
    }

    resizingId = plan.id;
    resizeError = "";
    try {
      await demo.resizeVm({ vmId: selectedServer.id, vmTypeId: plan.id });
      toast.success(
        `Resized to ${plan.name}. Restart the server for the change to take effect.`
      );
    } catch (err) {
      resizeError = getErrorMessage(err, "Failed to resize server.");
      toast.error(resizeError);
    } finally {
      resizingId = null;
    }
  }
</script>

<div class="space-y-4 p-5">
  <div>
    <h2 class="text-sm font-semibold text-foreground">Resize Server</h2>
    <p class="mt-1 text-xs text-muted-foreground">
      Change the plan for {selectedServer.name}. Current plan:
      {vmType?.name ?? selectedServer.plan}
      {#if vmType}
        ({vmType.cores}
        vCPU • {formatRam(vmType.ramCapacity)} RAM • {vmType.storageAmount}GB
        disk)
      {/if}
    </p>
  </div>
  <p
    class="border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground"
  >
    {resizeCaveats}
  </p>
  {#if resizeError}
    <p
      class="border border-red-300 bg-red-100 px-3 py-2 text-xs text-red-800 dark:border-red-700 dark:bg-red-950/40 dark:text-red-400"
    >
      {resizeError}
    </p>
  {/if}
  {#if vmTypes.length === 0}
    <p
      class="border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground"
    >
      No plans available.
    </p>
  {:else}
    <div class="grid gap-3 @min-[48rem]:grid-cols-2">
      {#each vmTypes as plan (plan.id)}
        {@const current = plan.id === selectedServer.vmTypeId}
        {@const downgrade = !current && isDowngrade(plan)}
        <div
          class="border border-border bg-background/40 p-4 {current
            ? "border-red-500"
            : ""} {downgrade ? "pointer-events-none opacity-40" : ""}"
        >
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-foreground">{plan.name}</h3>
            <span class="text-sm text-muted-foreground">${plan.cap}/mo</span>
          </div>
          <p class="mt-2 text-xs text-muted-foreground">
            {plan.cores}
            vCPU • {formatRam(plan.ramCapacity)} RAM • {plan.storageAmount}GB
            disk
          </p>
          <Button
            class="mt-4 h-7 text-xs"
            disabled={current || downgrade || resizingId !== null || serverBusy}
            onclick={() => handleResize(plan)}
            size="sm"
            variant="outline"
          >
            {#if resizingId === plan.id}
              <Loader2 class="mr-1.5 h-3 w-3 animate-spin" />Resizing...
            {:else if current}
              Current Plan
            {:else if downgrade}
              Not Supported
            {:else}
              Resize
            {/if}
          </Button>
        </div>
      {/each}
    </div>
  {/if}
</div>
