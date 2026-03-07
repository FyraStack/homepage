<script module lang="ts">
	export { vpsPlans } from '$lib/data/vpsPlans';
</script>

<script lang="ts">
	import { vpsPlans } from '$lib/data/vpsPlans';

	let { selectedPlanName = $bindable('STACK-XXS') }: { selectedPlanName?: string } = $props();

	let currentPlan = $derived(vpsPlans.find(p => p.name === selectedPlanName) ?? vpsPlans[0]);
</script>

<div class="grid grid-cols-7">
	<div class="col-span-7 p-5 flex justify-between flex-col border-b border-fyra-gray-800">
		<!-- top -->
		<div class="flex justify-between min-w-full items-center">
			<h2 class="text-xl lg:text-2xl font-semibold tracking-wide">
				{currentPlan.name}
			</h2>
			<h3 class="text-xl tracking-tight font-semibold lg:text-2xl">
				<span class="font-medium tracking-wide">$</span>{currentPlan.price}<span
					class="text-sm font-medium lg:text-base leading-3">/mo</span>
			</h3>
		</div>
		<!-- middle -->
		<div class="grid grid-cols-1 md:grid-cols-2 text-base gap-x-8 gap-y-1.5 md:gap-y-3.5 mt-8 lg:mt-16 lg:text-[1.05rem]">
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">CPU</p>
				<p class="tracking-tight">{currentPlan.cpu}x vCPU</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Storage</p>
				<p class="tracking-tight">{currentPlan.storage}GB NVMe</p>
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

<div class="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-fyra-gray-800">
	{#each vpsPlans as plan, i}
		<button
			onclick={() => selectedPlanName = plan.name}
			class="col-span-1 w-full p-4 duration-200 text-left {selectedPlanName === plan.name ? 'bg-fyra-gray-800' : 'bg-fyra-gray-900 hover:bg-fyra-gray-800'} {i === vpsPlans.length - 1 ? 'border-b border-fyra-gray-800' : ''}"
		>
			<div class="flex justify-between items-start gap-4">
				<h4 class="text-base/5 md:text-[1.1rem]/6 font-medium">{plan.name}</h4>
				<h3 class="text-sm lg:text-base font-medium tracking-tighter">
					<span class="font-normal tracking-wide">$</span>{plan.price}<span class="text-sm">/mo</span>
				</h3>
			</div>
			<div class="text-left mt-4 md:mt-6">
				<p class="text-xs text-fyra-gray-400">
					{plan.cpu} vCPU
					<span class="text-fyra-red-500 px-0.5">•</span>
					{plan.ram}GB RAM
					<span class="hidden md:inline">
						<span class="text-fyra-red-500 px-0.5">•</span>
						{plan.storage}GB NVMe
					</span>
				</p>
			</div>
		</button>
	{/each}
</div>
