<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import acmUmnMark from "$lib/assets/about/acm-umn.png";
  import addisonPhoto from "$lib/assets/about/addison.jpg";
  import billPhoto from "$lib/assets/about/bill.jpg";
  import calebPhoto from "$lib/assets/about/caleb.jpg";
  import cappyPhoto from "$lib/assets/about/cappy.jpg";
  import deepComputingWordmark from "$lib/assets/about/deepcomputing.png";
  import fossWikiMark from "$lib/assets/about/fosswiki.png";
  import jonahPhoto from "$lib/assets/about/jonah.jpg";
  import junePhoto from "$lib/assets/about/june.jpg";
  import lleytonPhoto from "$lib/assets/about/lleyton.jpg";
  import ogcMark from "$lib/assets/about/ogc.svg";
  import owenPhoto from "$lib/assets/about/owen.jpg";
  import willowPhoto from "$lib/assets/about/willow.jpg";
  import aboutHeroDither from "$lib/assets/about-hero-dither.png";
  import ctaDither from "$lib/assets/cta-dither.png";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import { Button } from "$lib/components/ui/button";

  const signUpUrl = "https://dash.fyrastack.com";
  const discordUrl = "#";
  const fediverseUrl = "#";

  const facts = [
    { note: "Chicago, IL", value: "Midwest proud" },
    { note: "Backed by Fyra Labs", value: "Independent" },
    { note: "Since 2026", value: "AS402292" },
  ];

  const team = [
    { name: "Lleyton “Lea” Gray", photo: lleytonPhoto, role: "CEO" },
    {
      name: "Owen Zimmerman",
      photo: owenPhoto,
      role: "Chief Business Officer",
    },
    {
      name: "Bill Schouten",
      photo: billPhoto,
      role: "Director, Business Relations",
    },
    {
      name: "Addison LeClair",
      photo: addisonPhoto,
      role: "Developer Relations Lead",
    },
    {
      name: "June Fish",
      photo: junePhoto,
      role: "Director, Software Engineering",
    },
    { name: "Caleb Jones", photo: calebPhoto, role: "Software Engineer" },
    { name: "Jonah", photo: jonahPhoto, role: "Operations Advisor" },
    { name: "Cappy Ishihara", photo: cappyPhoto, role: "Software Engineer" },
    {
      name: "Cypress Reed",
      photo: willowPhoto,
      role: "Backend & Hardware Engineer",
    },
  ];
</script>

<svelte:head>
  <title>About · Fyra Stack</title>
  <meta
    content="Fyra Stack is an open-source cloud in Chicago from the folks behind Fyra Labs. Meet the team that builds and runs it."
    name="description"
  >
</svelte:head>

