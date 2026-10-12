<script lang="ts">
  import type { Snippet } from "svelte";
  import { resolve } from "$app/paths";
  import acmUmnMark from "$lib/assets/about/acm-umn.webp";
  import addisonPhoto from "$lib/assets/about/addison.jpg";
  import billPhoto from "$lib/assets/about/bill.jpg";
  import calebPhoto from "$lib/assets/about/caleb.jpg";
  import cappyPhoto from "$lib/assets/about/cappy.jpg";
  import deepComputingWordmark from "$lib/assets/about/deepcomputing.webp";
  import fossWikiMark from "$lib/assets/about/fosswiki.webp";
  import jonahPhoto from "$lib/assets/about/jonah.jpg";
  import junePhoto from "$lib/assets/about/june.jpg";
  import lleytonPhoto from "$lib/assets/about/lleyton.jpg";
  import ogcMark from "$lib/assets/about/ogc.svg";
  import owenPhoto from "$lib/assets/about/owen.jpg";
  import willowPhoto from "$lib/assets/about/willow.jpg";
  import aboutHeroDither from "$lib/assets/about-hero-dither.webp";
  import ctaDither from "$lib/assets/cta-dither.webp";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import GithubMark from "$lib/components/landing/github-mark.svelte";
  import TextLink from "$lib/components/landing/text-link.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Select from "$lib/components/ui/select";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    type ContactStatus,
    contactHoneypotField,
    contactLimits,
    contactTopics,
    submitContactMessage,
  } from "$lib/contact";
  import ArrowRight from "~icons/nucleo/arrow-right";
  import Bluesky from "~icons/nucleo/bluesky";
  import Discord from "~icons/nucleo/discord";
  import GithubIcon from "~icons/nucleo/github";
  import Globe from "~icons/nucleo/globe";
  import Mastodon from "~icons/nucleo/mastodon";
  import Twitter from "~icons/nucleo/twitter";

  const signUpUrl = "https://dash.fyrastack.com";
  const discordUrl = "https://discord.gg/YwzKxUBu4U";
  const fediverseUrl = "https://fedi.fyralabs.com/@stack";

  const linkGroups = [
    {
      label: "Community",
      links: [
        { href: discordUrl, icon: Discord, label: "Discord" },
        {
          href: "https://github.com/FyraStack",
          icon: GithubIcon,
          label: "GitHub",
        },
      ],
    },
    {
      label: "Socials",
      links: [
        { href: "https://x.com/fyrastack", icon: Twitter, label: "Twitter" },
        {
          href: "https://bsky.app/profile/fyrastack.com",
          icon: Bluesky,
          label: "Bluesky",
        },
        { href: fediverseUrl, icon: Mastodon, label: "Fediverse" },
      ],
    },
  ];

  const facts: { note: string | Snippet; value: string | Snippet }[] = [
    { note: "An open-source community", value: "Backed by Fyra Labs" },
    { note: openNote, value: "Truly open cloud" },
    { note: "Our network", value: networkValue },
  ];

  interface TeamMember {
    github?: string;
    name: string;
    photo: string;
    role: string;
    website?: string;
  }

  const team: TeamMember[] = [
    {
      github: "lleyton",
      name: "Lleyton “Lea” Gray",
      photo: lleytonPhoto,
      role: "Chief Executive Officer",
      website: "https://ultraviolet.sh/",
    },
    {
      github: "Owen-sz",
      name: "Owen Zimmerman",
      photo: owenPhoto,
      role: "Chief Business Officer",
      website: "https://owenzimmerman.com/",
    },
    {
      name: "Bill Schouten",
      photo: billPhoto,
      role: "Director, Business Relations",
    },
    {
      github: "addidotlol",
      name: "Addison LeClair",
      photo: addisonPhoto,
      role: "Developer Relations Lead",
      website: "https://addi.lol/",
    },
    {
      github: "june-fish",
      name: "June Fish",
      photo: junePhoto,
      role: "Director, Software Engineering",
      website: "https://june.fish/",
    },
    {
      github: "TheHeroBrine422",
      name: "Caleb Jones",
      photo: calebPhoto,
      role: "Software Engineer",
    },
    {
      github: "Its-J",
      name: "Jonah",
      photo: jonahPhoto,
      role: "Operations Advisor",
    },
    {
      github: "korewaChino",
      name: "Cappy Ishihara",
      photo: cappyPhoto,
      role: "Software Engineer",
      website: "https://cappuchino.xyz/",
    },
    {
      github: "halfcyan",
      name: "Cypress Reed",
      photo: willowPhoto,
      role: "Backend & Hardware Engineer",
      website: "https://willowidk.dev/",
    },
  ];

  let contactStatus = $state<ContactStatus>({ kind: "idle" });

  const [defaultContactTopic] = contactTopics;
  let contactTopic = $state<string>(defaultContactTopic);

  async function sendContactMessage(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    contactStatus = { kind: "sending" };
    contactStatus = await submitContactMessage(new FormData(form));
    if (contactStatus.kind === "sent") {
      form.reset();
      contactTopic = defaultContactTopic;
    }
  }
