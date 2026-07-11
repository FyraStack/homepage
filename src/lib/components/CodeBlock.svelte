<script lang="ts">
	import { onMount } from 'svelte';

	let { code, html } = $props<{ code: string; html: string }>();

	let root: HTMLElement;
	let mounted = $state(false);
	let copied = $state(false);
	let failed = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	function updateFocusability() {
		const pre = root.querySelector('pre');

		if (!pre) {
			return;
		}

		if (pre.scrollWidth > pre.clientWidth) {
			pre.setAttribute('tabindex', '0');
		} else {
			pre.removeAttribute('tabindex');
		}
	}

	async function copyCode() {
		if (resetTimer) {
			clearTimeout(resetTimer);
		}

		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			failed = false;
		} catch {
			copied = false;
			failed = true;
		}

		resetTimer = setTimeout(() => {
			copied = false;
			failed = false;
		}, 1800);
	}

	onMount(() => {
		mounted = true;
		updateFocusability();
		window.addEventListener('resize', updateFocusability);

		return () => {
			if (resetTimer) {
				clearTimeout(resetTimer);
			}

			window.removeEventListener('resize', updateFocusability);
		};
	});
</script>

<figure class="docs-code-block" bind:this={root}>
	{@html html}
	{#if mounted}
		<button
			class="docs-code-copy"
			type="button"
			aria-label="Copy code"
			data-state={copied ? 'copied' : failed ? 'failed' : undefined}
			onclick={copyCode}
		>
			{copied ? 'Copied' : failed ? 'Failed' : 'Copy'}
		</button>
	{/if}
</figure>

<style>
	.docs-code-block {
		position: relative;
		margin-block: 1rem;
	}

	.docs-code-block :global(pre.shiki) {
		margin: 0;
		padding-right: 4.75rem;
	}

	.docs-code-copy {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		border: 1px solid #53535a;
		background: #18181a;
		color: #d5d5d7;
		font-size: 0.6875rem;
		font-weight: 600;
		line-height: 1;
		padding: 0.375rem 0.5rem;
		transition:
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease;
	}

	.docs-code-copy:hover,
	.docs-code-copy:focus-visible {
		border-color: #a2a2a9;
		background: #27272a;
		color: #fafafa;
	}

	.docs-code-copy[data-state='copied'] {
		border-color: #87c3a0;
		color: #87c3a0;
	}

	.docs-code-copy[data-state='failed'] {
		border-color: #d89894;
		color: #d89894;
	}
</style>
