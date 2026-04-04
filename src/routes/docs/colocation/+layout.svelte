<script lang="ts">
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft } from '@steeze-ui/carbon-icons';

	const { children } = $props();

	const nav = [
		{ label: 'Shipping hardware to us', href: '/docs/colocation/shipping-hardware' },
		{ label: 'Accessing IPMI remotely', href: '/docs/colocation/ipmi' },
		{ label: 'Requesting remote hands', href: '/docs/colocation/remote-hands' },
		{ label: 'Power budgets and PDUs', href: '/docs/colocation/power-budgets' }
	];
</script>

<div class="border-b border-fyra-gray-800 px-6 py-3 lg:px-8">
	<nav class="flex items-center gap-2 text-xs text-fyra-gray-500">
		<a href="/docs" class="transition-colors hover:text-fyra-gray-300">Docs</a>
		<span>/</span>
		<span class="text-fyra-gray-400">Colocation</span>
	</nav>
</div>

<div class="flex min-h-screen divide-x divide-fyra-gray-800">
	<!-- Sidebar -->
	<aside class="hidden w-56 shrink-0 lg:block">
		<div class="sticky top-0 px-6 py-8">
			<p class="mb-3 text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">
				Colocation
			</p>
			<nav class="flex flex-col gap-0.5">
				{#each nav as item}
					<a
						href={item.href}
						class="rounded-sm px-2 py-1.5 text-sm transition-colors {$page.url.pathname ===
						item.href
							? 'bg-fyra-gray-800 font-medium text-fyra-gray-50'
							: 'text-fyra-gray-400 hover:text-fyra-gray-200'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="mt-8 border-t border-fyra-gray-800 pt-6">
				<a
					href="/docs"
					class="flex items-center gap-1.5 text-xs text-fyra-gray-500 transition-colors hover:text-fyra-gray-300"
				>
					<Icon src={ArrowLeft} class="h-3 w-3" aria-hidden="true" />
					All docs
				</a>
			</div>
		</div>
	</aside>

	<!-- Content -->
	<main class="min-w-0 flex-1 px-6 py-12 lg:px-12">
		<!-- Mobile nav -->
		<div class="mb-8 lg:hidden">
			<p class="mb-2 text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">
				Colocation
			</p>
			<nav class="flex flex-wrap gap-2">
				{#each nav as item}
					<a
						href={item.href}
						class="border px-3 py-1 text-xs transition-colors {$page.url.pathname === item.href
							? 'border-fyra-red-500 text-fyra-gray-50'
							: 'border-fyra-gray-700 text-fyra-gray-400 hover:border-fyra-gray-500 hover:text-fyra-gray-200'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<div
			class="prose max-w-2xl prose-invert
			prose-headings:font-semibold prose-headings:tracking-tight
			prose-h1:mb-4 prose-h1:text-4xl prose-h1:text-fyra-gray-50
			prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl prose-h2:text-fyra-gray-50
			prose-h3:mt-6 prose-h3:mb-1 prose-h3:text-sm prose-h3:font-semibold prose-h3:text-fyra-gray-200
			prose-p:text-sm prose-p:leading-relaxed prose-p:text-fyra-gray-400
			prose-a:font-medium prose-a:text-fyra-red-400
			prose-a:no-underline hover:prose-a:text-fyra-red-300 prose-strong:text-fyra-gray-200 prose-code:rounded
			prose-code:bg-fyra-gray-800 prose-code:px-1.5
			prose-code:py-0.5
			prose-code:text-sm prose-code:font-normal prose-code:text-fyra-red-300 prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-fyra-gray-700 prose-pre:bg-fyra-gray-950 prose-pre:text-fyra-gray-200
			prose-li:text-sm prose-li:text-fyra-gray-400 prose-hr:my-8 prose-hr:border-fyra-gray-800"
		>
			{@render children()}
		</div>
	</main>
</div>
