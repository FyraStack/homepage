<script lang="ts">

	export let bgColor = 'bg-gray-n-700';
	export let enableBorder = true;
	export let title: string;
	export let subtitle: string;
	export let enableSubtitle = true;
</script>

{#if enableBorder === true}
	<!-- with border -->
	<div class="max-w-full {bgColor} px-4 lg:px-8 py-8 border-b border-t border-gray-n-500">
		<div class="mx-auto max-w-7xl lg:pb-4">
			<div class="py-4 lg:py-4 flex items-center max-w-7xl mx-auto justify-center lg:justify-start">
				<div class="">
					<h1 class="text-3xl lg:text-[2.1rem]/6 font-semibold tracking-tight text-center lg:text-left">
						{title}.
					</h1>

					{#if enableSubtitle === true}
						<h4 class="text-sm lg:text-base mt-1.5 lg:mt-3 pb-4 text-center lg:text-left">
							{subtitle}.
						</h4>
					{/if}
				</div>
			</div>
			<!-- content -->
			<slot />
		</div>
	</div>
{:else}
	<!-- without border -->
	<div class="max-w-full {bgColor} lg:px-8 px-4 py-8">
		<div class="mx-auto max-w-7xl lg:pb-4">
			<div class="py-4 lg:py-4 flex items-center max-w-7xl mx-auto justify-center lg:justify-start">
				<div class="">
					<h1 class="text-3xl lg:text-[2.1rem]/6 font-semibold tracking-tight text-center lg:text-left">
						{title}.
					</h1>
					{#if enableSubtitle === true}
						<h4 class="text-sm lg:text-base mt-1.5 lg:mt-3 pb-4 text-center lg:text-left">
							{subtitle}.
						</h4>
					{/if}
				</div>
			</div>
			<!-- content -->
			<slot />
		</div>
	</div>
{/if}
