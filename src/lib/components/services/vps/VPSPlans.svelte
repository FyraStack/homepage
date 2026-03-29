<script lang="ts">
	import { vpsPlans } from '$lib/data/vpsPlans';

	let { selectedPlanName = $bindable('STACK-XXS') }: { selectedPlanName?: string } = $props();

	let currentPlan = $derived(vpsPlans.find((p) => p.name === selectedPlanName) ?? vpsPlans[0]);
</script>

<!-- Header -->
<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
	<div class="flex items-center gap-2.5">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			Priced fairly.
		</h2>
	</div>
	<p class="mt-2 text-sm text-fyra-gray-400">Simple, flat-rate plans with no surprise fees.</p>
</div>

<div class="grid grid-cols-7">
	<div class="col-span-7 flex flex-col justify-between border-b border-fyra-gray-800 p-5">
		<!-- top -->
		<div class="flex min-w-full items-center justify-between">
			<h2 class="text-xl font-semibold tracking-wide lg:text-2xl">
				{currentPlan.name}
			</h2>
			<h3 class="text-xl font-semibold tracking-tight lg:text-2xl">
				<span class="font-medium tracking-wide">$</span>{currentPlan.price}<span
					class="text-sm leading-3 font-medium lg:text-base">/mo</span
				>
			</h3>
		</div>
		<!-- middle -->
		<div
			class="mt-8 grid grid-cols-1 gap-x-8 gap-y-1.5 text-base md:grid-cols-2 md:gap-y-3.5 lg:mt-16 lg:text-[1.05rem]"
		>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">CPU</p>
				<p class="tracking-tight">{currentPlan.cpu}x vCPU</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Storage</p>
				<p class="tracking-tight">{currentPlan.storage}GB SAS3 SSD</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Memory</p>
				<p class="tracking-tight">{currentPlan.ram}GB</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Network</p>
				<p class="tracking-tight">
					{#if currentPlan.network === '1'}1Gbps{:else}{currentPlan.network}Mbps{/if} Fair-use
				</p>
			</div>
		</div>
	</div>
</div>

<div class="grid grid-cols-2 divide-x divide-y divide-fyra-gray-800 lg:grid-cols-4">
	{#each vpsPlans as plan, i (plan.name)}
		<button
			onclick={() => (selectedPlanName = plan.name)}
			class="col-span-1 w-full p-4 text-left duration-200 {selectedPlanName === plan.name
				? 'bg-fyra-gray-800'
				: 'bg-fyra-gray-900 hover:bg-fyra-gray-800'} {i === vpsPlans.length - 1
				? 'border-b border-fyra-gray-800'
				: ''}"
		>
			<div class="flex items-start justify-between gap-4">
				<h4 class="text-base/5 font-medium md:text-[1.1rem]/6">{plan.name}</h4>
				<h3 class="text-sm font-medium tracking-tighter lg:text-base">
					<span class="font-normal tracking-wide">$</span>{plan.price}<span class="text-sm"
						>/mo</span
					>
				</h3>
			</div>
			<div class="mt-4 text-left md:mt-6">
				<p class="text-xs text-fyra-gray-400">
					{plan.cpu} vCPU
					<span class="px-0.5 text-fyra-red-500">•</span>
					{plan.ram}GB RAM
					<span class="hidden md:inline">
						<span class="px-0.5 text-fyra-red-500">•</span>
						{plan.storage}GB SAS3 SSD
					</span>
				</p>
			</div>
		</button>
	{/each}
</div>
