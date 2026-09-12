<script lang="ts">
	import VPSPlans from '$lib/components/services/vps/VPSPlans.svelte';
	import VPSHero from '$lib/components/services/vps/VPSHero.svelte';
	import VPSComparison from '$lib/components/Comparison.svelte';
	import VPSFeatures from '$lib/components/services/vps/VPSFeatures.svelte';
</script>

<svelte:head>
	<title>VPS Hosting | Fyra Stack</title>
	<meta
		name="description"
		content="VPS hosting starting at $5/mo. Full root access, 1 Gbps port, up-to-date Linux distros you want. Real hardware in Chicago, IL."
	/>
	<link rel="canonical" href="https://fyrastack.com/services/vps" />

	<!-- Open Graph -->
	<meta property="og:title" content="VPS Hosting | Fyra Stack" />
	<meta
		property="og:description"
		content="VPS hosting starting at $5/mo. Full root access, 1 Gbps port, up-to-date Linux distros you want. Real hardware in Chicago, IL."
	/>
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com/services/vps" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="VPS Hosting | Fyra Stack" />
	<meta
		name="twitter:description"
		content="VPS hosting starting at $5/mo. Full root access, 1 Gbps port, up-to-date Linux distros you want. Real hardware in Chicago, IL."
	/>
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<!-- hero -->
<VPSHero />

<!-- Features -->
<VPSFeatures />

<!-- Comparison -->
<VPSComparison />

<!-- VPS Plans -->
<VPSPlans />
