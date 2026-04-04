<script lang="ts">
	import ColocationHero from '$lib/components/services/colocation/ColocationHero.svelte';
	import ColocationFeatures from '$lib/components/services/colocation/ColocationFeatures.svelte';
	import ColocationComparison from '$lib/components/services/colocation/ColocationComparison.svelte';
	import ColocationPlans from '$lib/components/services/colocation/ColocationPlans.svelte';
	import ColocationDocsLink from '$lib/components/services/colocation/ColocationDocsLink.svelte';
	import ColocationSignup from '$lib/components/services/colocation/ColocationSignup.svelte';
</script>

<svelte:head>
	<title>Colocation — Fyra Stack</title>

	<!-- Open Graph -->
	<meta property="og:title" content="Colocation — Fyra Stack" />
	<meta property="og:description" content="Ship your server to our Chicago data center. We rack, stack, and cable it. You SSH in and go." />
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com/services/colocation" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Colocation — Fyra Stack" />
	<meta name="twitter:description" content="Ship your server to our Chicago data center. We rack, stack, and cable it. You SSH in and go." />
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<main>
	<ColocationHero />
</main>

<ColocationFeatures />

<ColocationComparison />

<ColocationPlans />

<ColocationDocsLink />

<ColocationSignup />
