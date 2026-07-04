<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChevronDown, Close, Menu } from '@steeze-ui/carbon-icons';

	type InternalHref = '/' | '/about' | '/services/vps' | '/services/colocation' | '/docs'; // can we just use sveltekit resolve here

	let isMobileMenuOpen = $state(false);
	let openDropdown = $state<string | null>(null);
	let headerHeight = $state(0);
	let hasScrolled = $state(false);
	let isMobileViewport = $state(false);

	let isBannerCollapsed = $derived(isMobileViewport && hasScrolled);

	const servicesItems = [
		{
			label: 'VPS',
			description: 'VPS hosting from $5/mo',
			href: '/services/vps' as InternalHref
		},
		{
			label: 'Colocation',
			description: 'Colocation hosting, from $50/mo',
			href: '/services/colocation' as InternalHref
		}
	];

	const aboutItems = [
		{
			label: 'About us',
			description: "Why we're building this",
			href: '/about' as InternalHref
		},
		{
			label: 'Blog',
			description: 'Updates and engineering notes!',
			href: 'https://blog.fyralabs.com/'
		}
	];

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeAll() {
		openDropdown = null;
		isMobileMenuOpen = false;
	}

	function handleScroll() {
		hasScrolled = window.scrollY > 8;
	}

	onMount(() => {
		const mobileViewportQuery = window.matchMedia('(max-width: 767px)');
		const syncMobileViewport = () => {
			isMobileViewport = mobileViewportQuery.matches;
		};

		syncMobileViewport();
		handleScroll();
		mobileViewportQuery.addEventListener('change', syncMobileViewport);

		return () => {
			mobileViewportQuery.removeEventListener('change', syncMobileViewport);
		};
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') closeAll();
	}}
	onclick={(e) => {
		if (!(e.target as Element).closest('header')) openDropdown = null;
	}}
	onscroll={handleScroll}
/>

<header
	bind:clientHeight={headerHeight}
	class="sticky top-0 z-50 bg-fyra-gray-900 backdrop-blur-sm"
