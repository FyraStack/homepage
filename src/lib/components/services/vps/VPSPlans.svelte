<script lang="ts">
	import { vpsPlans, computeOptimizedPlans } from '$lib/data/vpsPlans';

	type Plan = {
		name: string;
		price: string;
		cpu: string;
		ram: string;
		storage: string;
		network: string;
		yearlyPrice: string;
	};

	let { selectedPlanName = $bindable('STACK-XXS') }: { selectedPlanName?: string } = $props();
	let activeTab = $state<'general' | 'compute'>('general');

	let plans = $derived(activeTab === 'general' ? vpsPlans : computeOptimizedPlans);
	let currentPlan = $derived(plans.find((p) => p.name === selectedPlanName) ?? plans[0]);

	function handleTabChange(tab: 'general' | 'compute') {
		activeTab = tab;
		selectedPlanName = tab === 'general' ? 'STACK-XXS' : 'STACK-CO-XS';
	}
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

<!-- Tabs -->
<div class="flex border-b border-fyra-gray-800">
	<button
		onclick={() => handleTabChange('general')}
		class="flex-1 px-6 py-4 text-center text-sm font-medium transition-colors duration-200 {activeTab ===
		'general'
			? 'border-b-2 border-fyra-red-500 bg-fyra-gray-800 text-fyra-gray-50'
			: 'text-fyra-gray-400 hover:bg-fyra-gray-800 hover:text-fyra-gray-50'}"
	>
		General Purpose
	</button>
	<button
		onclick={() => handleTabChange('compute')}
		class="flex-1 px-6 py-4 text-center text-sm font-medium transition-colors duration-200 {activeTab ===
		'compute'
			? 'border-b-2 border-fyra-red-500 bg-fyra-gray-800 text-fyra-gray-50'
			: 'text-fyra-gray-400 hover:bg-fyra-gray-800 hover:text-fyra-gray-50'}"
	>
		Compute Optimized
	</button>
</div>

<div class="grid grid-cols-7">
	<div class="col-span-7 flex flex-col justify-between border-b border-fyra-gray-800 p-5">
		<!-- top -->
		<div class="flex min-w-full items-center justify-between">
			<h2 class="text-xl font-semibold tracking-wide lg:text-2xl">
				{currentPlan.name}
			</h2>
			<div class="text-right">
				<h3 class="text-xl font-semibold tracking-tight lg:text-2xl">
					<span class="font-medium tracking-wide">$</span>{currentPlan.price}<span
						class="text-sm leading-3 font-medium lg:text-base">/mo</span
					>
				</h3>
				<p class="mt-1 text-xs text-fyra-gray-400">
					<span class="font-medium tracking-wide">$</span>{currentPlan.yearlyPrice}<span
						class="text-xs">/mo</span
					>
					billed yearly
					<span class="text-fyra-green-400 ml-1">(Save 2 months)</span>
				</p>
			</div>
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
	{#each plans as plan, i (plan.name)}
		<button
			onclick={() => (selectedPlanName = plan.name)}
			class="col-span-1 w-full p-4 text-left duration-200 {selectedPlanName === plan.name
				? 'bg-fyra-gray-800'
				: 'bg-fyra-gray-900 hover:bg-fyra-gray-800'} {i === plans.length - 1
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
