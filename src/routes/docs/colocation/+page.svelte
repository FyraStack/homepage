<script lang="ts">
	import { resolve } from '$app/paths';
	import DocsMeta from '$lib/components/DocsMeta.svelte';

	const articles = [
		{
			label: 'Shipping hardware to us',
			description: 'Prepare, pack, and ship your server for colocation.',
			href: '/docs/colocation/shipping-hardware'
		},
		{
			label: 'Accessing IPMI remotely',
			description: 'Use out-of-band management to reach your colocated hardware.',
			href: '/docs/colocation/ipmi'
		},
		{
			label: 'Requesting remote hands',
			description: 'Ask our team for physical assistance with your server.',
			href: '/docs/colocation/remote-hands'
		},
		{
			label: 'Power budgets and PDUs',
			description: 'Plan power usage and understand PDU limits for your rack slot.',
			href: '/docs/colocation/power-budgets'
		}
	] as const;
</script>

<DocsMeta
	title="Colocation Docs"
	description="Documentation for shipping, managing, and operating colocated hardware with Fyra Stack."
/>

<section>
	<p class="text-sm font-medium tracking-widest text-fyra-red-400 uppercase">Colocation</p>
	<h1>Colocation docs.</h1>
	<p>
		Guides for shipping hardware, using IPMI, requesting remote hands, and managing power for your
		colocated server.
	</p>

	<div
		class="not-prose mt-8 grid gap-px overflow-hidden border border-fyra-gray-800 bg-fyra-gray-800 sm:grid-cols-2"
	>
		{#each articles as article (article.href)}
			<a
				href={resolve(article.href)}
				class="group bg-fyra-gray-900 p-5 transition-colors duration-100 hover:bg-fyra-gray-800"
			>
				<h2 class="text-base font-semibold text-fyra-gray-50 group-hover:text-fyra-red-300">
					{article.label}
				</h2>
				<p class="mt-2 text-sm leading-relaxed text-fyra-gray-300">{article.description}</p>
			</a>
		{/each}
	</div>
</section>
