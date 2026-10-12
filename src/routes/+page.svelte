<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import { fly } from "svelte/transition";
  import { replaceState } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import ctaDither from "$lib/assets/cta-dither.webp";
  import heroDither from "$lib/assets/hero-dither.webp";
  import fyraLabsLogo from "$lib/assets/projects/fyralabs.svg";
  import fyraLabsPreview from "$lib/assets/projects/fyralabs-preview.webp";
  import terraLogo from "$lib/assets/projects/terra.svg";
  import terraPreview from "$lib/assets/projects/terra-preview.webp";
  import ultramarineLogo from "$lib/assets/projects/ultramarine.svg";
  import ultramarinePreview from "$lib/assets/projects/ultramarine-preview.webp";
  import BlurTypeWord from "$lib/components/landing/blur-type-word.svelte";
  import { colocationFeatures } from "$lib/components/landing/colocation";
  import ColocationInquiryDialog from "$lib/components/landing/colocation-inquiry-dialog.svelte";
  import CreateServerMockup from "$lib/components/landing/create-server-mockup.svelte";
  import DashboardDemo from "$lib/components/landing/dashboard-demo/dashboard-demo.svelte";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import {
    colocationTiers,
    competitors,
    planSpecs,
    plans,
  } from "$lib/components/landing/plans";
  import ProjectLink from "$lib/components/landing/project-link.svelte";
  import RollingPrice from "$lib/components/landing/rolling-price.svelte";
  import TextLink from "$lib/components/landing/text-link.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import * as Tooltip from "$lib/components/ui/tooltip";
  import { homeJsonLd } from "$lib/structured-data";
  import ArrowRight from "~icons/nucleo/arrow-right";
  import Check from "~icons/nucleo/check";
  import CornerLeftUp from "~icons/nucleo/corner-left-up";
  import CornerRightUp from "~icons/nucleo/corner-right-up";
  import Cpu from "~icons/nucleo/cpu";
  import DoorOpen from "~icons/nucleo/door-open";
  import Gauge from "~icons/nucleo/gauge";
  import HardDrive from "~icons/nucleo/hard-drive";
  import LifeBuoy from "~icons/nucleo/life-ring";
  import Network from "~icons/nucleo/network";
  import ReceiptText from "~icons/nucleo/receipt";
  import Server from "~icons/nucleo/server";

  const dashboardUrl = "https://dash.fyrastack.com";
  const createServerUrl = `${dashboardUrl}/servers/new`;
  const signUpUrl = dashboardUrl;
  const salesUrl = `${resolve("/about")}#contact`;
  const discordUrl = "https://discord.gg/YwzKxUBu4U";

  const heroWords = [
    "stack",
    "database",
    "app",
    "website",
    "API",
    "CI",
    "game server",
    "Git forge",
    "Discord bot",
    "Mastodon",
  ];

  const demoWidth = "clamp(1024px, 100cqw / 0.8, 1440px)";
  const demoFitVars = `--demo-width: ${demoWidth}; --demo-zoom: min(0.8, tan(atan2(100cqw, ${demoWidth})))`;

  const whyFeatures = [
    {
      description: actuallyOpenDescription,
      icon: DoorOpen,
      title: "Actually open",
    },
    {
      description:
        "Built on infrastructure we own, we don't resell another provider's compute",
      icon: Server,
      title: "Our metal",
    },
    {
      description: "As easy as running into a coworker",
      icon: LifeBuoy,
      title: "Real support",
    },
    {
      description: predictablePricingDescription,
      icon: ReceiptText,
      title: "Predictable pricing",
    },
  ];

  const vpsSpecs = [
    {
      description: "On Dell PowerEdge chassis",
      icon: Cpu,
      title: "Intel Cascade Lake",
    },
    {
      description: "Rated for data center throughput",
      icon: HardDrive,
      title: "Enterprise SAS3 SSDs",
    },
    {
      description: "On every server",
      icon: Network,
      title: "IPv4 and a /64 of IPv6",
    },
    {
      description: "Fair-use, never billed per GB",
      icon: Gauge,
      title: "1 Gbps uplink, $0 egress",
    },
  ];

  const included = [
    "Cascade Lake vCPUs",
    "Dedicated IPv4 + /64 IPv6",
    "Full root access",
    "Cancel anytime",
  ];

  const colocationInquiryHash = "#colocation-inquiry";
  let colocationInquiryOpen = $state(false);

  $effect(() => {
    if (page.url.hash === colocationInquiryHash) {
      colocationInquiryOpen = true;
    }
  });

  function openColocationInquiry() {
    colocationInquiryOpen = true;
  }

  function clearColocationInquiryHash(open: boolean) {
    if (!open && page.url.hash === colocationInquiryHash) {
      replaceState(resolve("/"), page.state);
    }
  }

  let selectedName = $state(plans[0].name);
  let hasPickedPlan = $state(false);
  const swapDuration = $derived(prefersReducedMotion.current ? 0 : 220);

  function markPlanPicked() {
    hasPickedPlan = true;
  }
  const selected = $derived(
    plans.find((option) => option.name === selectedName) ?? plans[0]
  );
  const comparisonOffers = $derived(
    competitors.map((competitor) => ({
      offer: competitor.offersByMemoryGb[selected.memoryGb],
      provider: competitor.provider,
    }))
  );

  const mockupNaturalWidth = 1280;
  const mockupFrameHeight = 824;
  let mockupFrameWidth = $state(mockupNaturalWidth);
  const mockupScale = $derived(
    Math.min(1, mockupFrameWidth / mockupNaturalWidth)
  );
