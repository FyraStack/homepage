<script lang="ts">
  import "./layout.css";
  import jetbrainsMonoLatin from "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2?url";
  import { onMount, type Snippet } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";
  import StackMark from "$lib/components/landing/stack-mark.svelte";
  import { Button } from "$lib/components/ui/button";
  import { absoluteUrl, dashboardUrl, siteName, socialLinks } from "$lib/site";
  import { cn } from "$lib/utils";
  import ArrowRight from "~icons/nucleo/arrow-right";
  import Menu from "~icons/nucleo/menu";
  import X from "~icons/nucleo/xmark";

  let { children } = $props();

  const navLinkClass = (active = false) =>
    cn(
      "px-2.5 py-1.5 text-sm transition-colors hover:text-foreground",
      active ? "text-foreground" : "text-muted-foreground"
    );

  const isCurrent = (path: string) =>
    page.url.pathname === path || page.url.pathname.startsWith(`${path}/`);

  const navLinks = [
    { href: `${resolve("/")}#pricing`, label: "Pricing", path: null },
    { href: `${resolve("/")}#colocation`, label: "Colocation", path: null },
    { href: resolve("/about"), label: "About", path: "/about" },
    { href: resolve("/docs"), label: "Docs", path: "/docs" },
  ] as const;

  const canonicalUrl = $derived(absoluteUrl(page.url.pathname));
  const ogImagePngUrl = absoluteUrl("/og-image.png");
  const ogImageWebpUrl = absoluteUrl("/og-image.webp");
  const ogImageAlt = "Fyra Stack: We run the servers, you run your stack";

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
  <link href={favicon} rel="icon" type="image/svg+xml">
  <link href="/favicon.ico" rel="icon" sizes="48x48">
  <link href="/apple-touch-icon.png" rel="apple-touch-icon">
  <link href="/manifest.webmanifest" rel="manifest">
  <link href={canonicalUrl} rel="canonical">
  <meta content={siteName} property="og:site_name">
  <meta content="website" property="og:type">
  <meta content={canonicalUrl} property="og:url">
  <meta content={ogImagePngUrl} property="og:image">
  <meta content="image/png" property="og:image:type">
  <meta content="1200" property="og:image:width">
  <meta content="630" property="og:image:height">
  <meta content={ogImageAlt} property="og:image:alt">
  <meta content="summary_large_image" name="twitter:card">
  <meta content={ogImageWebpUrl} name="twitter:image">
  <meta content={ogImageAlt} name="twitter:image:alt">
  <meta content="@fyrastack" name="twitter:site">
  <script
    data-domain="fyrastack.com"
    defer
    src="https://plausible.fyralabs.com/js/script.js"
  ></script>
  <link
    as="font"
    crossorigin="anonymous"
    href="/fonts/Satoshi-Variable.woff2"
    rel="preload"
    type="font/woff2"
  >
  <link
    as="font"
    crossorigin="anonymous"
    href={jetbrainsMonoLatin}
    rel="preload"
    type="font/woff2"
  >
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
          Built from the ground up to support the open-source projects we love,
          and the communities around them
        </p>
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
            <h2 class="text-sm font-medium text-foreground">
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
          <li><a href="{resolve("/")}#colocation">Colocation</a></li>
        {/snippet}
        {@render column("Product", productLinks)}
        {#snippet resourcesLinks()}
          <li><a href={resolve("/docs")}>Docs</a></li>
          <li><a href="{resolve("/about")}#contact">Support</a></li>
          <li><a href={resolve("/about")}>About</a></li>
        {/snippet}
        {@render column("Resources", resourcesLinks)}
        {#snippet communityLinks()}
          <li><a href={socialLinks.discord}>Discord</a></li>
          <li><a href={socialLinks.github}>GitHub</a></li>
          <li><a href={socialLinks.x}>Twitter</a></li>
          <li><a href={socialLinks.bluesky}>Bluesky</a></li>
          <li><a href={socialLinks.fediverse}>Fediverse</a></li>
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
