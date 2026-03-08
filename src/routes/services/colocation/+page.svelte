<script lang="ts">
	import ColocationHero from '$lib/components/services/colocation/ColocationHero.svelte';
	import ColocationFeatures from '$lib/components/services/colocation/ColocationFeatures.svelte';
	import ColocationComparison from '$lib/components/services/colocation/ColocationComparison.svelte';
	import ColocationPlans from '$lib/components/services/colocation/ColocationPlans.svelte';
	import Prereserve from '$lib/components/Prereserve.svelte';

	let selectedPlan = $state('STACK-1U');
</script>

<svelte:head>
	<title>Colocation — Fyra Stack</title>
</svelte:head>

<main>
	<ColocationHero />
</main>

<ColocationFeatures />

<ColocationComparison />

<ColocationPlans bind:selectedPlanName={selectedPlan} />

<Prereserve selectedPlanName={selectedPlan} serviceType="colocation" />