</script>

<svelte:head>
  <title>About · Fyra Stack</title>
  <meta content="About · Fyra Stack" property="og:title">
  <meta
    content="Fyra Stack is an open-source cloud in Chicago from the folks behind Fyra Labs. Meet the team that builds and runs it."
    name="description"
  >
  <meta
    content="Fyra Stack is an open-source cloud in Chicago from the folks behind Fyra Labs. Meet the team that builds and runs it."
    property="og:description"
  >
</svelte:head>

{#snippet textOrSnippet(
  content: string | Snippet
)}
  {#if typeof content === "string"}
    {content}
  {:else}
    {@render content()}
  {/if}
{/snippet}

{#snippet openNote()}
  Our <TextLink href="https://github.com/FyraStack">code</TextLink>,
  <TextLink href={discordUrl}>community</TextLink>, and
  <TextLink href={resolve("/about")}>team</TextLink>
  are open
{/snippet}

{#snippet networkValue()}
  <TextLink href="https://fyra.network">AS402292</TextLink>
{/snippet}

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
          Infrastructure<br>for everyone
        </h1>
        <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
          An open-source cloud from the team behind Fyra Labs.
        </p>
      </div>

      <dl class="-mt-8 grid border-t border-border sm:mt-0 sm:grid-cols-3">
        {#each facts as fact, index (fact.value)}
          <div
            class="flex flex-row-reverse items-baseline justify-between gap-6 py-4 sm:flex-col-reverse sm:justify-start sm:gap-2.5 sm:pt-7 sm:pb-10 {index >
            0
              ? "border-t border-border sm:border-t-0 sm:border-l sm:pl-7"
              : ""}"
          >
            <dt
              class="max-w-44 text-right text-sm text-pretty text-muted-foreground sm:max-w-none sm:text-left"
            >
              {@render textOrSnippet(fact.note)}
            </dt>
            <dd
              class="shrink-0 text-lg font-semibold tracking-[-0.017em] sm:text-2xl"
            >
              {@render textOrSnippet(fact.value)}
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
          We spent years scaling infrastructure to support open-source, reaching
          millions of unique clients every month, quickly discovering: hosting
          sucks.
        </p>
        <p>
          So, we built Stack. Open software, transparent pricing, and a team who
          cares as much as you. We charge you for what you use. We don't sell
          your data or lock you in.
        </p>
      </div>
    </div>
  </section>

  <!-- Team: everyone who builds and supports Stack -->
  <section class="border-b border-border py-20 lg:py-28">
    <div class="page-container flex flex-col gap-14">
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <h2 class="text-4xl font-semibold tracking-[-0.02em] lg:text-[40px]">
          Meet the team
        </h2>
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
              <div class="flex items-center gap-1.5">
                <span class="text-[17px] font-semibold tracking-[-0.012em]"
                  >{member.name}</span
                >
                {#if member.github || member.website}
                  <div class="-my-1 flex -translate-y-px items-center">
                    {#if member.github}
                      <a
                        aria-label="{member.name} on GitHub"
                        class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-gray-850 hover:text-foreground"
                        href="https://github.com/{member.github}"
                        rel="noopener"
                        target="_blank"
                      >
                        <GithubMark class="size-4" />
                      </a>
                    {/if}
                    {#if member.website}
                      <a
                        aria-label="{member.name}'s website"
                        class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-gray-850 hover:text-foreground"
                        href={member.website}
                        rel="noopener"
                        target="_blank"
                      >
                        <Globe class="size-4" />
                      </a>
                    {/if}
                  </div>
                {/if}
              </div>
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
          Part of the community
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          Our partners, and the open-source communities we sponsor.
        </p>
      </div>
      <div class="@container min-w-0 flex-1">
        <ul
          class="grid grid-cols-2 gap-px border border-border bg-border @2xl:grid-cols-4 @2xl:grid-rows-2"
        >
          <li
            class="col-span-2 flex h-56 flex-col items-center justify-center gap-5 bg-background px-6 pb-1 @2xl:row-span-2 @2xl:h-auto"
          >
            <a
              class="flex max-w-full transition-opacity hover:opacity-80"
              href="https://deepcomputing.io"
              rel="noopener"
              target="_blank"
            >
              <img
                alt="DeepComputing"
                class="h-9 w-72 max-w-full object-contain"
                src={deepComputingWordmark}
              >
            </a>
            <span class="text-sm text-muted-foreground">Partner</span>
          </li>
          <li
            class="col-span-2 flex h-37 flex-col items-center justify-center gap-3.5 bg-background pb-1"
          >
            <a
              class="flex h-13 items-center gap-3.5 transition-opacity hover:opacity-80"
              href="https://opengamingcollective.org"
              rel="noopener"
              target="_blank"
            >
              <img
                alt=""
                class="size-10 object-contain sm:size-13"
                src={ogcMark}
              >
              <span
                class="text-lg font-semibold tracking-[-0.018em] sm:text-2xl"
                >Open Gaming Collective</span
              >
            </a>
            <span class="text-[13px] text-muted-foreground"
              >Sponsored servers</span
            >
          </li>
          <li
            class="flex h-37 flex-col items-center justify-center gap-3 bg-background pb-1"
          >
            <a
              class="flex h-10 items-center gap-2.5 transition-opacity hover:opacity-80"
              href="https://acm.umn.edu"
              rel="noopener"
              target="_blank"
            >
              <img alt="" class="size-10 object-contain" src={acmUmnMark}>
              <span class="text-base font-semibold tracking-[-0.011em]"
                >ACM UMN</span
              >
            </a>
            <span class="text-xs text-muted-foreground">Sponsored servers</span>
          </li>
          <li
            class="flex h-37 flex-col items-center justify-center gap-3 bg-background pb-1"
          >
            <a
              class="flex h-10 items-center gap-2.5 transition-opacity hover:opacity-80"
              href="https://foss.wiki"
              rel="noopener"
              target="_blank"
            >
              <img alt="" class="size-8 object-contain" src={fossWikiMark}>
              <span class="text-base font-semibold tracking-[-0.011em]"
                >FOSS Wiki</span
              >
            </a>
            <span class="text-xs text-muted-foreground">Sponsored servers</span>
          </li>
        </ul>
      </div>
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
          Around the world
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          Our hardware lives in Chicago, but the people who run it and our
          community are spread around the world.
        </p>
      </div>
      <dl class="flex flex-col border-b border-border lg:w-160">
        <div class="flex justify-between gap-6 border-t border-border py-5">
          <dt class="text-sm text-muted-foreground">Company</dt>
          <dd class="text-right text-base/6">Fyra Stack Limited</dd>
        </div>
        <div class="flex justify-between gap-6 border-t border-border py-5">
          <dt class="text-sm text-muted-foreground">Support</dt>
          <dd class="text-right text-base/6">
            <TextLink href="mailto:support@fyrastack.com"
              >support@fyrastack.com</TextLink
            >
          </dd>
        </div>
        {#each linkGroups as group (group.label)}
          <div class="flex justify-between gap-6 border-t border-border py-5">
            <dt class="text-sm text-muted-foreground">{group.label}</dt>
            <dd
              class="flex flex-wrap justify-end gap-x-5 gap-y-2 text-right text-base/6"
            >
              {#each group.links as link (link.href)}
                <a
                  class="inline-flex items-center gap-2 text-foreground underline decoration-gray-600 underline-offset-4 transition-colors hover:decoration-foreground"
                  href={link.href}
                  rel="noopener"
                  target="_blank"
                >
                  <link.icon aria-hidden="true" class="size-4 shrink-0" />
                  {link.label}
                </a>
              {/each}
            </dd>
          </div>
        {/each}
      </dl>
    </div>
  </section>

  <!-- Contact: form that posts to /api/contact, which forwards to our Discord -->
  <section class="border-b border-border py-20 lg:py-28" id="contact">
    <div
      class="page-container flex flex-col justify-between gap-12 lg:flex-row"
    >
      <div class="flex flex-col gap-4 lg:w-110">
        <h2
          class="text-4xl/[1.15] font-semibold tracking-[-0.02em] lg:text-[40px]/[46px]"
        >
          Get in touch
        </h2>
        <p class="text-base/[26px] text-pretty text-muted-foreground">
          Questions about sales, colocation, partnerships, or anything else?
          Contact us and someone on the team will reply by email.
        </p>
      </div>

      <form
        class="grid gap-5 sm:grid-cols-2 lg:w-160"
        onsubmit={sendContactMessage}
      >
        <div class="flex flex-col gap-2">
          <Label for="contact-name">Name</Label>
          <Input
            autocomplete="name"
            class="h-9 rounded-none"
            id="contact-name"
            maxlength={contactLimits.name}
            name="name"
            required
          />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="contact-email">Email</Label>
          <Input
            autocomplete="email"
            class="h-9 rounded-none"
            id="contact-email"
            maxlength={contactLimits.email}
            name="email"
            required
            type="email"
          />
        </div>
        <div class="flex flex-col gap-2 sm:col-span-2">
          <Label for="contact-topic">Topic</Label>
          <Select.Root name="topic" type="single" bind:value={contactTopic}>
            <Select.Trigger class="h-9 w-full rounded-none" id="contact-topic">
              {contactTopic}
            </Select.Trigger>
            <Select.Content class="rounded-none">
              {#each contactTopics as topic (topic)}
                <Select.Item class="rounded-none" label={topic} value={topic} />
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
        <div class="flex flex-col gap-2 sm:col-span-2">
          <Label for="contact-message">Message</Label>
          <Textarea
            class="rounded-none"
            id="contact-message"
            maxlength={contactLimits.message}
            name="message"
            required
            rows={5}
          />
        </div>
        <div aria-hidden="true" class="hidden">
          <Label for="contact-website">Leave this empty</Label>
          <Input
            autocomplete="off"
            id="contact-website"
            name={contactHoneypotField}
            tabindex={-1}
          />
        </div>
        <div class="flex flex-wrap items-center gap-4 sm:col-span-2">
          <Button
            class="h-auto gap-2 py-2.5 pl-4 has-data-[icon=inline-end]:pr-3"
            disabled={contactStatus.kind === "sending"}
            size="lg"
            type="submit"
            variant="accent"
          >
            {contactStatus.kind === "sending" ? "Sending…" : "Send message"}
            <ArrowRight data-icon="inline-end" />
          </Button>
          <p aria-live="polite" class="text-sm text-pretty" role="status">
            {#if contactStatus.kind === "sent"}
              <span class="text-muted-foreground"
                >Thanks, we got it. We'll reply to the email you gave us.</span
              >
            {:else if contactStatus.kind === "failed"}
              <span class="text-destructive">{contactStatus.message}</span>
            {/if}
          </p>
        </div>
      </form>
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
          BASE-2G gets you 2 vCPU, 2 GB of RAM, and 40 GB of SAS3 SSD, and you
          can resize whenever you outgrow it.
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
          class="h-auto gap-2 py-2.5 pl-4 text-muted-foreground has-data-[icon=inline-end]:pr-3"
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
