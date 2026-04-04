<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Close, ArrowRight } from '@steeze-ui/carbon-icons';

	let open = $state(false);
	let thumbs = $state<'up' | 'down' | null>(null);
</script>

<!-- Floating button -->
<div class="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
	{#if open}
		<div
			transition:fly={{ y: 16, duration: 200 }}
			class="w-76 overflow-hidden rounded-sm border border-fyra-gray-800 bg-fyra-gray-900 shadow-xl shadow-fyra-gray-950/60"
		>
			<!-- Header -->
			<div
				class="flex items-center gap-2.5 border-b border-fyra-gray-800 bg-fyra-gray-950 px-3.5 py-2.5"
			>
				<div
					class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fyra-red-700 text-sm font-bold text-white"
				>
					✨
				</div>
				<div class="flex flex-col leading-tight">
					<span class="text-[13px] font-semibold text-fyra-gray-50">Stacker Helper AI ✨</span>
					<span class="text-[11px] text-fyra-red-400">● AI-Powered Assistant</span>
				</div>
				<button
					type="button"
					onclick={() => (open = false)}
					class="ml-auto rounded-xs p-1 text-fyra-gray-400 transition-colors duration-100 hover:bg-fyra-gray-800 hover:text-fyra-gray-100"
					aria-label="Close"
				>
					<Icon src={Close} class="h-3.5 w-3.5" aria-hidden="true" />
				</button>
			</div>

			<!-- Messages -->
			<div class="flex flex-col gap-3 px-3.5 py-4">
				<div class="flex items-end gap-2">
					<div
						class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fyra-red-700 text-[10px] text-white"
					>
						✨
					</div>
					<div
						class="max-w-[210px] rounded-sm rounded-bl-none bg-fyra-gray-800 px-3 py-2 text-[13px] leading-snug text-fyra-gray-100"
					>
						Ayo bro we can help you out frfr on GOD!
					</div>
				</div>

				<!-- Thumbs up/down -->
				<div class="flex items-center gap-1.5 pl-8">
					<span class="mr-0.5 text-[11px] text-fyra-gray-500">Was this helpful?</span>
					<button
						type="button"
						onclick={() => (thumbs = thumbs === 'up' ? null : 'up')}
						class="rounded-xs p-1 text-[13px] transition-colors duration-100 {thumbs === 'up'
							? 'bg-fyra-gray-700 text-fyra-gray-50'
							: 'text-fyra-gray-500 hover:bg-fyra-gray-800 hover:text-fyra-gray-200'}"
						aria-label="Thumbs up">👍</button
					>
					<button
						type="button"
						onclick={() => (thumbs = thumbs === 'down' ? null : 'down')}
						class="rounded-xs p-1 text-[13px] transition-colors duration-100 {thumbs === 'down'
							? 'bg-fyra-gray-700 text-fyra-gray-50'
							: 'text-fyra-gray-500 hover:bg-fyra-gray-800 hover:text-fyra-gray-200'}"
						aria-label="Thumbs down">👎</button
					>
				</div>
			</div>

			<!-- Input -->
			<div class="flex items-center gap-2 border-t border-fyra-gray-800 px-3 py-2.5">
				<input
					type="text"
					placeholder="Ask something..."
					class="flex-1 bg-transparent text-[13px] text-fyra-gray-100 placeholder-fyra-gray-500 outline-none"
				/>
				<button
					type="button"
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs bg-fyra-red-700 text-white transition-colors duration-100 hover:bg-fyra-red-600"
					aria-label="Send"
				>
					<Icon src={ArrowRight} class="h-3 w-3" aria-hidden="true" />
				</button>
			</div>

			<!-- Disclaimer + Sponsor -->
			<div class="flex flex-col gap-0.5 border-t border-fyra-gray-800 bg-fyra-gray-950 px-3.5 py-2">
				<p class="text-[10px] leading-snug text-fyra-gray-500">
					⚠️ AI can make mistakes. Don't trust it with anything important, bro.
				</p>
				<p class="text-[10px] text-fyra-gray-600">
					Sponsored by <span class="font-medium text-fyra-gray-400"
						>Lockheed Martin AI Division</span
					>
				</p>
			</div>
		</div>
	{/if}

	<!-- Toggle button -->
	<button
		type="button"
		onclick={() => (open = !open)}
		class="flex h-11 w-11 items-center justify-center rounded-full bg-fyra-red-700 text-white shadow-lg shadow-fyra-gray-950/50 transition-colors duration-150 hover:bg-fyra-red-600"
		aria-label="Open Stacker Helper AI"
	>
		{#if open}
			<Icon src={Close} class="h-4 w-4" aria-hidden="true" />
		{:else}
			<span class="text-lg leading-none">✨</span>
		{/if}
	</button>
</div>
