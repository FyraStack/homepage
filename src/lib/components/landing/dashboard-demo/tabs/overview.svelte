<script lang="ts">
  import FileText from "~icons/nucleo/file-text";
  import Terminal from "~icons/nucleo/terminal";
  import { getDemo } from "../context";
  import CopyButton from "../copy-button.svelte";
  import type { ChartSample } from "../demo-state.svelte";

  const demo = getDemo();
  let selectedServer = $derived(demo.selected);

  function formatPercent(value: number) {
    return `${Math.round(value * 100)}%`;
  }

  function formatRate(bytes: number) {
    const units = ["B/s", "KB/s", "MB/s", "GB/s"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit += 1;
    }
    return `${value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
  }

  function buildPoints(values: number[], maxValue: number) {
    return values
      .map((value, index) => {
        const x = (index / Math.max(values.length - 1, 1)) * 240;
        const y = 80 - (value / maxValue) * 70;
        return `${x.toFixed(1)},${Math.max(5, Math.min(75, y)).toFixed(1)}`;
      })
      .join(" ");
  }

  const chartSeries: {
    color: string;
    format: (value: number) => string;
    key: keyof ChartSample;
    label: string;
    scaled: boolean;
  }[] = [
    {
      color: "#ef6b6b",
      format: formatPercent,
      key: "cpu",
      label: "CPU Usage",
      scaled: false,
    },
    {
      color: "#4ade80",
      format: formatPercent,
      key: "memory",
      label: "RAM Usage",
      scaled: false,
    },
    {
      color: "#60a5fa",
      format: formatRate,
      key: "bandwidth",
      label: "Bandwidth",
      scaled: true,
    },
    {
      color: "#fb923c",
      format: formatRate,
      key: "diskIo",
      label: "Disk I/O",
      scaled: true,
    },
  ];

  let charts = $derived.by(() => {
    const samples = demo.history[selectedServer.id];
    return chartSeries.map((series) => {
      const values = samples.map((sample) => sample[series.key]);
      return {
        color: series.color,
        label: series.label,
        points: buildPoints(values, series.scaled ? Math.max(...values, 1) : 1),
        value: series.format(values.at(-1) ?? 0),
      };
    });
  });
</script>

<h2 class="sr-only">Server Overview</h2>

<div
  class="grid shrink-0 grid-cols-2 gap-px border-b border-border bg-muted @min-[64rem]:grid-cols-4"
>
  {#each charts as chart (chart.label)}
    <div class="relative flex flex-col bg-background">
      <div class="flex items-baseline justify-between px-4 pt-3 pb-1">
        <span class="relative z-10 text-xs font-medium text-muted-foreground"
          >{chart.label}</span
        >
        <span class="relative z-10 text-xs font-semibold text-foreground"
          >{chart.value}</span
        >
      </div>
      <div>
        <svg
          class="block h-28 w-full"
          preserveAspectRatio="none"
          viewBox="0 0 240 80"
        >
          <polygon
            fill={chart.color}
            opacity="0.08"
            points="{chart.points} 240,80 0,80"
          />
          <polyline
            fill="none"
            points={chart.points}
            stroke={chart.color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  {/each}
</div>

<div
  class="grid shrink-0 grid-cols-1 gap-px border-b border-border bg-muted @min-[64rem]:grid-cols-5"
>
  <div class="col-span-2 divide-y divide-border/50 bg-background">
    <div
      class="px-5 py-3 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
    >
      Server Details
    </div>
    {#each [
      ["Plan", selectedServer.plan.name],
      ["Region", selectedServer.region],
      ["vCPU", `${selectedServer.plan.vcpu}`],
      ["RAM", `${selectedServer.plan.memoryGb}GB`],
      ["Disk", `${selectedServer.plan.storageGb}GB`],
      ["Created", selectedServer.created],
      ["Uptime", selectedServer.uptime],
    ] as [label, value] (label)}
      <div class="flex items-center justify-between px-5 py-2">
        <span class="text-xs text-muted-foreground">{label}</span>
        <span class="text-xs font-medium text-foreground">{value}</span>
      </div>
    {/each}
    <div class="flex items-center justify-between px-5 py-2">
      <span class="text-xs text-muted-foreground">IPv4</span>
      <div class="flex items-center gap-1.5">
        <span class="font-mono text-xs text-foreground"
          >{selectedServer.ip}</span
        >
        <CopyButton label="Copy IPv4 address" text={selectedServer.ip} />
      </div>
    </div>
    <div class="flex items-center justify-between px-5 py-2">
      <span class="text-xs text-muted-foreground">IPv6</span>
      <div class="flex items-center gap-1.5">
        <span class="font-mono text-[11px] text-foreground"
          >{selectedServer.ipv6}</span
        >
        <CopyButton label="Copy IPv6 address" text={selectedServer.ipv6} />
      </div>
    </div>
  </div>

  <div class="col-span-3 flex flex-col bg-background">
    <div class="flex items-center gap-2 border-b border-border px-4 py-2.5">
      <Terminal class="h-3 w-3 text-muted-foreground" />
      <span class="text-xs font-semibold text-muted-foreground">Console</span>
    </div>
    <div
      class="min-h-[180px] flex-1 bg-background p-4 font-mono text-sm leading-relaxed text-muted-foreground"
    >
      <div
        class="flex h-full min-h-[148px] flex-col items-center justify-center gap-3"
      >
        <Terminal class="h-8 w-8 text-muted-foreground/60" />
        <div class="text-center">
          <p class="text-sm font-medium text-muted-foreground">Coming soon</p>
          <p class="mt-1 text-xs text-muted-foreground">
            Console access is not available yet.
          </p>
        </div>
        <div
          class="flex items-center gap-2 border border-border bg-background px-3 py-1.5"
        >
          <span class="text-xs text-muted-foreground"
            >ssh root@{selectedServer.ip}</span
          >
          <CopyButton
            label="Copy SSH command"
            text={`ssh root@${selectedServer.ip}`}
          />
        </div>
        <p class="text-[11px] text-muted-foreground">
          Connect over
          <a
            class="text-red-700 underline underline-offset-2 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
            href="/docs/vps/ssh"
            rel="noopener noreferrer"
            target="_blank"
            >SSH</a
          >
          in the meantime.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="flex min-h-[22rem] flex-1 flex-col @min-[64rem]:min-h-0">
  <div class="flex h-8 shrink-0 items-center border-b border-border px-4">
    <div class="flex items-center gap-2">
      <FileText class="h-3 w-3 text-muted-foreground" />
      <span class="text-xs font-semibold text-muted-foreground">Logs</span>
    </div>
  </div>
  <div
    class="flex-1 overflow-auto bg-background font-mono text-[11px] leading-relaxed"
  ></div>
</div>
