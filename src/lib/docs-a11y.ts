import type { Action } from 'svelte/action';

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
	updateCodeBlockFocusability(node);

	const updateFocusability = () => updateCodeBlockFocusability(node);
	const observer = new MutationObserver(updateFocusability);
	observer.observe(node, { childList: true, subtree: true });

	window.addEventListener('resize', updateFocusability);

	return {
		update() {
			updateCodeBlockFocusability(node);
		},
		destroy() {
			observer.disconnect();
			window.removeEventListener('resize', updateFocusability);
		}
	};
};
