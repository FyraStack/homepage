<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';

	type DocsHref =
		| '/docs/account-billing/support'
		| '/docs/colocation/ipmi'
		| '/docs/colocation/networking'
		| '/docs/colocation/power-budgets'
		| '/docs/colocation/remote-hands'
		| '/docs/colocation/shipping-hardware'
		| '/docs/vps/choosing-a-distro'
		| '/docs/vps/hardening'
		| '/docs/vps/networking'
		| '/docs/vps/ssh'
		| '/docs/vps/user-setup';

	type NavItem = {
		label: string;
		href: DocsHref;
	};

	type Props = {
		category: string;
		nav: readonly NavItem[];
	};

	let { category, nav }: Props = $props();

	const labelId = $derived(
		`docs-section-menu-${category
			.toLowerCase()
			.replace(/&/g, 'and')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '')}`
	);
	const selectedHref = $derived(
		nav.some((item) => item.href === $page.url.pathname) ? $page.url.pathname : ''
	);

	function navigateToSection(event: Event) {
		const target = event.currentTarget as HTMLSelectElement;

		const href = nav.find((item) => item.href === target.value)?.href;

		if (href) {
			goto(resolve(href));
		}
	}
</script>

<div class="mb-8 lg:hidden">
	<label
		for={labelId}
		class="mb-2 block text-[10px] font-medium tracking-widest text-fyra-gray-300 uppercase"
	>
		{category}
	</label>
	<div class="relative">
		<select
			id={labelId}
			value={selectedHref}
			onchange={navigateToSection}
			class="w-full rounded-sm border border-fyra-gray-700 bg-fyra-gray-900 px-3 py-2.5 pr-10 text-sm font-medium text-fyra-gray-50 transition-colors focus:border-fyra-red-500 focus:ring-fyra-red-500"
		>
			{#if !selectedHref}
				<option value="" disabled>Select a guide</option>
			{/if}
			{#each nav as item (item.href)}
				<option value={item.href}>{item.label}</option>
			{/each}
		</select>
	</div>
</div>
