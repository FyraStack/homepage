<script lang="ts">
	import { resolve } from '$app/paths';
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import DocsSearch from '$lib/components/docs/docs-search.svelte';
	import { copyCodeButtons } from '$lib/docs/copy-code';
	import { docSections, findSection, publishedPages } from '$lib/docs';
	import { proseClass } from '$lib/docs/prose';
	import { cn } from '$lib/utils';

	let { data } = $props();

	const doc = $derived(data.page);
	const Content = $derived(data.content);
	const section = $derived(findSection(doc.section)!);
	const headings = $derived(doc.headings ?? []);
	const position = $derived(publishedPages.findIndex((page) => page.href === doc.href));
	const previous = $derived(publishedPages[position - 1]);
	const next = $derived(publishedPages[position + 1]);

	let activeHeading = $state('');

	const headingOffset = 112;

	function updateActiveHeading() {
		const passed = headings.filter(
			(heading) =>
				(document.getElementById(heading.id)?.getBoundingClientRect().top ?? Infinity) <=
				headingOffset
		);
		activeHeading = passed.at(-1)?.id ?? headings[0]?.id ?? '';
	}

	$effect(updateActiveHeading);
</script>

<svelte:window onscroll={updateActiveHeading} />

<svelte:head>
	<title>{doc.title} · Fyra Stack Docs</title>
	{#if doc.description}
		<meta name="description" content={doc.description} />
	{/if}
</svelte:head>

{#snippet sectionNav()}
	<nav aria-label="Documentation" class="flex flex-col gap-7">
		{#each docSections as navSection (navSection.id)}
			<div class="flex flex-col">
				<a
					href={resolve('/docs/[section]', { section: navSection.id })}
					class="mb-2 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground"
				>
					{navSection.title}
				</a>
				{#each navSection.pages as page (page.href)}
					{#if page.published}
						<a
							href={resolve('/docs/[section]/[slug]', { section: page.section, slug: page.slug })}
							aria-current={page.href === doc.href ? 'page' : undefined}
							class={cn(
								'border-l py-1 pl-3 text-sm transition-colors',
								page.href === doc.href
									? 'border-primary text-foreground'
									: 'border-border text-gray-400 hover:text-foreground'
							)}
						>
							{page.title}
						</a>
					{:else}
						<span class="border-l border-border py-1 pl-3 text-sm text-gray-700">
							{page.title}
						</span>
					{/if}
				{/each}
			</div>
		{/each}
	</nav>
{/snippet}

<main class="page-container flex gap-12 xl:gap-16">
	<aside class="hidden w-56 shrink-0 lg:block">
		<div
			class="sticky top-16 flex max-h-[calc(100dvh-4rem)] flex-col gap-8 overflow-y-auto py-10 pr-2"
		>
			<DocsSearch class="h-10 text-sm" />
			{@render sectionNav()}
		</div>
	</aside>

	<div class="min-w-0 flex-1 border-border py-10 lg:border-l lg:pl-12 xl:pl-16">
		<details class="group mb-8 border border-border lg:hidden">
			<summary
				class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium"
			>
				{section.title} docs
				<ChevronDown class="size-4 transition-transform group-open:rotate-180" />
			</summary>
			<div class="flex flex-col gap-6 border-t border-border p-4">
				<DocsSearch shortcut={false} class="h-10 text-sm" />
				{@render sectionNav()}
			</div>
		</details>

		<article class="max-w-180" data-pagefind-body>
			<nav
				aria-label="Breadcrumb"
				class="flex items-center gap-2 text-[13px] text-muted-foreground"
			>
				<a href={resolve('/docs')} class="transition-colors hover:text-foreground">Docs</a>
				<span aria-hidden="true">/</span>
				<a
					href={resolve('/docs/[section]', { section: section.id })}
					class="transition-colors hover:text-foreground">{section.title}</a
				>
			</nav>
			<header class="mt-4 flex flex-col gap-3 border-b border-border pb-8">
				<h1 class="text-4xl/[1.1] font-semibold tracking-[-0.025em] sm:text-[44px]/[1.1]">
					{doc.title}
				</h1>
				{#if doc.description}
					<p class="text-lg/[29px] text-pretty text-muted-foreground">{doc.description}</p>
				{/if}
			</header>

			<div {@attach copyCodeButtons} class={cn(proseClass, 'mt-8')}>
				<Content />
			</div>
		</article>

		<nav
			aria-label="Pagination"
			class="mt-16 grid max-w-180 gap-3 border-t border-border pt-8 sm:grid-cols-2"
		>
			{#if previous}
				<a
					href={resolve('/docs/[section]/[slug]', {
						section: previous.section,
						slug: previous.slug
					})}
					class="flex flex-col gap-1.5 border border-border p-4 transition-colors hover:border-gray-600"
				>
					<span class="flex items-center gap-1.5 text-xs text-muted-foreground">
						<ArrowLeft class="size-3.5" /> Previous
					</span>
					<span class="text-[15px] font-medium">{previous.title}</span>
				</a>
			{:else}
				<span></span>
			{/if}
			{#if next}
				<a
					href={resolve('/docs/[section]/[slug]', { section: next.section, slug: next.slug })}
					class="flex flex-col items-end gap-1.5 border border-border p-4 text-right transition-colors hover:border-gray-600"
				>
					<span class="flex items-center gap-1.5 text-xs text-muted-foreground">
						Next <ArrowRight class="size-3.5" />
					</span>
					<span class="text-[15px] font-medium">{next.title}</span>
				</a>
			{/if}
		</nav>
	</div>

	{#if headings.length > 0}
		<aside class="hidden w-52 shrink-0 xl:block">
			<nav aria-label="On this page" class="sticky top-16 flex flex-col gap-3 py-10">
				<span class="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
					On this page
				</span>
				<ul class="flex flex-col gap-2 text-[13px]/5">
					{#each headings as heading (heading.id)}
						<li class={heading.depth === 3 ? 'pl-3' : ''}>
							<a
								href="#{heading.id}"
								class={cn(
									'transition-colors hover:text-foreground',
									activeHeading === heading.id ? 'text-foreground' : 'text-gray-500'
								)}
							>
								{heading.text}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</main>
