<script lang="ts">
	import { team } from '$lib/data/team';

	const members = team.filter((m) => m !== null);

	function displayName(m: typeof members[number]) {
		if (!m.nickname) return m.name;
		const parts = m.name.split(' ');
		return `${parts[0]} "${m.nickname}" ${parts.slice(1).join(' ')}`;
	}

	const values = [
		{ label: 'Honest pricing',  description: 'No hidden fees, no surprise invoices. What you see is what you pay — always.' },
		{ label: 'Bare metal',      description: 'Real hardware, not oversold VMs. Your vCPUs are your vCPUs.' },
		{ label: 'Open source',     description: 'We contribute back to the projects we depend on. Terra, Ultramarine, and everything in between.' },
		{ label: 'No lock-in',      description: 'Your data and your stack leave when you do. No hostage situations.' },
		{ label: 'Small team',      description: 'Everyone here can be reached. No ticket queue, no third-party support hand-off.' },
		{ label: 'Midwest built',   description: 'Not a coastal startup optimizing for press releases. Grounded, practical, and here to stay.' },
	];
</script>

<svelte:head>
	<title>About — Fyra Stack</title>
</svelte:head>

<!-- Hero -->
<div class="relative isolate overflow-hidden border-b border-fyra-gray-800 px-6 pt-14 lg:px-8">
	<div aria-hidden="true" class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%-30rem)] sm:w-288.75"
		></div>
	</div>

	<div class="mx-auto max-w-4xl py-24 sm:py-32 text-center">
		<h1 class="text-4xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-6xl mb-8">
			Built by people who<br /><span class="text-fyra-red-400">use what they make.</span>
		</h1>
		<p class="text-base text-fyra-gray-400 sm:text-lg/7 max-w-lg mx-auto">
			Fyra Stack is the infrastructure arm of Fyra Labs — a small, independent team building in the open from the Midwest.
		</p>
	</div>

	<div aria-hidden="true" class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
		<div
			style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-fyra-red-950 to-fyra-red-700 opacity-25 sm:left-[calc(50%+36rem)] sm:w-288.75"
		></div>
	</div>
</div>

<!-- Stat strip -->
<div class="grid grid-cols-2 gap-px bg-fyra-gray-800 border-b border-fyra-gray-800 md:grid-cols-4">
	{#each [
		{ value: 'Midwest',      label: 'Data center location'    },
		{ value: '100%',         label: 'Independent, no VC'      },
		{ value: 'Open source',  label: 'Roots in Fyra Labs'      },
		{ value: '$5/mo',        label: 'VPS starting price'      },
	] as stat}
		<div class="bg-fyra-gray-900 flex flex-col gap-0.5 px-6 py-5 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">{stat.value}</span>
			<span class="text-[12px] text-fyra-gray-500">{stat.label}</span>
		</div>
	{/each}
</div>

<!-- Mission — bento style -->
<section class="border-b border-fyra-gray-800">
	<div class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0">

		<!-- Left: text -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl font-semibold leading-tight tracking-tight text-fyra-gray-50">
				Why we exist.
			</h2>
			<p class="mt-6 text-base leading-relaxed text-fyra-gray-400">
				Fyra Stack is the commercial arm of Fyra Labs — an open-source community behind Terra and Ultramarine Linux. We needed infrastructure we'd actually want to use, so we built it.
			</p>
			<p class="mt-4 text-base leading-relaxed text-fyra-gray-400">
				We run bare metal because we believe the best hosting is honest: fast hardware, flat pricing, and no ecosystem lock-in pulling you in twelve directions. That's the bar we hold ourselves to.
			</p>
			<a
				href="https://github.com/FyraLabs"
				target="_blank"
				rel="noopener noreferrer"
				class="mt-8 inline-flex text-sm font-medium text-fyra-red-400 transition-colors duration-100 hover:text-fyra-red-300"
			>
				Fyra Labs on GitHub <span aria-hidden="true" class="ml-1">→</span>
			</a>
		</div>

		<!-- Right: fact bento -->
		<div class="grid grid-cols-2 gap-px bg-fyra-gray-800">
			<div class="col-span-2 bg-fyra-gray-900 px-8 py-8">
				<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">Entry price</p>
				<p class="mt-2 text-5xl font-bold tracking-tight text-fyra-gray-50">$5<span class="text-xl font-medium text-fyra-gray-400">/mo</span></p>
				<p class="mt-1.5 text-sm text-fyra-gray-500">STACK-XXS VPS · no games, no gotchas.</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">Founded</p>
				<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">2024</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Minnesota, USA</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium uppercase tracking-widest text-fyra-gray-500">Team size</p>
				<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">{members.length} people</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Small, on purpose.</p>
			</div>
		</div>

	</div>
</section>

<!-- Values — editorial row list -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">What we believe.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">The principles we actually operate by.</p>
	</div>

	<div class="divide-y divide-fyra-gray-800">
		{#each values as value, i}
			<div class="grid grid-cols-1 gap-2 px-6 py-5 md:grid-cols-4 md:items-baseline md:gap-8 md:px-10">
				<div class="flex items-center gap-3 md:col-span-1">
					<span class="font-mono text-[11px] text-fyra-red-500">{String(i + 1).padStart(2, '0')}</span>
					<p class="text-sm font-semibold text-fyra-gray-50">{value.label}</p>
				</div>
				<p class="text-sm leading-relaxed text-fyra-gray-400 md:col-span-3">{value.description}</p>
			</div>
		{/each}
	</div>
</section>

<!-- Quote — full width -->
<section class="border-b border-fyra-gray-800">
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 lg:grid-cols-4">
		<!-- Avatar / attribution side -->
		<div class="bg-fyra-gray-900 flex flex-col justify-center gap-4 px-6 py-10 md:px-10 lg:py-12">
			<img
				src="/assets/people/kat.webp"
				alt="Katherine Cole"
				class="h-12 w-12 rounded-xs object-cover object-center brightness-90"
			/>
			<div>
				<p class="text-sm font-semibold text-fyra-gray-50">Katherine Cole</p>
				<p class="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">Founder · Infrastructure</p>
			</div>
		</div>
		<!-- Quote -->
		<div class="bg-fyra-gray-900 px-6 py-10 md:px-10 lg:col-span-3 lg:py-12">
			<div class="h-px w-8 bg-fyra-red-500 mb-6"></div>
			<blockquote class="text-xl font-medium leading-relaxed tracking-tight text-fyra-gray-100 md:text-2xl">
				"We were tired of infrastructure that charges you for the privilege of existing.
				Good hardware, fair pricing, and engineers who actually pick up the phone — that's
				what we set out to build. Nothing more complicated than that."
			</blockquote>
		</div>
	</div>
</section>

<!-- Team -->
<section class="">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">The team.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Small, on purpose. Everyone here ships and everyone here answers the support queue.</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-3">
		{#each members as member}
			<div class="flex items-start gap-4 bg-fyra-gray-900 px-6 py-7 md:px-10">
				<img
					src={member.avatar}
					alt={member.name}
					class="h-10 w-10 shrink-0 rounded-xs object-cover object-center brightness-90"
				/>
				<div class="min-w-0 flex-1 pt-0.5">
					<p class="text-sm font-semibold text-fyra-gray-50">{displayName(member)}</p>
					<p class="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">
						{member.role.replace(' / ', ' · ')}
					</p>
				</div>
			</div>
		{/each}
	</div>


</section>
