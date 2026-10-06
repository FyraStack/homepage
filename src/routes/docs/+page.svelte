<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import Copy from "@lucide/svelte/icons/copy";
  import LifeBuoy from "@lucide/svelte/icons/life-buoy";
  import Package from "@lucide/svelte/icons/package";
  import Server from "@lucide/svelte/icons/server";
  import { resolve } from "$app/paths";
  import DocsSearch from "$lib/components/docs/docs-search.svelte";
  import { Button } from "$lib/components/ui/button";
  import { docSections } from "$lib/docs";
  import { copyCodeButtons } from "$lib/docs/copy-code";
  import { cn } from "$lib/utils";

  const discordUrl = "#";

  const startHere = [
    {
      description: "Connect over SSH, add a user, and harden your server.",
      href: resolve("/docs/[section]/[slug]", { section: "vps", slug: "ssh" }),
      icon: Server,
      title: "I just created a VPS",
    },
    {
      description: "Pack it up, send it to Chicago, and get IPMI access.",
      href: resolve("/docs/[section]/[slug]", {
        section: "colocation",
        slug: "shipping-hardware",
      }),
      icon: Package,
      title: "I'm shipping hardware",
    },
    {
      description: "Tickets go straight to the engineers who run the racks.",
      href: resolve("/docs/[section]/[slug]", {
        section: "account-billing",
        slug: "support",
      }),
      icon: LifeBuoy,
      title: "I need a hand",
    },
  ];

  const shippingAddress =
    "Fyra Stack Limited\n5206 N Damen Ave\nChicago, IL 60625";

  const firstCommands = [
    "ssh root@<your-server-ip>",
    "dnf upgrade --refresh -y",
    "useradd -m -G wheel stackuser && passwd stackuser",
    "sudoedit /etc/ssh/sshd_config",
  ];
</script>

<svelte:head>
  <title>Docs · Fyra Stack</title>
  <meta
    content="Guides, references, and answers for getting your Fyra Stack VPS or colocation slot up and running."
    name="description"
  >
</svelte:head>

{#snippet owner(
  who: "You" | "Us"
)}
  <span
    class={cn(
      "border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]",
      who === "Us"
        ? "border-brand-yellow text-brand-yellow"
        : "border-border text-muted-foreground"
    )}
  >
    {who}
  </span>
{/snippet}

