import type { Action } from 'svelte/action';

function makeScrollableCodeBlocksFocusable(node: HTMLElement) {
	for (const pre of node.querySelectorAll('pre')) {
		pre.setAttribute('tabindex', '0');
	}
}

export const enhanceDocsA11y: Action<HTMLElement> = (node) => {
	makeScrollableCodeBlocksFocusable(node);

	const observer = new MutationObserver(() => makeScrollableCodeBlocksFocusable(node));
	observer.observe(node, { childList: true, subtree: true });

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
