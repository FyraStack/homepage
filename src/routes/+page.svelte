<script>
	import Hero from '$lib/components/Hero.svelte';
	import Features from '$lib/components/Features.svelte';
	import Comparison from '$lib/components/Comparison.svelte';
	import Prereserve from '$lib/components/Prereserve.svelte';
	import Pricing from '$lib/components/Pricing.svelte';
</script>

<svelte:head>
	<title>Home — Fyra Stack</title>

	<!-- Open Graph -->
	<meta property="og:title" content="Fyra Stack" />
	<meta property="og:description" content="Free, open source app hosting for everyone. Real hardware, flat pricing, no surprise fees." />
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Fyra Stack" />
	<meta name="twitter:description" content="Free, open source app hosting for everyone. Real hardware, flat pricing, no surprise fees." />
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<Hero />
<Features />
<Comparison />
<Pricing />
<Prereserve />
