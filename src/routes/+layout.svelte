<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	const { children } = $props();
</script>

<svelte:head>
	<title>Fyra Stack</title>
	<meta
		name="description"
		content="VPS hosting from $5/mo and colocation in Chicago, IL. Enterprise hardware, flat pricing, no surprise fees. An open-source cloud by Fyra Labs."
	/>

	<!-- Privacy-friendly analytics by Plausible -->
	<script async src="https://plausible.fyralabs.com/js/pa-NskcgvpEiDLVGaxFEpNHl.js"></script>
	<script>
		((window.plausible =
			window.plausible ||
			function () {
				(plausible.q = plausible.q || []).push(arguments);
			}),
			(plausible.init =
				plausible.init ||
				function (i) {
					plausible.o = i || {};
				}));
		plausible.init();
	</script>
</svelte:head>

<div class="">
	<Nav />
	<div class="mx-4 mx-auto max-w-6xl border-x border-fyra-gray-800 bg-fyra-gray-900">
		<div class="flex min-h-[100vh] flex-col">
			{@render children()}
		</div>
		<Footer />
	</div>
</div>
