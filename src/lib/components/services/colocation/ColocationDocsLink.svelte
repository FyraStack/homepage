<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRight } from '@steeze-ui/carbon-icons';
	import { resolve } from '$app/paths';
</script>

<section class="border-b border-fyra-gray-800">
	<div class="flex flex-col items-center justify-center px-8 py-12 text-center lg:py-16">
		<p class="text-lg text-fyra-gray-300">Need a hand getting started?</p>
		<p class="mt-2 text-sm text-fyra-gray-400">Our docs walk you through it!</p>
		<div class="mt-6 flex items-center justify-center gap-x-4">
			<a
				href={resolve('/docs')}
				class="inline-flex items-center gap-2 border border-fyra-red-500 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
			>
				Read the documentation
				<Icon src={ArrowRight} class="h-4 w-4" aria-hidden="true" />
			</a>
		</div>
	</div>
</section>
