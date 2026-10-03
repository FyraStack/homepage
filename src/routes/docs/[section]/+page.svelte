<script lang="ts">
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import { resolve } from "$app/paths";

  let { data } = $props();

  const section = $derived(data.section);
</script>

<svelte:head>
  <title>{section.title} · Fyra Stack Docs</title>
  <meta content={section.description} name="description">
</svelte:head>

<main class="page-container py-16 lg:py-24">
  <nav
    aria-label="Breadcrumb"
    class="flex items-center gap-2 text-[13px] text-muted-foreground"
  >
    <a class="transition-colors hover:text-foreground" href={resolve("/docs")}
      >Docs</a
    >
    <span aria-hidden="true">/</span>
    <span class="text-foreground">{section.title}</span>
  </nav>
  <div class="mt-6 flex max-w-180 flex-col gap-4">
    <section.icon class="size-6" strokeWidth={1.5} />
    <h1 class="text-5xl/[1.05] font-semibold tracking-[-0.03em]">
      {section.title}
    </h1>
    <p class="text-lg/[29px] text-pretty text-muted-foreground">
      {section.description}
    </p>
  </div>

  <ul class="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
    {#each section.pages as page (page.href)}
      <li class="bg-background">
        {#if page.published}
          <a
            class="group flex h-full items-start justify-between gap-6 p-6 transition-colors hover:bg-gray-850"
            href={resolve("/docs/[section]/[slug]", {
              section: page.section,
              slug: page.slug,
            })}
          >
            <span class="flex flex-col gap-1.5">
              <span class="text-[17px] font-semibold tracking-[-0.012em]"
                >{page.title}</span
              >
              {#if page.description}
                <span class="text-sm/[21px] text-muted-foreground"
                  >{page.description}</span
                >
              {/if}
            </span>
            <ArrowUpRight
              class="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            />
          </a>
        {:else}
          <div class="flex h-full items-start justify-between gap-6 p-6">
            <span
              class="text-[17px] font-semibold tracking-[-0.012em] text-gray-600"
            >
              {page.title}
            </span>
            {#if !page.supported}
              <span
                class="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                Soon
              </span>
            {/if}
          </div>
        {/if}
      </li>
    {/each}
  </ul>
</main>
