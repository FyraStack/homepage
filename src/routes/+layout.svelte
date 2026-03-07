<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const { children } = $props();
</script>

<svelte:head>
	<title>Fyra Stack</title>
</svelte:head>

<div class="mx-4">
    <Nav />


       	<div class=" max-w-6xl mx-auto border-x border-fyra-gray-800  bg-fyra-gray-900 ">
    <div class="flex min-h-[100vh] flex-col ">
	{@render children()}
            </div>
    </div>
    <Footer />
</div>
