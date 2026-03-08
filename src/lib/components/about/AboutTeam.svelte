<script lang="ts">
	import { team } from '$lib/data/team';

	const members = team.filter((m) => m !== null);

	function displayName(m: typeof members[number]) {
		if (!m.nickname) return m.name;
		const parts = m.name.split(' ');
		return `${parts[0]} "${m.nickname}" ${parts.slice(1).join(' ')}`;
	}
</script>

<!-- Team -->
<section class="border-b border-fyra-gray-800">

	<!-- Header -->
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">The team.</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">Small, on purpose.</p>
	</div>

	<!-- Member grid -->
	<div class="grid grid-cols-1 gap-px bg-fyra-gray-800 sm:grid-cols-2 lg:grid-cols-3">
		{#each members as member}
			<div class="flex items-center gap-4 bg-fyra-gray-900 px-6 py-6 md:px-10">
				<img
					src={member.avatar}
					alt={member.name}
					class="h-9 w-9 shrink-0 rounded-md object-cover object-center brightness-90"
				/>
				<div class="min-w-0 flex-1">
					<p class="text-sm font-medium text-fyra-gray-50">{displayName(member)}</p>
					<p class="text-[11px] font-medium uppercase tracking-widest text-fyra-gray-500">
						{member.role.replace(' / ', ' · ')}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<!-- Bottom CTA strip -->
	<div class="flex flex-col items-start justify-between gap-4 border-t border-fyra-gray-800 px-6 py-8 sm:flex-row sm:items-center md:px-10">
		<div>
			<p class="text-sm font-medium text-fyra-gray-50">We're small, on purpose.</p>
			<p class="mt-1 text-sm text-fyra-gray-400">We live with the decisions we make. That keeps us careful.</p>
		</div>
		<a
			href="https://github.com/FyraLabs"
			target="_blank"
			rel="noopener noreferrer"
			class="shrink-0 text-sm font-medium text-fyra-red-400 transition-colors duration-100 hover:text-fyra-red-300"
		>
			Find us on GitHub <span aria-hidden="true">→</span>
		</a>
	</div>

</section>