>
	<a
		href="https://blog.fyralabs.com/stack-vps-launch"
		aria-hidden={isBannerCollapsed}
		tabindex={isBannerCollapsed ? -1 : undefined}
		class="flex items-center justify-center gap-2 overflow-hidden bg-fyra-red-600 px-4 text-center text-sm font-medium text-fyra-gray-50 transition-[max-height,padding,opacity] duration-200 ease-out hover:bg-fyra-red-600 motion-reduce:transition-none md:max-h-none md:py-2.5 md:opacity-100 {isBannerCollapsed
			? 'max-h-0 py-0 opacity-0'
			: 'max-h-12 py-2.5 opacity-100'}"
	>
		<span class="font-semibold">Stack is here.</span>
		<span class="text-fyra-gray-50"
			>Run your stack on our servers for as low as $5 per month. Deploy in minutes.</span
		>
		<span class="text-fyra-red-300">→</span>
	</a>
	<div class="mx-auto max-w-6xl">
		<div
			class="flex h-12 items-center justify-between gap-4 border-x border-b border-fyra-gray-800 px-4"
		>
			<!-- Logo -->
			<a
				href={resolve('/')}
				class="flex shrink-0 items-center gap-1.5 rounded-xs px-1 py-1 transition-colors duration-100 hover:bg-fyra-gray-800"
			>
				<img src="/logo.svg" alt="Fyra Stack" class="h-5 w-5" />
				<span class="text-base font-semibold tracking-tight text-fyra-gray-50">Stack</span>
			</a>

			<!-- Center nav -->
			<nav class="hidden items-center md:flex" aria-label="Main">
				<!-- Services dropdown -->
				<div class="relative">
					<button
						type="button"
						onclick={() => toggleDropdown('services')}
						class="flex items-center gap-1 rounded-xs px-2.5 py-1.5 text-[13px] transition-colors duration-100
							{openDropdown === 'services'
							? 'bg-fyra-gray-800 text-fyra-gray-50'
							: 'text-fyra-gray-200 hover:bg-fyra-gray-800 hover:text-fyra-gray-100'}"
						aria-expanded={openDropdown === 'services'}
					>
						Services
						<Icon
							src={ChevronDown}
							class="mt-px h-2.5 w-2.5 shrink-0 text-fyra-gray-400 transition-transform duration-150 {openDropdown ===
							'services'
								? 'rotate-180'
								: ''}"
							aria-hidden="true"
						/>
					</button>

					{#if openDropdown === 'services'}
						<div
							transition:fade={{ duration: 100 }}
							class="absolute top-full right-0 mt-2.5 w-64 overflow-hidden rounded-xs border border-fyra-gray-800 bg-fyra-gray-900 shadow-sm shadow-fyra-gray-950/80"
						>
							{#each servicesItems as item (item.href)}
								<a
									href={resolve(item.href as InternalHref)}
									onclick={closeAll}
									class="flex flex-col gap-0.5 px-3.5 py-3 transition-colors duration-100 hover:bg-fyra-gray-800"
								>
									<span class="text-[13px] font-medium text-fyra-gray-100">{item.label}</span>
									<span class="text-[12px] text-fyra-gray-300">{item.description}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- About dropdown -->
				<div class="relative">
					<button
						type="button"
						onclick={() => toggleDropdown('about')}
						class="flex items-center gap-1 rounded-xs px-2.5 py-1.5 text-[13px] transition-colors duration-100
							{openDropdown === 'about'
							? 'bg-fyra-gray-800 text-fyra-gray-50'
							: 'text-fyra-gray-200 hover:bg-fyra-gray-800 hover:text-fyra-gray-100'}"
						aria-expanded={openDropdown === 'about'}
					>
						About
						<Icon
							src={ChevronDown}
							class="mt-px h-2.5 w-2.5 shrink-0 text-fyra-gray-400 transition-transform duration-150 {openDropdown ===
							'about'
								? 'rotate-180'
								: ''}"
							aria-hidden="true"
						/>
					</button>

					{#if openDropdown === 'about'}
						<div
							transition:fade={{ duration: 100 }}
							class="absolute top-full right-0 mt-2.5 w-56 overflow-hidden rounded-xs border border-fyra-gray-800 bg-fyra-gray-900 shadow-sm shadow-fyra-gray-950/80"
						>
							{#each aboutItems as item (item.href)}
								{#if item.href.startsWith('/')}
									<a
										href={resolve(item.href as InternalHref)}
										onclick={closeAll}
										class="flex flex-col gap-0.5 px-3.5 py-3 transition-colors duration-100 hover:bg-fyra-gray-800"
									>
										<span class="text-[13px] font-medium text-fyra-gray-100">{item.label}</span>
										<span class="text-[12px] text-fyra-gray-300">{item.description}</span>
									</a>
								{:else}
									<a
										href={item.href}
										onclick={closeAll}
										rel="external"
										class="flex flex-col gap-0.5 px-3.5 py-3 transition-colors duration-100 hover:bg-fyra-gray-800"
									>
										<span class="text-[13px] font-medium text-fyra-gray-100">{item.label}</span>
										<span class="text-[12px] text-fyra-gray-300">{item.description}</span>
									</a>
								{/if}
							{/each}
						</div>
					{/if}
				</div>

				<a
					href={resolve('/docs')}
					onclick={closeAll}
					class="flex items-center rounded-xs px-2.5 py-1.5 text-[13px] text-fyra-gray-200 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100"
				>
					Docs
				</a>
			</nav>

			<!-- Right side -->
			<div class="flex items-center gap-1">
				<!-- CTA -->
				<a
					href="https://dash.fyrastack.com"
					rel="external"
					class="hidden rounded-xs bg-fyra-red-600 px-3 py-1.5 text-[13px] font-medium text-fyra-gray-50 transition-colors duration-100 hover:bg-fyra-red-500 md:inline-flex"
				>
					Dashboard →
				</a>

				<!-- Mobile menu toggle -->
				<button
					type="button"
					onclick={() => {
						isMobileMenuOpen = !isMobileMenuOpen;
						openDropdown = null;
					}}
					class="flex items-center justify-center rounded-xs p-1.5 text-fyra-gray-200 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100 md:hidden"
					aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
					aria-expanded={isMobileMenuOpen}
				>
					{#if isMobileMenuOpen}
						<Icon src={Close} class="h-4 w-4" aria-hidden="true" />
					{:else}
						<Icon src={Menu} class="h-4 w-4" aria-hidden="true" />
					{/if}
				</button>
			</div>
		</div>
	</div>
</header>

<!-- Mobile drawer -->
{#if isMobileMenuOpen}
	<div
		transition:fade={{ duration: 120 }}
		style:top={`${headerHeight}px`}
		class="fixed inset-x-0 bottom-0 z-40 bg-fyra-gray-950/50 md:hidden"
		role="button"
		tabindex="0"
		onclick={() => {
			isMobileMenuOpen = false;
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') isMobileMenuOpen = false;
		}}
	></div>

	<div
		transition:slide={{ duration: 300, axis: 'y' }}
		style:top={`${headerHeight}px`}
		style:max-height={`calc(100vh - ${headerHeight}px)`}
		class="fixed inset-x-0 z-50 overflow-y-auto border-y border-fyra-gray-800 bg-fyra-gray-900 px-4 py-3 md:hidden"
	>
		<div class="flex flex-col gap-0.5">
			<a
				href="https://dash.fyrastack.com"
				onclick={closeAll}
				rel="external"
				class="mb-2 rounded-xs bg-fyra-red-600 px-3 py-2 text-sm font-medium text-fyra-gray-50 transition-colors duration-100 hover:bg-fyra-red-500"
			>
				Dashboard
			</a>

			<p class="px-3 pt-1 pb-0.5 text-[11px] font-medium text-fyra-gray-400 uppercase">Services</p>
			{#each servicesItems as item (item.href)}
				<a
					href={resolve(item.href as InternalHref)}
					onclick={closeAll}
					class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100"
					>{item.label}</a
				>
			{/each}

			<a
				href={resolve('/docs')}
				onclick={closeAll}
				class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100"
				>Docs</a
			>

			<div class="my-1.5 border-t border-fyra-gray-800"></div>

			<p class="px-3 pt-1 pb-0.5 text-[11px] font-medium text-fyra-gray-400 uppercase">About</p>
			{#each aboutItems as item (item.href)}
				{#if item.href.startsWith('/')}
					<a
						href={resolve(item.href as InternalHref)}
						onclick={closeAll}
						class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100"
						>{item.label}</a
					>
				{:else}
					<a
						href={item.href}
						onclick={closeAll}
						rel="external"
						class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100"
						>{item.label}</a
					>
				{/if}
			{/each}
		</div>
	</div>

	<style>
		html {
			overflow: hidden;
		}
	</style>
{/if}
