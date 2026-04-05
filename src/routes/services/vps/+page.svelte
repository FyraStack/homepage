<script lang="ts">
	import VPSPlans from '$lib/components/services/vps/VPSPlans.svelte';
	import Prereserve from '$lib/components/Prereserve.svelte';
	import VPSHero from '$lib/components/services/vps/VPSHero.svelte';
	import VPSComparison from '$lib/components/Comparison.svelte';
	import VPSFeatures from '$lib/components/services/vps/VPSFeatures.svelte';

	let selectedPlan = $state('STACK-XXS');
</script>

<svelte:head>
	<title>VPS Hosting | Fyra Stack</title>
	<meta
		name="description"
		content="VPS hosting starting at $5/mo. Full root access, 1 Gbps port, any Linux distro you want. Real hardware in Chicago, IL."
	/>
	<link rel="canonical" href="https://fyrastack.com/services/vps" />

	<!-- Open Graph -->
	<meta property="og:title" content="VPS Hosting | Fyra Stack" />
	<meta
		property="og:description"
		content="High-performance VPS hosting starting at $5/mo. Full root access, 1 Gbps port, any Linux distro."
	/>
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com/services/vps" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="VPS Hosting | Fyra Stack" />
	<meta
		name="twitter:description"
		content="High-performance VPS hosting starting at $5/mo. Full root access, 1 Gbps port, any Linux distro."
	/>
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<!-- hero -->
<main>
	<VPSHero />
</main>

<!-- Features -->
<VPSFeatures />

<!-- Comparison -->
<VPSComparison />

<!-- VPS Plans -->
<VPSPlans bind:selectedPlanName={selectedPlan} />

<!-- Prereserve -->
<Prereserve selectedPlanName={selectedPlan} />
