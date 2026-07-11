import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { bundledLanguages, createHighlighter } from 'shiki';
import { fyraStackCodeTheme } from './src/lib/shiki-theme.js';

const codeTheme = fyraStackCodeTheme.name;

const highlighter = await createHighlighter({
	themes: [fyraStackCodeTheme],
	langs: Object.keys(bundledLanguages)
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			highlight: {
				highlighter: (code, lang = 'text') => {
					let html;

					try {
						html = highlighter.codeToHtml(code, { lang, theme: codeTheme });
					} catch {
						html = highlighter.codeToHtml(code, { lang: 'text', theme: codeTheme });
					}

					return `<CodeBlock code={${JSON.stringify(code)}} html={${JSON.stringify(html)}} />`;
				}
			}
		})
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
