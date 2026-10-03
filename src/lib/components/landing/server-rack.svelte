<script lang="ts" module>
  type Unit =
    | { kind: "r640"; activeLeds: number[] }
    | { kind: "r740"; highlighted?: boolean; activeLeds: number[] }
    | { kind: "bezel" }
    | { kind: "blank"; height: 1 | 2 }
    | { kind: "switch" }
    | { kind: "pdu"; feed: "A" | "B" };

  const units: Unit[] = [
    { activeLeds: [0, 3, 5, 8], kind: "r640" },
    { activeLeds: [1, 4, 9], kind: "r640" },
    { height: 1, kind: "blank" },
    { activeLeds: [0, 2, 5, 7, 10], kind: "r740" },
    { activeLeds: [1, 2, 4, 6, 9, 11], highlighted: true, kind: "r740" },
    { kind: "bezel" },
    { height: 2, kind: "blank" },
    { activeLeds: [0, 2, 6], kind: "r640" },
    { activeLeds: [3, 7, 8], kind: "r640" },
    { kind: "switch" },
    { height: 1, kind: "blank" },
    { feed: "A", kind: "pdu" },
    { feed: "B", kind: "pdu" },
  ];

  function driveLedClass(active: boolean, highlighted = false) {
    if (!active) {
      return "bg-gray-700";
    }
    return highlighted
      ? "bg-red-500 motion-safe:animate-pulse"
      : "bg-emerald-500/80 motion-safe:animate-pulse";
  }

  const range = (length: number) => Array.from({ length }, (_, index) => index);

  const rackUnits = Array.from({ length: 16 }, (_, index) => 16 - index);
  const highlightedUnits = new Set([10, 11]);
  const linkedPorts = new Set([
    0, 1, 2, 4, 5, 8, 12, 13, 16, 20, 25, 26, 30, 33, 40, 41,
  ]);
</script>

<script lang="ts">
  import StackMark from "./stack-mark.svelte";
</script>

