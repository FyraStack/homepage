<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Check from "~icons/lucide/check";
  import Copy from "~icons/nucleo/copy";
  import FileText from "~icons/nucleo/file-text";
  import Terminal from "~icons/nucleo/terminal";
  import Trash2 from "~icons/nucleo/trash";
  import { getDemo } from "../context";
  import type { ChartSample } from "../demo-state.svelte";

  const demo = getDemo();
  let selectedServer = $derived(demo.selected);
  let copied = $state("");
  let liveLoaded = $derived(selectedServer.liveLoaded);

  function formatPercent(value: number | null) {
    if (value === null) {
      return "-";
    }
    return `${Math.round(value * 100)}%`;
  }

  function formatRate(bytes: number | null) {
    if (bytes === null) {
      return "-";
    }
    const units = ["B/s", "KB/s", "MB/s", "GB/s"];
    let value = bytes;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit += 1;
    }
    return `${value >= 10 || unit === 0 ? value.toFixed(0) : value.toFixed(1)} ${units[unit]}`;
  }

  function buildPoints(
    values: (number | null)[],
    maxValue = Math.max(...values.map((v) => v ?? 0), 1)
  ) {
    const points = values.filter((value): value is number => value !== null);
    return points
      .map((value, index) => {
        const x = (index / Math.max(points.length - 1, 1)) * 240;
        const y = 80 - (value / maxValue) * 70;
        return `${x.toFixed(1)},${Math.max(5, Math.min(75, y)).toFixed(1)}`;
      })
      .join(" ");
  }

  let charts = $derived.by(() => {
    const samples: ChartSample[] = demo.history[selectedServer.id] ?? [];
    const lastValue = (key: "cpu" | "memory" | "bandwidth" | "diskIo") => {
      for (let index = samples.length - 1; index >= 0; index -= 1) {
        const value = samples[index][key];
        if (value !== null) {
          return value;
        }
      }
      return null;
    };
    const bandwidthMax = Math.max(
      ...samples.map((sample) => sample.bandwidth ?? 0),
      1
    );
    const diskIoMax = Math.max(
      ...samples.map((sample) => sample.diskIo ?? 0),
      1
    );
    const loaded = samples.length > 0 || liveLoaded;

    return [
      {
        color: "#ef6b6b",
        label: "CPU Usage",
        loaded,
        points: buildPoints(
          samples.map((sample) => sample.cpu),
          1
        ),
        value: formatPercent(lastValue("cpu")),
      },
      {
        color: "#4ade80",
        label: "RAM Usage",
        loaded,
        points: buildPoints(
          samples.map((sample) => sample.memory),
          1
        ),
        value: formatPercent(lastValue("memory")),
      },
      {
        color: "#60a5fa",
        label: "Bandwidth",
        loaded,
        points: buildPoints(
          samples.map((sample) => sample.bandwidth),
          bandwidthMax
        ),
        value: formatRate(lastValue("bandwidth")),
      },
      {
        color: "#fb923c",
        label: "Disk I/O",
        loaded,
        points: buildPoints(
          samples.map((sample) => sample.diskIo),
          diskIoMax
        ),
        value: formatRate(lastValue("diskIo")),
      },
    ];
  });

  const terminalLines = [
    { text: "ls /var/log", type: "prompt" as const },
    {
      text: "www.log  gamer.log  uwaa.log  fyra.log  chicago.log",
      type: "output" as const,
    },
    { text: "", type: "cursor" as const },
  ];

  function isLiveDetail(label: string) {
    return ["Uptime"].includes(label);
  }

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    copied = key;
    setTimeout(() => {
      copied = "";
    }, 1500);
  }
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
        {#if chart.loaded}
          <span class="relative z-10 text-xs font-semibold text-foreground"
            >{chart.value}</span
          >
        {:else}
          <span
            class="relative z-10 h-3 w-10 animate-pulse rounded bg-muted"
          ></span>
        {/if}
      </div>
      <div>
        <svg
          class="block h-28 w-full"
          preserveAspectRatio="none"
          viewBox="0 0 240 80"
        >
          {#if chart.loaded}
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
          {:else}
            <line
              class="animate-pulse"
              stroke="var(--border)"
              stroke-dasharray="4 5"
              stroke-linecap="round"
              stroke-width="2"
              vector-effect="non-scaling-stroke"
              x1="0"
              x2="240"
              y1="50"
              y2="50"
            />
          {/if}
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
      ["Plan", selectedServer.plan],
      ["Region", selectedServer.region],
      ["vCPU", `${selectedServer.vcpu}`],
      ["RAM", selectedServer.ram],
      ["Disk", selectedServer.disk],
      ["Created", selectedServer.created],
      ["Uptime", selectedServer.uptime],
    ] as [label, value] (label)}
      <div class="flex items-center justify-between px-5 py-2">
        <span class="text-xs text-muted-foreground">{label}</span>
        {#if !liveLoaded && isLiveDetail(label)}
          <span class="h-2.5 w-20 animate-pulse rounded bg-muted"></span>
        {:else}
          <span class="text-xs font-medium text-foreground">{value}</span>
        {/if}
      </div>
    {/each}
    <div class="flex items-center justify-between px-5 py-2">
      <span class="text-xs text-muted-foreground">IPv4</span>
      <div class="flex items-center gap-1.5">
        {#if liveLoaded}
          <span class="font-mono text-xs text-foreground"
            >{selectedServer.ip}</span
          >
          <button
            aria-label="Copy IPv4 address"
            class="text-muted-foreground hover:text-foreground"
            onclick={() => copyToClipboard(selectedServer.ip, "ipv4")}
            type="button"
          >
            {#if copied === "ipv4"}
              <Check class="h-3 w-3 text-emerald-500" />
            {:else}
              <Copy class="h-3 w-3" />
            {/if}
          </button>
        {:else}
          <span class="h-2.5 w-24 animate-pulse rounded bg-muted"></span>
        {/if}
      </div>
    </div>
    <div class="flex items-center justify-between px-5 py-2">
      <span class="text-xs text-muted-foreground">IPv6</span>
      <div class="flex items-center gap-1.5">
        {#if liveLoaded}
          <span class="font-mono text-[11px] text-foreground"
            >{selectedServer.ipv6}</span
          >
          <button
            aria-label="Copy IPv6 address"
            class="text-muted-foreground hover:text-foreground"
            onclick={() => copyToClipboard(selectedServer.ipv6, "ipv6")}
            type="button"
          >
            {#if copied === "ipv6"}
              <Check class="h-3 w-3 text-emerald-500" />
            {:else}
              <Copy class="h-3 w-3" />
            {/if}
          </button>
        {:else}
          <span class="h-2.5 w-28 animate-pulse rounded bg-muted"></span>
        {/if}
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
      {#if !demo.featureFlags.vpsConsole}
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
          {#if selectedServer.ip}
            <div
              class="flex items-center gap-2 border border-border bg-background px-3 py-1.5"
            >
              <span class="text-xs text-muted-foreground"
                >ssh root@{selectedServer.ip}</span
              >
              <button
                aria-label="Copy SSH command"
                class="text-muted-foreground hover:text-foreground"
                onclick={() =>
                  copyToClipboard(
                    `ssh root@${selectedServer.ip}`,
                    "ssh-console"
                  )}
                type="button"
              >
                {#if copied === "ssh-console"}
                  <Check class="h-3 w-3 text-emerald-500" />
                {:else}
                  <Copy class="h-3 w-3" />
                {/if}
              </button>
            </div>
            <p class="text-[11px] text-muted-foreground">
              Connect over
              <a
                class="text-red-700 underline underline-offset-2 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200"
                href="https://fyrastack.com/docs/vps/ssh"
                rel="noopener noreferrer"
                target="_blank"
                >SSH</a
              >
              in the meantime.
            </p>
          {/if}
        </div>
      {:else if selectedServer.status === "running"}
        {#each terminalLines as line (line.type + line.text)}
          {#if line.type === "prompt"}
            <div>
              <span class="text-muted-foreground"
                >user@{selectedServer.name}~:</span
              >
              {line.text}
            </div>
          {:else if line.type === "output"}
            <div class="text-muted-foreground">{line.text}</div>
          {:else}
            <div>
              <span class="text-muted-foreground"
                >user@{selectedServer.name}~:</span
              >
              <span
                class="inline-block h-4 w-1.5 animate-pulse bg-muted-foreground"
              ></span>
            </div>
          {/if}
        {/each}
      {:else if selectedServer.status === "restarting"}
        <div class="text-amber-500">Restarting server...</div>
      {:else if selectedServer.status === "unknown"}
        <div class="text-muted-foreground">
          Server status unavailable. Reconnecting...
        </div>
      {:else}
        <div class="text-muted-foreground">
          Server is offline. Start the server to connect.
        </div>
      {/if}
    </div>
  </div>
</div>

<div class="flex min-h-[22rem] flex-1 flex-col @min-[64rem]:min-h-0">
  <div
    class="flex h-8 shrink-0 items-center justify-between border-b border-border px-4"
  >
    <div class="flex items-center gap-2">
      <FileText class="h-3 w-3 text-muted-foreground" />
      <span class="text-xs font-semibold text-muted-foreground">Logs</span>
    </div>
    {#if demo.featureFlags.vpsLogs}
      <div class="flex items-center gap-1">
        <Button
          aria-label="Clear logs"
          class="h-6 w-6 p-0 text-red-400"
          disabled
          size="sm"
          variant="ghost"
        >
          <Trash2 class="h-2.5 w-2.5" />
        </Button>
      </div>
    {/if}
  </div>
  <div
    class="flex-1 overflow-auto bg-background font-mono text-[11px] leading-relaxed"
  ></div>
</div>
