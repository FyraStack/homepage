<script lang="ts">
  import {
    createRollingNumber,
    type RollingNumberController,
  } from "@kitlangton/rolling-number";
  import "@kitlangton/rolling-number/styles.css";
  import { onMount, untrack } from "svelte";

  let {
    value,
    animateIn = false,
    class: className,
  }: { value: number; animateIn?: boolean; class?: string } = $props();

  const locales = "en-US";
  const format: Intl.NumberFormatOptions = {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  };

  const serverText = untrack(() =>
    new Intl.NumberFormat(locales, format).format(value)
  );

  let host = $state<HTMLSpanElement>();
  let controller: RollingNumberController | undefined;

  onMount(() => {
    if (!host) {
      return;
    }
    const rollsIn = untrack(() => animateIn);
    const rolling = createRollingNumber(host, {
      format,
      locales,
      motionBlur: true,
      value: rollsIn ? 0 : untrack(() => value),
    });
    if (!rollsIn) {
      controller = rolling;
      return () => rolling.destroy();
    }
    const frame = requestAnimationFrame(() => {
      controller = rolling;
      rolling.update({ value: untrack(() => value) });
    });
    return () => {
      cancelAnimationFrame(frame);
      rolling.destroy();
      controller = undefined;
    };
  });

  $effect(() => {
    const nextValue = value;
    controller?.update({ value: nextValue });
  });
</script>

<span class={className} bind:this={host}>{serverText}</span>
