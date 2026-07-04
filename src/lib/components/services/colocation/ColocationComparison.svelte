<script lang="ts">
	const competitors = ['Traditional Colo', 'Dedicated Servers', 'Self-hosting'];

	const rows: {
		label: string;
		stack: {
			previousPrice?: string;
			text: string;
		};
		values: string[];
	}[] = [
		{
			label: 'Entry price',
			stack: {
				previousPrice: '$60',
				text: '$50/mo'
			},
			values: ['$200+/mo', '$80+/mo', '$0+/mo*']
		},
		{
			label: 'Bandwidth',
			stack: {
				text: '1 Gbps fair-use'
			},
			values: ['Extra', 'Metered', 'Consumer ISP']
		},
		{
			label: 'Power redundancy',
			stack: {
				text: 'Included'
			},
			values: ['Depends', 'Depends', 'Depends']
		},
		{
			label: 'IPMI / remote access',
			stack: {
				text: 'Included'
			},
			values: ['Extra cost', 'Included', 'Depends']
		},
		{
			label: 'Own your hardware',
			stack: {
				text: '✓'
			},
			values: ['✓', '✗', '✓']
		},
		{
			label: 'Physical security',
			stack: {
				text: '✓'
			},
			values: ['✓', '✓', '✗']
		},
		{
			label: 'No long contract',
			stack: {
				text: '✓'
			},
			values: ['✗', '✓', '✓']
		}
	];
</script>

<section class="border-b border-fyra-gray-800">
	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			Stack, well... stacks up
		</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Compared at our entry-level plan</p>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px] border-collapse">
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th scope="col" class="w-36 px-6 py-4 text-left md:w-44 md:px-10">
						<span class="sr-only">Feature</span>
					</th>
					<th scope="col" class="px-5 py-4 text-left">
						<div class="flex items-center gap-1.5">
							<img src="/logo.svg" alt="" class="h-4 w-4" aria-hidden="true" />
							<span class="text-sm font-semibold text-fyra-gray-50">Stack</span>
						</div>
					</th>
					{#each competitors as name (name)}
						<th scope="col" class="px-5 py-4 text-left text-sm font-medium text-fyra-gray-400"
							>{name}</th
						>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-fyra-gray-800">
				{#each rows as row (row.label)}
					<tr>
						<th
							scope="row"
							class="px-6 py-4 text-left text-sm font-normal text-fyra-gray-400 md:px-10"
						>
							{row.label}
						</th>
						<td class="px-5 py-4 text-sm font-semibold text-fyra-red-400">
							{#if row.stack.previousPrice}
								<span class="mr-1.5 text-fyra-gray-400 line-through">{row.stack.previousPrice}</span
								>
							{/if}
							{row.stack.text}
						</td>
						{#each row.values as val, i (`${row.label}-${competitors[i]}`)}
							<td class="px-5 py-4 text-sm text-fyra-gray-300">{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>
