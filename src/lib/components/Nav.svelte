<script lang="ts">
	import { resolve } from '$app/paths';
	import { ChevronDown, Menu } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sheet from '$lib/components/ui/sheet';

	type InternalHref = '/' | '/about' | '/services/vps' | '/services/colocation' | '/docs'; // can we just use sveltekit resolve here

	let isMobileMenuOpen = $state(false);

	const servicesItems = [
		{
			label: 'VPS',
			description: 'VPS hosting from $5/mo.',
			href: '/services/vps' as InternalHref
		},
		{
			label: 'Colocation',
			description: 'Colocation hosting, from $50/mo.',
			href: '/services/colocation' as InternalHref
		}
	];

	const aboutItems = [
		{
			label: 'About us',
			description: "Why we're building this.",
			href: '/about' as InternalHref
		},
		{
			label: 'Documentation',
			description: 'What to expect when using Stack.',
			href: '/docs' as InternalHref
		},
		{
			label: 'Blog',
			description: 'Updates and engineering notes!',
			href: 'https://blog.fyralabs.com/'
		}
	];

	function closeAll() {
		isMobileMenuOpen = false;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape') closeAll();
	}}
/>

<header class="sticky top-0 z-50 bg-background backdrop-blur-sm">
	<a
		href={resolve('/services/colocation')}
		class="flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-primary"
	>
		<span class="font-semibold">Colocation is here.</span>
		<!-- <span class="text-primary-foreground/80"
			>Launching April 13th, get 1U colocation at just $50/mo promo price! Ship your servers now.</span
		> -->
		<span class="text-primary-foreground/80"
			>$10/mo off all plans, 1U from $50/mo. Sign up and ship your servers whenever you're ready.
			First servers go online April 13th!</span
		>
		<span class="text-primary/80">→</span>
	</a>
	<div class="mx-auto max-w-6xl">
		<div class="flex h-12 items-center justify-between gap-4 border-x border-b border-border px-4">
			<!-- Logo -->
			<a
				href={resolve('/')}
				class="flex shrink-0 items-center gap-1.5 rounded-xs px-1 py-1 transition-colors duration-100 hover:bg-muted"
			>
				<img src="/logo.svg" alt="Fyra Stack" class="h-5 w-5" />
				<span class="text-base font-semibold tracking-tight text-foreground">Stack</span>
			</a>

			<!-- Center nav -->
			<nav class="hidden items-center md:flex" aria-label="Main">
				<!-- Services dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								variant="ghost"
								size="sm"
								class="h-auto gap-1 px-2.5 py-1.5 text-[13px] text-foreground/80 hover:bg-muted hover:text-foreground"
								{...props}
							>
								Services
								<ChevronDown
									class="mt-px h-2.5 w-2.5 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-64 border-border bg-background">
						{#each servicesItems as item (item.href)}
							<DropdownMenu.Item class="flex-col items-start gap-0.5 px-3.5 py-3 hover:bg-muted">
								<a href={resolve(item.href as InternalHref)} class="flex flex-col gap-0.5">
									<span class="text-[13px] font-medium text-foreground">{item.label}</span>
									<span class="text-[12px] text-muted-foreground/80">{item.description}</span>
								</a>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>

				<!-- Static links -->
				<!-- {#each ["Docs", "Pricing"] as label}
					<a
						href="{label === 'Docs' ? '/docs' : '/pricing'}"
						class="flex items-center rounded-xs px-2.5 py-1.5 text-[13px] text-foreground/80 hover:text-foreground hover:bg-muted transition-colors duration-100"
					>{label}</a>
				{/each} -->

				<!-- About dropdown -->
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button
								variant="ghost"
								size="sm"
								class="h-auto gap-1 px-2.5 py-1.5 text-[13px] text-foreground/80 hover:bg-muted hover:text-foreground"
								{...props}
							>
								About
								<ChevronDown
									class="mt-px h-2.5 w-2.5 shrink-0 text-muted-foreground"
									aria-hidden="true"
								/>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-56 border-border bg-background">
						{#each aboutItems as item (item.href)}
							<DropdownMenu.Item class="flex-col items-start gap-0.5 px-3.5 py-3 hover:bg-muted">
								{#if item.href.startsWith('/')}
									<a href={resolve(item.href as InternalHref)} class="flex flex-col gap-0.5">
										<span class="text-[13px] font-medium text-foreground">{item.label}</span>
										<span class="text-[12px] text-muted-foreground/80">{item.description}</span>
									</a>
								{:else}
									<a href={item.href} rel="external" class="flex flex-col gap-0.5">
										<span class="text-[13px] font-medium text-foreground">{item.label}</span>
										<span class="text-[12px] text-muted-foreground/80">{item.description}</span>
									</a>
								{/if}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</nav>

			<!-- Right side -->
			<div class="flex items-center gap-1 md:hidden">
				<!-- CTA -->

				<!-- Mobile menu toggle -->
				<Sheet.Root bind:open={isMobileMenuOpen}>
					<Sheet.Trigger>
						{#snippet child({ props })}
							<Button
								variant="ghost"
								size="icon-sm"
								class="text-foreground/80 hover:bg-muted hover:text-foreground md:hidden"
								aria-label="Open menu"
								{...props}
							>
								<Menu class="h-4 w-4" aria-hidden="true" />
							</Button>
						{/snippet}
					</Sheet.Trigger>
					<Sheet.Content
						side="top"
						class="top-[42px] border-border bg-background px-4 py-3 md:hidden"
						showCloseButton={false}
					>
						<div class="flex flex-col gap-0.5">
							<p class="px-3 pt-1 pb-0.5 text-[11px] font-medium text-muted-foreground uppercase">
								Services
							</p>
							{#each servicesItems as item (item.href)}
								<a
									href={resolve(item.href as InternalHref)}
									onclick={closeAll}
									class="rounded-xs px-3 py-2 text-sm text-foreground/80 transition-colors duration-100 hover:bg-muted hover:text-foreground"
									>{item.label}</a
								>
							{/each}
							<div class="my-1.5 border-t border-border"></div>
							<p class="px-3 pt-1 pb-0.5 text-[11px] font-medium text-muted-foreground uppercase">
								About
							</p>
							{#each aboutItems as item (item.href)}
								{#if item.href.startsWith('/')}
									<a
										href={resolve(item.href as InternalHref)}
										onclick={closeAll}
										class="rounded-xs px-3 py-2 text-sm text-foreground/80 transition-colors duration-100 hover:bg-muted hover:text-foreground"
										>{item.label}</a
									>
								{:else}
									<a
										href={item.href}
										onclick={closeAll}
										rel="external"
										class="rounded-xs px-3 py-2 text-sm text-foreground/80 transition-colors duration-100 hover:bg-muted hover:text-foreground"
										>{item.label}</a
									>
								{/if}
							{/each}
						</div>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		</div>
	</div>
</header>
