<script lang="ts">
	import VPSPlans from '$lib/components/VPSPlans.svelte';
	import Prereserve from '$lib/components/Prereserve.svelte';

	let selectedPlan = $state('STACK-XXS');
</script>

<svelte:head>
	<title>VPS Hosting — Fyra Stack</title>
</svelte:head>

<!-- Page header -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h1 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">Virtual Private Servers.</h1>
		<p class="mt-2 text-sm text-fyra-gray-400">VPS hosting like no other, with a powerful dashboard with built-in Linux integration. </p>
	</div>

	<div class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
		<div class="px-6 py-8 md:px-10">
			<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Compute</p>
			<p class="mt-3 text-base text-fyra-gray-300 leading-relaxed">vCPUs powered by Intel Cascade Lake running on enterprise hardware, you won't need to worry about CPU steal here.</p>
		</div>
		<div class="px-6 py-8 md:px-10">
			<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Storage</p>
			<p class="mt-3 text-base text-fyra-gray-300 leading-relaxed">Pure NVMe across the board. No spinning rust, no tiered storage games — just fast disks on every plan.</p>
		</div>
		<div class="px-6 py-8 md:px-10">
			<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Network</p>
			<p class="mt-3 text-base text-fyra-gray-300 leading-relaxed">Uplinked to a 1Gbps port with fair-use bandwidth. Flat pricing means you know what you're paying before the invoice lands.</p>
		</div>
	</div>
</section>

<!-- Plans -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50">Plans.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Pick what fits. Upgrade anytime.</p>
	</div>
	<VPSPlans bind:selectedPlanName={selectedPlan} />
</section>

<!-- Pre-reserve -->
<section>
	<Prereserve selectedPlanName={selectedPlan} />
</section>
