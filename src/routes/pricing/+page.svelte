<script lang="ts">
	import { vpsPlans } from '$lib/data/vpsPlans';
	import { colocationPlans } from '$lib/data/colocationPlans';

	const vpsFeatures = [
		'Intel Cascade Lake vCPUs',
		'NVMe SSD storage',
		'1 Gbps fair-use uplink',
		'Dedicated IPv4 + /64 IPv6',
		'Full root access',
		'Out-of-band serial console',
		'Ultramarine Linux integration',
		'Cancel anytime',
	];

	const coloFeatures = [
		'Up to 6U rack space',
		'Up to 700W power budget',
		'1 Gbps fair-use uplink',
		'IPv4 + IPv6 included',
		'IPMI remote management',
		'Midwest data center',
		'24/7 physical security',
		'Cancel anytime',
	];

	const vpsCompetitors = ['DigitalOcean', 'BuyVM', 'Hetzner'];
	const vpsRows: { label: string; stack: string; values: string[] }[] = [
		{ label: 'CPU',          stack: '2 vCPU',         values: ['1 vCPU',          '1 vCPU',    '2 vCPU']          },
		{ label: 'RAM',          stack: '2 GB',            values: ['2 GB',            '2 GB',      '2 GB']            },
		{ label: 'Storage',      stack: '40 GB NVMe',      values: ['50 GB NVMe',      '40 GB SSD', '40 GB NVMe']      },
		{ label: 'Bandwidth',    stack: '1 Gbps fair-use', values: ['1 Gbps, 2 TB/mo', 'Unmetered', '1 Gbps, 1 TB/mo'] },
		{ label: 'Location',     stack: 'Midwest, USA',    values: ['Various',         'Various',   'Various']         },
		{ label: 'Yuri allowed', stack: '✓',              values: ['✓',              '✓',         '✗']               },
		{ label: 'Price',        stack: '$5/mo',           values: ['$12/mo',          '$7/mo',     '$6/mo']           },
	];

	const coloCompetitors = ['Traditional DC', 'Dedicated Server'];
	const coloRows: { label: string; stack: string; values: string[] }[] = [
		{ label: 'Your hardware',      stack: '✓',                    values: ['✓',                                   '✗ (theirs)']            },
		{ label: '1U price',           stack: '$50/mo',               values: ['~$150/mo',                            '~$100–300/mo']          },
		{ label: 'Power',              stack: '200W included',        values: ['Metered, billed separately',          'Included']              },
		{ label: 'Bandwidth',          stack: '1 Gbps fair-use',      values: ['Per-MB or per-U port fee',            'Throttled after cap']   },
		{ label: 'IPv6',               stack: '/64 included',         values: ['Extra charge',                        'Rarely']                },
		{ label: 'Remote (IPMI)',       stack: 'Included',             values: ['Add-on, billed monthly',              'Included']              },
		{ label: 'Contract',           stack: 'Month-to-month',       values: ['1–3 year minimum',                    '1–12 months']           },
		{ label: 'Cross-connects',     stack: 'Ask us',               values: ['$300/mo per cable, LOA required',     'N/A']                   },
		{ label: 'Getting a quote',    stack: 'This page',            values: ['"Let\'s schedule a discovery call"',  'Submit a ticket']       },
		{ label: 'Location',           stack: 'Midwest, USA',         values: ['Varies (probably Ashburn)',           'Varies']                },
	];

	const headerStats = [
		{ value: '$5/mo',      label: 'VPS starting price'   },
		{ value: '$50/mo',     label: 'Colo starting price'  },
		{ value: '1 Gbps',     label: 'Network uplink'       },
		{ value: 'Minnesota',  label: 'Data center'          },
	];
</script>

<svelte:head>
	<title>Pricing — Fyra Stack</title>
</svelte:head>

