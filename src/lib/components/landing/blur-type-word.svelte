<script lang="ts">
  import { cubicOut } from "svelte/easing";
  import { prefersReducedMotion } from "svelte/motion";
  import { blur } from "svelte/transition";

  let {
    words,
    typeDelay = 70,
    eraseDelay = 45,
    pauseDelay = 220,
    holdDelay = 2000,
    class: className,
  }: {
    words: string[];
    typeDelay?: number;
    eraseDelay?: number;
    pauseDelay?: number;
    holdDelay?: number;
    class?: string;
  } = $props();

  interface Letter {
    char: string;
    id: number;
  }

  let lastId = 0;
  const createId = () => {
    lastId += 1;
    return lastId;
  };
  const toLetters = (word: string): Letter[] =>
    Array.from(word, (char) => ({ char, id: createId() }));

  let letters = $derived(toLetters(words[0] ?? ""));
  let targetWord = $derived(words[0] ?? "");
  let boxWidth = $state<number>();

  $effect(() => {
    if (prefersReducedMotion.current || words.length < 2) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    const after = (ms: number, step: () => void) => {
      timer = setTimeout(step, ms);
    };

    const typeFrom = (position: number) => {
      const word = words[index];
      if (position >= word.length) {
        after(holdDelay, erase);
        return;
      }
      letters = [...letters, { char: word[position], id: createId() }];
      after(typeDelay, () => typeFrom(position + 1));
    };

    const erase = () => {
      if (letters.length === 0) {
        index = (index + 1) % words.length;
        targetWord = words[index];
        after(pauseDelay, () => typeFrom(0));
        return;
      }
      letters = letters.slice(0, -1);
      after(eraseDelay, erase);
    };

    after(holdDelay, erase);
    return () => clearTimeout(timer);
  });
</script>

<span
  class="relative inline-block text-left whitespace-nowrap transition-[width] duration-[400ms] ease-in-out motion-reduce:transition-none {className}"
  style:width={boxWidth === undefined ? undefined : `${boxWidth}px`}
>
  <span class="whitespace-nowrap before:content-['\200b']">
    {#each letters as letter (letter.id)}
      <span
        class="-mx-[0.15em] -my-[0.3em] inline-block px-[0.15em] py-[0.3em] whitespace-pre"
        in:blur={{ amount: 4, duration: 360, easing: cubicOut }}
        out:blur={{ amount: 4, duration: 260, easing: cubicOut }}
      >
        {letter.char}
      </span>
    {/each}
  </span>
  <span
    aria-hidden="true"
    class="invisible absolute top-0 left-0 whitespace-pre"
    bind:offsetWidth={boxWidth}
  >
    {#each targetWord as char, index (index)}
      <span class="inline-block">{char}</span>
    {/each}
  </span>
</span>