<main>
  <!-- Hero: headline over a dithered shader, with three quick facts -->
  <section class="relative isolate overflow-hidden border-b border-border">
    <DitherBackground
      class="-z-10"
      poster={aboutHeroDither}
      priority
      settings={{
        clearAmount: 1,
        clearH: 0.5,
        clearW: 1.11,
        clearX: -0.055,
        clearY: 0.42,
        driftX: -1.12,
        driftY: -1.14,
        fadeBottom: 0.45,
        fadeTop: 0,
        intensity: 0.7,
        pxSize: 3,
        scale: 2.2,
        seed: 22,
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
          Cloud Infrastructure,<br>
          for the rest of us
        </h1>
        <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
          An open-source cloud from the folks behind Fyra Labs.
        </p>
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

  <!-- Why we exist: the story behind Stack -->
  <section class="border-b border-border pt-20 pb-20 lg:pt-32 lg:pb-28">
    <div class="page-container flex flex-col justify-between gap-8 lg:flex-row">
      <h2
        class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:w-120 lg:text-[40px]/[46px]"
      >
        Why we exist
      </h2>
      <div
        class="flex flex-col gap-6 text-lg/[31px] text-pretty text-muted-foreground lg:w-160"
      >
        <p>
          Fyra Labs builds Terra and Ultramarine Linux. We needed servers for
          that. We couldn't find hosting we'd actually recommend to someone
          without adding a bunch of caveats, so we started running our own.
        </p>
        <p>
          Stack is what came out of that. Open software, transparent pricing,
          and a team who cares as much as you. We charge you for what you use.
          We don't sell your data, we don't lock you in, and we don't have a
          “retention team.”
        </p>
      </div>
    </div>
  </section>

  <!-- Team: everyone who builds and supports Stack -->
  <section class="border-b border-border py-20 lg:py-28">
    <div class="page-container flex flex-col gap-14">
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">
          The team
        </h2>
        <p class="max-w-105 text-base/[26px] text-pretty text-muted-foreground">
          Small, on purpose. Everyone here ships, and everyone here answers the
          support queue.
        </p>
      </div>
      <ul
        class="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
      >
        {#each team as member (member.name)}
          <li class="flex items-center gap-5 bg-background px-8 py-7">
            <img
              alt=""
              class="size-14 shrink-0 rounded-md object-cover outline outline-offset-[-0.5px] outline-white/8"
              height="56"
              loading="lazy"
              src={member.photo}
              width="56"
            >
            <div class="flex min-w-0 flex-col gap-1.5">
              <span class="text-[17px] font-semibold tracking-[-0.012em]"
                >{member.name}</span
              >
              <span class="text-sm/[21px] text-muted-foreground"
                >{member.role}</span
              >
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- Partners: partner company and sponsored communities -->
  <section class="border-b border-border py-20 lg:py-24">
    <div
      class="page-container flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20"
    >
      <div class="flex flex-col gap-3 lg:w-90 lg:shrink-0">
        <h2 class="text-[28px] font-semibold tracking-[-0.018em]">
          In good company
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          Our partners, and the open-source and student communities we sponsor
          servers for.
        </p>
      </div>
      <ul
        class="grid flex-1 grid-cols-2 gap-px border border-border bg-border md:grid-cols-4 md:grid-rows-2"
      >
        <li
          class="col-span-2 flex h-56 flex-col items-center justify-center gap-5 bg-background pb-1 md:row-span-2 md:h-auto"
        >
          <img
            alt="DeepComputing"
            class="h-9 w-72 object-contain"
            src={deepComputingWordmark}
          >
          <span class="text-sm text-muted-foreground">Partner</span>
        </li>
        <li
          class="col-span-2 flex h-37 flex-col items-center justify-center gap-3.5 bg-background pb-1"
        >
          <div class="flex h-13 items-center gap-3.5">
            <img alt="" class="size-10 object-contain sm:size-13" src={ogcMark}>
            <span class="text-lg font-semibold tracking-[-0.018em] sm:text-2xl"
              >Open Gaming Collective</span
            >
          </div>
          <span class="text-[13px] text-muted-foreground"
            >Sponsored servers</span
          >
        </li>
        <li
          class="flex h-37 flex-col items-center justify-center gap-3 bg-background pb-1"
        >
          <div class="flex h-10 items-center gap-2.5">
            <img alt="" class="size-10 object-contain" src={acmUmnMark}>
            <span class="text-base font-semibold tracking-[-0.011em]"
              >ACM UMN</span
            >
          </div>
          <span class="text-xs text-muted-foreground">Sponsored servers</span>
        </li>
        <li
          class="flex h-37 flex-col items-center justify-center gap-3 bg-background pb-1"
        >
          <div class="flex h-10 items-center gap-2.5">
            <img alt="" class="size-8 object-contain" src={fossWikiMark}>
            <span class="text-base font-semibold tracking-[-0.011em]"
              >FOSS Wiki</span
            >
          </div>
          <span class="text-xs text-muted-foreground">Sponsored servers</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Find us: office, company, and contact details -->
  <section class="border-b border-border py-20 lg:py-28">
    <div
      class="page-container flex flex-col justify-between gap-12 lg:flex-row"
    >
      <div class="flex flex-col gap-4 lg:w-110">
        <h2
          class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]"
        >
          One team,<br>
          all over the map.
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          Our hardware lives in Chicago, but the people who run it are spread
          across time zones. Wherever you write in from, you'll reach the same
          small team that built it.
        </p>
      </div>
      <dl class="flex flex-col border-b border-border lg:w-160">
        <div class="flex justify-between gap-6 border-t border-border py-5">
          <dt
            class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
          >
            Office
          </dt>
          <dd class="text-right">
            <address class="text-base/6 not-italic">
              5206 N Damen Ave<br>Chicago, IL 60625
            </address>
          </dd>
        </div>
        <div class="flex justify-between gap-6 border-t border-border py-5">
          <dt
            class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
          >
            Company
          </dt>
          <dd class="text-right text-base/6">Fyra Stack Limited</dd>
        </div>
        <div class="flex justify-between gap-6 border-t border-border py-5">
          <dt
            class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
          >
            Support
          </dt>
          <dd class="text-right text-base/6">
            <a
              class="transition-colors hover:text-gray-300"
              href="mailto:support@fyrastack.com"
              >support@fyrastack.com</a
            >
          </dd>
        </div>
        <div class="flex justify-between gap-6 border-t border-border py-5">
          <dt
            class="font-mono text-[11px] tracking-[0.11em] text-muted-foreground uppercase"
          >
            Community
          </dt>
          <dd class="text-right text-base/6">
            <a class="transition-colors hover:text-gray-300" href={discordUrl}
              >Discord</a
            >
            ·
            <a
              class="transition-colors hover:text-gray-300"
              href="https://github.com/FyraLabs"
              >GitHub</a
            >
            ·
            <a class="transition-colors hover:text-gray-300" href={fediverseUrl}
              >Fediverse</a
            >
          </dd>
        </div>
      </dl>
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
          Pick a plan, choose your distro, and SSH in. If anything breaks, the
          person who answers your ticket built the rack.
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <Button
          class="h-auto gap-2 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
          href={signUpUrl}
          size="lg"
          variant="accent"
        >
          Create an account <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          class="h-auto gap-2 py-2.5 pl-4 text-muted-foreground has-data-[icon=inline-end]:pr-3"
          href={discordUrl}
          size="lg"
          variant="ghost"
        >
          Join our Discord <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  </section>
</main>
