<script lang="ts">
	import { fade, slide } from 'svelte/transition';

	let isMobileMenuOpen = $state(false);
	let openDropdown = $state<string | null>(null);

	const servicesItems = [
		{ label: "VPS",  description: "VPS hosting from $5/mo.",          href: "/services/vps" },
		{ label: "Colocation",   description: "Rack with us in the Midwest.", href: "/services/colocation" },
	];

	const aboutItems = [
		{ label: "About us", description: "Why we're building this.",      href: "/about" },
		{ label: "Blog",      description: "Updates and engineering notes!", href: "https://blog.fyralabs.com/" },
	];

	function toggleDropdown(name: string) {
		openDropdown = openDropdown === name ? null : name;
	}

	function closeAll() {
		openDropdown = null;
		isMobileMenuOpen = false;
	}
</script>

<svelte:window
	onkeydown={(e) => { if (e.key === 'Escape') closeAll(); }}
	onclick={(e) => { if (!(e.target as Element).closest('header')) openDropdown = null; }}
/>

<header class="sticky top-0 z-50 bg-fyra-gray-900 backdrop-blur-sm">
	<div class="mx-auto max-w-6xl ">
		<div class="flex h-12 items-center justify-between border-b gap-4 border-x border-fyra-gray-800 px-4">

			<!-- Logo -->
			<a href="/" class="flex shrink-0 items-center gap-1.5 rounded-xs px-1 py-1 hover:bg-fyra-gray-800 transition-colors duration-100">
				<img src="/logo.svg" alt="Fyra Stack" class="h-5 w-5" />
				<span class="text-base font-semibold text-fyra-gray-50 tracking-tight">Stack</span>
			</a>

			<!-- Center nav -->
			<nav class="hidden md:flex items-center" aria-label="Main">

				<!-- Services dropdown -->
				<div class="relative">
					<button
						type="button"
						onclick={() => toggleDropdown('services')}
						class="flex items-center gap-1 rounded-xs px-2.5 py-1.5 text-[13px] transition-colors duration-100
							{openDropdown === 'services' ? 'text-fyra-gray-50 bg-fyra-gray-800' : 'text-fyra-gray-200 hover:text-fyra-gray-100 hover:bg-fyra-gray-800'}"
						aria-expanded={openDropdown === 'services'}
					>
						Services
						<svg
							class="mt-px h-2.5 w-2.5 shrink-0 text-fyra-gray-400 transition-transform duration-150 {openDropdown === 'services' ? 'rotate-180' : ''}"
							viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
						>
							<path d="M2 3.5 5 6.5 8 3.5" />
						</svg>
					</button>

					{#if openDropdown === 'services'}
						<div
							transition:fade={{ duration: 100 }}
							class="absolute left-0 top-full mt-2.5 w-64 rounded-xs border border-fyra-gray-800 bg-fyra-gray-900 shadow-sm shadow-fyra-gray-950/80 overflow-hidden"
						>
							{#each servicesItems as item}
								<a
									href={item.href}
									onclick={closeAll}
									class="flex flex-col gap-0.5 px-3.5 py-3 hover:bg-fyra-gray-800 transition-colors duration-100"
								>
									<span class="text-[13px] font-medium text-fyra-gray-100">{item.label}</span>
									<span class="text-[12px] text-fyra-gray-300">{item.description}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Static links -->
				{#each ["Docs", "Pricing"] as label}
					<a
						href="{label === 'Docs' ? '/docs' : '/pricing'}"
						class="flex items-center rounded-xs px-2.5 py-1.5 text-[13px] text-fyra-gray-200 hover:text-fyra-gray-100 hover:bg-fyra-gray-800 transition-colors duration-100"
					>{label}</a>
				{/each}

				<!-- About dropdown -->
				<div class="relative">
					<button
						type="button"
						onclick={() => toggleDropdown('about')}
						class="flex items-center gap-1 rounded-xs px-2.5 py-1.5 text-[13px] transition-colors duration-100
							{openDropdown === 'about' ? 'text-fyra-gray-50 bg-fyra-gray-800' : 'text-fyra-gray-200 hover:text-fyra-gray-100 hover:bg-fyra-gray-800'}"
						aria-expanded={openDropdown === 'about'}
					>
						About
						<svg
							class="mt-px h-2.5 w-2.5 shrink-0 text-fyra-gray-400 transition-transform duration-150 {openDropdown === 'about' ? 'rotate-180' : ''}"
							viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
						>
							<path d="M2 3.5 5 6.5 8 3.5" />
						</svg>
					</button>

					{#if openDropdown === 'about'}
						<div
							transition:fade={{ duration: 100 }}
							class="absolute left-0 top-full mt-2.5 w-56 rounded-xs border border-fyra-gray-800 bg-fyra-gray-900 shadow-sm shadow-fyra-gray-950/80 overflow-hidden"
						>
							{#each aboutItems as item}
								<a
									href={item.href}
									onclick={closeAll}
									class="flex flex-col gap-0.5 px-3.5 py-3 hover:bg-fyra-gray-800 transition-colors duration-100"
								>
									<span class="text-[13px] font-medium text-fyra-gray-100">{item.label}</span>
									<span class="text-[12px] text-fyra-gray-300">{item.description}</span>
								</a>
							{/each}
						</div>
					{/if}
				</div>

			</nav>

			<!-- Right side -->
			<div class="flex items-center gap-1">

				<!-- CTA -->

				<!-- Mobile menu toggle -->
				<button
					type="button"
					onclick={() => { isMobileMenuOpen = !isMobileMenuOpen; openDropdown = null; }}
					class="md:hidden flex items-center justify-center rounded-xs p-1.5 text-fyra-gray-200 hover:text-fyra-gray-100 hover:bg-fyra-gray-800 transition-colors duration-100"
					aria-label="Open menu"
				>
					{#if isMobileMenuOpen}
						<svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
							<path d="M3 3 13 13M13 3 3 13" />
						</svg>
					{:else}
						<svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
							<path d="M2 4.5h12M2 8h12M2 11.5h12" />
						</svg>
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
		class="fixed inset-0 top-11 z-40 bg-fyra-gray-950/50 md:hidden"
		role="button"
		tabindex="0"
		onclick={() => { isMobileMenuOpen = false; }}
		onkeydown={(e) => { if (e.key === 'Escape') isMobileMenuOpen = false; }}
	></div>

	<div
		transition:slide={{ duration: 300, axis: 'y' }}
		class="fixed inset-x-0 top-11 z-50 border-y border-fyra-gray-800 bg-fyra-gray-900 px-4 py-3 md:hidden"
	>
		<div class="flex flex-col gap-0.5">

			<p class="px-3 pt-1 pb-0.5 text-[11px] font-medium  uppercase text-fyra-gray-400">Services</p>
			{#each servicesItems as item}
				<a href={item.href} onclick={closeAll} class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 hover:bg-fyra-gray-800 hover:text-fyra-gray-100 transition-colors duration-100">{item.label}</a>
			{/each}

			<div class="my-1.5 border-t border-fyra-gray-800"></div>

			{#each ["Docs", "Pricing"] as label}
				<a href={label === 'Pricing' ? '/pricing' : '/docs'} onclick={closeAll} class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 hover:bg-fyra-gray-800 hover:text-fyra-gray-100 transition-colors duration-100">{label}</a>
			{/each}

			<div class="my-1.5 border-t border-fyra-gray-800"></div>

			<p class="px-3 pt-1 pb-0.5 text-[11px] font-medium  uppercase text-fyra-gray-400">About</p>
			{#each aboutItems as item}
				<a href={item.href} onclick={closeAll} class="rounded-xs px-3 py-2 text-sm text-fyra-gray-200 hover:bg-fyra-gray-800 hover:text-fyra-gray-100 transition-colors duration-100">{item.label}</a>
			{/each}


		</div>
	</div>

	<style>html { overflow: hidden; }</style>
{/if}
