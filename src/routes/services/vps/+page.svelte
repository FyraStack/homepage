<script lang="ts">
	import VPSPlans from '$lib/components/services/vps/VPSPlans.svelte';
	import Prereserve from '$lib/components/Prereserve.svelte';
	import VPSHero from '$lib/components/services/vps/VPSHero.svelte';
	import VPSComparison from '$lib/components/Comparison.svelte'
	import VPSFeatures from '$lib/components/services/vps/VPSFeatures.svelte';


	let selectedPlan = $state('STACK-XXS');
</script>

<svelte:head>
	<title>VPS Hosting — Fyra Stack</title>
</svelte:head>

<!-- hero -->
<main>
    <VPSHero/>
</main>

<!-- Features -->
<VPSFeatures />

<!-- Comparison -->
<VPSComparison />

<!-- VPS Plans -->
<VPSPlans bind:selectedPlanName={selectedPlan} />

<!-- Prereserve -->
<Prereserve selectedPlanName={selectedPlan}  />