<!-- ─── Header ──────────────────────────────────────────────────────── -->
<div class="relative overflow-hidden border-b border-fyra-gray-800">
	<div class="pointer-events-none absolute inset-0 opacity-[0.07]">
		<img src="/stack-pattern.svg" alt="" class="h-full w-full object-cover object-center" aria-hidden="true" />
	</div>
	<div class="relative px-6 pb-12 pt-14 md:px-10 md:pb-16 md:pt-20">
		<h1 class="text-5xl font-semibold leading-[1.1] tracking-tight text-fyra-gray-50 md:text-6xl">
			Simple pricing.<br />
			<span class="text-fyra-red-400">Nothing hidden.</span>
		</h1>
		<p class="mt-6 max-w-md text-base leading-relaxed text-fyra-gray-400">
			Flat-rate plans for VPS and colocation. No egress fees, no surprise bills, no ecosystem lock-in.
		</p>
	</div>
	<div class="relative grid grid-cols-2 divide-x divide-fyra-gray-800 border-t border-fyra-gray-800 md:grid-cols-4">
		{#each headerStats as stat}
			<div class="flex flex-col gap-0.5 px-6 py-4">
				<span class="text-xl font-semibold tracking-tight text-fyra-gray-50">{stat.value}</span>
				<span class="text-[12px] text-fyra-gray-500">{stat.label}</span>
			</div>
		{/each}
	</div>
</div>

<!-- ─── VPS ──────────────────────────────────────────────────────────── -->

<!-- VPS service card -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Virtual Private Servers.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Intel Cascade Lake, NVMe storage, 1 Gbps fair-use. Starting at $5/mo.</p>
	</div>

	<div class="grid grid-cols-1 divide-t divide-fyra-gray-800 lg:grid-cols-7 lg:divide-x lg:divide-y-0">
		<div class="col-span-1 lg:col-span-5 p-6 md:p-10">
			<p class="text-sm font-medium text-fyra-gray-400">Virtual Private Servers</p>
			<div class="mt-4">
				<div class="flex items-end gap-0.5">
					<span class="text-2xl font-medium text-fyra-gray-400">$</span>
					<span class="text-7xl font-bold leading-none tracking-tight text-fyra-gray-50">5</span>
					<span class="mb-2 text-lg font-medium text-fyra-gray-400">/mo</span>
				</div>
				<p class="mt-3 text-sm text-fyra-gray-500">Starting at STACK-XXS · scales to $34/mo.</p>
			</div>

			<div class="my-8 border-t border-fyra-gray-800"></div>

			<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each vpsFeatures as feature}
					<li class="flex items-center gap-3">
						<svg class="h-3.5 w-3.5 shrink-0 text-fyra-red-400" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 3.5 5.5 10 2 6.5" />
						</svg>
						<span class="text-sm text-fyra-gray-300">{feature}</span>
					</li>
				{/each}
			</ul>

			<div class="mt-8 flex flex-wrap items-center gap-3">
				<a
					href="/services/vps"
					class="inline-flex items-center gap-2 border border-fyra-red-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
				>
					Pre-reserve a VPS
					<svg class="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M2 7h10M8 3l4 4-4 4" />
					</svg>
				</a>
				<a
					href="/services/vps"
					class="inline-flex items-center gap-2 border border-fyra-gray-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
				>
					View plans
				</a>
			</div>
		</div>

		<div class="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center col-span-1 lg:col-span-2">
			<img src="/stack-pattern.svg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-[0.12]" aria-hidden="true" />
		</div>
	</div>
</section>