{#snippet ear(
  side: "left" | "right",
  height: 1 | 2,
  highlighted = false
)}
  <div
    class="flex w-3.5 shrink-0 flex-col items-center justify-between bg-border py-0.75 {side ===
    "left"
      ? "border-r"
      : "border-l"} border-gray-950"
  >
    <span class="size-0.75 rounded-full bg-gray-950"></span>
    {#if side === "left"}
      <span class="flex flex-col items-center gap-0.5">
        <span
          class="size-1 rounded-full {highlighted
            ? "bg-red-500"
            : "bg-emerald-500/80"}"
        ></span>
        {#if height === 2}
          <span class="size-0.5 rounded-full bg-sky-500/70"></span>
          <span class="h-2 w-1 rounded-[0.5px] bg-gray-950"></span>
        {/if}
      </span>
    {:else}
      <span class="flex flex-col items-center gap-0.5">
        <span
          class="size-1.5 rounded-full bg-background outline outline-offset-[-0.5px] {highlighted
            ? "outline-red-500"
            : "outline-gray-500"}"
        ></span>
        {#if height === 2}
          <span
            class="h-0.75 w-1.5 rounded-[0.5px] bg-gray-950 outline-[0.5px] outline-gray-600"
          ></span>
        {/if}
      </span>
    {/if}
    <span class="size-0.75 rounded-full bg-gray-950"></span>
  </div>
{/snippet}

<div
  aria-hidden="true"
  class="w-80 shrink-0 overflow-hidden rounded-lg bg-gray-950 outline outline-offset-[-0.5px] outline-border"
>
  <div class="flex h-9 items-center justify-end border-b border-border px-3.5">
    <span class="flex gap-0.75">
      {#each range(9) as index (index)}
        <span class="h-2.5 w-0.5 rounded-[1px] bg-border"></span>
      {/each}
    </span>
  </div>

  <div class="flex">
    <div class="flex w-7.5 flex-col gap-0.75 bg-background py-2.5">
      {#each rackUnits as unit (unit)}
        <span
          class={[
            "grid h-6 place-items-center font-mono text-[9px]",
            highlightedUnits.has(unit) ? "text-red-500" : "text-gray-600",
          ]}
        >
          {String(unit).padStart(2, "0")}
        </span>
      {/each}
    </div>

    <div class="flex min-w-0 flex-1 flex-col gap-0.75 px-1.5 py-2.5">
      {#each units as unit, unitIndex (unitIndex)}
        {#if unit.kind === "r640"}
          <div
            class="flex h-6 overflow-hidden rounded-[2px] bg-background outline outline-offset-[-0.5px] outline-border"
          >
            {@render ear("left", 1)}
            <div class="flex min-w-0 flex-1 gap-px bg-gray-950 p-0.5">
              {#each range(10) as drive (drive)}
                <div
                  class="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-[1px] bg-[#232326] px-0.5 py-0.5"
                >
                  <span
                    class={[
                      "h-0.5 w-full rounded-[0.5px]",
                      unit.activeLeds.includes(drive)
                        ? "bg-emerald-500/80 motion-safe:animate-pulse"
                        : "bg-gray-700",
                    ]}
                  ></span>
                  <span
                    class="w-full flex-1 bg-[radial-gradient(#0f0f10_0.5px,transparent_0.6px)] bg-size-[2px_2px]"
                  ></span>
                  <span
                    class="h-0.75 w-full rounded-[0.5px] bg-gray-600"
                  ></span>
                </div>
              {/each}
            </div>
            {@render ear("right", 1)}
          </div>
        {:else if unit.kind === "r740"}
          <div
            class={[
              "flex h-12.75 overflow-hidden rounded-[2px] outline outline-offset-[-0.5px]",
              unit.highlighted
                ? "bg-border shadow-[0_0_18px_#a54a4b40] outline-primary"
                : "bg-background outline-border",
            ]}
          >
            {@render ear("left", 2, unit.highlighted)}
            <div
              class="grid min-w-0 flex-1 grid-cols-4 grid-rows-3 gap-px bg-gray-950 p-0.5"
            >
              {#each range(12) as drive (drive)}
                <div
                  class="flex items-center gap-1 rounded-[1px] bg-[#232326] px-1"
                >
                  <span
                    class={[
                      "size-0.75 shrink-0 rounded-full",
                      driveLedClass(
                        unit.activeLeds.includes(drive),
                        unit.highlighted
                      ),
                    ]}
                  ></span>
                  <span
                    class="h-full flex-1 bg-[radial-gradient(#0f0f10_0.5px,transparent_0.6px)] bg-size-[2px_2px] py-1"
                  ></span>
                  <span
                    class="h-2 w-0.75 shrink-0 rounded-[0.5px] bg-gray-600"
                  ></span>
                </div>
              {/each}
            </div>
            {@render ear("right", 2, unit.highlighted)}
          </div>
        {:else if unit.kind === "bezel"}
          <div
            class="flex h-6 overflow-hidden rounded-[2px] bg-background outline outline-offset-[-0.5px] outline-border"
          >
            {@render ear("left", 1)}
            <div
              class="flex min-w-0 flex-1 items-center gap-2 bg-border px-1.5 py-1.25"
            >
              <span
                class="h-full min-w-0 flex-1 bg-[radial-gradient(#0f0f10_0.6px,transparent_0.7px)] bg-size-[2.5px_2.5px]"
              ></span>
              <span
                class="grid h-2.5 w-5.5 place-items-center rounded-[5px] bg-gray-950 outline-[0.5px] outline-gray-600"
              >
                <StackMark class="size-1.5" />
              </span>
              <span
                class="h-full min-w-0 flex-1 bg-[radial-gradient(#0f0f10_0.6px,transparent_0.7px)] bg-size-[2.5px_2.5px]"
              ></span>
            </div>
            {@render ear("right", 1)}
          </div>
        {:else if unit.kind === "blank"}
          <div
            class={[
              "flex items-center justify-between rounded-[2px] px-1.5 outline outline-offset-[-0.5px] outline-background",
              unit.height === 2 ? "h-12.75" : "h-6",
            ]}
          >
            <span class="size-1 rounded-full bg-border"></span>
            <span class="size-1 rounded-full bg-border"></span>
          </div>
        {:else if unit.kind === "switch"}
          <div
            class="flex h-6 items-center gap-1.5 overflow-hidden rounded-[2px] bg-background px-1.5 outline outline-offset-[-0.5px] outline-border"
          >
            <span class="flex flex-col gap-0.5">
              <span class="size-0.5 rounded-full bg-emerald-500/80"></span>
              <span class="size-0.5 rounded-full bg-gray-600"></span>
            </span>
            <span class="flex min-w-0 flex-1 gap-0.5">
              {#each range(4) as group (group)}
                <span
                  class="grid min-w-0 flex-1 grid-cols-6 grid-rows-2 gap-px"
                >
                  {#each range(12) as index (index)}
                    {@const port = group * 12 + index}
                    <span
                      class="relative h-1.75 rounded-[0.5px] bg-gray-950 outline-[0.5px] outline-gray-600"
                    >
                      <span
                        class={[
                          "absolute top-px left-px size-0.5",
                          linkedPorts.has(port)
                            ? "bg-emerald-500/80"
                            : "bg-transparent",
                        ]}
                      ></span>
                    </span>
                  {/each}
                </span>
              {/each}
            </span>
            <span class="grid grid-cols-2 grid-rows-2 gap-px">
              {#each range(4) as index (index)}
                <span
                  class="h-1.75 w-2.5 rounded-[0.5px] bg-gray-950 outline-[0.5px] outline-gray-500"
                ></span>
              {/each}
            </span>
          </div>
        {:else}
          <div
            class="flex h-6 items-center gap-1.5 rounded-[2px] bg-background px-2 outline outline-offset-[-0.5px] outline-border"
          >
            <span class="w-2 font-mono text-[9px] text-gray-400"
              >{unit.feed}</span
            >
            {#each range(8) as index (index)}
              <span
                class="flex h-2.5 w-3 items-center justify-center gap-px rounded-[2px] rounded-t-[3px] bg-gray-950 outline-[0.5px] outline-gray-600"
              >
                <span class="h-1 w-px bg-gray-600"></span>
                <span class="h-1 w-px bg-gray-600"></span>
                <span class="h-1 w-px bg-gray-600"></span>
              </span>
            {/each}
            <span class="ml-auto font-mono text-[8px] text-gray-500">0.9A</span>
            <span class="size-1 rounded-full bg-emerald-500/80"></span>
          </div>
        {/if}
      {/each}
    </div>

    <div class="flex w-3 flex-col items-center gap-2 py-3">
      {#each range(32) as index (index)}
        <span class="size-0.75 bg-border"></span>
      {/each}
    </div>
  </div>

  <div class="h-3 border-t border-border bg-background"></div>
</div>