</script>

<svelte:head>
  <title>Fyra Stack · We run the servers, you run your stack</title>
  <meta
    content="Fyra Stack · We run the servers, you run your stack"
    property="og:title"
  >
  <meta
    content="Fast, independent VPS hosting and colocation. Plans start at $5/mo."
    name="description"
  >
  <meta
    content="Fast, independent VPS hosting and colocation. Plans start at $5/mo."
    property="og:description"
  >
  {@html homeJsonLd}
</svelte:head>

{#snippet actuallyOpenDescription()}
  Our <TextLink href="https://github.com/FyraStack">code</TextLink>,
  <TextLink href={discordUrl}>community</TextLink>, and
  <TextLink href={resolve("/about")}>team</TextLink>
  are open
{/snippet}

{#snippet predictablePricingDescription()}
  No hidden fees, no egress charges, no surprise bills. No
  <Tooltip.Root>
    <Tooltip.Trigger
      class="cursor-help underline decoration-gray-600 decoration-dotted underline-offset-4"
      >calc</Tooltip.Trigger
    >
    <Tooltip.Content
      >calc stands for calculator, we're just using slang.</Tooltip.Content
    >
  </Tooltip.Root>
  needed
{/snippet}

<main>
  <!-- Hero -->
  <section class="relative isolate overflow-hidden border-b border-border">
    <DitherBackground
      class="-z-10"
      poster={heroDither}
      priority
      settings={{
        clearAmount: 0.85,
        clearH: 0.26,
        clearW: 0.61,
        clearX: 0.5,
        clearY: 0.24,
        driftX: 10,
        driftY: -6,
        fadeBottom: 0.45,
        fadeTop: 0,
        intensity: 0.72,
        scale: 1.1,
        seed: 12,
        shape: 2,
        speed: 0.3,
      }}
    />

    <div
      class="page-container flex flex-col items-center gap-11 pt-16 pb-16 sm:pt-18 md:pb-0"
    >
      <div
        class="relative isolate flex flex-col items-center gap-5 text-center before:absolute before:-inset-x-10 before:-inset-y-12 before:-z-10 before:bg-[radial-gradient(closest-side,var(--color-background)_55%,transparent)] md:before:hidden"
      >
        <h1
          class="max-w-250 text-[40px]/[1.08] font-semibold tracking-[-0.028em] text-balance sm:text-5xl/[1.06] lg:text-[64px]/[67px]"
        >
          <span class="sr-only">We run the servers, you run your stack</span>
          <span aria-hidden="true"
            >We run the servers,<br>
            <span class="sm:whitespace-nowrap"
              >you run your <br class="sm:hidden">
              <BlurTypeWord words={heroWords} /></span
            ></span
          >
        </h1>
        <p
          class="max-w-155 text-base/7 text-pretty text-muted-foreground sm:text-lg/[29px]"
        >
          Built from the ground up to support the open-source projects we love,
          and the communities around them
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            class="h-auto gap-2 py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
            href={createServerUrl}
            size="lg"
          >
            Deploy your Server <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            class="h-auto px-4 py-2.5 text-muted-foreground"
            href="#pricing"
            size="lg"
            variant="ghost"
          >
            View plans
          </Button>
        </div>
      </div>

      <div
        class="hidden h-110 w-full [clip-path:inset(-64px_0_0_0)] md:block lg:h-134 lg:px-16"
      >
        <div class="@container">
          <div class="flex justify-center" style={demoFitVars}>
            <DashboardDemo
              class="h-200 w-(--demo-width) shrink-0 [zoom:var(--demo-zoom)] shadow-[0_2px_4px_#00000066,0_24px_48px_-12px_#000000aa,0_64px_120px_-24px_#000000cc] outline outline-offset-[-0.5px] outline-border"
              createServerUrl={dashboardUrl}
              {dashboardUrl}
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="relative border-b border-border py-20 lg:py-28" id="about">
    <div
      class="absolute top-0 left-1/2 hidden -translate-x-1/2 items-center gap-2 border-x border-b border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground md:flex"
    >
      <CornerLeftUp class="size-3.5" />
      Try me
      <CornerRightUp class="size-3.5" />
    </div>
    <div class="page-container">
      <div
        class="flex flex-col justify-between gap-6 pb-12 md:flex-row md:gap-10 lg:pb-14"
      >
        <h2
          class="shrink-0 text-[32px]/[1.15] font-semibold tracking-[-0.02em] sm:text-[40px]/[46px]"
        >
          Why Stack?
        </h2>
        <div class="flex max-w-125 flex-col gap-3.5">
          <p class="text-xl/[29px] font-medium tracking-[-0.01em] text-pretty">
            Stack is built by
            <ProjectLink
              color="var(--accent)"
              href="https://fyralabs.com"
              logo={fyraLabsLogo}
              preview={fyraLabsPreview}
              >Fyra Labs</ProjectLink
            >, the team that develops
            <ProjectLink
              color="#3388ff"
              href="https://terrapkg.com"
              logo={terraLogo}
              preview={terraPreview}
              >Terra</ProjectLink
            >
            and
            <ProjectLink
              color="#7c85ec"
              href="https://ultramarine-linux.org"
              logo={ultramarineLogo}
              preview={ultramarinePreview}
              >Ultramarine</ProjectLink
            >.
          </p>
          <p class="text-base/[26px] text-pretty text-muted-foreground">
            We spent years scaling infrastructure to support open-source,
            reaching millions of unique clients every month, quickly
            discovering: hosting sucks. We're making it better, so you don't
            suffer too.
          </p>
        </div>
      </div>

      <div class="grid gap-x-16 md:grid-cols-2">
        {#each whyFeatures as feature (feature.title)}
          <div class="flex flex-col gap-3 border-t border-border pt-6 pb-10">
            <feature.icon class="size-5 text-foreground" />
            <h3 class="text-lg font-semibold tracking-[-0.011em]">
              {feature.title}
            </h3>
            <p class="text-base/[26px] text-muted-foreground">
              {#if typeof feature.description === "string"}
                {feature.description}
              {:else}
                {@render feature.description()}
              {/if}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- VPS -->
  <section class="border-b border-border py-20 md:pb-0 lg:pt-30" id="vps">
    <div class="page-container flex flex-col gap-16">
      <div class="flex flex-col justify-between gap-10 lg:flex-row">
        <h2
          class="text-4xl/[1.1] font-semibold tracking-[-0.03em] sm:text-5xl/[53px]"
        >
          Easy to deploy<br>
          <span class="text-muted-foreground">Hard to outgrow</span>
        </h2>
        <div class="flex max-w-125 flex-col gap-6">
          <div class="flex flex-col gap-3.5">
            <p
              class="text-xl/[29px] font-medium tracking-[-0.01em] text-pretty"
            >
              Other VPS providers cut corners to hit their price points. We
              don't.
            </p>
            <p class="text-base/[26px] text-pretty text-muted-foreground">
              We run a lean team, buy solid hardware, obsess over developer
              experience, listen to our community, and build a product we
              actually love to use.
            </p>
          </div>
          <Button
            class="h-auto self-start px-4 py-2.5"
            href="#pricing"
            size="lg"
            variant="accent"
          >
            See VPS plans
          </Button>
        </div>
      </div>

      <ul class="grid gap-8 sm:grid-cols-2 lg:flex lg:justify-between">
        {#each vpsSpecs as spec (spec.title)}
          <li class="flex gap-3">
            <spec.icon class="mt-0.5 size-4.5 shrink-0" />
            <div class="flex flex-col gap-1">
              <span class="text-[15px] font-medium">{spec.title}</span>
              <span class="text-sm text-muted-foreground"
                >{spec.description}</span
              >
            </div>
          </li>
        {/each}
      </ul>

      <div
        class="relative hidden [clip-path:inset(-64px_0_0_0)] md:block"
        style:height="{mockupFrameHeight * mockupScale}px"
        bind:clientWidth={mockupFrameWidth}
      >
        <div style:zoom={mockupScale}>
          <CreateServerMockup />
        </div>
        <div
          class="absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-background/0 to-background"
        ></div>
      </div>
    </div>
  </section>

  <!-- Colocation: features -->
  <section class="border-b border-border py-20 lg:py-30" id="colocation">
    <div class="page-container flex flex-col items-center gap-16">
      <div class="flex flex-col items-center gap-8 text-center">
        <div class="flex flex-col items-center gap-5">
          <h2
            class="text-4xl/[1.1] font-semibold tracking-[-0.03em] sm:text-5xl/[53px]"
          >
            Ship your hardware<br>We handle the rest
          </h2>
          <p class="text-[17px]/[27px] text-pretty text-muted-foreground">
            Colocation without the enterprise markup or fees just for asking
            questions
          </p>
        </div>
        <Button
          class="h-auto px-4 py-2.5"
          id="colocation-inquiry"
          onclick={openColocationInquiry}
          size="lg"
          variant="accent"
        >
          Ship us your server
        </Button>
      </div>
      <ul
        class="grid w-full gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4"
      >
        {#each colocationFeatures as feature (feature.title)}
          <li class="flex flex-col gap-4 bg-background p-6">
            <feature.icon class="size-5 text-foreground" />
            <div class="flex flex-col gap-1.5">
              <span class="text-[15px] font-semibold">{feature.title}</span>
              <span class="text-sm/[21px] text-pretty text-muted-foreground"
                >{feature.description}</span
              >
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Pricing: VPS plan picker, selected plan summary, colocation tiers -->
  <section class="border-b border-border py-20 lg:py-30" id="pricing">
    <div class="page-container flex flex-col gap-12">
      <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div class="flex max-w-160 flex-col gap-5">
          <h2 class="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Priced fairly
          </h2>
          <p class="text-[17px]/[27px] text-muted-foreground">
            Simple plans with no surprise fees
          </p>
        </div>
        <Button
          class="h-auto self-start px-4 py-2.5 sm:self-auto"
          href={salesUrl}
          size="lg"
          variant="accent"
        >
          Talk to sales
        </Button>
      </div>

      <div class="flex flex-col gap-8">
        <RadioGroup.Root
          aria-label="Choose a VPS plan"
          class="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4"
          onValueChange={markPlanPicked}
          bind:value={selectedName}
        >
          {#each plans as plan (plan.name)}
            {@const isSelected = plan.name === selectedName}
            <label
              class={[
                "group relative flex cursor-pointer flex-col gap-4 bg-background p-5 transition-colors has-focus-visible:bg-gray-850",
                isSelected
                  ? "bg-gray-850 shadow-[inset_0_2px_0_var(--color-primary)]"
                  : "hover:bg-gray-850/60",
              ]}
              for="plan-{plan.name}"
            >
              <div class="flex items-center justify-between">
                <span class="font-mono text-sm font-semibold">{plan.name}</span>
                <RadioGroup.Item
                  class="border-gray-600 group-hover:border-gray-500"
                  id="plan-{plan.name}"
                  value={plan.name}
                />
              </div>
              <div class="flex items-end gap-1">
                <span
                  class="text-3xl font-semibold tracking-[-0.03em] tabular-nums"
                  >${plan.price}</span
                >
                <span class="text-sm text-muted-foreground">/mo</span>
              </div>
              <span
                class={[
                  "text-[13px]",
                  isSelected ? "text-foreground" : "text-muted-foreground",
                ]}
              >
                {plan.vcpu}
                vCPU · {plan.memoryGb} GB · {plan.storageGb} GB SSD
              </span>
            </label>
          {/each}
        </RadioGroup.Root>

        <div
          aria-live="polite"
          class="grid grid-cols-1 border border-border lg:grid-cols-3"
        >
          <div class="flex flex-col justify-between gap-6 p-8">
            <div class="flex flex-col gap-2.5">
              <span class="font-mono text-xl font-semibold"
                >{selected.name}</span
              >
              <div class="flex items-end gap-1.5">
                <RollingPrice
                  class="text-7xl/[65px] font-semibold tracking-[-0.04em] tabular-nums"
                  value={selected.price}
                />
                <span class="text-lg text-muted-foreground">/mo</span>
              </div>
              <p class="text-[13px]/5 text-muted-foreground">
                {planSpecs(selected)}<br>1 Gbps fair-use uplink
              </p>
            </div>
            <Button
              class="h-auto py-2.5"
              href={createServerUrl}
              size="lg"
              variant="accent"
            >
              Deploy {selected.name}
            </Button>
          </div>
          <div
            class="flex flex-col gap-1 border-t border-border p-8 lg:border-t-0 lg:border-l"
          >
            <div class="flex items-center gap-3 text-xs text-muted-foreground">
              <span class="flex-1">Same size elsewhere</span>
              <span class="w-20 text-right">Their price</span>
              <span class="w-20 text-right">You save</span>
            </div>
            <ul class="flex flex-col">
              {#each comparisonOffers as { provider, offer } (provider)}
                <li
                  class="flex items-center gap-3 overflow-hidden border-b border-border py-3 text-sm last:border-b-0"
                >
                  <span class="flex-1">{provider}</span>
                  <span class="grid justify-items-end">
                    {#if offer}
                      <span
                        class="col-start-1 row-start-1 flex gap-3"
                        in:fly={{ duration: swapDuration, y: 12 }}
                        out:fly={{ duration: swapDuration, y: -12 }}
                      >
                        <span
                          class="w-20 text-right text-muted-foreground tabular-nums"
                          >{offer.approximate ? "~" : ""}<RollingPrice
                            animateIn={hasPickedPlan}
                            value={offer.price}
                          /></span
                        >
                        <span
                          class="w-20 text-right font-mono font-semibold tabular-nums"
                          ><RollingPrice
                            animateIn={hasPickedPlan}
                            value={Math.max(0, offer.price - selected.price)}
                          /></span
                        >
                      </span>
                    {:else}
                      <span
                        class="col-start-1 row-start-1 text-muted-foreground"
                        in:fly={{ duration: swapDuration, y: 12 }}
                        out:fly={{ duration: swapDuration, y: -12 }}
                        >Not offered</span
                      >
                    {/if}
                  </span>
                </li>
              {/each}
            </ul>
          </div>
          <div
            class="flex flex-col gap-3 border-t border-border p-8 lg:border-t-0 lg:border-l"
          >
            <span class="text-sm font-medium text-foreground"
              >On every plan</span
            >
            <ul class="flex flex-col gap-3">
              {#each included as item (item)}
                <li class="flex items-center gap-2.5 text-sm/5">
                  <Check class="size-4 shrink-0" />
                  {item}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col border border-border lg:flex-row">
        <div class="flex flex-col gap-2.5 p-6 lg:w-85 lg:shrink-0">
          <h3 class="text-lg font-semibold">Server Colocation</h3>
          <p class="text-sm/[22px] text-muted-foreground">
            Priced per unit, with power and a 1 Gbps port included.
          </p>
          <button
            class="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-medium transition-colors hover:text-gray-300"
            onclick={openColocationInquiry}
            type="button"
          >
            Get in touch <ArrowRight class="size-3.5" />
          </button>
        </div>
        <ul class="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {#each colocationTiers as tier (tier.units)}
            <li
              class="flex flex-col justify-between gap-4 border-t border-l border-border px-5 py-6 lg:border-t-0"
            >
              <div class="flex flex-col gap-1.5">
                <span class="text-2xl font-semibold tracking-[-0.025em]"
                  >{tier.units}U</span
                >
                <span class="text-sm text-muted-foreground">
                  {tier.watts}W · 1 Gbps
                </span>
              </div>
              <span class="text-[15px] font-semibold tabular-nums"
                >${tier.price}/mo</span
              >
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <!-- Closing CTA -->
  <section
    class="relative isolate overflow-hidden border-b border-border py-28 lg:py-42"
  >
    <DitherBackground
      class="-z-10"
      poster={ctaDither}
      settings={{
        clearAmount: 0.9,
        clearH: 0.45,
        clearW: 1.12,
        clearX: 0.5,
        clearY: 0.5,
        fadeBottom: 0.15,
        fadeTop: 0.15,
        intensity: 0.62,
        scale: 1.2,
        seed: 40,
        shape: 2,
        speed: 0.4,
      }}
    />

    <div class="page-container flex flex-col items-center gap-10 text-center">
      <div class="flex flex-col items-center gap-5">
        <h2
          class="max-w-220 text-5xl/[1.02] font-semibold tracking-[-0.033em] text-balance sm:text-[72px]/[73px]"
        >
          Your first server is five dollars away
        </h2>
        <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
          BASE-2G gets you 2 vCPU, 2 GB of RAM, and 40 GB of SAS3 SSD. Resize
          whenever you outgrow it.
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <Button
          class="h-auto gap-2 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
          href={signUpUrl}
          size="lg"
          variant="accent"
        >
          Deploy your Server <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          class="h-auto px-4 py-2.5 text-muted-foreground"
          href={discordUrl}
          size="lg"
          variant="ghost"
        >
          Join our Discord
        </Button>
      </div>
    </div>
  </section>
</main>

<ColocationInquiryDialog
  onOpenChange={clearColocationInquiryHash}
  bind:open={colocationInquiryOpen}
/>
