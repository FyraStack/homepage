<script lang="ts" module>
  import { dev } from "$app/environment";

  interface PagefindResult {
    excerpt: string;
    meta: { title?: string };
    url: string;
  }

  interface Pagefind {
    search: (query: string) => Promise<{
      results: { id: string; data: () => Promise<PagefindResult> }[];
    }>;
  }

  interface DocRoute {
    section: string;
    slug: string;
  }

  interface SearchResult extends PagefindResult {
    route: DocRoute;
  }

  let pagefind: Promise<Pagefind | null> | undefined;

  const pagefindPath = "/pagefind/pagefind.js";
  const docUrlPattern = /^\/docs\/([^/]+)\/([^/.]+)/;
  const markSplitPattern = /(<mark>.*?<\/mark>)/g;
  const tagPattern = /<[^>]+>/g;

  function loadPagefind() {
    if (dev) {
      return Promise.resolve(null);
    }
    pagefind ??= import(/* @vite-ignore */ pagefindPath).catch(() => null);
    return pagefind;
  }

  function docRoute(url: string): DocRoute | null {
    const [, section, slug] = url.match(docUrlPattern) ?? [];
    return section && slug ? { section, slug } : null;
  }

  function withDocRoute(result: PagefindResult): SearchResult[] {
    const route = docRoute(result.url);
    return route ? [{ ...result, route }] : [];
  }

  function excerptParts(excerpt: string) {
    return excerpt.split(markSplitPattern).map((part) => ({
      highlighted: part.startsWith("<mark>"),
      text: part.replace(tagPattern, ""),
    }));
  }
</script>

<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import { resolve } from "$app/paths";
  import * as Dialog from "$lib/components/ui/dialog";
  import { cn } from "$lib/utils";

  let {
    shortcut = true,
    class: className,
  }: { shortcut?: boolean; class?: string } = $props();

  let open = $state(false);
  let query = $state("");
  let results = $state<SearchResult[]>([]);
  let unavailable = $state(false);
  let searchToken = 0;

  async function runSearch(value: string) {
    searchToken += 1;
    const token = searchToken;
    const index = await loadPagefind();
    if (token !== searchToken) {
      return;
    }
    if (!index) {
      unavailable = true;
      return;
    }
    if (!value.trim()) {
      results = [];
      return;
    }
    const response = await index.search(value);
    const data = await Promise.all(
      response.results.slice(0, 8).map((result) => result.data())
    );
    const docs = data.flatMap(withDocRoute);
    if (token === searchToken) {
      results = docs;
    }
  }

  $effect(() => {
    if (open) {
      runSearch(query);
    }
  });

  function onKeydown(event: KeyboardEvent) {
    if (
      shortcut &&
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();
      open = true;
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<button
  class={cn(
    "flex h-12 w-full shrink-0 items-center gap-3 border border-border bg-gray-850/60 px-4 text-left text-[15px] text-muted-foreground transition-colors hover:border-gray-600",
    className
  )}
  onclick={() => {
    open = true;
  }}
  type="button"
>
  <Search class="size-4 shrink-0" strokeWidth={1.75} />
  <span class="flex-1 truncate">Search the docs...</span>
  <kbd
    class="hidden border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] sm:inline"
    >⌘K</kbd
  >
</button>

<Dialog.Root bind:open>
  <Dialog.Content
    class="top-[18%] translate-y-0 gap-0 rounded-none bg-background p-0 sm:max-w-xl"
    showCloseButton={false}
  >
    <Dialog.Title class="sr-only">Search the docs</Dialog.Title>
    <label class="flex items-center gap-3 border-b border-border px-4">
      <Search
        class="size-4 shrink-0 text-muted-foreground"
        strokeWidth={1.75}
      />
      <input
        aria-label="Search the docs"
        class="h-13 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
        placeholder="Search the docs..."
        bind:value={query}
      >
    </label>
    <div class="max-h-[50vh] overflow-y-auto">
      {#if unavailable}
        <p class="px-4 py-8 text-center text-sm text-muted-foreground">
          {#if dev}
            Search runs on the production build. Use
            <code class="font-mono text-foreground">pnpm preview</code>
            to try it.
          {:else}
            Search isn't available right now. Try again after the next deploy.
          {/if}
        </p>
      {:else if query.trim() && results.length === 0}
        <p class="px-4 py-8 text-center text-sm text-muted-foreground">
          No results for “{query.trim()}”
        </p>
      {:else}
        <ul>
          {#each results as result (result.url)}
            <li>
              <a
                class="flex flex-col gap-1 border-b border-border/60 px-4 py-3 transition-colors hover:bg-gray-850"
                href={resolve("/docs/[section]/[slug]", result.route)}
                onclick={() => {
                  open = false;
                }}
              >
                <span class="text-sm font-medium">{result.meta.title}</span>
                <span class="line-clamp-2 text-[13px]/5 text-muted-foreground">
                  {#each excerptParts(result.excerpt) as part, index (index)}
                    {#if part.highlighted}
                      <mark class="bg-transparent text-foreground"
                        >{part.text}</mark
                      >
                    {:else}
                      {part.text}
                    {/if}
                  {/each}
                </span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </Dialog.Content>
</Dialog.Root>
