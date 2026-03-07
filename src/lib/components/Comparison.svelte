<script lang="ts">
	const competitors = ['DigitalOcean', 'BuyVM', 'Hetzner'];

	const rows: {
		label: string;
		stack: string;
		values: string[];
		highlight?: boolean;
		checkmarks?: boolean[];
	}[] = [
		{
			label: 'CPU',
			stack: '2 vCPU',
			values: ['1 vCPU', '1 vCPU', '2 vCPU'],
			highlight: true,
		},
		{
			label: 'RAM',
			stack: '2 GB',
			values: ['2 GB', '2 GB', '2 GB'],
			highlight: true,
		},
		{
			label: 'Storage',
			stack: '40 GB NVMe',
			values: ['50 GB NVMe', '40 GB SSD', '40 GB NVMe'],
			highlight: true,
		},
		{
			label: 'Bandwidth',
			stack: '1 Gbps fair-use',
			values: ['1 Gbps, 2 TB/mo', 'Unmetered', '1 Gbps, 1 TB/mo'],
			highlight: true,
		},
		{
			label: 'Location',
			stack: 'Midwest, USA',
			values: ['Various', 'Various', 'Various'],
			highlight: true,
		},
		{
			label: 'Yuri allowed',
			stack: '✓',
			values: ['✓', '✓', '✗'],
			checkmarks: [true, true, true, false],
		},
		{
			label: 'Price',
			stack: '$5/mo',
			values: ['$12/mo', '$7/mo', '$6/mo'],
			highlight: true,
		},
	];
</script>

<section class="border-b border-fyra-gray-800">
	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<div class="flex items-center gap-2.5">
			<img src="/logo.svg" alt="" class="h-7 w-7" aria-hidden="true" />
			<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
				Stack, well, stacks up.
			</h2>
		</div>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Compared at our entry-level plan. Your mileage may vary, but ours doesn't.
		</p>
	</div>

	<!-- Table — horizontally scrollable on mobile -->
	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px] border-collapse">
			<!-- Column headers -->
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th class="w-36 px-6 py-4 text-left md:w-44 md:px-10"></th>
					<!-- Stack -->
					<th class="px-5 py-4 text-left">
						<div class="flex items-center gap-1.5">
							<img src="/logo.svg" alt="" class="h-4 w-4" aria-hidden="true" />
							<span class="text-sm font-semibold text-fyra-gray-50">Stack</span>
						</div>
					</th>
					{#each competitors as name}
						<th class="px-5 py-4 text-left text-sm font-medium text-fyra-gray-400">{name}</th>
					{/each}
				</tr>
			</thead>

			<!-- Rows -->
			<tbody class="divide-y divide-fyra-gray-800">
				{#each rows as row}
					<tr>
						<!-- Label -->
						<td class="px-6 py-4 text-sm text-fyra-gray-400 md:px-10">{row.label}</td>
						<!-- Stack value -->
						<td class="px-5 py-4 text-sm font-semibold text-fyra-red-400">{row.stack}</td>
						<!-- Competitor values -->
						{#each row.values as val}
							<td class="px-5 py-4 text-sm text-fyra-gray-300">{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
