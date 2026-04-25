<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/stores';
	import { ArrowLeft } from '@lucide/svelte';

	const { children } = $props();

	const nav = [
		{ label: 'Shipping hardware to us', href: '/docs/colocation/shipping-hardware' },
		{ label: 'Accessing IPMI remotely', href: '/docs/colocation/ipmi' },
		{ label: 'Requesting remote hands', href: '/docs/colocation/remote-hands' },
		{ label: 'Power budgets and PDUs', href: '/docs/colocation/power-budgets' }
	];
</script>

<div class="border-b border-border px-6 py-3 lg:px-8">
	<nav class="text-foreground0 flex items-center gap-2 text-xs">
		<a href={resolve('/docs')} class="transition-colors hover:text-muted-foreground/80">Docs</a>
		<span>/</span>
		<span class="text-muted-foreground">Colocation</span>
	</nav>
</div>

<div class="flex min-h-screen divide-x divide-border">
	<!-- Sidebar -->
	<aside class="hidden w-56 shrink-0 lg:block">
		<div class="sticky top-0 px-6 py-8">
			<p class="text-foreground0 mb-3 text-[10px] font-medium tracking-widest uppercase">
				Colocation
			</p>
			<nav class="flex flex-col gap-0.5">
				{#each nav as item (item.href)}
					<a
						href={resolve(item.href)}
						class="rounded-sm px-2 py-1.5 text-sm transition-colors {$page.url.pathname ===
						item.href
							? 'bg-muted font-medium text-foreground'
							: 'text-muted-foreground hover:text-foreground/80'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<div class="mt-8 border-t border-border pt-6">
				<a
					href={resolve('/docs')}
					class="text-foreground0 flex items-center gap-1.5 text-xs transition-colors hover:text-muted-foreground/80"
				>
					<ArrowLeft class="h-3 w-3" aria-hidden="true" />
					All docs
				</a>
			</div>
		</div>
	</aside>

	<!-- Content -->
	<main class="min-w-0 flex-1 px-6 py-12 lg:px-12">
		<!-- Mobile nav -->
		<div class="mb-8 lg:hidden">
			<p class="text-foreground0 mb-2 text-[10px] font-medium tracking-widest uppercase">
				Colocation
			</p>
			<nav class="flex flex-wrap gap-2">
				{#each nav as item (item.href)}
					<a
						href={resolve(item.href)}
						class="border px-3 py-1 text-xs transition-colors {$page.url.pathname === item.href
							? 'border-primary text-foreground'
							: 'border-border text-muted-foreground hover:border-muted-foreground hover:text-foreground/80'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<div
			class="prose max-w-2xl prose-invert
			prose-headings:font-semibold prose-headings:tracking-tight
			prose-h1:mb-4 prose-h1:text-4xl prose-h1:text-foreground
			prose-h2:mt-10 prose-h2:mb-3 prose-h2:text-xl prose-h2:text-foreground
			prose-h3:mt-6 prose-h3:mb-1 prose-h3:text-sm prose-h3:font-semibold prose-h3:text-foreground/80
			prose-p:text-sm prose-p:leading-relaxed prose-p:text-muted-foreground
			prose-a:font-medium prose-a:text-primary
			prose-a:no-underline hover:prose-a:text-primary/80 prose-strong:text-foreground/80 prose-code:rounded
			prose-code:bg-muted prose-code:px-1.5
			prose-code:py-0.5
			prose-code:text-sm prose-code:font-normal prose-code:text-primary prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-card prose-pre:text-foreground/80
			prose-li:text-sm prose-li:text-muted-foreground prose-hr:my-8 prose-hr:border-border"
		>
			{@render children()}
		</div>
	</main>
</div>
