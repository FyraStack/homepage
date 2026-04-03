<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	const { children } = $props();
</script>

<svelte:head>
	<title>Fyra Stack</title>

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

<div class=" border-x border-fyra-gray-800 bg-fyra-gray-900">
	<a
		href="/services/colocation"
		class="flex items-center justify-center gap-2 bg-fyra-red-600 px-4 py-2.5 text-center text-sm font-medium text-fyra-gray-50 transition-colors hover:bg-fyra-red-600"
	>
		<span class="font-semibold">Colocation is here.</span>
		<span class="text-fyra-red-200">Launching April 13th, ship your servers now.</span>
		<span class="text-fyra-red-300">→</span>
	</a>
	<div class="mx-4 mx-auto max-w-6xl">
		<Nav />

		<div class="flex min-h-[100vh] flex-col">
			{@render children()}
		</div>
		<Footer />
	</div>
</div>
