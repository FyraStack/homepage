import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { codeCopyHighlighter } from './src/lib/code-copy-highlighter.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({ highlight: { highlighter: codeCopyHighlighter, optimise: true } })
	],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
