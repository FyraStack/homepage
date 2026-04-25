<script lang="ts">
	import { vpsPlans } from '$lib/data/vpsPlans';
	import Prereserve from '$lib/components/Prereserve.svelte';

	let selectedPlan = $state('STACK-XXS');

	const currentVpsPlan = $derived(vpsPlans.find((p) => p.name === selectedPlan) ?? vpsPlans[0]);

	const competitors = ['DigitalOcean', 'BuyVM', 'Hetzner'];

	const comparisonRows = [
		{
			label: 'CPU',
			stack: '2 vCPU',
			values: ['1 vCPU', '1 vCPU', '2 vCPU'],
			highlight: true
		},
		{
			label: 'RAM',
			stack: '2 GB',
			values: ['2 GB', '2 GB', '2 GB'],
			highlight: true
		},
		{
			label: 'Storage',
			stack: '40 GB SSD',
			values: ['50 GB SSD', '40 GB SSD', '40 GB SSD'],
			highlight: true
		},
		{
			label: 'Bandwidth',
			stack: '1 Gbps fair-use',
			values: ['1 Gbps, 2 TB/mo', 'Unmetered', '1 Gbps, 1 TB/mo'],
			highlight: true
		},
		{
			label: 'Location',
			stack: 'Chicago, IL',
			values: ['Various', 'Various', 'Various'],
			highlight: true
		},
		{
			label: 'Price',
			stack: '$5/mo',
			values: ['$12/mo', '$7/mo', '$6/mo'],
			highlight: true
		}
	];
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

<!-- Hero -->
<main class="relative isolate overflow-hidden border-b border-fyra-gray-800 px-6 pt-14 lg:px-8">
	<div
		aria-hidden="true"
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%-30rem)] sm:w-288.75"
		></div>
	</div>

	<div class="mx-auto max-w-4xl py-24 text-center sm:py-32">
		<h1
			class="mb-2 text-4xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-6xl"
		>
			We run the servers.
		</h1>
		<h2
			class="mb-8 text-4xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-6xl"
		>
			<span class="text-fyra-red-400">You run your stack.</span>
		</h2>
		<p class="mx-auto max-w-lg text-base text-fyra-gray-400 sm:text-lg/7">
			Our mission is simple: Provide hosting you can trust, without breaking the bank, or your mind.
		</p>
	</div>

	<div
		aria-hidden="true"
		class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%+36rem)] sm:w-288.75"
		></div>
	</div>
</main>

<!-- Features -->
<section class="border-b border-fyra-gray-800">
	<div
		class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
	>
		<!-- Left: headline -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl leading-tight font-semibold tracking-tight text-fyra-gray-50">
				Stack is different.
			</h2>

			<p class="mt-6 text-base leading-relaxed text-fyra-gray-400">
				Most budget providers cut corners on hardware to hit their price points, we don't.
			</p>
			<p class="mt-3 text-base leading-relaxed text-fyra-gray-400">
				Powered by Cascade Lake series CPUs, Dell PowerEdge servers, and enterprise SSDs. We buy
				good hardware, run it efficiently, run a small focused team, don't oversell, and charge a
				fair price.
			</p>
			<p class="mt-3 text-base leading-relaxed text-fyra-gray-300">It's boring and it works.</p>
		</div>

		<!-- Right: bento grid -->
		<div class="grid grid-cols-2 gap-px bg-fyra-gray-800">
			<!-- Fast by default -- full width, with decoration -->
			<div class="relative col-span-2 overflow-hidden bg-fyra-gray-900 p-8">
				<div class="pointer-events-none absolute top-0 right-0 h-full w-2/5 select-none">
					<img src="/homepage-mockup.png" alt="" class="w-full object-top" aria-hidden="true" />
					<div
						class="absolute inset-0 bg-gradient-to-r from-fyra-gray-900 via-fyra-gray-900/60 to-transparent"
					></div>
				</div>
				<div class="relative">
					<p class="text-lg font-semibold text-fyra-gray-50">Simple control panel</p>
					<p class="mt-1.5 max-w-xs text-sm leading-relaxed text-fyra-gray-400">
						Developed with engineers in mind from the beginning.
					</p>
				</div>
			</div>

			<!-- Linux Native -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-lg leading-snug font-semibold text-fyra-gray-50">Linux native</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					Run Ultramarine, Debian, Alma, or whatever your stack needs.
				</p>
			</div>

			<!-- Independent -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-lg font-semibold text-fyra-gray-50">Fast by default</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					Powered by Cascade Lake CPUs that are fast, real fast.
				</p>
			</div>

			<!-- Real support -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-lg font-semibold text-fyra-gray-50">Real support</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					By the system engineers that actually maintain the servers.
				</p>
			</div>

			<!-- Simple pricing -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-lg font-semibold text-fyra-gray-50">Honest pricing</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					No hidden fees, no egress charges, no surprise bills.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Comparison -->
