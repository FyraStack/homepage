<script lang="ts">
	const plans = [
		{
			name: 'Virtual Private Servers',
			price: '5',
			description: 'Starting at STACK-XXS · scales to $34/mo.',
			features: [
				'Intel Cascade Lake vCPUs',
				'NVMe SSD storage',
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
			price: '50',
			description: 'Starting at STACK-1U · scales to $200/mo.',
			features: [
				'Up to 4U rackspace',
				'Up to 500W power budget',
				'1 Gbps fair-use uplink',
				'Dedicated IPv4 + IPv6',
				'IPMI remote management',
				'Midwest data center',
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

	<!-- Cards -->
	<div class="grid grid-cols-1 divide-y divide-fyra-gray-800 md:grid-cols-2 md:divide-x md:divide-y-0">
		{#each plans as plan}
			<div class="flex flex-col gap-6 pb-8 p-6 md:p-8 lg:p-10">
				<!-- Service name -->
				<p class="text-sm font-medium text-fyra-gray-400">{plan.name}</p>

				<!-- Price -->
				<div>
					<div class="flex items-end gap-0.5">
						<span class="text-2xl font-medium text-fyra-gray-400">$</span>
						<span class="text-7xl font-bold leading-none tracking-tight text-fyra-gray-50">{plan.price}</span>
						<span class="mb-1.5 text-lg font-medium text-fyra-gray-400">/mo</span>
					</div>
					<p class="mt-3 text-sm text-fyra-gray-500">{plan.description}</p>
				</div>

				<!-- Divider -->
				<div class="border-t border-fyra-gray-800"></div>

				<!-- Features -->
				<ul class="flex flex-col gap-3">
					{#each plan.features as feature}
						<li class="flex items-center gap-3">
							<svg
								class="h-3.5 w-3.5 shrink-0 text-fyra-red-400"
								viewBox="0 0 14 14"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M12 3.5 5.5 10 2 6.5" />
							</svg>
							<span class="text-sm text-fyra-gray-300">{feature}</span>
						</li>
					{/each}
				</ul>

	</div>
		{/each}
	</div>
</section>
