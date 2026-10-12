<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button";
  import Loader2 from "~icons/lucide/loader-2";
  import { type Plan, plans } from "../../plans";
  import { confirmDestructive } from "../confirm.svelte";
  import { getDemo } from "../context";

  const resizeCaveats =
    "You cannot resize your server to a smaller size. For a resize to take effect, you will need to restart your server. You will need to manually expand your filesystem after a server resize.";

  const demo = getDemo();
  let selectedServer = $derived(demo.selected);
  let currentPlan = $derived(selectedServer.plan);
  let resizingName = $state<string | null>(null);

  function describePlan(plan: Plan): string {
    return `${plan.vcpu} vCPU, ${plan.memoryGb}GB RAM, ${plan.storageGb}GB disk`;
  }

  function isDowngrade(plan: Plan): boolean {
    return (
      plan.vcpu < currentPlan.vcpu ||
      plan.memoryGb < currentPlan.memoryGb ||
      plan.storageGb < currentPlan.storageGb
    );
  }

  async function handleResize(plan: Plan) {
    if (resizingName || plan.name === currentPlan.name || isDowngrade(plan)) {
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

    resizingName = plan.name;
    await demo.resize(selectedServer.id, plan);
    resizingName = null;
    toast.success(
      `Resized to ${plan.name}. Restart the server for the change to take effect.`
    );
  }
</script>

<div class="space-y-4 p-5">
  <div>
    <h2 class="text-sm font-semibold text-foreground">Resize Server</h2>
    <p class="mt-1 text-xs text-muted-foreground">
      Change the plan for {selectedServer.name}. Current plan:
      {currentPlan.name}
      ({currentPlan.vcpu}
      vCPU • {currentPlan.memoryGb}GB RAM • {currentPlan.storageGb}GB disk)
    </p>
  </div>
  <p
    class="border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground"
  >
    {resizeCaveats}
  </p>
  <div class="grid gap-3 @min-[48rem]:grid-cols-2">
    {#each plans as plan (plan.name)}
      {@const current = plan.name === currentPlan.name}
      {@const downgrade = !current && isDowngrade(plan)}
      <div
        class="border border-border bg-background/40 p-4 {current
          ? "border-red-500"
          : ""} {downgrade ? "pointer-events-none opacity-40" : ""}"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-semibold text-foreground">{plan.name}</h3>
          <span class="text-sm text-muted-foreground">${plan.price}/mo</span>
        </div>
        <p class="mt-2 text-xs text-muted-foreground">
          {plan.vcpu}
          vCPU • {plan.memoryGb}GB RAM • {plan.storageGb}GB disk
        </p>
        <Button
          class="mt-4 h-7 text-xs"
          disabled={current || downgrade || resizingName !== null}
          onclick={() => handleResize(plan)}
          size="sm"
          variant="outline"
        >
          {#if resizingName === plan.name}
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
</div>
