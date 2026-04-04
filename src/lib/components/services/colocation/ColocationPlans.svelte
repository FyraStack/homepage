<script lang="ts">
	import { colocationPlans } from '$lib/data/colocationPlans';

	let { selectedPlanName = $bindable('STACK-1U') }: { selectedPlanName?: string } = $props();

	let currentPlan = $derived(
		colocationPlans.find((p) => p.name === selectedPlanName) ?? colocationPlans[0]
	);
</script>

<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
	<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
		Priced fairly.
	</h2>
	<p class="mt-2 text-sm text-fyra-gray-400">Simple, flat-rate plans with no surprise fees.</p>
</div>
<div class="grid grid-cols-7">
	<div class="col-span-7 flex flex-col justify-between border-b border-fyra-gray-800 p-5">
		<!-- top -->
		<div class="flex min-w-full items-center justify-between">
			<h2 class="text-xl font-semibold tracking-wide lg:text-2xl">
				{currentPlan.name}
			</h2>
			<div class="flex items-center gap-3">
				<div class="text-right">
					<h3 class="text-xl font-semibold tracking-tight lg:text-2xl">
						{#if currentPlan.originalPrice}
							<span class="font-medium tracking-wide text-fyra-gray-500 line-through mr-1.5"
								>${currentPlan.originalPrice}</span
							>
						{/if}
						<span class="font-medium tracking-wide">$</span>{currentPlan.price}<span
							class="text-sm leading-3 font-medium lg:text-base">/mo</span
						>
					</h3>
				</div>
				{#if currentPlan.originalPrice}
					<span class="rounded-full bg-fyra-red-500/10 px-2.5 py-1 text-xs font-medium text-fyra-red-400"
						>Limited time</span
					>
				{/if}
			</div>
		</div>
		<!-- middle -->
		<div
			class="mt-8 grid grid-cols-1 gap-x-8 gap-y-1.5 text-base md:grid-cols-2 md:gap-y-3.5 lg:mt-16 lg:text-[1.05rem]"
		>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Rack Units</p>
				<p class="tracking-tight">{currentPlan.units}U</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Bandwidth</p>
				<p class="tracking-tight">{currentPlan.bandwidth} Fair-use</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Power</p>
				<p class="tracking-tight">{currentPlan.power}W</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">IP Addresses</p>
				<p class="tracking-tight">{currentPlan.ips} IPs</p>
			</div>
		</div>
	</div>
</div>

<div class="grid grid-cols-2 divide-x divide-y divide-fyra-gray-800 lg:grid-cols-3">
	{#each colocationPlans as plan, i (plan.name)}
		<button
			onclick={() => (selectedPlanName = plan.name)}
			class="col-span-1 w-full p-4 text-left duration-200 {selectedPlanName === plan.name
				? 'bg-fyra-gray-800'
				: 'bg-fyra-gray-900 hover:bg-fyra-gray-800'} {i === colocationPlans.length - 1
				? 'border-b border-fyra-gray-800'
				: ''}"
		>
			<div class="flex items-start justify-between gap-4">
				<h4 class="text-base/5 font-medium md:text-[1.1rem]/6">{plan.name}</h4>
				<div class="text-right">
					<h3 class="text-sm font-medium tracking-tighter lg:text-base">
						{#if plan.originalPrice}
							<span class="font-normal tracking-wide text-fyra-gray-500 line-through mr-1"
								>${plan.originalPrice}</span
							>
						{/if}
						<span class="font-normal tracking-wide">$</span>{plan.price}<span class="text-sm"
							>/mo</span
						>
					</h3>
				</div>
			</div>
			<div class="mt-4 text-left md:mt-6">
				<p class="text-xs text-fyra-gray-400">
					{plan.units}U
					<span class="px-0.5 text-fyra-red-500">•</span>
					{plan.power}W
					<span class="px-0.5 text-fyra-red-500">•</span>
					{plan.bandwidth}
				</p>
			</div>
		</button>
	{/each}
</div>
