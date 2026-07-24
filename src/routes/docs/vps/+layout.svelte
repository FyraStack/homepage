<script lang="ts">
	import { resolve } from '$app/paths';
	import { docsProseClass } from '$lib/docs-prose-class';
	import DocsCategoryNav from '$lib/components/DocsCategoryNav.svelte';

	const { children } = $props();

	const order = ['about', 'getting-started', 'ssh', 'user-setup', 'hardening', 'choosing-a-distro'];
</script>

<div class="border-b border-fyra-gray-800 px-6 py-3 lg:px-8">
	<nav class="flex items-center gap-2 text-xs text-fyra-gray-300" aria-label="Breadcrumb">
		<a href={resolve('/docs')} class="transition-colors hover:text-fyra-gray-100">Docs</a>
		<span class="text-fyra-gray-400">/</span>
		<span class="text-fyra-gray-200">VPS</span>
	</nav>
</div>

<div class="flex min-h-screen flex-col divide-fyra-gray-800 lg:flex-row lg:divide-x">
	<DocsCategoryNav category="vps" {order} />

	<!-- Content -->
	<div class="min-w-0 flex-1 px-6 pt-0 pb-12 lg:px-12 lg:py-12">
		<div class={docsProseClass}>
			{@render children()}
		</div>
	</div>
</div>
