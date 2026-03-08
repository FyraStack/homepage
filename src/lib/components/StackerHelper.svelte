<script lang="ts">
	import { fly } from 'svelte/transition';

	let open = $state(false);
	let thumbs = $state<'up' | 'down' | null>(null);
</script>

<!-- Floating button -->
<div class="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">

	{#if open}
		<div
			transition:fly={{ y: 16, duration: 200 }}
			class="w-76 rounded-sm border border-fyra-gray-800 bg-fyra-gray-900 shadow-xl shadow-fyra-gray-950/60 overflow-hidden"
		>
			<!-- Header -->
			<div class="flex items-center gap-2.5 border-b border-fyra-gray-800 bg-fyra-gray-950 px-3.5 py-2.5">
				<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fyra-red-700 text-sm font-bold text-white">
					✨
				</div>
				<div class="flex flex-col leading-tight">
					<span class="text-[13px] font-semibold text-fyra-gray-50">Stacker Helper AI ✨</span>
					<span class="text-[11px] text-fyra-red-400">● AI-Powered Assistant</span>
				</div>
				<button
					type="button"
					onclick={() => open = false}
					class="ml-auto rounded-xs p-1 text-fyra-gray-400 hover:bg-fyra-gray-800 hover:text-fyra-gray-100 transition-colors duration-100"
					aria-label="Close"
				>
					<svg class="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
						<path d="M2 2 12 12M12 2 2 12" />
					</svg>
				</button>
			</div>

			<!-- Messages -->
			<div class="px-3.5 py-4 flex flex-col gap-3">
				<div class="flex items-end gap-2">
					<div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fyra-red-700 text-[10px] text-white">
						✨
					</div>
					<div class="rounded-sm rounded-bl-none bg-fyra-gray-800 px-3 py-2 text-[13px] text-fyra-gray-100 leading-snug max-w-[210px]">
						Ayo bro we can help you out frfr on GOD!
					</div>
				</div>

				<!-- Thumbs up/down -->
				<div class="flex items-center gap-1.5 pl-8">
					<span class="text-[11px] text-fyra-gray-500 mr-0.5">Was this helpful?</span>
					<button
						type="button"
						onclick={() => thumbs = thumbs === 'up' ? null : 'up'}
						class="rounded-xs p-1 text-[13px] transition-colors duration-100 {thumbs === 'up' ? 'bg-fyra-gray-700 text-fyra-gray-50' : 'text-fyra-gray-500 hover:bg-fyra-gray-800 hover:text-fyra-gray-200'}"
						aria-label="Thumbs up"
					>👍</button>
					<button
						type="button"
						onclick={() => thumbs = thumbs === 'down' ? null : 'down'}
						class="rounded-xs p-1 text-[13px] transition-colors duration-100 {thumbs === 'down' ? 'bg-fyra-gray-700 text-fyra-gray-50' : 'text-fyra-gray-500 hover:bg-fyra-gray-800 hover:text-fyra-gray-200'}"
						aria-label="Thumbs down"
					>👎</button>
				</div>
			</div>

			<!-- Input -->
			<div class="border-t border-fyra-gray-800 px-3 py-2.5 flex items-center gap-2">
				<input
					type="text"
					placeholder="Ask something..."
					class="flex-1 bg-transparent text-[13px] text-fyra-gray-100 placeholder-fyra-gray-500 outline-none"
				/>
				<button
					type="button"
					class="flex h-6 w-6 shrink-0 items-center justify-center rounded-xs bg-fyra-red-700 text-white hover:bg-fyra-red-600 transition-colors duration-100"
					aria-label="Send"
				>
					<svg class="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M10 6H2M6.5 2 10 6l-3.5 4" />
					</svg>
				</button>
			</div>

			<!-- Disclaimer + Sponsor -->
			<div class="border-t border-fyra-gray-800 bg-fyra-gray-950 px-3.5 py-2 flex flex-col gap-0.5">
				<p class="text-[10px] text-fyra-gray-500 leading-snug">
					⚠️ AI can make mistakes. Don't trust it with anything important, bro.
				</p>
				<p class="text-[10px] text-fyra-gray-600">
					Sponsored by <span class="text-fyra-gray-400 font-medium">Lockheed Martin AI Division</span>
				</p>
			</div>
		</div>
	{/if}

	<!-- Toggle button -->
	<button
		type="button"
		onclick={() => open = !open}
		class="flex h-11 w-11 items-center justify-center rounded-full bg-fyra-red-700 text-white shadow-lg shadow-fyra-gray-950/50 hover:bg-fyra-red-600 transition-colors duration-150"
		aria-label="Open Stacker Helper AI"
	>
		{#if open}
			<svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
				<path d="M3 3 13 13M13 3 3 13" />
			</svg>
		{:else}
			<span class="text-lg leading-none">✨</span>
		{/if}
	</button>

</div>
