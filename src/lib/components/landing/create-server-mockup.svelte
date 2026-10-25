<script lang="ts">
  import almalinux from "#lib/assets/os/almalinux.webp";
  import debian from "#lib/assets/os/debian.webp";
  import fedora from "#lib/assets/os/fedora.webp";
  import nixos from "#lib/assets/os/nixos.webp";
  import opensuse from "#lib/assets/os/opensuse.webp";
  import ubuntu from "#lib/assets/os/ubuntu.webp";
  import { Badge } from "#lib/components/ui/badge/index.js";
  import ArrowLeft from "~icons/lucide/arrow-left";
  import Check from "~icons/lucide/check";
  import ChevronDown from "~icons/lucide/chevron-down";
  import Plus from "~icons/lucide/plus";
  import Circle from "~icons/nucleo/circle";
  import CreditCard from "~icons/nucleo/credit-card";
  import Dices from "~icons/nucleo/dices";
  import HardDrive from "~icons/nucleo/hard-drive";
  import Search from "~icons/nucleo/search";
  import Server from "~icons/nucleo/server";
  import Settings from "~icons/nucleo/settings";
  import { mockServers, serverMeta } from "./mock-servers";
  import { plans } from "./plans";
  import StackMark from "./stack-mark.svelte";

  const images = [
    {
      description:
        "Community-driven Linux server with the latest packages, upstream of RHEL.",
      logo: fedora,
      meta: ["x86", "44", "qcow2"],
      name: "Fedora",
      tint: "#51a2da",
    },
    {
      description:
        "Alma Linux is our choice of Enterprise Linux distribution with a lifecycle of 10 years.",
      logo: almalinux,
      meta: ["x86", "10", "qcow2"],
      name: "AlmaLinux",
      tint: "#a32fff",
    },
    {
      description:
        "Ubuntu Server is a popular choice for a scalable Linux server you need to run.",
      logo: ubuntu,
      meta: ["x86", "26.04", "qcow2"],
      name: "Ubuntu",
      tint: "#e95420",
    },
    {
      description:
        "openSUSE Leap creates a stable and secure experience for those familiar with it.",
      logo: opensuse,
      meta: ["x86", "16.0", "qcow2"],
      name: "openSUSE Leap",
      tint: "#73ba25",
    },
    {
      description:
        "Debian is known for its stability, familiarity, and long-term support.",
      logo: debian,
      meta: ["x86", "13", "qcow2"],
      name: "Debian",
      tint: "#ce0056",
    },
    {
      description: "A Linux distribution based on the Nix package manager.",
      logo: nixos,
      meta: ["x86", "26.05", "qcow2"],
      name: "NixOS",
      tint: "#4d6fb7",
    },
  ];

  const otherImages = [
    { name: "Gentoo", version: "2026-10-25 systemd" },
    { name: "Gentoo", version: "2026-10-25 OpenRC" },
  ];

  const steps = [
    { done: true, label: "Name" },
    { done: false, label: "Image" },
    { done: false, label: "Plan" },
    { done: true, label: "Networking" },
    { done: true, label: "Authentication" },
  ];

  const summary = [
    { key: "Image", value: "-" },
    { key: "Plan", value: "-" },
    { key: "Network", value: "IPv4 + IPv6" },
    { key: "Authentication", value: "Password" },
  ];
</script>

{#snippet sectionLabel(
  label: string,
  Icon: typeof Server
)}
  <div class="flex items-center gap-2 border-b border-border pb-2.5">
    <Icon class="size-4 text-red-400" />
    <span
      class="text-xs font-semibold tracking-[0.05em] text-muted-foreground uppercase"
    >
      {label}
    </span>
  </div>
{/snippet}

<div
  aria-hidden="true"
  class="relative h-250 w-full min-w-[1280px] overflow-hidden bg-background shadow-[0_24px_64px_#00000066] outline outline-offset-[-0.5px] outline-border select-none"
  inert
