<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowDown } from '@steeze-ui/carbon-icons';
</script>

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
			Ship your hardware.
		</h1>
		<h2
			class="mb-8 text-4xl font-semibold tracking-tight text-balance text-fyra-gray-50 sm:text-6xl"
		>
			<span class="text-fyra-red-400">We'll handle the rest.</span>
		</h2>
		<p class="mx-auto max-w-lg text-base text-fyra-gray-400 sm:text-lg/7">
			Colocation without the enterprise markup, mandatory contracts, or fees for asking questions.
		</p>
		<div class="mt-10 flex items-center justify-center gap-x-6">
			<a
				href="#signup"
				class="inline-flex items-center gap-2 border border-fyra-red-500 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
			>
				Get started
				<Icon src={ArrowDown} class="h-3.5 w-3.5" aria-hidden="true" />
			</a>
		</div>
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
