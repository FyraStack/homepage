<script lang="ts">
	import ColocationHero from '$lib/components/services/colocation/ColocationHero.svelte';
	import ColocationFeatures from '$lib/components/services/colocation/ColocationFeatures.svelte';
	import ColocationComparison from '$lib/components/services/colocation/ColocationComparison.svelte';
	import ColocationPlans from '$lib/components/services/colocation/ColocationPlans.svelte';
	import ColocationSignup from '$lib/components/services/colocation/ColocationSignup.svelte';
</script>

<svelte:head>
	<title>Colocation — Fyra Stack</title>
</svelte:head>

<main>
	<ColocationHero />
</main>

<ColocationFeatures />

<ColocationComparison />

<ColocationPlans />

<ColocationSignup />
