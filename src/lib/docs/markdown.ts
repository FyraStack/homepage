import GithubSlugger from 'github-slugger';
import { mdsvex } from 'mdsvex';
import { bundledLanguages, createHighlighter } from 'shiki';

type HtmlNode = {
	type: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: HtmlNode[];
};

type MarkdownFile = { data: { fm?: Record<string, unknown> } };
import { codeThemeName, fyraStackCodeTheme } from './shiki-theme';

const languageLabels: Record<string, string> = {
	bash: 'Shell',
	sh: 'Shell',
	shell: 'Shell',
	text: 'Text'
};

const highlighter = await createHighlighter({
	themes: [fyraStackCodeTheme],
	langs: Object.keys(bundledLanguages)
});

const escapeSvelte = (html: string) => html.replaceAll('{', '&#123;').replaceAll('}', '&#125;');

function highlightCode(code: string, lang?: string | null) {
	const language = lang && lang in bundledLanguages ? lang : 'text';
	const html = highlighter
		.codeToHtml(code, { lang: language, theme: codeThemeName })
		.replace(' tabindex="0"', '');
	const label = languageLabels[language] ?? language;
	return escapeSvelte(
		`<figure class="docs-code not-prose"><figcaption class="docs-code-header" data-pagefind-ignore><span>${label}</span><button type="button" class="docs-code-copy" data-copy-code>Copy</button></figcaption>${html}</figure>`
	);
}

const textOf = (node: HtmlNode): string =>
	node.type === 'text' ? (node.value ?? '') : (node.children ?? []).map(textOf).join('');

function collectHeadings() {
	return (tree: HtmlNode, file: MarkdownFile) => {
		const slugger = new GithubSlugger();
		const headings: { id: string; text: string; depth: number }[] = [];
		const visit = (node: HtmlNode) => {
			if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
				const text = textOf(node).trim();
				const id = slugger.slug(text);
				node.properties = { ...node.properties, id };
				headings.push({ id, text, depth: node.tagName === 'h2' ? 2 : 3 });
			}
			(node.children ?? []).forEach(visit);
		};
		visit(tree);
		file.data.fm = { ...file.data.fm, headings };
	};
}

export const docsMarkdown = () =>
	mdsvex({
		extensions: ['.md'],
		highlight: { highlighter: highlightCode },
		rehypePlugins: [collectHeadings]
	});