<main {@attach copyCodeButtons}>
  <!-- Hero: title, search, and start-here shortcuts -->
  <section class="border-b border-border py-20 lg:py-28">
    <div
      class="page-container flex flex-col justify-between gap-16 lg:flex-row lg:items-center"
    >
      <div class="flex flex-col gap-6 lg:w-155">
        <h1
          class="text-5xl/[1.05] font-semibold tracking-[-0.03em] sm:text-[64px]/[1.05]"
        >
          Documentation
        </h1>
        <p class="max-w-135 text-lg/[29px] text-pretty text-muted-foreground">
          Guides, references, and answers for getting your Stack VPS or
          colocation slot up and running.
        </p>
        <DocsSearch class="mt-6" />
      </div>

      <div class="flex flex-col gap-4 lg:w-130">
        <h2 class="text-[15px] font-semibold">Start here</h2>
        <ul class="border border-border">
          {#each startHere as item, index (item.title)}
            <li class={index > 0 ? "border-t border-border" : ""}>
              <a
                class="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-850"
                href={item.href}
              >
                <span
                  class="grid size-9 shrink-0 place-items-center border border-border"
                >
                  <item.icon class="size-4" strokeWidth={1.75} />
                </span>
                <span class="flex flex-1 flex-col gap-0.5">
                  <span class="text-[15px] font-medium">{item.title}</span>
                  <span class="text-sm text-muted-foreground"
                    >{item.description}</span
                  >
                </span>
                <ArrowRight
                  class="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <!-- Guides: every docs section and its pages, generated from src/content/docs -->
  <section class="border-b border-border py-20 lg:py-28">
    <div class="page-container flex flex-col gap-14">
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">
          Guides
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          In-depth documentation by topic. More is being written as we launch.
        </p>
      </div>
      <div
        class="grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4"
      >
        {#each docSections as section (section.id)}
          <div class="flex flex-col gap-6 bg-background p-7">
            <a
              class="group flex flex-col gap-3"
              href={resolve("/docs/[section]", { section: section.id })}
            >
              <section.icon class="size-5" strokeWidth={1.5} />
              <h3
                class="text-xl font-semibold tracking-[-0.015em] group-hover:text-gray-300"
              >
                {section.title}
              </h3>
              <p class="text-sm/[22px] text-muted-foreground">
                {section.description}
              </p>
            </a>
            <ul class="flex flex-col gap-0.5 border-t border-border pt-4">
              {#each section.pages as page (page.href)}
                <li>
                  {#if page.published}
                    <a
                      class="group flex items-center justify-between gap-3 py-1.5 text-[15px] transition-colors hover:text-gray-300"
                      href={resolve("/docs/[section]/[slug]", {
                        section: page.section,
                        slug: page.slug,
                      })}
                    >
                      {page.title}
                      <ArrowUpRight
                        class="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground"
                      />
                    </a>
                  {:else}
                    <span
                      class="flex items-center justify-between gap-3 py-1.5 text-[15px] text-gray-600"
                    >
                      {page.title}
                      {#if !page.supported}
                        <span
                          class="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          Soon
                        </span>
                      {/if}
                    </span>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Colocation quick start: who does what, from contact to first SSH -->
  <section class="border-b border-border py-20 lg:py-28">
    <div class="page-container flex flex-col gap-14 lg:flex-row lg:gap-24">
      <div class="flex flex-col gap-4 lg:w-90 lg:shrink-0">
        <h2
          class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]"
        >
          Colocation quick start
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          From a shipped box to a running server in four steps.
        </p>
        <dl class="mt-6 flex flex-col gap-3 text-sm text-muted-foreground">
          <div class="flex items-center gap-3">
            <dt>{@render owner("You")}</dt>
            <dd>Steps you take</dd>
          </div>
          <div class="flex items-center gap-3">
            <dt>{@render owner("Us")}</dt>
            <dd>Steps we handle in the data center</dd>
          </div>
        </dl>
      </div>

      <ol class="flex flex-1 flex-col">
        <li class="relative flex gap-6 pb-12">
          <span
            aria-hidden="true"
            class="absolute top-8 bottom-0 left-4 w-px bg-border"
          ></span>
          <span
            class="z-10 grid size-8 shrink-0 place-items-center border border-border bg-background font-mono text-xs"
            >01</span
          >
          <div class="flex flex-col gap-3 pt-1">
            <h3 class="flex items-center gap-3 text-lg font-semibold">
              Contact us {@render owner("You")}
            </h3>
            <p class="max-w-135 text-[15px]/[25px] text-muted-foreground">
              Pick a colocation plan and send us the contact form. We'll reply
              to sort out shipping and give you a reference number for the box.
            </p>
            <a
              class="flex items-center gap-1.5 self-start text-[15px] font-medium hover:text-gray-300"
              href="{resolve("/colocation")}#inquiry"
            >
              Get in touch <ArrowRight class="size-3.5" />
            </a>
          </div>
        </li>
        <li class="relative flex gap-6 pb-12">
          <span
            aria-hidden="true"
            class="absolute top-8 bottom-0 left-4 w-px bg-border"
          ></span>
          <span
            class="z-10 grid size-8 shrink-0 place-items-center border border-border bg-background font-mono text-xs"
            >02</span
          >
          <div class="flex min-w-0 flex-1 flex-col gap-3 pt-1">
            <h3 class="flex items-center gap-3 text-lg font-semibold">
              Ship your server {@render owner("You")}
            </h3>
            <p class="max-w-135 text-[15px]/[25px] text-muted-foreground">
              Pack it up, or have an eBay seller ship it straight to us. Put
              your reference number on the outside of the box.
            </p>
            <a
              class="flex items-center gap-1.5 self-start text-[15px] font-medium hover:text-gray-300"
              href={resolve("/docs/[section]/[slug]", {
                section: "colocation",
                slug: "shipping-hardware",
              })}
            >
              Shipping guide <ArrowRight class="size-3.5" />
            </a>
            <div
              class="mt-3 flex items-start justify-between gap-4 border border-border bg-gray-850 px-6 py-5"
              data-copy-source={shippingAddress}
            >
              <div class="flex flex-col gap-3">
                <span
                  class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
                >
                  Ship to
                </span>
                <address
                  class="font-mono text-sm/[21px] whitespace-pre-line not-italic"
                >
                  {shippingAddress}
                </address>
              </div>
              <button
                class="docs-code-copy flex items-center gap-1.5"
                data-copy-code
                type="button"
              >
                <Copy class="size-3.5" />
                Copy
              </button>
            </div>
          </div>
        </li>
        <li class="relative flex gap-6 pb-12">
          <span
            aria-hidden="true"
            class="absolute top-8 bottom-0 left-4 w-px bg-border"
          ></span>
          <span
            class="z-10 grid size-8 shrink-0 place-items-center bg-brand-yellow font-mono text-xs text-gray-950"
            >03</span
          >
          <div class="flex flex-col gap-3 pt-1">
            <h3 class="flex items-center gap-3 text-lg font-semibold">
              Rack and stack {@render owner("Us")}
            </h3>
            <p class="max-w-135 text-[15px]/[25px] text-muted-foreground">
              We unpack, label, and test it, then rack, cable, and power it on
              in our Chicago data center. We email you when it's online.
            </p>
          </div>
        </li>
        <li class="flex gap-6">
          <span
            class="z-10 grid size-8 shrink-0 place-items-center border border-border bg-background font-mono text-xs"
            >04</span
          >
          <div class="flex min-w-0 flex-1 flex-col gap-3 pt-1">
            <h3 class="flex items-center gap-3 text-lg font-semibold">
              SSH in and go {@render owner("You")}
            </h3>
            <p class="max-w-135 text-[15px]/[25px] text-muted-foreground">
              Update the system, add your own user, and lock down SSH before you
              do anything else.
            </p>
            <figure class="docs-code">
              <figcaption class="docs-code-header">
                <span>Fedora Server</span>
                <button
                  class="docs-code-copy flex items-center gap-1.5"
                  data-copy-code
                  type="button"
                >
                  <Copy class="size-3.5" />
                  Copy
                </button>
              </figcaption>
              <pre data-copy-source={firstCommands.join("\n")}><code
									>{#each firstCommands as command (command)}<span class="block"
											><span class="text-muted-foreground select-none">$ </span>{command}</span
										>{/each}</code
								></pre>
            </figure>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <!-- Support: where to go when the docs don't cover it -->
  <section class="pt-20 pb-8 lg:pt-28">
    <div class="page-container">
      <div
        class="flex flex-col justify-between gap-6 border border-border bg-gray-850 p-8 md:flex-row md:items-center lg:px-9"
      >
        <div class="flex flex-col gap-1.5">
          <h2 class="text-xl font-semibold tracking-[-0.015em]">
            Can't find what you need?
          </h2>
          <p class="text-[15px] text-muted-foreground">
            Open a ticket and the people who run the racks will answer it.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Button
            class="h-auto gap-2 py-2 pl-3.5 has-data-[icon=inline-end]:pr-2.5"
            href="mailto:support@fyrastack.com"
            variant="accent"
          >
            Contact support <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            class="h-auto gap-2 py-2 pl-3.5 text-muted-foreground has-data-[icon=inline-end]:pr-2.5"
            href={discordUrl}
            variant="ghost"
          >
            Ask on Discord <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </div>
  </section>
</main>
