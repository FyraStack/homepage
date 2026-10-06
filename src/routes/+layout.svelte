<script lang="ts">
  import "./layout.css";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Menu from "@lucide/svelte/icons/menu";
  import X from "@lucide/svelte/icons/x";
  import { onMount, type Snippet } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";
  import StackMark from "$lib/components/landing/stack-mark.svelte";
  import { Button } from "$lib/components/ui/button";
  import { cn } from "$lib/utils";

  let { children } = $props();

  const dashboardUrl = "https://dash.fyrastack.com";

  const navLinkClass = (active = false) =>
    cn(
      "px-2.5 py-1.5 text-sm transition-colors hover:text-foreground",
      active ? "text-foreground" : "text-muted-foreground"
    );

  const isCurrent = (path: string) =>
    page.url.pathname === path || page.url.pathname.startsWith(`${path}/`);

  const navLinks = [
    { href: `${resolve("/")}#pricing`, label: "Pricing", path: null },
    { href: resolve("/colocation"), label: "Colocation", path: "/colocation" },
    { href: resolve("/about"), label: "About", path: "/about" },
    { href: resolve("/docs"), label: "Docs", path: "/docs" },
  ] as const;

  const isLinkCurrent = (path: string | null) =>
    path !== null && isCurrent(path);

  let mobileNavOpen = $state(false);

  function toggleMobileNav() {
    mobileNavOpen = !mobileNavOpen;
  }

  function closeMobileNav() {
    mobileNavOpen = false;
  }

  function closeMobileNavOnEscape(event: KeyboardEvent) {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  }

  afterNavigate(closeMobileNav);

  onMount(() => {
    document.documentElement.dataset.smoothScroll = "";
  });
</script>

<svelte:head>
  <link href={favicon} rel="icon">
</svelte:head>

<!-- Header: sticky nav shared by every page -->
<header
  class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
>
  <div class="page-container flex h-16 items-center justify-between">
    <div class="flex items-center gap-8">
      <a class="flex items-center gap-2" href={resolve("/")}>
        <StackMark />
        <span class="text-sm font-semibold tracking-[-0.025em]">Stack</span>
      </a>
      <nav aria-label="Primary" class="hidden items-center gap-1 sm:flex">
        {#each navLinks as link (link.label)}
          <a
            aria-current={isLinkCurrent(link.path) ? "page" : undefined}
            class={navLinkClass(isLinkCurrent(link.path))}
            href={link.href}
            >{link.label}</a
          >
        {/each}
      </nav>
    </div>
    <div class="flex items-center gap-2">
      <Button
        class="h-8 gap-2 pl-3 text-[13px] has-data-[icon=inline-end]:pr-2"
        href={dashboardUrl}
        variant="accent"
      >
        Dashboard <ArrowRight data-icon="inline-end" />
      </Button>
      <button
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        class="relative -mr-2 flex size-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground sm:hidden"
        onclick={toggleMobileNav}
        type="button"
      >
        <span
          aria-hidden="true"
          class="absolute top-1/2 left-1/2 size-[max(100%,3rem)] -translate-1/2 pointer-fine:hidden"
        ></span>
        {#if mobileNavOpen}
          <X class="size-5" />
        {:else}
          <Menu class="size-5" />
        {/if}
      </button>
    </div>
  </div>
  <nav
    aria-label="Primary"
    class="border-t border-border sm:hidden"
    hidden={!mobileNavOpen}
    id="mobile-nav"
  >
    <div class="page-container flex flex-col py-2">
      {#each navLinks as link (link.label)}
        <a
          aria-current={isLinkCurrent(link.path) ? "page" : undefined}
          class={cn(
            "py-3 text-base transition-colors hover:text-foreground",
            isLinkCurrent(link.path)
              ? "text-foreground"
              : "text-muted-foreground"
          )}
          href={link.href}
          onclick={closeMobileNav}
          >{link.label}</a
        >
      {/each}
    </div>
  </nav>
</header>

<svelte:window onkeydown={closeMobileNavOnEscape} />

{@render children()}

<!-- Footer: shared by every page -->
<footer class="pt-20 pb-10">
  <div class="page-container flex flex-col gap-16">
    <div class="flex flex-col gap-12 md:flex-row md:gap-20">
      <div class="flex flex-1 flex-col gap-5">
        <a class="flex items-center gap-2 self-start" href={resolve("/")}>
          <StackMark />
          <span class="text-sm font-semibold tracking-[-0.025em]">Stack</span>
        </a>
        <p class="max-w-80 text-sm/[22px] text-muted-foreground">
          Stack is provided by Fyra Labs, the open-source community that
          develops Terra and Ultramarine Linux.
        </p>
        <address class="text-sm text-muted-foreground not-italic">
          5206 N Damen Ave, Chicago, IL 60625
        </address>
      </div>
      <nav
        aria-label="Footer"
        class="grid grid-cols-2 gap-10 sm:grid-cols-3 md:flex md:gap-20"
      >
        {#snippet column(
          heading: string,
          links: Snippet
        )}
          <div class="flex flex-col gap-3 md:w-35 md:last:w-auto">
            <h2
              class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
            >
              {heading}
            </h2>
            <ul
              class="flex flex-col gap-3 text-sm text-gray-300 *:transition-colors *:hover:text-foreground"
            >
              {@render links()}
            </ul>
          </div>
        {/snippet}
        {#snippet productLinks()}
          <li><a href="{resolve("/")}#vps">VPS</a></li>
          <li><a href={resolve("/colocation")}>Colocation</a></li>
          <li><a href="https://status.fyrastack.com">Status</a></li>
        {/snippet}
        {@render column("Product", productLinks)}
        {#snippet resourcesLinks()}
          <li><a href={resolve("/docs")}>Docs</a></li>
          <li><a href="mailto:support@fyrastack.com">Support</a></li>
          <li><a href={resolve("/about")}>About</a></li>
        {/snippet}
        {@render column("Resources", resourcesLinks)}
        {#snippet communityLinks()}
          <li><a href="https://fyralabs.com/discord">Discord</a></li>
          <li><a href="https://github.com/FyraLabs">GitHub</a></li>
          <li><a href="https://x.com/fyrastack">Twitter</a></li>
          <li><a href="https://bsky.app/profile/fyrastack.com">Bluesky</a></li>
          <li><a href="https://fedi.fyralabs.com/@stack">Fediverse</a></li>
        {/snippet}
        {@render column("Community", communityLinks)}
      </nav>
    </div>
    <div
      class="flex flex-col gap-3 border-t border-border pt-6 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
    >
      <span>© 2026 Fyra Stack Limited</span>
      <div class="flex gap-6">
        <a
          class="transition-colors hover:text-foreground"
          href={resolve("/terms-of-service")}
          >Terms of Service</a
        >
        <a
          class="transition-colors hover:text-foreground"
          href={resolve("/privacy-statement")}
          >Privacy Statement</a
        >
      </div>
    </div>
  </div>
</footer>
