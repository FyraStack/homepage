<script lang="ts">
  import ctaDither from "$lib/assets/cta-dither.webp";
  import DitherBackground from "$lib/components/landing/dither-background.svelte";
  import { Button } from "$lib/components/ui/button";
  import { dashboardUrl, socialLinks } from "$lib/site";
  import ArrowRight from "~icons/nucleo/arrow-right";
</script>

<section
  class="relative isolate overflow-hidden border-b border-border py-28 lg:py-42"
>
  <DitherBackground
    class="-z-10"
    poster={ctaDither}
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
      <h2
        class="max-w-220 text-5xl/[1.02] font-semibold tracking-[-0.033em] text-balance sm:text-[72px]/[73px]"
      >
        Your first server is five dollars away
      </h2>
      <p class="max-w-140 text-lg/[29px] text-pretty text-muted-foreground">
        BASE-2G gets you 2 vCPU, 2 GB of RAM, and 40 GB of SAS3 SSD. Resize
        whenever you outgrow it.
      </p>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <Button
        class="h-auto gap-2 py-2.5 pl-4 backdrop-blur-sm has-data-[icon=inline-end]:pr-3"
        href={dashboardUrl}
        size="lg"
        variant="accent"
      >
        Deploy your Server <ArrowRight data-icon="inline-end" />
      </Button>
      <Button
        class="h-auto px-4 py-2.5 text-muted-foreground"
        href={socialLinks.discord}
        size="lg"
        variant="ghost"
      >
        Join our Discord
      </Button>
    </div>
  </div>
</section>
