<script lang="ts">
	const year = new Date().getFullYear();

	const columns = [
		{
			heading: "Product",
			links: [

				{ label: "Status",       href: "https://status.fyralabs.com/",  external: true },
			],
		},
		{
			heading: "Resources",
			links: [

				{ label: "Support",      href: "mailto:support@fyralabs.com"  },
				{ label: "Discord",    href: "https://fyralabs.com/discord", external: true  },
				{ label: "GitHub",       href: "https://github.com/FyraLabs/",  external: true },
			],
		},
		{
			heading: "Company",
			links: [
				{ label: "About",        href: "/about"  },
				{ label: "VPS",          href: "/services/vps"  },
				{ label: "Colocation",   href: "/services/colocation"  },
			],
		},
		{
			heading: "Social",
			links: [
				{ label: "Twitter",      href: "https://x.com/fyrastack",  external: true },
				{ label: "Bluesky",      href: "https://bsky.app/profile/fyrastack.com",  external: true },
				{ label: "Fediverse",      href: "https://fedi.fyralabs.com/@stack",  external: true },

			],
		},
	];
</script>

<footer class="bg-fyra-gray-900 ">
	<div class="mx-auto max-w-6xl border-t border-x  border-fyra-gray-800">
		<div class="flex max-w-5xl mx-auto flex-col ] py-6 gap-12 lg:flex-row lg:gap-8">

		<div class="px-6">
		<!-- Left: logo + meta -->
		<div class="shrink-0 lg:w-72">
			<a href="/" class="inline-flex items-center gap-1.5">
				<img src="/logo.svg" alt="Fyra Stack" class="h-7 w-7" />
				<span class="text-xl font-semibold text-fyra-gray-50 tracking-tight">Stack</span>
			</a>

			<p class="mt-4 text-sm text-fyra-gray-400 mb-9">Fyra Stack Limited © {year}</p>

			<div class="mt-4 flex flex-col gap-2">
				<div class="flex items-center gap-2 text-sm text-fyra-gray-400">
					<a href="mailto:legal@fyralabs.com" class="hover:text-fyra-gray-100 transition-colors duration-100">Terms of Service</a>
					<span class="text-fyra-gray-600">·</span>
					<a href="mailto:legal@fyralabs.com" class="hover:text-fyra-gray-100 transition-colors duration-100">Privacy Statement</a>
				</div>
			</div>


		</div>
		</div>

			<!-- Divider (mobile) -->
			<div class="border-t border-fyra-gray-800 lg:hidden"></div>

			<!-- Right: link columns -->
			<div class="grid px-6 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:flex-1">
				{#each columns as col}
					<div>
						<p class="text-sm font-semibold text-fyra-gray-50">{col.heading}</p>
						<ul class="mt-4 flex flex-col gap-2.5">
							{#each col.links as link}
								<li>
									<a
										href={link.href}
										class="inline-flex items-center gap-0.5 text-sm text-fyra-gray-400 hover:text-fyra-gray-100 transition-colors duration-100"
										target={link.external ? '_blank' : undefined}
										rel={link.external ? 'noopener noreferrer' : undefined}
									>
										{link.label}{#if link.external}<span class="text-fyra-gray-500 text-[11px] leading-none">↗</span>{/if}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>

		</div>
	</div>
</footer>
