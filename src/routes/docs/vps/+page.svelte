<script lang="ts">
	import { resolve } from '$app/paths';
	import DocsMeta from '$lib/components/DocsMeta.svelte';

	const articles = [
		{
			label: 'Connecting via SSH',
			description: 'Connect to your VPS for the first time with SSH.',
			href: '/docs/vps/ssh'
		},
		{
			label: 'Adding a non-root user',
			description: 'Create a safer day-to-day user account with sudo access.',
			href: '/docs/vps/user-setup'
		},
		{
			label: 'Initial server hardening',
			description: 'Lock down SSH and apply the first security basics.',
			href: '/docs/vps/hardening'
		},
		{
			label: 'VPS Networking',
			description: 'Understand addresses, ports, DNS, and common networking tasks.',
			href: '/docs/vps/networking'
		},
		{
			label: 'Choosing a Linux Distribution',
			description: 'Pick the operating system that fits your workload.',
			href: '/docs/vps/choosing-a-distro'
		}
	] as const;
</script>

<DocsMeta
	title="VPS Docs"
	description="Documentation for getting started with and managing your Fyra Stack VPS."
/>

<section>
	<p class="text-sm font-medium tracking-widest text-fyra-red-400 uppercase">VPS</p>
	<h1>VPS docs</h1>
	<p>
		Guides for connecting to your VPS, setting up users, hardening your server, and configuring
		networking.
	</p>

	<div class="not-prose mt-8 grid border-t border-l border-fyra-gray-800 sm:grid-cols-2">
		{#each articles as article (article.href)}
			<a
				href={resolve(article.href)}
				class="group border-r border-b border-fyra-gray-800 bg-fyra-gray-900 p-5 transition-colors duration-100 hover:bg-fyra-gray-800"
			>
				<h2 class="text-base font-semibold text-fyra-gray-50 group-hover:text-fyra-red-300">
					{article.label}
				</h2>
				<p class="mt-2 text-sm leading-relaxed text-fyra-gray-300">{article.description}</p>
			</a>
		{/each}
	</div>
</section>
