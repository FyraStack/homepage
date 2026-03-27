<script lang="ts">
	import { resolve } from '$app/paths';

	type InternalHref = '/' | '/about' | '/services/vps' | '/services/colocation';

	const year = new Date().getFullYear();

	const columns = [
		{
			heading: 'Product',
			links: [{ label: 'Status', href: 'https://status.fyralabs.com/', external: true }]
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

<footer class="bg-fyra-gray-900">
	<div class="mx-auto max-w-6xl border-x border-t border-fyra-gray-800">
		<div class="] mx-auto flex max-w-5xl flex-col gap-12 py-6 lg:flex-row lg:gap-8">
			<div class="px-6">
				<!-- Left: logo + meta -->
				<div class="shrink-0 lg:w-72">
					<a href={resolve('/')} class="inline-flex items-center gap-1.5">
						<img src="/logo.svg" alt="Fyra Stack" class="h-7 w-7" />
						<span class="text-xl font-semibold tracking-tight text-fyra-gray-50">Stack</span>
					</a>

					<p class="mt-4 mb-9 text-sm text-fyra-gray-400">Fyra Stack Limited © {year}</p>

					<div class="mt-4 flex flex-col gap-2">
						<div class="flex items-center gap-2 text-sm text-fyra-gray-400">
							<a
								href="mailto:legal@fyralabs.com"
								class="transition-colors duration-100 hover:text-fyra-gray-100">Terms of Service</a
							>
							<span class="text-fyra-gray-600">·</span>
							<a
								href="mailto:legal@fyralabs.com"
								class="transition-colors duration-100 hover:text-fyra-gray-100">Privacy Statement</a
							>
						</div>
					</div>
				</div>
			</div>

			<!-- Divider (mobile) -->
			<div class="border-t border-fyra-gray-800 lg:hidden"></div>

			<!-- Right: link columns -->
			<div class="grid grid-cols-2 gap-x-8 gap-y-10 px-6 sm:grid-cols-4 lg:flex-1">
				{#each columns as col (col.heading)}
					<div>
						<p class="text-sm font-semibold text-fyra-gray-50">{col.heading}</p>
						<ul class="mt-4 flex flex-col gap-2.5">
							{#each col.links as link (link.label)}
								<li>
									{#if link.external}
										<a
											href={link.href}
											class="inline-flex items-center gap-0.5 text-sm text-fyra-gray-400 transition-colors duration-100 hover:text-fyra-gray-100"
											target="_blank"
											rel="external noopener noreferrer"
										>
											{link.label}{#if link.external}<span
													class="text-[11px] leading-none text-fyra-gray-500">↗</span
												>{/if}
										</a>
									{:else if !link.href.startsWith('/')}
										<a
											href={link.href}
											rel="external"
											class="inline-flex items-center gap-0.5 text-sm text-fyra-gray-400 transition-colors duration-100 hover:text-fyra-gray-100"
										>
											{link.label}
										</a>
									{:else}
										<a
											href={resolve(link.href as InternalHref)}
											class="inline-flex items-center gap-0.5 text-sm text-fyra-gray-400 transition-colors duration-100 hover:text-fyra-gray-100"
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