>
  <div
    class="flex h-12 items-center justify-between border-b border-border px-4"
  >
    <div class="flex items-center gap-2 text-sm">
      <StackMark />
      <span class="font-semibold tracking-[-0.025em]">Stack</span>
      <Badge class="h-4 px-1.5 text-[10px]" variant="secondary">Alpha</Badge>
      <span class="text-muted-foreground">/</span>
      <span class="flex items-center gap-1 px-1.5 font-medium">
        Acme <ChevronDown class="size-3 text-muted-foreground" />
      </span>
      <span class="text-muted-foreground">/</span>
      <span class="font-medium text-muted-foreground">Servers</span>
    </div>
    <div class="flex items-center gap-3">
      <div
        class="flex w-35.5 items-center gap-2 border border-border bg-input/30 px-3.25 py-1.75"
      >
        <Search class="size-3 text-muted-foreground" />
        <span class="flex-1 text-xs text-muted-foreground">Search...</span>
        <span
          class="border border-border bg-gray-800 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
        >
          ⌘K
        </span>
      </div>
      <div class="flex items-center gap-2.5 px-2 py-1">
        <div class="flex flex-col items-end">
          <span class="text-sm/4.5 font-medium">Addison LeClair</span>
          <span class="text-xs/3.75 text-muted-foreground">addi@acme.dev</span>
        </div>
        <span class="border border-border p-px">
          <span
            class="grid size-7.5 place-items-center bg-gray-800 text-xs text-muted-foreground"
          >
            AL
          </span>
        </span>
      </div>
    </div>
  </div>

  <div class="flex">
    <div
      class="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border py-3"
    >
      <span class="grid size-8 place-items-center border border-red-500"
        ><Server class="size-4" /></span
      >
      <span class="grid size-8 place-items-center text-muted-foreground">
        <CreditCard class="size-4" />
      </span>
      <span class="grid size-8 place-items-center text-muted-foreground">
        <Settings class="size-4" />
      </span>
    </div>

    <div class="flex w-64 shrink-0 flex-col border-r border-border">
      <div
        class="flex h-10 items-center justify-between border-b border-border px-4"
      >
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold">Servers</span>
          <span
            class="bg-gray-800 px-2 py-0.5 text-[10px] font-medium text-gray-100"
          >
            {mockServers.length}
          </span>
          <span class="size-1.5 rounded-full bg-muted-foreground"></span>
        </div>
        <span
          class="grid size-6 place-items-center border border-border bg-input/30"
        >
          <Plus class="size-3.5 text-red-400" />
        </span>
      </div>
      {#each mockServers as server (server.name)}
        <div
          class="relative flex h-15.75 flex-col gap-0.5 border-b border-border px-4 py-3"
        >
          <span class="text-sm font-semibold">{server.name}</span>
          <span class="text-xs text-muted-foreground"
            >{serverMeta(server)}</span
          >
          <span
            class="absolute top-4 right-4 size-2 rounded-full bg-emerald-500"
          ></span>
        </div>
      {/each}
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex h-10 items-center gap-3 border-b border-border px-5">
        <span
          class="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground"
        >
          <ArrowLeft class="size-3.5" />
          Back
        </span>
        <span class="text-sm font-semibold">Create Server</span>
      </div>

      <div class="flex">
        <div class="flex min-w-0 flex-1 flex-col gap-8 p-6">
          <div class="flex flex-col gap-3">
            {@render sectionLabel("Name", Server)}
            <div class="flex h-9 border border-border">
              <span class="flex flex-1 items-center px-2.5 text-sm"
                >puppyserver</span
              >
              <span class="grid w-9 place-items-center border-l border-border">
                <Dices class="size-4" />
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            {@render sectionLabel("Image", HardDrive)}
            <div class="flex gap-2 text-xs">
              <span class="border border-gray-700 px-2.5 py-2">OS Images</span>
              <span
                class="border border-border px-2.5 py-2 text-muted-foreground"
                >Snapshots</span
              >
              <span
                class="border border-border px-2.5 py-2 text-muted-foreground"
                >Apps</span
              >
            </div>
            <div
              class="flex h-8 items-center bg-gray-800 px-3 text-xs text-muted-foreground"
            >
              Search images...
            </div>
            <div class="grid grid-cols-2 gap-px">
              {#each images as image (image.name)}
                <div class="relative h-29 overflow-hidden bg-background">
                  <div
                    class="absolute inset-0 opacity-8"
                    style:background-image="linear-gradient(110deg, {image.tint} 15%, transparent 57%)"
                  ></div>
                  <img
                    alt=""
                    class="absolute top-5 left-5 w-12 object-contain object-top"
                    src={image.logo}
                  >
                  <div class="absolute top-5 left-21 flex w-52 flex-col">
                    <span class="text-sm font-semibold">{image.name}</span>
                    <span
                      class="line-clamp-2 text-[11px]/4.5 text-muted-foreground"
                    >
                      {image.description}
                    </span>
                    <span class="mt-1 text-[10px] text-muted-foreground">
                      {image.meta.join(" | ")}
                    </span>
                  </div>
                </div>
              {/each}
            </div>
            <!-- Matches "Other Images" on the dashboard's create server page.
                 pt-1 plus the parent's gap-3 makes the dashboard's mt-4. -->
            <div class="pt-1">
              <div
                class="flex items-center gap-2 border-b border-border/50 pb-2"
              >
                <span
                  class="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase"
                  >Other Images</span
                >
              </div>
              <div class="mt-2 divide-y divide-border/30">
                {#each otherImages as image (image.version)}
                  <div class="flex w-full items-center gap-3 px-3 py-2.5">
                    <HardDrive class="size-4 shrink-0 text-muted-foreground" />
                    <span class="truncate text-xs">{image.name}</span>
                    <span class="shrink-0 text-[10px] text-muted-foreground"
                      >{image.version}</span
                    >
                  </div>
                {/each}
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            {@render sectionLabel("Plan", Server)}
            <div class="grid grid-cols-2 gap-2">
              {#each plans as plan (plan.name)}
                <div
                  class="flex flex-col gap-1 border border-border px-3 py-3.5"
                >
                  <span class="text-sm font-medium">{plan.name}</span>
                  <span
                    class="flex items-center gap-2 text-[11px] text-muted-foreground"
                  >
                    {plan.vcpu}
                    vCPU <span>•</span>
                    {plan.memoryGb}GB <span>•</span>
                    {plan.storageGb}GB
                  </span>
                  <span class="text-xs font-medium text-muted-foreground">
                    ${plan.price.toFixed(2)}/month
                  </span>
                </div>
              {/each}
            </div>
          </div>
        </div>

        <div class="flex w-72 shrink-0 flex-col border-l border-border">
          <div class="border-b border-border px-4 pt-4.5 pb-4">
            <span
              class="text-xs font-semibold tracking-[0.05em] text-muted-foreground uppercase"
            >
              Configure
            </span>
          </div>
          <div class="flex flex-col gap-4 px-4 py-3">
            <div class="flex flex-col gap-1">
              {#each steps as step (step.label)}
                <span
                  class={[
                    "flex items-center gap-2 px-2 py-1.5 text-xs",
                    !step.done && "text-muted-foreground",
                  ]}
                >
                  {#if step.done}
                    <Check class="size-3 text-emerald-500" />
                  {:else}
                    <Circle class="size-3 fill-gray-700 text-gray-500" />
                  {/if}
                  {step.label}
                </span>
              {/each}
            </div>
            <div class="flex flex-col gap-3 border-t border-border pt-6">
              <span
                class="text-[10px] font-semibold tracking-[0.05em] text-muted-foreground uppercase"
              >
                Summary
              </span>
              <div class="flex flex-col gap-2 text-xs">
                {#each summary as row (row.key)}
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">{row.key}</span>
                    <span>{row.value}</span>
                  </div>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-background/0 to-background"
  ></div>
</div>
