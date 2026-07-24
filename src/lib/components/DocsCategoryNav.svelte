<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft } from '@steeze-ui/carbon-icons';
	import DocsMobileCategoryMenu from '$lib/components/DocsMobileCategoryMenu.svelte';

	type Category = 'account-billing' | 'colocation' | 'vps';
	type NavItem = {
		label: string;
		href: string;
	};

	const categoryLabels: Record<Category, string> = {
		'account-billing': 'Account & Billing',
		colocation: 'Colocation',
		vps: 'VPS'
	};

	const pages = import.meta.glob('/src/routes/docs/*/*/+page.svx', {
		eager: true,
		query: '?raw',
		import: 'default'
	}) as Record<string, string>;

	function titleFromSource(source: string, slug: string): string {
		const title = source.match(/<DocsMeta[\s\S]*?title=["']([^"']+)["']/)?.[1];
		if (title) return title;

		return slug
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	function discoverCategory(category: Category, order: readonly string[]): NavItem[] {
		const discovered = Object.entries(pages)
			.filter(([path]) => path.includes(`/docs/${category}/`))
			.map(([path, source]) => {
				const slug = path.split('/').at(-2);
				return slug
					? {
							label: titleFromSource(source, slug),
							href: `/docs/${category}/${slug}`
						}
					: null;
			})
			.filter((item): item is NavItem => item !== null);

		const bySlug = new Map(discovered.map((item) => [item.href.split('/').at(-1), item]));
		const ordered = order
			.map((slug) => bySlug.get(slug))
			.filter((item): item is NavItem => item !== undefined);
		const explicitlyOrdered = new Set(order);

		return ordered.concat(
			discovered
				.filter((item) => !explicitlyOrdered.has(item.href.split('/').at(-1) ?? ''))
				.sort((a, b) => a.label.localeCompare(b.label))
		);
	}

	let { category, order }: { category: Category; order: readonly string[] } = $props();
	const label = $derived(categoryLabels[category]);
	const nav = $derived(discoverCategory(category, order));
</script>

<aside class="hidden w-56 shrink-0 lg:block">
	<div class="sticky {category === 'account-billing' ? 'top-0' : 'top-22'} px-6 py-8">
		<p class="mb-3 text-[10px] font-medium tracking-widest text-fyra-gray-300 uppercase">{label}</p>
		<nav class="flex flex-col gap-0.5" aria-label={`${label} documentation`}>
			{#each nav as item (item.href)}
				<a
					href={resolve(item.href)}
					class="rounded-sm px-2 py-1.5 text-sm transition-colors {$page.url.pathname === item.href
						? 'bg-fyra-gray-800 font-medium text-fyra-gray-50'
						: 'text-fyra-gray-300 hover:text-fyra-gray-100'}"
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="mt-8 border-t border-fyra-gray-800 pt-6">
			<a
				href={resolve('/docs')}
				class="flex items-center gap-1.5 text-xs text-fyra-gray-300 transition-colors hover:text-fyra-gray-100"
			>
				<Icon src={ArrowLeft} class="h-3 w-3" aria-hidden="true" />
				All docs
			</a>
		</div>
	</div>
</aside>

<div class="px-6 pt-6 lg:hidden">
	<DocsMobileCategoryMenu category={label} {nav} />
</div>
