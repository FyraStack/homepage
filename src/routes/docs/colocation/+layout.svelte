<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft } from '@steeze-ui/carbon-icons';
	import { docsProseClass } from '$lib/docs-prose-class';
	import DocsMobileCategoryMenu from '$lib/components/DocsMobileCategoryMenu.svelte';

	const { children } = $props();

	const nav = [
		{ label: 'Shipping Hardware to Us', href: '/docs/colocation/shipping-hardware' },
		{ label: 'Accessing IPMI Remotely', href: '/docs/colocation/ipmi' },
		{ label: 'Requesting Remote Hands', href: '/docs/colocation/remote-hands' },
		{ label: 'Power Budgets and PDUs', href: '/docs/colocation/power-budgets' },
		{ label: 'Colocation Networking', href: '/docs/colocation/networking' }
	] as const;
</script>

<div class="border-b border-fyra-gray-800 px-6 py-3 lg:px-8">
	<nav class="flex items-center gap-2 text-xs text-fyra-gray-300" aria-label="Breadcrumb">
		<a href={resolve('/docs')} class="transition-colors hover:text-fyra-gray-100">Docs</a>
		<span class="text-fyra-gray-400">/</span>
		<span class="text-fyra-gray-200">Colocation</span>
	</nav>
</div>

<div class="flex min-h-screen divide-x divide-fyra-gray-800">
	<!-- Sidebar -->
	<aside class="hidden w-56 shrink-0 lg:block">
		<div class="sticky top-[calc(var(--spacing)*22)] px-6 py-8">
			<p class="mb-3 text-[10px] font-medium tracking-widest text-fyra-gray-300 uppercase">
				Colocation
			</p>
			<nav class="flex flex-col gap-0.5" aria-label="Colocation documentation">
				{#each nav as item (item.href)}
					<a
						href={resolve(item.href)}
						class="rounded-sm px-2 py-1.5 text-sm transition-colors {$page.url.pathname ===
						item.href
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

	<!-- Content -->
	<div class="min-w-0 flex-1 px-6 pt-6 pb-12 lg:px-12 lg:py-12">
		<!-- Mobile nav -->
		<DocsMobileCategoryMenu category="Colocation" {nav} />

		<div class={docsProseClass}>
			{@render children()}
		</div>
	</div>
</div>
