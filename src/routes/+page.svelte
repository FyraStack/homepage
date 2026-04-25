<script>
	import { resolve } from '$app/paths';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Checkmark } from '@steeze-ui/carbon-icons';
	import Prereserve from '$lib/components/Prereserve.svelte';

	// Hero data inline
	// Features data inline

	// Comparison data inline
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

	// Pricing data inline
	type ServiceHref = '/services/vps' | '/services/colocation';

	const plans = [
		{
			name: 'Virtual Private Servers',
			href: '/services/vps' as ServiceHref,
			price: '5',
			description: 'Scales to $34/mo.',
			features: [
				'Cascade Lake vCPUs',
				'SAS3 SSD storage',
				'1 Gbps fair-use uplink',
				'Dedicated IPv4 + /64 IPv6',
				'Full root access',
				'Out-of-band serial console',
				'Ultramarine Linux integration',
				'Cancel anytime'
			]
		},
		{
			name: 'Server Colocation',
			href: '/services/colocation' as ServiceHref,
			price: '50',
			description: 'Scales to $280/mo.',
			features: [
				'Up to 6U rackspace',
				'Up to 700W power budget',
				'1 Gbps fair-use uplink',
				'Dedicated IPv4 + IPv6',
				'IPMI remote management',
				'Chicago data center',
				'24/7 physical security',
				'Cancel anytime'
			]
		}
	];

	let selectedPlan = $state('STACK-XXS');
</script>

<svelte:head>
	<title>Fyra Stack | Infrastructure without breaking the bank, or your mind</title>
	<meta
		name="description"
		content="VPS hosting from $5/mo and colocation in Chicago, IL. Enterprise hardware, flat pricing, no surprise fees. An open-source cloud by Fyra Labs."
	/>
	<link rel="canonical" href="https://fyrastack.com" />

	<!-- Open Graph -->
	<meta property="og:title" content="Fyra Stack" />
	<meta
		property="og:description"
		content="VPS hosting from $5/mo and colocation in Chicago, IL. Enterprise hardware, flat pricing, no surprise fees. An open-source cloud by Fyra Labs."
	/>
	<meta property="og:image" content="https://fyrastack.com/logo.png" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://fyrastack.com" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="Fyra Stack" />
	<meta
		name="twitter:description"
		content="VPS hosting from $5/mo and colocation in Chicago, IL. Enterprise hardware, flat pricing, no surprise fees. An open-source cloud by Fyra Labs."
	/>
	<meta name="twitter:image" content="https://fyrastack.com/logo.png" />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────── -->
<main class="relative isolate overflow-hidden border-b border-fyra-gray-800 px-6 pt-14 lg:px-8">
	<!-- Top blob -->
	<div
		aria-hidden="true"
		class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
	>
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%-30rem)] sm:w-288.75"
		></div>
	</div>

	<div class="mx-auto max-w-4xl py-32 sm:py-40">
		<div class="text-center">
			<h1
				class="mb-2 text-3xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-5xl"
			>
				Infrastructure without breaking the bank, <span class="text-fyra-red-400"
					>or your mind.</span
				>
			</h1>
			<p class="mt-6 text-base text-pretty text-fyra-gray-400 sm:px-16 sm:text-xl/7 lg:px-32">
				Built from the ground up to support the open-source projects we love, and the communities
				around them.
			</p>
		</div>
	</div>

	<!-- Bottom blob -->
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

