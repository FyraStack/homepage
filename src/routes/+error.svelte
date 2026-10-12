<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import ctaDither from "$lib/assets/cta-dither.webp";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import { Button } from "$lib/components/ui/button";
  import ArrowRight from "~icons/nucleo/arrow-right";

  const isNotFound = $derived(page.status === 404);
  const title = $derived(
    isNotFound ? "Page not found" : "Something went wrong"
  );
</script>

<svelte:head>
  <title>{title} · Fyra Stack</title>
  <meta content="noindex" name="robots">
</svelte:head>

<main>
  <section
    class="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b border-border py-28 lg:py-42"
  >
    <DitherBackground
      class="-z-10"
      poster={ctaDither}
      priority
      settings={{
        clearAmount: 0.9,
        clearH: 0.45,
        clearW: 1.12,
        clearX: 0.5,
        clearY: 0.5,
        fadeBottom: 0.15,
        fadeTop: 0.15,
        intensity: 0.62,
        scale: 1.2,
        seed: 40,
        speed: 0.4,
      }}
    />

    <div class="page-container flex flex-col items-center gap-10 text-center">
      <div class="flex flex-col items-center gap-5">
        <p class="font-mono text-sm text-muted-foreground">{page.status}</p>
        <h1
          class="max-w-220 text-5xl/[1.02] font-semibold tracking-[-0.033em] text-balance sm:text-[72px]/[73px]"
        >
          {isNotFound ? "Stack Overflow" : title}
        </h1>
        <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
          {isNotFound
            ? "The page you're looking for may have moved, or never existed."
            : (page.error?.message ??
              "We hit an unexpected error loading this page.")}
        </p>
      </div>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <Button
          class="h-auto gap-2 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
          href={resolve("/")}
          size="lg"
          variant="accent"
        >
          Back to home <ArrowRight data-icon="inline-end" />
        </Button>
        <Button
          class="h-auto gap-2 py-2.5 pl-4 text-muted-foreground has-data-[icon=inline-end]:pr-3"
          href={resolve("/docs")}
          size="lg"
          variant="ghost"
        >
          Read the docs
        </Button>
      </div>
    </div>
  </section>
</main>
