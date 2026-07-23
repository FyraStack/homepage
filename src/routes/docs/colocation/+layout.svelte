<script lang="ts">
	import { resolve } from '$app/paths';
	import { docsProseClass } from '$lib/docs-prose-class';
	import DocsCategoryNav from '$lib/components/DocsCategoryNav.svelte';

	const { children } = $props();

	const order = ['shipping-hardware', 'ipmi', 'remote-hands', 'power-budgets', 'networking'];
</script>

<div class="border-b border-fyra-gray-800 px-6 py-3 lg:px-8">
	<nav class="flex items-center gap-2 text-xs text-fyra-gray-300" aria-label="Breadcrumb">
		<a href={resolve('/docs')} class="transition-colors hover:text-fyra-gray-100">Docs</a>
		<span class="text-fyra-gray-400">/</span>
		<span class="text-fyra-gray-200">Colocation</span>
	</nav>
</div>

<div class="flex min-h-screen divide-x divide-fyra-gray-800">
	<DocsCategoryNav category="colocation" {order} />

	<!-- Content -->
	<div class="min-w-0 flex-1 px-6 pt-6 pb-12 lg:px-12 lg:py-12">
		<div class={docsProseClass}>
			{@render children()}
		</div>
	</div>
</div>
