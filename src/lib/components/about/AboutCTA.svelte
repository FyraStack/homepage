<script lang="ts">
	import { team } from '$lib/data/team';

	const members = team.filter((m) => m !== null);

	const gridCols: Record<number, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-2 sm:grid-cols-3',
		4: 'grid-cols-2 lg:grid-cols-4',
		5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
		6: 'grid-cols-2 sm:grid-cols-3',
	};
	const colClass = gridCols[members.length] ?? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';

	function displayName(m: typeof members[number]) {
		if (!m.nickname) return m.name;
		const parts = m.name.split(' ');
		return `${parts[0]} "${m.nickname}" ${parts.slice(1).join(' ')}`;
	}
</script>

<section class="border-b border-fyra-gray-800">

	<!-- Header -->
	<div class="flex items-end justify-between gap-6 border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<div>
			<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
				Built by engineers, not a board.
			</h2>
			<p class="mt-2 text-sm text-fyra-gray-400">Small team, on purpose. We live with the decisions we make.</p>
		</div>
		<a
			href="/about"
			class="shrink-0 text-sm font-medium text-fyra-red-400 transition-colors duration-100 hover:text-fyra-red-300"
		>
			Meet the team <span aria-hidden="true">→</span>
		</a>
	</div>

	<!-- Portraits -->
	<div class="grid gap-px bg-fyra-gray-800 {colClass}">
		{#each members as member}
			<a href="/about" class="group relative block overflow-hidden bg-fyra-gray-900">

				<!-- Photo -->
				<div class="relative aspect-[3/4] overflow-hidden">
					<img
						src={member.avatar}
						alt={member.name}
						class="h-full w-full object-cover object-top transition-[filter] duration-500 brightness-75 group-hover:brightness-90"
					/>
					<!-- Gradient for text legibility -->
					<div class="absolute inset-0 bg-gradient-to-t from-fyra-gray-950 via-fyra-gray-950/30 to-transparent"></div>
					<!-- Red accent bar -->
					<div class="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-fyra-red-500 transition-transform duration-300 group-hover:scale-x-100"></div>
					<!-- Info overlaid -->
					<div class="absolute bottom-0 left-0 right-0 p-5 pb-4">
						<p class="text-sm font-semibold leading-snug text-fyra-gray-50">
							{displayName(member)}
						</p>
						<p class="mt-1 text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">
							{member.role.replace(' / ', ' · ')}
						</p>
					</div>
				</div>

			</a>
		{/each}
	</div>

</section>
