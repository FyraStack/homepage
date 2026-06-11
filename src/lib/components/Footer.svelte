<script lang="ts">
	import { resolve } from '$app/paths';

	type InternalHref = '/' | '/about' | '/services/vps' | '/services/colocation';

	const year = new Date().getFullYear();

	const columns = [
		{
			heading: 'Product',
			links: [
				{ label: 'Status', href: 'https://status.fyralabs.com/', external: true },
				{
					label: 'Docs',
					href: '/docs'
				}
			]
		},
		{
			heading: 'Resources',
			links: [
				{ label: 'Support', href: 'mailto:support@fyralabs.com' },
				{ label: 'Discord', href: 'https://fyralabs.com/discord', external: true },
				{ label: 'GitHub', href: 'https://github.com/FyraLabs/', external: true }
			]
		},
		{
			heading: 'Company',
			links: [
				{ label: 'About', href: '/about' as InternalHref },
				{ label: 'VPS', href: '/services/vps' as InternalHref },
				{ label: 'Colocation', href: '/services/colocation' as InternalHref }
			]
		},
		{
			heading: 'Social',
			links: [
				{ label: 'Twitter', href: 'https://x.com/fyrastack', external: true },
				{ label: 'Bluesky', href: 'https://bsky.app/profile/fyrastack.com', external: true },
				{ label: 'Fediverse', href: 'https://fedi.fyralabs.com/@stack', external: true }
			]
		}
	];
</script>

<footer class="bg-background">
	<div class="mx-auto max-w-6xl border-x border-t border-border">
		<div class="] mx-auto flex max-w-5xl flex-col gap-12 py-6 lg:flex-row lg:gap-8">
			<div class="px-6">
				<!-- Left: logo + meta -->
				<div class="shrink-0 lg:w-72">
					<a href={resolve('/')} class="inline-flex items-center gap-1.5">
						<img src="/logo.svg" alt="Fyra Stack" class="h-7 w-7" />
						<span class="text-xl font-semibold tracking-tight text-foreground">Stack</span>
					</a>

					<p class="mt-4 text-sm text-muted-foreground/80">Fyra Stack Limited © {year}</p>
					<p class="mt-0.5 mb-9 text-xs text-muted-foreground">
						5206 N Damen Ave, Chicago, IL 60625
					</p>

					<div class="mt-4 flex flex-col gap-2">
						<div class="flex items-center gap-2 text-sm text-muted-foreground">
							<a
								href={resolve('/terms-of-service')}
								class="transition-colors duration-100 hover:text-foreground">Terms of Service</a
							>
							<span class="text-muted-foreground/60">·</span>
							<a
								href={resolve('/privacy-statement')}
								class="transition-colors duration-100 hover:text-foreground">Privacy Statement</a
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Divider (mobile) -->
			<div class="border-t border-border lg:hidden"></div>

			<!-- Right: link columns -->
			<div class="grid grid-cols-2 gap-x-8 gap-y-10 px-6 sm:grid-cols-4 lg:flex-1">
				{#each columns as col (col.heading)}
					<div>
						<p class="text-sm font-semibold text-foreground">{col.heading}</p>
						<ul class="mt-4 flex flex-col gap-2.5">
							{#each col.links as link (link.label)}
								<li>
									{#if link.external}
										<a
											href={link.href}
											class="inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground"
											target="_blank"
											rel="external noopener noreferrer"
										>
											{link.label}
										</a>
									{:else if !link.href.startsWith('/')}
										<a
											href={link.href}
											rel="external"
											class="inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground"
										>
											{link.label}
										</a>
									{:else}
										<a
											href={resolve(link.href as InternalHref)}
											class="inline-flex items-center gap-0.5 text-sm text-muted-foreground transition-colors duration-100 hover:text-foreground"
										>
											{link.label}
										</a>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</div>
</footer>
