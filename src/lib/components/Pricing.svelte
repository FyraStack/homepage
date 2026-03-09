<script lang="ts">
	const plans = [
		{
			name: 'Virtual Private Servers',
			slug: 'vps',
			price: '5',
			description: 'Scales to $34/mo.',
			features: [
				'AMD EPYC 9004 CPUs',
				'SAS3 SSD storage',
				'1 Gbps fair-use uplink',
				'Dedicated IPv4 + /64 IPv6',
				'Full root access',
				'Out-of-band serial console',
				'Ultramarine Linux integration',
				'Cancel anytime',
			],
		},
		{
			name: 'Server Colocation',
			slug: 'colocation',
			price: '50',
			description: 'Scales to $200/mo.',
			features: [
				'Up to 6U rackspace',
				'Up to 700W power budget',
				'1 Gbps fair-use uplink',
				'Dedicated IPv4 + IPv6',
				'IPMI remote management',
				'Minnesota data center',
				'24/7 physical security',
				'Cancel anytime',
			],
		},
	];
</script>

<section class="border-b border-fyra-gray-800">

	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			Pricing that's competitive.
		</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Simple, flat-rate plans. No surprise fees.</p>
	</div>

	<!-- Plans -->
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 md:grid-cols-2">
		{#each plans as plan (plan.slug)}
				<div class="flex flex-col bg-fyra-gray-900">

					<!-- Price block -->
					<div class="flex items-end justify-between gap-4 border-b border-fyra-gray-800 px-6 py-8 md:px-10">
						<div>
							<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-400">{plan.name}</p>
							<div class="mt-3 flex items-baseline gap-1">
								<span class="text-4xl font-bold tracking-tight text-fyra-gray-50">${plan.price}</span>
								<span class="text-sm font-medium text-fyra-gray-400">/mo</span>
							</div>
							<p class="mt-1 text-sm text-fyra-gray-400">{plan.description}</p>
						</div>
						<a
							href={(`/services/${plan.slug}`)}
							class="shrink-0 text-sm font-medium text-fyra-red-400 transition-colors duration-100 hover:text-fyra-red-300"
						>
							View plans <span aria-hidden="true">→</span>
						</a>
					</div>

					<!-- Features -->
					<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2">
						{#each plan.features as feature (feature)}
							<div class="flex items-center gap-3 bg-fyra-gray-900 px-6 py-3.5 md:px-10">
								<svg
									class="h-3 w-3 shrink-0 text-fyra-red-500"
									viewBox="0 0 12 12"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
								>
									<path d="M10.5 3 5 8.5 1.5 5" />
								</svg>
								<span class="text-sm text-fyra-gray-400">{feature}</span>
							</div>
						{/each}
					</div>

				</div>
			{/each}

	</div>

</section>
