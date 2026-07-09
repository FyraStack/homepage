import type { Action } from 'svelte/action';

async function copyText(text: string) {
	await navigator.clipboard.writeText(text);
}

function updateCodeBlockFocusability(node: HTMLElement) {
	for (const pre of node.querySelectorAll('pre')) {
		if (pre.scrollWidth > pre.clientWidth) {
			pre.setAttribute('tabindex', '0');
		} else {
			pre.removeAttribute('tabindex');
		}
	}
}

export const enhanceDocsA11y: Action<HTMLElement> = (node) => {
	const cleanupCallbacks: Array<() => void> = [];

	const bindCodeBlockCopyButtons = () => {
		for (const button of node.querySelectorAll<HTMLButtonElement>(
			'.docs-code-copy-button:not([data-docs-copy-bound])'
		)) {
			const pre = button.parentElement?.querySelector('pre');

			if (!pre) {
				continue;
			}

			let resetLabel: number | undefined;

			const handleClick = async () => {
				window.clearTimeout(resetLabel);

				try {
					const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
					await copyText(code);
					button.textContent = 'Copied';
				} catch {
					button.textContent = 'Failed';
				}

				resetLabel = window.setTimeout(() => {
					button.textContent = 'Copy';
				}, 1500);
			};

			button.addEventListener('click', handleClick);
			button.dataset.docsCopyBound = 'true';

			cleanupCallbacks.push(() => {
				window.clearTimeout(resetLabel);
				button.removeEventListener('click', handleClick);
			});
		}
	};

	bindCodeBlockCopyButtons();
	updateCodeBlockFocusability(node);

	const updateEnhancements = () => {
		bindCodeBlockCopyButtons();
		updateCodeBlockFocusability(node);
	};
	const observer = new MutationObserver(updateEnhancements);
	observer.observe(node, { childList: true, subtree: true });

	window.addEventListener('resize', updateEnhancements);

	return {
		update() {
			updateEnhancements();
		},
		destroy() {
			observer.disconnect();
			window.removeEventListener('resize', updateEnhancements);
			for (const cleanup of cleanupCallbacks) {
				cleanup();
			}
		}
	};
};
