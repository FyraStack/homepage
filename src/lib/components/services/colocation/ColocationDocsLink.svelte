<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRight } from '@steeze-ui/carbon-icons';
	const DOCS_LINK = '/docs';
</script>

<section class="border-b border-fyra-gray-800">
	<div class="flex flex-col items-center justify-center px-8 py-12 text-center lg:py-16">
		<p class="text-lg text-fyra-gray-300">
			Need a hand getting started?
		</p>
		<p class="mt-2 text-sm text-fyra-gray-400">Our docs walk you through it.</p>
		<a
			href={DOCS_LINK}
			class="mt-3 inline-flex items-center gap-2 text-base text-fyra-red-400 transition-colors hover:text-fyra-red-300"
		>
			Read the documentation
			<Icon src={ArrowRight} class="h-4 w-4" aria-hidden="true" />
		</a>
	</div>
</section>
