<script lang="ts">
	import ServerRack from './server-rack.svelte';
</script>

{#snippet callout(title: string, subtitle: string)}
	<div class="flex items-center">
		<span class="h-px w-10 bg-gray-600"></span>
		<div class="flex flex-col gap-1 pl-4">
			<span class="text-sm font-medium">{title}</span>
			<span class="text-xs text-muted-foreground">{subtitle}</span>
		</div>
	</div>
{/snippet}

<div class="flex w-full max-w-145 shrink-0 justify-center sm:justify-start">
	<ServerRack />
	<div class="relative hidden flex-1 sm:block">
		<div class="absolute top-0 left-0">
			{@render callout('Chicago, IL', '24/7 physical security')}
		</div>
		<div class="absolute top-[178px] left-0 flex items-center">
			<span class="h-px w-10 bg-primary"></span>
			<div
				class="flex flex-col gap-1.5 rounded-lg bg-gray-850 px-4 py-3.5 outline outline-offset-[-0.5px] outline-border"
			>
				<span class="text-[15px] font-medium">Your server</span>
				<span class="font-mono text-[11px] text-muted-foreground">COLO-2U · 300W · 1 Gbps</span>
			</div>
		</div>
		<div class="absolute top-[427px] left-0">
			{@render callout('A+B power feeds', 'Backed by UPS and generator')}
		</div>
	</div>
</div>
