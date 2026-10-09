<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Check from "@lucide/svelte/icons/check";
  import colocationHeroDither from "$lib/assets/colocation-hero-dither.png";
  import {
    colocationFeatures,
    colocationInquiryUrl,
    colocationSteps,
  } from "$lib/components/landing/colocation";
  import ColocationRack from "$lib/components/landing/colocation-rack.svelte";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import { colocationTiers } from "$lib/components/landing/plans";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";

  const [startingTier] = colocationTiers;

  const spaceOptions = [
    ...colocationTiers.map(
      (tier) => `${tier.units}U · ${tier.watts}W · $${tier.price}/mo`
    ),
    "More than 6U",
    "Not sure yet",
  ];

  let inquiry = $state({
    email: "",
    hardware: "",
    name: "",
    notes: "",
    space: spaceOptions[1],
  });

  function sendInquiry(event: SubmitEvent) {
    event.preventDefault();
    const subject = `Colocation inquiry from ${inquiry.name.trim()}`;
    const body = [
      `Name: ${inquiry.name.trim()}`,
      `Email: ${inquiry.email.trim()}`,
      `Rack space: ${inquiry.space}`,
      "",
      "Hardware:",
      inquiry.hardware.trim(),
      ...(inquiry.notes.trim() ? ["", "Notes:", inquiry.notes.trim()] : []),
    ].join("\n");
    window.location.href = `mailto:support@fyrastack.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const facts = [
    {
      note: `${startingTier.units}U with ${startingTier.watts}W`,
      value: `From $${startingTier.price}/mo`,
    },
    { note: "Port included", value: "1 Gbps" },
    { note: "Our network", value: "[AS402292]" },
  ];

  const included = [
    "Power allocation for your tier",
    "1 Gbps network port",
    "IPMI remote access over VPN",
    "A+B power with UPS and generator backup",
    "No egress charges",
  ];
</script>

<svelte:head>
  <title>Colocation · Fyra Stack</title>
  <meta
    content="Server colocation in Chicago from Fyra Stack. Priced per rack unit with power and a 1 Gbps port included, starting at $70/mo."
    name="description"
  >
</svelte:head>

<main>
  <!-- Hero: headline over a dithered shader, with three quick facts -->
  <section class="relative isolate overflow-hidden border-b border-border">
    <DitherBackground
      class="-z-10"
      poster={colocationHeroDither}
      priority
      settings={{
        clearAmount: 1,
        clearH: 0.5,
        clearW: 0.95,
        clearX: 0.027,
        clearY: 0.42,
        driftX: -1.12,
        driftY: -1.14,
        fadeBottom: 0.45,
        fadeTop: 0,
        intensity: 0.7,
        scale: 2.2,
        seed: 47,
        shape: 2,
        shimmer: 0.25,
        shimmerRate: 0.4,
        speed: 0.09,
      }}
    />

    <div class="page-container flex flex-col gap-20 pt-24 lg:gap-30 lg:pt-32">
      <div class="flex max-w-205 flex-col gap-6">
        <h1
          class="text-5xl/[1.05] font-semibold tracking-[-0.03em] sm:text-7xl/[1.03] lg:text-[80px]/[82px]"
        >
          Ship your hardware<br>
          We handle the rest
        </h1>
        <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
          Colocation without the enterprise markup or fees
          for asking questions
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <Button
            class="h-auto gap-2 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
            href="#inquiry"
            size="lg"
            variant="accent"
          >
            Ship us your server <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            class="h-auto px-4 py-2.5 text-muted-foreground"
            href="#pricing"
            size="lg"
            variant="ghost"
          >
            See pricing
          </Button>
        </div>
      </div>

      <dl class="grid border-t border-border sm:grid-cols-3">
        {#each facts as fact, index (fact.value)}
          <div
            class="flex flex-col-reverse gap-2.5 pt-7 pb-10 {index > 0
              ? "border-t border-border sm:border-t-0 sm:border-l sm:pl-7"
              : ""}"
          >
            <dt class="text-sm text-muted-foreground">{fact.note}</dt>
            <dd class="text-2xl font-semibold tracking-[-0.017em]">
              {fact.value}
            </dd>
          </div>
        {/each}
      </dl>
    </div>
  </section>

  <!-- Facility: rack illustration and what the space gives you -->
  <section class="border-b border-border py-20 lg:py-28">
    <div
      class="page-container flex flex-col items-center gap-16 lg:flex-row lg:gap-24"
    >
      <ColocationRack />

      <div class="flex flex-1 flex-col gap-12">
        <div class="flex flex-col gap-5">
          <h2
            class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]"
          >
            Your server in good hands
          </h2>
          <p class="text-[17px]/[27px] text-pretty text-muted-foreground">
              Located in CoreSite CH2, a premier data center, give your server a home you can rely on
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
      </div>
    </div>
  </section>

  <!-- Pricing: per-rack-unit tiers and what every tier includes -->
  <section class="border-b border-border py-20 lg:py-28" id="pricing">
    <div class="page-container flex flex-col gap-12">
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">
          Pricing
        </h2>
        <p class="max-w-105 text-base/[26px] text-pretty text-muted-foreground">
          Priced per rack unit, with power and a 1 Gbps port included. Billed
          monthly once your server is racked.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-[1fr_22rem] lg:gap-12">
        <div class="self-start border border-border">
          <table class="w-full text-left text-sm">
            <thead>
              <tr
                class="border-b border-border font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
              >
                <th class="px-6 py-4 font-normal" scope="col">Space</th>
                <th class="px-6 py-4 font-normal" scope="col">Power</th>
                <th
                  class="hidden px-6 py-4 font-normal sm:table-cell"
                  scope="col"
                >
                  Port
                </th>
                <th class="px-6 py-4 text-right font-normal" scope="col">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {#each colocationTiers as tier (tier.units)}
                <tr class="border-b border-border last:border-b-0">
                  <th class="px-6 py-4.5 text-base font-semibold" scope="row">
                    {tier.units}U
                  </th>
                  <td
                    class="px-6 py-4.5 font-mono text-[13px] text-muted-foreground"
                  >
                    {tier.watts}W
                  </td>
                  <td
                    class="hidden px-6 py-4.5 font-mono text-[13px] text-muted-foreground sm:table-cell"
                  >
                    1 Gbps
                  </td>
                  <td
                    class="px-6 py-4.5 text-right text-[15px] font-semibold tabular-nums"
                  >
                    ${tier.price}/mo
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <aside class="flex flex-col gap-6 border border-border bg-gray-850 p-6">
          <span
            class="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
          >
            On every tier
          </span>
          <ul class="flex flex-col gap-3">
            {#each included as item (item)}
              <li class="flex items-center gap-2.5 text-sm/5">
                <Check class="size-4 shrink-0" strokeWidth={1.75} />
                {item}
              </li>
            {/each}
          </ul>
          <div class="h-px bg-border"></div>
          <p class="text-[13px]/5 text-pretty text-muted-foreground">
            Need more space or power than listed here? Tell us in your inquiry
            and we'll let you know what's available.
          </p>
          <Button
            class="h-auto py-2.5"
            href="#inquiry"
            size="lg"
            variant="accent"
          >
            Ship us your server
          </Button>
        </aside>
      </div>
    </div>
  </section>

  <!-- How it works: inquiry, shipping, racking -->
  <section class="border-b border-border py-20 lg:py-28">
    <div class="page-container flex flex-col gap-12">
      <h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">
        How it works
      </h2>
      <ol class="grid gap-10 md:grid-cols-3">
        {#each colocationSteps as step, index (step.title)}
          <li class="flex flex-col gap-2.5 border-t border-border pt-6">
            <span class="font-mono text-xs tracking-[0.1em] text-brand-yellow">
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
  </section>

  <!-- Inquiry: form that drafts a colocation inquiry email -->
  <section class="border-b border-border py-20 lg:py-28" id="inquiry">
    <div
      class="page-container flex flex-col justify-between gap-12 lg:flex-row"
    >
      <div class="flex flex-col gap-4 lg:w-110">
        <h2
          class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]"
        >
          Have hardware ready to rack?
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          Send us what you're racking and how much power it needs. You'll hear
          back from the people who'll actually install it.
        </p>
        <p class="text-sm/[22px] text-pretty text-muted-foreground">
          Sending opens an email to
          <a
            class="text-foreground underline underline-offset-2"
            href="mailto:support@fyrastack.com"
            >support@fyrastack.com</a
          >
          with your details filled in.
        </p>
      </div>

      <form
        action={colocationInquiryUrl}
        class="grid gap-5 border border-border bg-gray-850 p-6 sm:grid-cols-2 lg:w-160"
        enctype="text/plain"
        method="post"
        onsubmit={sendInquiry}
      >
        <div class="flex flex-col gap-2">
          <Label for="inquiry-name">Name</Label>
          <Input
            autocomplete="name"
            class="h-9 rounded-none"
            id="inquiry-name"
            name="name"
            required
            bind:value={inquiry.name}
          />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="inquiry-email">Email</Label>
          <Input
            autocomplete="email"
            class="h-9 rounded-none"
            id="inquiry-email"
            name="email"
            required
            type="email"
            bind:value={inquiry.email}
          />
        </div>
        <div class="flex flex-col gap-2 sm:col-span-2">
          <Label for="inquiry-space">Rack space</Label>
          <select
            class="h-9 w-full border border-input bg-input/30 px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            id="inquiry-space"
            name="space"
            bind:value={inquiry.space}
          >
            {#each spaceOptions as option (option)}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
        <div class="flex flex-col gap-2 sm:col-span-2">
          <Label for="inquiry-hardware">Hardware</Label>
          <Textarea
            class="rounded-none"
            id="inquiry-hardware"
            name="hardware"
            placeholder="Model, size, and expected power draw"
            required
            rows={3}
            bind:value={inquiry.hardware}
          />
        </div>
        <div class="flex flex-col gap-2 sm:col-span-2">
          <Label for="inquiry-notes">
            Anything else
            <span class="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            class="rounded-none"
            id="inquiry-notes"
            name="notes"
            placeholder="Network needs, timeline, questions"
            rows={2}
            bind:value={inquiry.notes}
          />
        </div>
        <Button
          class="h-auto gap-2 justify-self-start py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
          size="lg"
          type="submit"
          variant="accent"
        >
          Send inquiry <ArrowRight data-icon="inline-end" />
        </Button>
      </form>
    </div>
  </section>
</main>
