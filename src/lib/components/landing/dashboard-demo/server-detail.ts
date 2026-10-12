import type { Component } from "svelte";
import ArrowUpDown from "~icons/lucide/arrow-up-down";
import Activity from "~icons/nucleo/activity";
import Globe from "~icons/nucleo/globe";
import Settings from "~icons/nucleo/settings";
import type { ServerStatus, ServerTab } from "./demo-state.svelte";
import Networking from "./tabs/networking.svelte";
import Overview from "./tabs/overview.svelte";
import Resize from "./tabs/resize.svelte";
import ServerSettings from "./tabs/settings.svelte";

export const serverTabs: {
  id: ServerTab;
  label: string;
  icon: Component<{ class?: string }>;
  page: Component;
}[] = [
  { icon: Activity, id: "overview", label: "Overview", page: Overview },
  { icon: Globe, id: "networking", label: "Networking", page: Networking },
  { icon: ArrowUpDown, id: "resize", label: "Resize", page: Resize },
  {
    icon: Settings,
    id: "settings",
    label: "Settings",
    page: ServerSettings,
  },
];

export const statusStyles: Record<
  ServerStatus,
  { badge: string; dot: string; label: string }
> = {
  restarting: {
    badge:
      "border-amber-300 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-400",
    dot: "animate-pulse bg-amber-500",
    label: "Restarting",
  },
  running: {
    badge:
      "border-emerald-300 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400",
    dot: "bg-emerald-500",
    label: "Running",
  },
  stopped: {
    badge:
      "border-red-300 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400",
    dot: "bg-red-500",
    label: "Stopped",
  },
};
