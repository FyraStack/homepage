<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Check from "@lucide/svelte/icons/check";
  import CornerLeftUp from "@lucide/svelte/icons/corner-left-up";
  import CornerRightUp from "@lucide/svelte/icons/corner-right-up";
  import Cpu from "@lucide/svelte/icons/cpu";
  import Gauge from "@lucide/svelte/icons/gauge";
  import HardDrive from "@lucide/svelte/icons/hard-drive";
  import LifeBuoy from "@lucide/svelte/icons/life-buoy";
  import Network from "@lucide/svelte/icons/network";
  import ReceiptText from "@lucide/svelte/icons/receipt-text";
  import Server from "@lucide/svelte/icons/server";
  import Zap from "@lucide/svelte/icons/zap";
  import { resolve } from "$app/paths";
  import ctaDither from "$lib/assets/cta-dither.png";
  import heroDither from "$lib/assets/hero-dither.png";
  import {
    colocationFeatures,
    colocationSteps,
  } from "$lib/components/landing/colocation";
  import ColocationRack from "$lib/components/landing/colocation-rack.svelte";
  import CreateServerMockup from "$lib/components/landing/create-server-mockup.svelte";
  import DashboardDemo from "$lib/components/landing/dashboard-demo/dashboard-demo.svelte";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import {
    colocationTiers,
    competitors,
    planSpecs,
    plans,
  } from "$lib/components/landing/plans";
  import StackMark from "$lib/components/landing/stack-mark.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Slider } from "$lib/components/ui/slider";

  const dashboardUrl = "https://dash.fyrastack.com";
  const createServerUrl = `${dashboardUrl}/servers/new`;
  const signUpUrl = dashboardUrl;
  const salesUrl = "mailto:support@fyrastack.com?subject=Sales%20question";
  const discordUrl = "#";

  const whyFeatures = [
    {
      description:
        "Fast storage, fast compute, fast networking, fast everything",
      icon: Zap,
      title: "Fast by default",
    },
    {
      description:
        "Built on infrastructure we own, we don't resell another provider",
      icon: Server,
      title: "Independent",
    },
    {
      description: "By the engineers that actually maintain the servers",
      icon: LifeBuoy,
      title: "Real support",
    },
    {
      description: "No hidden fees, no egress charges, no surprise bills",
      icon: ReceiptText,
      title: "Honest pricing",
    },
  ];

  const vpsSpecs = [
    {
      description: "On Dell PowerEdge chassis",
      icon: Cpu,
      title: "Intel Cascade Lake",
    },
    {
      description: "Rated for datacenter write loads",
      icon: HardDrive,
      title: "Enterprise SAS3 SSD",
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

  let comparisonIndex = $state(3);
  const comparisonPlan = $derived(plans[comparisonIndex]);

  const included = [
    "Cascade Lake vCPUs",
    "Dedicated IPv4 + /64 IPv6",
    "Full root access",
    "Out-of-band serial console",
    "Cancel anytime",
  ];

  let selectedName = $state(plans[0].name);
  const selected = $derived(
    plans.find((option) => option.name === selectedName) ?? plans[0]
  );
</script>

<svelte:head>
  <title>Fyra Stack · Infrastructure without breaking the bank</title>
  <meta
    content="Fast, independent VPS hosting and colocation in Chicago from Fyra Labs. Plans start at $5/mo."
    name="description"
  >
</svelte:head>

<main>
  <!-- Hero: dithered shader background and server dashboard mockup -->
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
      class="page-container flex flex-col items-center gap-11 pt-16 sm:pt-18"
    >
      <div class="flex flex-col items-center gap-5 text-center">
        <h1
          class="max-w-250 text-[40px]/[1.08] font-semibold tracking-[-0.028em] text-balance sm:text-5xl/[1.06] lg:text-[64px]/[67px]"
        >
          Infrastructure without breaking the bank, or your mind
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
            Deploy a server <ArrowRight data-icon="inline-end" />
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
        class="h-80 w-full [clip-path:inset(-64px_0_0_0)] sm:h-110 lg:h-134 lg:px-16"
      >
        <DashboardDemo
          class="h-200 w-360 zoom-[0.8] shadow-[0_2px_4px_#00000066,0_24px_48px_-12px_#000000aa,0_64px_120px_-24px_#000000cc] outline outline-offset-[-0.5px] outline-border"
          {createServerUrl}
          {dashboardUrl}
        />
      </div>
    </div>
  </section>

  <!-- About: "Stack is different" and the four value props -->
  <section class="relative border-b border-border py-20 lg:py-28" id="about">
    <div
      class="absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-2 border-x border-b border-border bg-muted px-3 py-1.5 font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
    >
      <CornerLeftUp class="size-3.5" />
      Try me
      <CornerRightUp class="size-3.5" />
    </div>
    <div class="page-container">
      <div class="flex max-w-155 flex-col gap-4 pb-14 lg:pb-18">
        <h2
          class="text-[32px]/[1.15] font-semibold tracking-[-0.02em] sm:text-[40px]/[46px]"
        >
          Stack is different
        </h2>
        <div
          class="flex flex-col gap-3 pt-2 text-base/[26px] text-muted-foreground"
        >
          <p>
            Stack is provided by Fyra Labs, the open source community that
            develops Terra and Ultramarine Linux.
          </p>
          <p>
            Everything we do is open source, and you can view and contribute to
            the very code that powers your server.
          </p>
          <p>
            We focus on servers that just work, built to support and use the
            open source projects you love.
          </p>
        </div>
      </div>

      <div class="grid gap-x-16 md:grid-cols-2">
        {#each whyFeatures as feature (feature.title)}
          <div class="flex flex-col gap-3 border-t border-border pt-6 pb-10">
            <feature.icon class="size-5 text-foreground" strokeWidth={1.75} />
            <h3 class="text-lg font-semibold tracking-[-0.011em]">
              {feature.title}
            </h3>
            <p class="text-base/[26px] text-muted-foreground">
              {feature.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- VPS: hardware pitch, create-server mockup, spec highlights -->
  <section class="border-b border-border py-20 lg:py-30" id="vps">
    <div class="page-container flex flex-col gap-16">
      <div class="flex flex-col justify-between gap-10 lg:flex-row">
        <h2
          class="text-4xl/[1.1] font-semibold tracking-[-0.03em] sm:text-5xl/[53px]"
        >
          We run the servers<br>
          <span class="text-muted-foreground">You run your stack</span>
        </h2>
        <div class="flex max-w-125 flex-col gap-6">
          <div class="flex flex-col gap-3.5">
            <p
              class="text-xl/[29px] font-medium tracking-[-0.01em] text-pretty"
            >
              Most budget providers cut corners on hardware to hit their price
              points. We don't.
            </p>
            <p class="text-base/[26px] text-pretty text-muted-foreground">
              Powered by Cascade Lake series CPUs, Dell PowerEdge servers, and
              enterprise SSDs. We buy good hardware, run it efficiently, run a
              small focused team, don't oversell, and charge a fair price. It's
              boring, and it works!
            </p>
          </div>
          <Button
            class="h-auto self-start px-4 py-2.5"
            href="#pricing"
            size="lg"
            variant="outline"
          >
            See VPS plans
          </Button>
        </div>
      </div>

      <div class="hidden overflow-x-clip md:block">
        <CreateServerMockup />
      </div>

      <ul class="grid gap-8 sm:grid-cols-2 lg:flex lg:justify-between">
        {#each vpsSpecs as spec (spec.title)}
          <li class="flex gap-3">
            <spec.icon class="mt-0.5 size-4.5 shrink-0" strokeWidth={1.75} />
            <div class="flex flex-col gap-1">
              <span class="text-[15px] font-medium">{spec.title}</span>
              <span class="text-sm text-muted-foreground"
                >{spec.description}</span
              >
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Calculator: plan-size slider compared against same-size competitor plans -->
  <section class="border-b border-border py-20 lg:py-30">
    <div class="page-container flex flex-col gap-14">
      <div class="flex flex-col gap-5">
        <h2 class="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Stack, well... stacks up
        </h2>
        <p class="max-w-160 text-[17px]/[27px] text-muted-foreground">
          Pick a plan size and see what the same machine costs elsewhere.
        </p>
      </div>

      <div class="flex flex-col border border-border lg:flex-row">
        <div class="flex flex-1 flex-col justify-center gap-14 p-6 sm:p-14">
          <div class="flex flex-col gap-5">
            <div class="flex items-baseline justify-between">
              <span
                class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
                id="plan-size-label"
              >
                Plan size
              </span>
              <output
                class="text-[32px]/8 font-semibold tracking-[-0.025em]"
                for="plan-size"
              >
                {comparisonPlan.name}
              </output>
            </div>
            <Slider
              aria-labelledby="plan-size-label"
              class="h-6 **:data-[slot=slider-range]:bg-primary **:data-[slot=slider-thumb]:size-6 **:data-[slot=slider-thumb]:border-4 **:data-[slot=slider-thumb]:border-primary **:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-thumb]:ring-primary/30 **:data-[slot=slider-track]:bg-gray-700"
              id="plan-size"
              max={plans.length - 1}
              min={0}
              step={1}
              type="single"
              bind:value={comparisonIndex}
            />
            <div
              aria-hidden="true"
              class="relative h-4 font-mono text-[10px] tracking-[0.04em]"
            >
              {#each plans as option, index (option.name)}
                <button
                  class={[
                    "absolute top-0 -translate-x-1/2 transition-colors hover:text-foreground",
                    index === comparisonIndex
                      ? "text-foreground"
                      : "text-muted-foreground",
                  ]}
                  onclick={() => {
                    comparisonIndex = index;
                  }}
                  tabindex="-1"
                  type="button"
                  style:left="calc(0.75rem + (100% - 1.5rem) * {index /
                    (plans.length - 1)})"
                >
                  {option.memoryGb}G
                </button>
              {/each}
            </div>
          </div>
          <div
            class="flex items-center gap-2.5 rounded-md bg-gray-850 px-4 py-3.5 text-[13px] outline outline-offset-[-0.5px] outline-border"
          >
            <Server class="size-4 shrink-0" strokeWidth={1.75} />
            {planSpecs(comparisonPlan)}
          </div>
        </div>

        <div
          aria-live="polite"
          class="flex flex-col gap-8 border-t border-border bg-gray-850 p-6 sm:p-14 lg:w-140 lg:border-t-0 lg:border-l"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <StackMark class="size-3.5" />
              <span class="font-mono text-[11px] tracking-[0.11em] uppercase">
                Stack · {comparisonPlan.name}
              </span>
            </div>
            <div class="flex items-end gap-2">
              <span
                class="text-7xl/[0.9] font-semibold tracking-[-0.04em] tabular-nums sm:text-8xl/[86px]"
              >
                ${comparisonPlan.price}
              </span>
              <span class="text-xl text-muted-foreground">/mo</span>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <span
              class="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
            >
              Same size elsewhere
            </span>
            <ul>
              {#each competitors as competitor (competitor.provider)}
                {@const offer =
                  competitor.offersByMemoryGb[comparisonPlan.memoryGb]}
                <li
                  class="flex items-center gap-4 border-b border-border py-4.5"
                >
                  <div class="flex flex-1 flex-col gap-1">
                    <span class="text-[15px] font-medium"
                      >{competitor.provider}</span
                    >
                    <span
                      class="font-mono text-[10px] tracking-[0.06em] text-muted-foreground uppercase"
                    >
                      {offer
                        ? offer.spec
                        : `No ${comparisonPlan.memoryGb} GB plan`}
                    </span>
                  </div>
                  {#if offer}
                    <span class="text-sm text-muted-foreground tabular-nums"
                      >{offer.approximate ? "~" : ""}${offer.price}/mo</span
                    >
                    <span
                      class="w-24 text-right font-mono text-base font-semibold tabular-nums"
                    >
                      Save ${Math.max(0, offer.price - comparisonPlan.price)}
                    </span>
                  {:else}
                    <span class="text-sm text-muted-foreground"
                      >Not offered</span
                    >
                  {/if}
                </li>
              {/each}
            </ul>
          </div>

          <Button
            class="h-auto py-2.5"
            href={createServerUrl}
            size="lg"
            variant="outline"
          >
            Deploy {comparisonPlan.name}
          </Button>
        </div>
      </div>
    </div>
  </section>

  <!-- Colocation: rack illustration, features, and how it works -->
  <section class="border-b border-border py-20 lg:py-30" id="colocation">
    <div class="page-container flex flex-col gap-24">
      <div class="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <ColocationRack />

        <div class="flex flex-1 flex-col gap-12">
          <div class="flex flex-col gap-5">
            <h2
              class="text-4xl/[1.1] font-semibold tracking-[-0.03em] sm:text-5xl/[53px]"
            >
              Ship your hardware<br>We'll handle the rest
            </h2>
            <p class="text-[17px]/[27px] text-pretty text-muted-foreground">
              Colocation without the enterprise markup, mandatory contracts, or
              fees for asking questions
            </p>
          </div>
          <ul>
            {#each colocationFeatures as feature (feature.title)}
              <li class="flex gap-4 border-t border-border py-5">
                <feature.icon
                  class="mt-0.5 size-4.5 shrink-0"
                  strokeWidth={1.75}
                />
                <div class="flex flex-col gap-1">
                  <span class="text-[15px] font-semibold">{feature.title}</span>
                  <span class="text-sm/[21px] text-muted-foreground"
                    >{feature.description}</span
                  >
                </div>
              </li>
            {/each}
          </ul>
          <div class="flex flex-wrap items-center gap-3">
            <Button
              class="h-auto px-4 py-2.5"
              href="{resolve("/colocation")}#inquiry"
              size="lg"
              variant="outline"
            >
              Start a colocation inquiry
            </Button>
            <Button
              class="h-auto gap-2 py-2.5 pl-4 text-muted-foreground has-data-[icon=inline-end]:pr-3"
              href={resolve("/colocation")}
              size="lg"
              variant="ghost"
            >
              Colocation details <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <h3 class="text-xl font-semibold tracking-[-0.02em]">How it works</h3>
        <ol class="grid gap-10 md:grid-cols-3">
          {#each colocationSteps as step, index (step.title)}
            <li class="flex flex-col gap-2.5 border-t border-border pt-6">
              <span
                class="font-mono text-xs tracking-[0.1em] text-brand-yellow"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span class="text-lg font-semibold tracking-[-0.011em]"
                >{step.title}</span
              >
              <span class="text-sm/[21px] text-muted-foreground"
                >{step.description}</span
              >
            </li>
          {/each}
        </ol>
      </div>
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
            Simple, flat-rate plans with no surprise fees
          </p>
        </div>
        <Button
          class="h-auto self-start px-4 py-2.5 text-muted-foreground sm:self-auto"
          href={salesUrl}
          size="lg"
          variant="ghost"
        >
          Talk to sales
        </Button>
      </div>

      <div class="flex flex-col gap-8 lg:flex-row lg:items-start">
        <fieldset class="min-w-0 flex-1 overflow-x-auto border border-border">
          <legend class="sr-only">Choose a VPS plan</legend>
          <div class="min-w-180">
            <div
              aria-hidden="true"
              class="flex items-center gap-4 py-3 pr-5 pl-14 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
            >
              <span class="flex-1">Plan</span>
              <span class="w-24 normal-case">vCPU</span>
              <span class="w-24">RAM</span>
              <span class="w-42.5">Storage</span>
              <span class="w-24 text-right">Price</span>
            </div>
            {#each plans as plan (plan.name)}
              {@const isSelected = plan.name === selectedName}
              <label
                class={[
                  "group relative flex cursor-pointer items-center gap-4 border-t px-5 py-3.5 text-sm transition-colors has-focus-visible:bg-gray-850",
                  isSelected
                    ? "border-l-2 border-t-border border-l-primary bg-gray-850 pl-4.5"
                    : "border-t-border hover:bg-gray-850/60",
                ]}
              >
                <input
                  class="peer sr-only"
                  name="plan"
                  type="radio"
                  value={plan.name}
                  bind:group={selectedName}
                >
                <span
                  class={[
                    "grid size-5 place-items-center rounded-full",
                    "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/60",
                  ]}
                >
                  <span
                    class={[
                      "size-3.5 rounded-full",
                      isSelected
                        ? "border-4 border-primary"
                        : "border border-gray-600 group-hover:border-gray-500",
                    ]}
                  ></span>
                </span>
                <span class="flex-1 font-mono font-semibold whitespace-nowrap"
                  >{plan.name}</span
                >
                <span class={["w-24", !isSelected && "text-gray-300"]}
                  >{plan.vcpu}
                  vCPU</span
                >
                <span class={["w-24", !isSelected && "text-gray-300"]}
                  >{plan.memoryGb}
                  GB</span
                >
                <span class={["w-42.5", !isSelected && "text-gray-300"]}>
                  {plan.storageGb}
                  GB SAS3 SSD
                </span>
                <span class="w-24 text-right font-semibold tabular-nums"
                  >${plan.price}/mo</span
                >
              </label>
            {/each}
          </div>
        </fieldset>

        <aside
          aria-live="polite"
          class="flex flex-col gap-6 border border-border p-8 lg:w-100 lg:shrink-0"
        >
          <span
            class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
          >
            Selected plan
          </span>
          <div class="flex flex-col gap-2.5">
            <span class="font-mono text-xl font-semibold">{selected.name}</span>
            <div class="flex items-end gap-1.5">
              <span
                class="text-7xl/[65px] font-semibold tracking-[-0.04em] tabular-nums"
              >
                ${selected.price}
              </span>
              <span class="text-lg text-muted-foreground">/mo</span>
            </div>
            <p class="text-[13px]/5 text-muted-foreground">
              {planSpecs(selected)}<br>1 Gbps fair-use uplink
            </p>
          </div>
          <div class="h-px bg-border"></div>
          <div class="flex flex-col gap-3">
            <span
              class="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
            >
              On every plan
            </span>
            <ul class="flex flex-col gap-3">
              {#each included as item (item)}
                <li class="flex items-center gap-2.5 text-sm/5">
                  <Check class="size-4 shrink-0" strokeWidth={1.75} />
                  {item}
                </li>
              {/each}
            </ul>
          </div>
          <Button
            class="h-auto py-2.5"
            href={createServerUrl}
            size="lg"
            variant="outline"
          >
            Deploy {selected.name}
          </Button>
        </aside>
      </div>

      <div class="flex flex-col border border-border lg:flex-row">
        <div class="flex flex-col gap-2.5 p-6 lg:w-85 lg:shrink-0">
          <h3 class="text-lg font-semibold">Server Colocation</h3>
          <p class="text-sm/[22px] text-muted-foreground">
            Priced per rack unit, with power and a 1 Gbps port included.
          </p>
          <a
            class="mt-1 inline-flex items-center gap-1.5 self-start text-sm font-medium transition-colors hover:text-gray-300"
            href={resolve("/colocation")}
          >
            Colocation details <ArrowRight class="size-3.5" />
          </a>
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
                <span
                  class="font-mono text-[11px] tracking-[0.04em] text-muted-foreground"
                >
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
          Your first server is five dollars away.
        </h2>
        <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
          BASE-2G gets you 2 vCPU, 2 GB of RAM, and 40 GB of SAS3 SSD, and you
          can resize whenever you outgrow it.
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <Button
          class="h-auto gap-2 bg-background/60 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
          href={signUpUrl}
          size="lg"
          variant="outline"
        >
          Create an account <ArrowRight data-icon="inline-end" />
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
