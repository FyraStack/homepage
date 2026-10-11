<script lang="ts">
  import type { Attachment } from "svelte/attachments";
  import { prefersReducedMotion } from "svelte/motion";
  import { fly } from "svelte/transition";

  let {
    words,
    interval = 2400,
    class: className,
  }: { words: string[]; interval?: number; class?: string } = $props();

  let index = $state(0);
  let boxWidth = $state<number>();
  const swapDuration = 320;

  let currentWord: HTMLElement | undefined;

  const trackWidth: Attachment<HTMLElement> = (node) => {
    currentWord = node;
    const observer = new ResizeObserver(([entry]) => {
      if (node === currentWord) {
        boxWidth = entry.borderBoxSize[0].inlineSize;
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  };

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
  class="inline-grid align-bottom transition-[width] ease-out motion-reduce:transition-none {className}"
  style:width={boxWidth === undefined ? undefined : `${boxWidth}px`}
  style:transition-duration="{swapDuration}ms"
  style:justify-items="unsafe center"
  style:grid-template-columns="minmax(0, 1fr)"
>
  {#key index}
    <span
      class="col-start-1 row-start-1 whitespace-nowrap"
      {@attach trackWidth}
      in:fly={{ duration: swapDuration, y: "0.4em" }}
      out:fly={{ duration: swapDuration, y: "-0.4em" }}>{words[index]}</span
    >
  {/key}
</span>
