<script lang="ts">
	const values = [
		{
			label: 'Honest pricing',
			description: 'No hidden fees, no surprise invoices. What you see is what you pay.',
		},
		{
			label: 'Bare metal',
			description: 'Real hardware, not oversold VMs. Your resources are yours.',
		},
		{
			label: 'Open source',
			description: 'We contribute back to the projects we depend on. Always.',
		},
		{
			label: 'No lock-in',
			description: 'Your data and your stack leave when you do. No hostages.',
		},
		{
			label: 'Small team',
			description: 'Everyone here can be reached. No ticket queue, no runaround.',
		},
		{
			label: 'Midwest built',
			description: "Not a coastal startup. Grounded, practical, and here to stay.",
		},
	];
</script>

<!-- Values -->
<section class="border-b border-fyra-gray-800">

	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">What we believe.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">The principles we actually operate by.</p>
	</div>

	<!-- Value cards -->
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-3">
		{#each values as value}
			<div class="bg-fyra-gray-900 px-6 py-8 md:px-10">
				<p class="text-sm font-semibold text-fyra-gray-50">
					<span class="mr-1.5 text-fyra-red-500" aria-hidden="true">·</span>{value.label}.
				</p>
				<p class="mt-2 text-sm leading-relaxed text-fyra-gray-400">{value.description}</p>
			</div>
		{/each}
	</div>

</section>
