<script lang="ts">
  import { BitsConfig } from "bits-ui";
  import { onMount } from "svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Toaster } from "$lib/components/ui/sonner";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";
  import ChevronDown from "~icons/lucide/chevron-down";
  import CreditCard from "~icons/nucleo/credit-card";
  import Search from "~icons/nucleo/search";
  import Server from "~icons/nucleo/server";
  import Settings from "~icons/nucleo/settings";
  import ConfirmDialog from "./confirm-dialog.svelte";
  import { setDemo } from "./context";
  import { DemoState } from "./demo-state.svelte";
  import ServersLayout from "./servers-layout.svelte";
  import TryItDialog from "./try-it-dialog.svelte";

  let {
    createServerUrl,
    dashboardUrl,
    class: className,
    style,
  }: {
    createServerUrl: string;
    dashboardUrl: string;
    class?: string;
    style?: string;
  } = $props();

  let tryItOpen = $state(false);

  function showTryIt() {
    tryItOpen = true;
  }

  const demo = new DemoState();
  setDemo(demo);

  const user = { email: "addi@acme.dev", name: "Addison LeClair" };
  const navItems = [
    { active: true, icon: Server, label: "Servers" },
    { active: false, icon: CreditCard, label: "Billing" },
    { active: false, icon: Settings, label: "Settings" },
  ];

  onMount(() => {
    const stopTicking = demo.startTicking();
    return () => {
      stopTicking();
      demo.dispose();
    };
  });
</script>

<section
  aria-label="Interactive Stack dashboard demo"
  class={cn(
    "@container relative flex h-full flex-col overflow-hidden bg-background [contain:layout_paint]",
    className
  )}
  id="dashboard-demo"
  {style}
>
  <BitsConfig defaultPortalTo="#dashboard-demo">
    <header
      class="flex h-12 shrink-0 items-center justify-between border-b border-border px-4"
    >
      <div class="flex min-w-0 items-center gap-2">
        <span class="flex shrink-0 items-center gap-2">
          <img alt="" class="h-5 w-5" src="/logo.svg">
          <span class="text-sm font-semibold tracking-tight text-foreground"
            >Stack</span
          >
        </span>
        <span class="text-sm text-muted-foreground">/</span>
        <button
          class="flex min-w-0 items-center gap-1 px-1.5 py-0.5 text-sm font-medium text-foreground hover:bg-muted/50"
          onclick={showTryIt}
          type="button"
        >
          <span class="truncate">Acme</span>
          <ChevronDown class="h-3 w-3 shrink-0 text-muted-foreground" />
        </button>
        <span class="hidden text-sm text-muted-foreground @min-[64rem]:inline"
          >/</span
        >
        <p
          class="hidden text-sm font-medium text-muted-foreground @min-[64rem]:block"
        >
          Servers
        </p>
      </div>

      <div class="flex min-w-0 flex-1 items-center justify-end gap-3">
        <button
          class="flex shrink-0 items-center gap-2 border border-border bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          onclick={showTryIt}
          type="button"
        >
          <Search class="h-3 w-3" />
          <span class="hidden @min-[40rem]:inline">Search...</span>
          <kbd
            class="ml-2 hidden border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground @min-[40rem]:inline-block"
            >⌘K</kbd
          >
        </button>

        <button
          class="flex min-w-0 items-center gap-2.5 rounded-xs px-2 py-1 hover:bg-muted/50"
          onclick={showTryIt}
          type="button"
        >
          <span class="hidden min-w-0 text-right @min-[40rem]:block">
            <span
              class="block truncate text-sm leading-tight font-medium text-foreground"
              >{user.name}</span
            >
            <span
              class="block truncate text-xs leading-tight text-muted-foreground"
              >{user.email}</span
            >
          </span>
          <Avatar.Root class="h-8 w-8 shrink-0 border border-border">
            <Avatar.Fallback class="bg-muted text-xs text-muted-foreground"
              >AL</Avatar.Fallback
            >
          </Avatar.Root>
        </button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <aside
        class="hidden w-12 shrink-0 flex-col items-center gap-1 border-r border-border py-3 @min-[64rem]:flex"
      >
        {#each navItems as item (item.label)}
          <Tooltip.Root>
            <Tooltip.Trigger>
              {#snippet child({
                props,
              })}
                <button
                  {...props}
                  aria-label={item.label}
                  class="flex h-8 w-8 items-center justify-center transition-colors duration-100 {item.active
                    ? "border border-red-500 text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}"
                  onclick={item.active ? undefined : showTryIt}
                  type="button"
                >
                  <item.icon class="h-4 w-4" />
                </button>
              {/snippet}
            </Tooltip.Trigger>
            <Tooltip.Content side="right">
              <p>{item.label}</p>
            </Tooltip.Content>
          </Tooltip.Root>
        {/each}
      </aside>

      <main class="flex flex-1 overflow-hidden">
        <ServersLayout {createServerUrl} />
      </main>
    </div>
    <Toaster position="top-center" theme="dark" />
    <ConfirmDialog />
    <TryItDialog {dashboardUrl} bind:open={tryItOpen} />
  </BitsConfig>
</section>
