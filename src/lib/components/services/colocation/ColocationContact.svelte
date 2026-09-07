<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRight } from '@steeze-ui/carbon-icons';
</script>

<section id="contact">
	<div class="border-b border-fyra-gray-800 px-6 py-8 md:px-10">
		<h2 class="text-3xl font-semibold tracking-tight text-fyra-gray-50 md:text-4xl">
			Get started with colocation
		</h2>
		<p class="mt-2 text-sm text-fyra-gray-400">
			Tell us what you're racking and we'll get you set up.
		</p>
	</div>

	<div class="px-6 py-8 md:px-10">
		<p class="max-w-lg text-sm text-fyra-gray-400">
			Send us your plan, hardware details, and power needs. We'll confirm availability, share
			shipping instructions, and send an invoice once your server is racked.
		</p>
		<a
			href="mailto:contact@fyrastack.com?subject=Colocation%20inquiry"
			class="mt-6 inline-flex items-center gap-2 border border-fyra-red-500 bg-fyra-gray-800 px-5 py-2.5 text-sm font-medium text-fyra-gray-50 transition-colors duration-200 hover:border-fyra-red-500"
		>
			Contact us
			<Icon src={ArrowRight} class="h-3.5 w-3.5" aria-hidden="true" />
		</a>
	</div>
</section>