<!-- VPS plan grid -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">All VPS plans.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Every plan ships with the same network and storage quality — just pick your size.</p>
	</div>
	<div class="grid grid-cols-2 gap-px bg-fyra-gray-800 lg:grid-cols-4">
		{#each vpsPlans as plan}
			<div class="bg-fyra-gray-900 p-6">
				<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">{plan.name}</p>
				<div class="mt-3 flex items-end gap-0.5">
					<span class="text-base font-medium text-fyra-gray-400">$</span>
					<span class="text-3xl font-bold leading-none tracking-tight text-fyra-gray-50">{plan.price}</span>
					<span class="mb-0.5 text-sm font-medium text-fyra-gray-400">/mo</span>
				</div>
				<div class="mt-4 flex flex-col gap-1 text-xs text-fyra-gray-500">
					<p>{plan.cpu}x vCPU</p>
					<p>{plan.ram} GB RAM</p>
					<p>{plan.storage} GB NVMe</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- VPS comparison -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<div class="flex items-center gap-2.5">
			<img src="/logo.svg" alt="" class="h-6 w-6" aria-hidden="true" />
			<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Stack, well, stacks up.</h2>
		</div>
		<p class="mt-2 text-sm text-fyra-gray-400">Compared at our entry-level STACK-XXS plan.</p>
	</div>
	<div class="overflow-x-auto">
		<table class="w-full min-w-[520px] border-collapse">
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th class="w-36 px-6 py-4 text-left md:w-44 md:px-10"></th>
					<th class="px-5 py-4 text-left">
						<div class="flex items-center gap-1.5">
							<img src="/logo.svg" alt="" class="h-4 w-4" aria-hidden="true" />
							<span class="text-sm font-semibold text-fyra-gray-50">Stack</span>
						</div>
					</th>
					{#each vpsCompetitors as name}
						<th class="px-5 py-4 text-left text-sm font-medium text-fyra-gray-400">{name}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-fyra-gray-800">
				{#each vpsRows as row}
					<tr>
						<td class="px-6 py-4 text-sm text-fyra-gray-400 md:px-10">{row.label}</td>
						<td class="px-5 py-4 text-sm font-semibold text-fyra-red-400">{row.stack}</td>
						{#each row.values as val}
							<td class="px-5 py-4 text-sm text-fyra-gray-300">{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<!-- ─── Colocation ────────────────────────────────────────────────────── -->

<!-- Colo service card -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Server Colocation.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Your hardware, our facility. Carrier-neutral, power-included, no long-term contracts.</p>
	</div>

	<div class="grid grid-cols-1 divide-t divide-fyra-gray-800 lg:grid-cols-7 lg:divide-x lg:divide-y-0">
		<div class="col-span-1 lg:col-span-5 p-6 md:p-10">
			<p class="text-sm font-medium text-fyra-gray-400">Server Colocation</p>
			<div class="mt-4">
				<div class="flex items-end gap-0.5">
					<span class="text-2xl font-medium text-fyra-gray-400">$</span>
					<span class="text-7xl font-bold leading-none tracking-tight text-fyra-gray-50">50</span>
					<span class="mb-2 text-lg font-medium text-fyra-gray-400">/mo</span>
				</div>
				<p class="mt-3 text-sm text-fyra-gray-500">Starting at STACK-1U · scales to $300/mo.</p>
			</div>

			<div class="my-8 border-t border-fyra-gray-800"></div>

			<ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each coloFeatures as feature}
					<li class="flex items-center gap-3">
						<svg class="h-3.5 w-3.5 shrink-0 text-fyra-red-400" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 3.5 5.5 10 2 6.5" />
						</svg>
						<span class="text-sm text-fyra-gray-300">{feature}</span>
					</li>
				{/each}
			</ul>

			<div class="mt-8 flex flex-wrap items-center gap-3">
				<a
					href="/services/colocation"
					class="inline-flex items-center gap-2 border border-fyra-red-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
				>
					Pre-reserve colocation
					<svg class="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M2 7h10M8 3l4 4-4 4" />
					</svg>
				</a>
				<a
					href="/services/colocation"
					class="inline-flex items-center gap-2 border border-fyra-gray-700 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
				>
					View plans
				</a>
			</div>
		</div>

		<div class="relative hidden overflow-hidden lg:flex lg:items-center lg:justify-center col-span-1 lg:col-span-2">
			<img src="/stack-pattern.svg" alt="" class="absolute inset-0 h-full w-full object-cover opacity-[0.12]" aria-hidden="true" />
		</div>
	</div>
</section>

<!-- Colo plan grid -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">All colocation plans.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Every plan includes 1 Gbps fair-use bandwidth and IPMI remote access.</p>
	</div>
	<div class="grid grid-cols-2 gap-px bg-fyra-gray-800 lg:grid-cols-3">
		{#each colocationPlans as plan}
			<div class="bg-fyra-gray-900 p-6">
				<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">{plan.name}</p>
				<div class="mt-3 flex items-end gap-0.5">
					<span class="text-base font-medium text-fyra-gray-400">$</span>
					<span class="text-3xl font-bold leading-none tracking-tight text-fyra-gray-50">{plan.price}</span>
					<span class="mb-0.5 text-sm font-medium text-fyra-gray-400">/mo</span>
				</div>
				<div class="mt-4 flex flex-col gap-1 text-xs text-fyra-gray-500">
					<p>{plan.units}U rack space</p>
					<p>{plan.power}W power</p>
					<p>{plan.bandwidth} fair-use</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Colo comparison -->
<section>
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<div class="flex items-center gap-2.5">
			<img src="/logo.svg" alt="" class="h-6 w-6" aria-hidden="true" />
			<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Better than the alternatives.</h2>
		</div>
		<p class="mt-2 text-sm text-fyra-gray-400">Traditional colo was designed for Fortune 500 procurement teams. We were not.</p>
	</div>
	<div class="overflow-x-auto">
		<table class="w-full min-w-[480px] border-collapse">
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th class="w-36 px-6 py-4 text-left md:w-44 md:px-10"></th>
					<th class="px-5 py-4 text-left">
						<div class="flex items-center gap-1.5">
							<img src="/logo.svg" alt="" class="h-4 w-4" aria-hidden="true" />
							<span class="text-sm font-semibold text-fyra-gray-50">Stack</span>
						</div>
					</th>
					{#each coloCompetitors as name}
						<th class="px-5 py-4 text-left text-sm font-medium text-fyra-gray-400">{name}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-fyra-gray-800">
				{#each coloRows as row}
					<tr>
						<td class="px-6 py-4 text-sm text-fyra-gray-400 md:px-10">{row.label}</td>
						<td class="px-5 py-4 text-sm font-semibold text-fyra-red-400">{row.stack}</td>
						{#each row.values as val}
							<td class="px-5 py-4 text-sm text-fyra-gray-300">{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
