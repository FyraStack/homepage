<script lang="ts">
	import ColocationPlans from '$lib/components/ColocationPlans.svelte';
	import Prereserve from '$lib/components/Prereserve.svelte';

	let selectedPlan = $state('STACK-1U');
</script>

<svelte:head>
	<title>Colocation — Fyra Stack</title>
</svelte:head>

<!-- Page header -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h1 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Colocation.</h1>
		<p class="mt-2 text-sm text-fyra-gray-400">Your hardware, our facility. Carrier-neutral space in the Midwest with real uptime and no games.</p>
	</div>

	<div class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
		<div class="px-6 py-8 md:px-10">
			<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Space</p>
			<p class="mt-3 text-base text-fyra-gray-300 leading-relaxed">Rack space from 1U to a full 42U cabinet. Climate-controlled, physically secured, and monitored around the clock.</p>
		</div>
		<div class="px-6 py-8 md:px-10">
			<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Power</p>
			<p class="mt-3 text-base text-fyra-gray-300 leading-relaxed">Redundant A+B power feeds with UPS and generator backup. Your gear stays on even when the grid doesn't cooperate.</p>
		</div>
		<div class="px-6 py-8 md:px-10">
			<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Connectivity</p>
			<p class="mt-3 text-base text-fyra-gray-300 leading-relaxed">Carrier-neutral peering with upstream diversity. Bring your own transit or use ours — fair-use bandwidth included in every plan.</p>
		</div>
	</div>
</section>

<!-- Plans -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Plans.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">From a single unit to a full cabinet.</p>
	</div>
	<ColocationPlans bind:selectedPlanName={selectedPlan} />
</section>

<!-- Pre-reserve -->
<section>
	<Prereserve selectedPlanName={selectedPlan} serviceType="colocation" />
</section>
