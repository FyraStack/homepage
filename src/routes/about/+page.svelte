<script lang="ts">
	const team: ({ name: string; nickname: string | null; role: string; avatar: string } | null)[] = [
		{ name: 'Katherine Cole',  nickname: null,    role: 'Founder / Infrastructure', avatar: '/assets/people/kat.webp'     },
		{ name: 'Lleyton Gray',    nickname: 'Lea',   role: 'Director / Operations',    avatar: '/assets/people/lleyton.webp' },
		{ name: 'Matilde Park',    nickname: null,    role: 'Software Engineer',         avatar: '/assets/people/matilde.webp' },
		{ name: 'Pornpipat Popum', nickname: 'Cappy', role: 'Systems Engineer',          avatar: '/assets/people/cappy.webp'   },
		null,
		null,
	];
</script>

<svelte:head>
	<title>About — Fyra Stack</title>
</svelte:head>

<!-- About header -->
<section class="border-b border-fyra-gray-800">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h1 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">About Fyra Stack.</h1>
		<p class="mt-2 text-sm text-fyra-gray-400">Infrastructure that respects you, built by people who use it.</p>
	</div>

	<div class="grid grid-cols-1 divide-y divide-fyra-gray-800 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
		<div class="px-6 py-10 md:px-10">
			<p class="text-base leading-relaxed text-fyra-gray-300">
				Fyra Stack is an independent infrastructure provider based in the Midwest. We run bare metal because
				we believe the best hosting is honest: fast hardware, flat pricing, and no locked-in ecosystem pulling
				you in twelve directions.
			</p>
			<p class="mt-4 text-base leading-relaxed text-fyra-gray-300">
				We started this because we wanted infrastructure we'd actually want to use — something we could
				recommend to friends without caveat. That's the bar we hold ourselves to.
			</p>
		</div>
		<div class="px-6 py-10 md:px-10">
			<p class="text-base leading-relaxed text-fyra-gray-300">
				We're proud supporters of open source. Fyra Stack is the commercial arm of Fyra Labs, a small group
				building tools and systems around Linux, community, and the idea that software should be made by
				people who care what happens to it.
			</p>
			<p class="mt-4 text-base leading-relaxed text-fyra-gray-300">
				If that sounds like something you want to be a part of, we're building in the open — and the team
				page is short enough that you can actually read it.
			</p>
		</div>
	</div>
</section>

<!-- Founder quote -->
<section class="border-b border-fyra-gray-800">
	<div class="px-6 py-12 md:px-10 md:py-16">
		<blockquote class="relative">
			<div class="absolute -left-0 top-0 h-full w-px bg-fyra-red-500 md:-left-0"></div>
			<div class="pl-6 md:pl-8">
				<p class="max-w-2xl text-xl font-medium leading-relaxed tracking-tight text-fyra-gray-100 md:text-2xl">
					"We were tired of infrastructure that charges you for the privilege of existing.
					Good hardware, fair pricing, and engineers who actually pick up the phone — that's
					what we set out to build. Nothing more complicated than that."
				</p>
				<footer class="mt-6 flex items-center gap-3">
					<div>
						<p class="text-sm font-medium text-fyra-gray-50">Katherine Cole</p>
						<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500 mt-0.5">Founder · Infrastructure</p>
					</div>
				</footer>
			</div>
		</blockquote>
	</div>
</section>

<!-- Team -->
<section class="">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">The team.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Small, on purpose.</p>
	</div>

	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-3">
		{#each team as member}
			{#if member}
				<div class="flex items-center gap-4 bg-fyra-gray-900 px-6 py-8">
					<div class="relative h-14 w-14 shrink-0">
						<img src={member.avatar} alt={member.name} class="h-full w-full rounded-xs object-cover" />
						<div class="absolute inset-0 rounded-xs bg-fyra-gray-950/30"></div>
					</div>
					<div>
						<p class="text-base font-semibold text-fyra-gray-50">
							{member.nickname ? `${member.name.split(' ')[0]} "${member.nickname}" ${member.name.split(' ').slice(1).join(' ')}` : member.name}.
						</p>
						<p class="mt-0.5 text-sm text-fyra-gray-400">
							{member.role}.
						</p>
					</div>
				</div>
			{:else}
				<div class="hidden bg-fyra-gray-900 sm:block"></div>
			{/if}
		{/each}
	</div>
</section>
