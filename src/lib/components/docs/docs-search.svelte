<script lang="ts" module>
	import { dev } from '$app/environment';

	type PagefindResult = {
		url: string;
		excerpt: string;
		meta: { title?: string };
	};

	type Pagefind = {
		search: (query: string) => Promise<{
			results: { id: string; data: () => Promise<PagefindResult> }[];
		}>;
	};

	let pagefind: Promise<Pagefind | null> | undefined;

	const pagefindPath = '/pagefind/pagefind.js';

	function loadPagefind() {
		if (dev) return Promise.resolve(null);
		pagefind ??= import(/* @vite-ignore */ pagefindPath).catch(() => null);
		return pagefind;
	}

	function docRoute(url: string) {
		const [, section, slug] = url.match(/^\/docs\/([^/]+)\/([^/.]+)/) ?? [];
		return section && slug ? { section, slug } : null;
	}

	function excerptParts(excerpt: string) {
		return excerpt.split(/(<mark>.*?<\/mark>)/g).map((part) => ({
			text: part.replace(/<[^>]+>/g, ''),
			highlighted: part.startsWith('<mark>')
		}));
	}
</script>

<script lang="ts">
	import { resolve } from '$app/paths';
	import Search from '@lucide/svelte/icons/search';
	import * as Dialog from '$lib/components/ui/dialog';
	import { cn } from '$lib/utils';

	let { shortcut = true, class: className }: { shortcut?: boolean; class?: string } = $props();

	let open = $state(false);
	let query = $state('');
	let results = $state<PagefindResult[]>([]);
	let unavailable = $state(false);
	let searchToken = 0;

	async function runSearch(value: string) {
		const token = ++searchToken;
		const index = await loadPagefind();
		if (token !== searchToken) return;
		if (!index) {
			unavailable = true;
			return;
		}
		if (!value.trim()) {
			results = [];
			return;
		}
		const response = await index.search(value);
		const data = await Promise.all(response.results.slice(0, 8).map((result) => result.data()));
		const docs = data.filter((result) => docRoute(result.url));
		if (token === searchToken) results = docs;
	}

	$effect(() => {
		if (open) runSearch(query);
	});

	function onKeydown(event: KeyboardEvent) {
		if (shortcut && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			open = true;
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<button
	type="button"
	onclick={() => (open = true)}
	class={cn(
		'flex h-12 w-full shrink-0 items-center gap-3 border border-border bg-gray-850/60 px-4 text-left text-[15px] text-muted-foreground transition-colors hover:border-gray-600',
		className
	)}
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
		showCloseButton={false}
		class="top-[18%] translate-y-0 gap-0 rounded-none bg-background p-0 sm:max-w-xl"
	>
		<Dialog.Title class="sr-only">Search the docs</Dialog.Title>
		<label class="flex items-center gap-3 border-b border-border px-4">
			<Search class="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
			<input
				bind:value={query}
				placeholder="Search the docs..."
				aria-label="Search the docs"
				class="h-13 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
			/>
		</label>
		<div class="max-h-[50vh] overflow-y-auto">
			{#if unavailable}
				<p class="px-4 py-8 text-center text-sm text-muted-foreground">
					{#if dev}
						Search runs on the production build. Use <code class="font-mono text-foreground"
							>pnpm preview</code
						> to try it.
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
						{@const route = docRoute(result.url)!}
						<li>
							<a
								href={resolve('/docs/[section]/[slug]', route)}
								onclick={() => (open = false)}
								class="flex flex-col gap-1 border-b border-border/60 px-4 py-3 transition-colors hover:bg-gray-850"
							>
								<span class="text-sm font-medium">{result.meta.title}</span>
								<span class="line-clamp-2 text-[13px]/5 text-muted-foreground">
									{#each excerptParts(result.excerpt) as part, index (index)}
										{#if part.highlighted}
											<mark class="bg-transparent text-foreground">{part.text}</mark>
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
