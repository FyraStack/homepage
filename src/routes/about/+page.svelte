<script lang="ts">
	import { team } from '$lib/data/team';
	const members = team.filter((m) => m !== null);

	function displayName(m: (typeof members)[number]) {
		if (!m.nickname) return m.name;
		const parts = m.name.split(' ');
		return `${parts[0]} "${m.nickname}" ${parts.slice(1).join(' ')}`;
	}
</script>

<svelte:head>
	<title>About — Fyra Stack</title>
</svelte:head>

<!-- Hero -->
<div class="relative isolate overflow-hidden border-b border-fyra-gray-800 px-6 pt-14 lg:px-8">
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
			Cloud Infrastructure,
		</h1>
		<h2
			class="mb-8 text-4xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-6xl"
		>
			<span class="text-fyra-red-400">for the rest of us.</span>
		</h2>
		<p class="mx-auto max-w-lg text-base text-fyra-gray-400 sm:text-lg/7">
			An open-source cloud from the folks who make Ultramarine Linux and Terra.
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
</div>

<!-- Stat strip -->
<div class="grid grid-cols-1 gap-px border-b border-fyra-gray-800 bg-fyra-gray-800 md:grid-cols-3">
	{#each [{ value: 'Midwest proud', label: 'Chicago, IL' }, { value: 'Independent', label: 'Backed by Fyra Labs' }, { value: 'AS402292', label: 'Since 2026' }] as stat (stat.label)}
		<div class="flex flex-col gap-0.5 bg-fyra-gray-900 px-6 py-6 md:px-10">
			<span class="text-base font-semibold tracking-tight text-fyra-gray-50">{stat.value}</span>
			<span class="text-[12px] text-fyra-gray-500">{stat.label}</span>
		</div>
	{/each}
</div>

<!-- Mission — bento style -->
<section class="border-b border-fyra-gray-800">
	<div
		class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0"
	>
		<!-- Left: text -->
		<div class="flex flex-col justify-center px-8 py-12 lg:px-10 lg:py-16">
			<h2 class="text-4xl leading-tight font-semibold tracking-tight text-fyra-gray-50">
				Why we exist.
			</h2>
			<p class="mt-6 text-base leading-relaxed text-fyra-gray-400">
				Fyra Labs builds Terra and Ultramarine Linux. We needed servers for that. We couldn't find
				hosting we'd actually recommend to someone without adding a bunch of caveats, so we started
				running our own.
			</p>
			<p class="mt-4 text-base leading-relaxed text-fyra-gray-400">
				Stack is what came out of that. Real hardware, flat pricing, no surprise fees. We charge you
				for what you use. We don't sell your data, we don't lock you in, and we don't have a
				"retention team."
			</p>
		</div>

		<!-- Right: fact bento -->
		<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 md:grid-cols-2">
			<div class="bg-fyra-gray-900 px-8 py-8 md:col-span-2">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">
					Entry price
				</p>
				<p class="mt-2 text-5xl font-bold tracking-tight text-fyra-gray-50">
					$5<span class="text-xl font-medium text-fyra-gray-400">/mo</span>
				</p>
				<p class="mt-1.5 text-sm text-fyra-gray-500">STACK-XXS · that's actually what it costs.</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">Partners</p>
				<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">DeepComputing</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Yuning Liang · CEO</p>
			</div>
			<div class="bg-fyra-gray-900 px-8 py-7">
				<p class="text-[10px] font-medium tracking-widest text-fyra-gray-500 uppercase">
					Team size
				</p>
				<p class="mt-2 text-2xl font-semibold text-fyra-gray-50">{members.length} people</p>
				<p class="mt-1 text-xs text-fyra-gray-500">Small, on purpose.</p>
			</div>
		</div>
	</div>
</section>

<!-- Team -->
<section class="">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">The team.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Small, on purpose. Everyone here ships and everyone here answers the support queue.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-2">
		{#each members as member (member.name)}
			<div class="flex items-start gap-4 bg-fyra-gray-900 px-6 py-7 md:px-10">
				<img
					src={member.avatar}
					alt={member.name}
					class="h-10 w-10 shrink-0 rounded-xs object-cover object-center brightness-90"
				/>
				<div class="min-w-0 flex-1 pt-0.5">
					<p class="text-sm font-semibold text-fyra-gray-50">{displayName(member)}</p>
					<p class="mt-0.5 text-[11px] font-medium tracking-widest text-fyra-gray-500 uppercase">
						{member.role.replace(' / ', ' · ')}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>