<section class="border-b border-fyra-gray-800">
	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<div class="flex items-center gap-2.5">
			<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
				Stack, well... stacks up.
			</h2>
		</div>
		<p class="mt-2 text-sm text-fyra-gray-400">Compared at our entry-level plan.</p>
	</div>

	<!-- Table -->
	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px] border-collapse">
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th class="w-36 px-6 py-4 text-left md:w-44 md:px-10"></th>
					<th class="px-5 py-4 text-left">
						<div class="flex items-center gap-1.5">
							<img src="/logo.svg" alt="" class="h-4 w-4" aria-hidden="true" />
							<span class="text-sm font-semibold text-fyra-gray-50">Stack</span>
						</div>
					</th>
					{#each competitors as name (name)}
						<th class="px-5 py-4 text-left text-sm font-medium text-fyra-gray-400">{name}</th>
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-fyra-gray-800">
				{#each comparisonRows as row (row.label)}
					<tr>
						<td class="px-6 py-4 text-sm text-fyra-gray-400 md:px-10">{row.label}</td>
						<td class="px-5 py-4 text-sm font-semibold text-fyra-red-400">{row.stack}</td>
						{#each row.values as val, i (`${row.label}-${competitors[i]}`)}
							<td class="px-5 py-4 text-sm text-fyra-gray-300">{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<!-- VPS Plans -->
<div id="plans" class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
	<div class="flex items-center gap-2.5">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			Priced fairly.
		</h2>
	</div>
	<p class="mt-2 text-sm text-fyra-gray-400">Simple, flat-rate plans with no surprise fees.</p>
</div>

<div class="grid grid-cols-7">
	<div class="col-span-7 flex flex-col justify-between border-b border-fyra-gray-800 p-5">
		<div class="flex min-w-full items-center justify-between">
			<h2 class="text-xl font-semibold tracking-wide lg:text-2xl">
				{currentVpsPlan.name}
			</h2>
			<h3 class="text-xl font-semibold tracking-tight lg:text-2xl">
				<span class="font-medium tracking-wide">$</span>{currentVpsPlan.price}<span
					class="text-sm leading-3 font-medium lg:text-base">/mo</span
				>
			</h3>
		</div>
		<div
			class="mt-8 grid grid-cols-1 gap-x-8 gap-y-1.5 text-base md:grid-cols-2 md:gap-y-3.5 lg:mt-16 lg:text-[1.05rem]"
		>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">CPU</p>
				<p class="tracking-tight">{currentVpsPlan.cpu}x vCPU</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Storage</p>
				<p class="tracking-tight">{currentVpsPlan.storage}GB SAS3 SSD</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Memory</p>
				<p class="tracking-tight">{currentVpsPlan.ram}GB</p>
			</div>
			<div class="flex justify-between">
				<p class="text-fyra-gray-400">Network</p>
				<p class="tracking-tight">
					{#if currentVpsPlan.network === '1'}1Gbps{:else}{currentVpsPlan.network}Mbps{/if} Fair-use
				</p>
			</div>
		</div>
	</div>
</div>

<div class="grid grid-cols-2 divide-x divide-y divide-fyra-gray-800 lg:grid-cols-4">
	{#each vpsPlans as plan, i (plan.name)}
		<button
			onclick={() => (selectedPlan = plan.name)}
			class="col-span-1 w-full p-4 text-left duration-200 {selectedPlan === plan.name
				? 'bg-fyra-gray-800'
				: 'bg-fyra-gray-900 hover:bg-fyra-gray-800'} {i === vpsPlans.length - 1
				? 'border-b border-fyra-gray-800'
				: ''}"
		>
			<div class="flex items-start justify-between gap-4">
				<h4 class="text-base/5 font-medium md:text-[1.1rem]/6">{plan.name}</h4>
				<h3 class="text-sm font-medium tracking-tighter lg:text-base">
					<span class="font-normal tracking-wide">$</span>{plan.price}<span class="text-sm"
						>/mo</span
					>
				</h3>
			</div>
			<div class="mt-4 text-left md:mt-6">
				<p class="text-xs text-fyra-gray-400">
					{plan.cpu} vCPU
					<span class="px-0.5 text-fyra-red-500">•</span>
					{plan.ram}GB RAM
					<span class="hidden md:inline">
						<span class="px-0.5 text-fyra-red-500">•</span>
						{plan.storage}GB SAS3 SSD
					</span>
				</p>
			</div>
		</button>
	{/each}
</div>

<Prereserve selectedPlanName={selectedPlan} />
