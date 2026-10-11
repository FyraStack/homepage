<script lang="ts">
  import { prefersReducedMotion } from "svelte/motion";
  import { fly } from "svelte/transition";

  let {
    words,
    interval = 2400,
    class: className,
  }: { words: string[]; interval?: number; class?: string } = $props();

  let index = $state(0);
  let wordWidths = $state<number[]>([]);
  const swapDuration = 320;

  const currentWidth = $derived(wordWidths[index]);

  $effect(() => {
    if (prefersReducedMotion.current || words.length < 2) {
      index = 0;
      return;
    }
    const timer = setInterval(() => {
      index = (index + 1) % words.length;
    }, interval);
    return () => clearInterval(timer);
  });
</script>

<span
  class="relative inline-grid align-bottom transition-[width] ease-out motion-reduce:transition-none {className}"
  style:width={currentWidth ? `${currentWidth}px` : undefined}
  style:transition-duration="{swapDuration}ms"
  style:justify-items="unsafe center"
  style:grid-template-columns="minmax(0, 1fr)"
>
  {#key index}
    <span
      class="col-start-1 row-start-1 whitespace-nowrap"
      in:fly={{ duration: swapDuration, y: "0.4em" }}
      out:fly={{ duration: swapDuration, y: "-0.4em" }}>{words[index]}</span
    >
  {/key}
  <span class="invisible absolute top-0 left-0 whitespace-nowrap" aria-hidden="true">
    {#each words as word, i (word)}
      <span class="absolute top-0 left-0" bind:offsetWidth={wordWidths[i]}
        >{word}</span
      >
    {/each}
  </span>
</span>
