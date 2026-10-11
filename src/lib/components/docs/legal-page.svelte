<script lang="ts">
  import type { Component } from "svelte";
  import { proseClass } from "$lib/docs/prose";
  import { cn } from "$lib/utils";

  let {
    content: Content,
    metadata,
  }: {
    content: Component;
    metadata: { title: string; description: string; updated: string };
  } = $props();
</script>

<svelte:head>
  <title>{metadata.title} · Fyra Stack</title>
  <meta content={`${metadata.title} · Fyra Stack`} property="og:title">
  <meta content={metadata.description} name="description">
  <meta content={metadata.description} property="og:description">
</svelte:head>

<main class="page-container py-20 lg:py-28">
  <article class="mx-auto max-w-180">
    <header class="flex flex-col gap-4 border-b border-border pb-8">
      <h1 class="text-5xl/[1.05] font-semibold tracking-[-0.03em]">
        {metadata.title}
      </h1>
      <p class="text-sm text-muted-foreground">
        Last updated {metadata.updated}
      </p>
    </header>
    <div class={cn(proseClass, "mt-10")}>
      <Content />
    </div>
  </article>
</main>
