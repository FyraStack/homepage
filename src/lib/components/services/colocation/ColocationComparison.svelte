<script lang="ts">
	const competitors = ['Traditional Colo', 'Dedicated Servers', 'Self-hosting'];

	const rows: {
		label: string;
		stack: string;
		values: string[];
	}[] = [
		{
			label: 'Entry price',
			stack: '$50/mo',
			values: ['$200+/mo', '$80+/mo', '$0+/mo*'],
		},
		{
			label: 'Own your hardware',
			stack: '✓',
			values: ['✓', '✗', '✓'],
		},
		{
			label: 'Bandwidth',
			stack: '1 Gbps fair-use',
			values: ['Metered', 'Metered', 'Consumer ISP'],
		},
		{
			label: 'Power redundancy',
			stack: 'Included',
			values: ['Varies', 'Included', '✗'],
		},
		{
			label: 'IPMI / remote access',
			stack: 'Included',
			values: ['Extra cost', 'Included', 'Manual'],
		},
		{
			label: 'Physical security',
			stack: '✓',
			values: ['✓', '✓', '✗'],
		},
		{
			label: 'No long contract',
			stack: '✓',
			values: ['✗', 'Varies', '✓'],
		},
		{
			label: 'Yuri allowed',
			stack: '✓',
			values: ['✓', '✓', '✓'],
		},
	];
</script>

<section class="border-b border-fyra-gray-800">
	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			Stack, well... stacks up.
		</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Compared at our entry-level plan. Your mileage may vary, but ours doesn't.
		</p>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px] border-collapse">
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th class="w-36 px-6 py-4 text-left md:w-44 md:px-10"></th>
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
			<tbody class="divide-y divide-fyra-gray-800">
				{#each rows as row}
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
