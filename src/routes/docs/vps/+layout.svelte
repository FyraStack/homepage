<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowLeft } from '@steeze-ui/carbon-icons';
	import { docsProseClass } from '$lib/docs-prose-class';

	const { children } = $props();

	const nav = [
		{ label: 'Connecting via SSH', href: '/docs/vps/ssh' },
		{ label: 'Adding a non-root user', href: '/docs/vps/user-setup' },
		{ label: 'Initial server hardening', href: '/docs/vps/hardening' },
		{ label: 'VPS Networking', href: '/docs/vps/networking' },
		{ label: 'Choosing a Linux Distribution', href: '/docs/vps/choosing-a-distro' }
	] as const;
</script>

<div class="border-b border-fyra-gray-800 px-6 py-3 lg:px-8">
	<nav class="flex items-center gap-2 text-xs text-fyra-gray-300">
		<a href={resolve('/docs')} class="transition-colors hover:text-fyra-gray-100">Docs</a>
		<span class="text-fyra-gray-500">/</span>
		<span class="text-fyra-gray-200">VPS</span>
	</nav>
</div>

<div class="flex min-h-screen divide-x divide-fyra-gray-800">
	<!-- Sidebar -->
	<aside class="hidden w-56 shrink-0 lg:block">
		<div class="sticky top-0 px-6 py-8">
			<p class="mb-3 text-[10px] font-medium tracking-widest text-fyra-gray-300 uppercase">VPS</p>
			<nav class="flex flex-col gap-0.5">
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
	<main class="min-w-0 flex-1 px-6 py-12 lg:px-12">
		<!-- Mobile nav -->
		<div class="mb-8 lg:hidden">
			<p class="mb-2 text-[10px] font-medium tracking-widest text-fyra-gray-300 uppercase">VPS</p>
			<nav class="flex flex-wrap gap-2">
				{#each nav as item (item.href)}
					<a
						href={resolve(item.href)}
						class="border px-3 py-1 text-xs transition-colors {$page.url.pathname === item.href
							? 'border-fyra-red-500 text-fyra-gray-50'
							: 'border-fyra-gray-600 text-fyra-gray-300 hover:border-fyra-gray-400 hover:text-fyra-gray-100'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<div class={docsProseClass}>
			{@render children()}
		</div>
	</main>
</div>
