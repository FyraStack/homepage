import type { Component } from "svelte";
import ArrowUpDown from "~icons/lucide/arrow-up-down";
import Activity from "~icons/nucleo/activity";
import Globe from "~icons/nucleo/globe";
import Settings from "~icons/nucleo/settings";
import type { DemoState, ServerTab } from "./demo-state.svelte";

export const serverTabs: {
  id: ServerTab;
  label: string;
  icon: Component<{ class?: string }>;
  featureFlag?: keyof DemoState["featureFlags"];
}[] = [
  { icon: Activity, id: "overview", label: "Overview" },
  {
    featureFlag: "vpsNetworking",
    icon: Globe,
    id: "networking",
    label: "Networking",
  },
  {
    featureFlag: "vpsResize",
    icon: ArrowUpDown,
    id: "resize",
    label: "Resize",
  },
  {
    featureFlag: "vpsSettings",
    icon: Settings,
    id: "settings",
    label: "Settings",
  },
];