<!-- ─── Features ─────────────────────────────────────────────────── -->
<section class="border-b border-fyra-gray-800">
	<div
		class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
	>
		<!-- Left: headline -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-3xl leading-tight font-semibold tracking-tight text-fyra-gray-50">
				Stack is different.
			</h2>

			<p class="mt-6 text-base leading-relaxed text-fyra-gray-400">
				Stack is provided by <a
					href="https://fyralabs.com"
					class="text-fyra-gray-200 underline hover:text-white">Fyra Labs</a
				>, an open-source community that develops Terra and Ultramarine Linux.
			</p>

			<p class="mt-3 text-base leading-relaxed text-fyra-gray-400">
				We focus on bare-metal that just works, built from the ground up to support the open source
				projects you love; all without breaking the bank, or your mind.
			</p>
		</div>

		<!-- Right: bento grid -->
		<div class="grid grid-cols-2 gap-px bg-fyra-gray-800">
			<!-- Fast by default — full width, with decoration -->
			<div class="relative col-span-2 overflow-hidden bg-fyra-gray-900 p-8">
				<div class="pointer-events-none absolute top-0 right-0 h-full w-2/5 select-none">
					<img
						src="/stack-pattern.svg"
						alt=""
						class="h-full w-full object-cover object-left opacity-20"
						aria-hidden="true"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-r from-fyra-gray-900 via-fyra-gray-900/60 to-transparent"
					></div>
				</div>
				<div class="relative">
					<p class="text-base font-semibold text-fyra-gray-50">Fast by default</p>
					<p class="mt-1.5 max-w-xs text-sm leading-relaxed text-fyra-gray-400">
						Fast storage, fast compute, fast networking, <br /> fast everything.
					</p>
				</div>
			</div>

			<!-- Linux Native -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-base leading-snug font-semibold text-fyra-gray-50">Midwest proud</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					Operating out of Chicago, Illinois since 2026.
				</p>
			</div>

			<!-- Independent -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-base font-semibold text-fyra-gray-50">Independent</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					Built on infrastructure we own, we don't resell another provider.
				</p>
			</div>

			<!-- Real support -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-base font-semibold text-fyra-gray-50">Real support</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					By the system engineers that actually maintain the servers.
				</p>
			</div>

			<!-- Simple pricing -->
			<div class="bg-fyra-gray-900 p-8">
				<p class="text-base font-semibold text-fyra-gray-50">Honest pricing</p>
				<p class="mt-1.5 text-sm leading-relaxed text-fyra-gray-400">
					No hidden fees, no egress charges, no surprise bills.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- ─── Comparison ───────────────────────────────────────────────── -->
<section class="border-b border-fyra-gray-800">
	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<div class="flex items-center gap-2.5">
			<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50 md:text-3xl">
				Stack, well... stacks up.
			</h2>
		</div>
		<p class="mt-2 text-sm text-fyra-gray-400">Compared at our entry-level plan.</p>
	</div>

	<!-- Table — horizontally scrollable on mobile -->
	<div class="overflow-x-auto">
		<table class="w-full min-w-[600px] border-collapse">
			<!-- Column headers -->
			<thead>
				<tr class="border-b border-fyra-gray-800">
					<th class="w-36 px-6 py-4 text-left md:w-44 md:px-10"></th>
					<!-- Stack -->
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

			<!-- Rows -->
			<tbody class="divide-y divide-fyra-gray-800">
				{#each comparisonRows as row (row.label)}
					<tr>
						<!-- Label -->
						<td class="px-6 py-4 text-sm text-fyra-gray-400 md:px-10">{row.label}</td>
						<!-- Stack value -->
						<td class="px-5 py-4 text-sm font-semibold text-fyra-red-400">{row.stack}</td>
						<!-- Competitor values -->
						{#each row.values as val, i (`${row.label}-${competitors[i]}`)}
							<td class="px-5 py-4 text-sm text-fyra-gray-300">{val}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</section>

<!-- ─── Pricing ──────────────────────────────────────────────────── -->
<section class="border-b border-fyra-gray-800">
	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-2xl font-semibold tracking-tight text-fyra-gray-50 md:text-3xl">
			Priced fairly.
		</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Simple, flat-rate plans. No surprise fees.</p>
	</div>

	<!-- Plans -->
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 md:grid-cols-2">
		{#each plans as plan (plan.href)}
			<div class="flex flex-col bg-fyra-gray-900">
				<!-- Price block -->
				<div
					class="flex items-end justify-between gap-4 border-b border-fyra-gray-800 px-6 py-8 md:px-10"
				>
					<div>
						<p class="text-[11px] font-medium tracking-widest text-fyra-gray-400 uppercase">
							{plan.name}
						</p>
						<div class="mt-3 flex items-baseline gap-1">
							<span class="text-3xl font-bold tracking-tight text-fyra-gray-50">${plan.price}</span>
							<span class="text-sm font-medium text-fyra-gray-400">/mo</span>
						</div>
						<p class="mt-1 text-sm text-fyra-gray-400">{plan.description}</p>
					</div>
					<a
						href={resolve(plan.href)}
						class="shrink-0 text-sm font-medium text-fyra-red-400 transition-colors duration-100 hover:text-fyra-red-300"
					>
						View plans <span aria-hidden="true">→</span>
					</a>
				</div>

				<!-- Features -->
				<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 lg:grid-cols-2">
					{#each plan.features as feature (feature)}
						<div class="flex items-center gap-3 bg-fyra-gray-900 px-6 py-3.5 md:px-10">
							<Icon src={Checkmark} class="h-3 w-3 shrink-0 text-fyra-red-500" aria-hidden="true" />
							<span class="text-sm text-fyra-gray-400">{feature}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</section>

<Prereserve selectedPlanName={selectedPlan} />
