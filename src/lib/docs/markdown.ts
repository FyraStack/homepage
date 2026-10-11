import { readFile } from "node:fs/promises";
import GithubSlugger from "github-slugger";
import { compile, mdsvex } from "mdsvex";
import {
  type BundledLanguage,
  bundledLanguages,
  createHighlighter,
  type Highlighter,
} from "shiki";
import type { Plugin } from "vite";

interface HtmlNode {
  children?: HtmlNode[];
  properties?: Record<string, unknown>;
  tagName?: string;
  type: string;
  value?: string;
}

interface MarkdownFile {
  data: { fm?: Record<string, unknown> };
}

import { codeThemeName, fyraStackCodeTheme } from "./shiki-theme";

const languageLabels: Record<string, string> = {
  bash: "Shell",
  sh: "Shell",
  shell: "Shell",
  text: "Text",
};

let highlighterPromise: Promise<Highlighter> | undefined;

const getHighlighter = () => {
  highlighterPromise ??= createHighlighter({
    langs: [],
    themes: [fyraStackCodeTheme],
  });
  return highlighterPromise;
};

const isBundledLanguage = (lang?: string | null): lang is BundledLanguage =>
  Boolean(lang && lang in bundledLanguages);

async function highlighterFor(language: BundledLanguage | "text") {
  const highlighter = await getHighlighter();
  if (
    language !== "text" &&
    !highlighter.getLoadedLanguages().includes(language)
  ) {
    await highlighter.loadLanguage(language);
  }
  return highlighter;
}

const escapeSvelte = (html: string) =>
  html.replaceAll("{", "&#123;").replaceAll("}", "&#125;");

async function highlightCode(code: string, lang?: string | null) {
  const language = isBundledLanguage(lang) ? lang : "text";
  const highlighter = await highlighterFor(language);
  const html = highlighter
    .codeToHtml(code, { lang: language, theme: codeThemeName })
    .replace(' tabindex="0"', "");
  const label = languageLabels[language] ?? language;
  return escapeSvelte(
    `<figure class="docs-code not-prose"><figcaption class="docs-code-header" data-pagefind-ignore><span>${label}</span><button type="button" class="docs-code-copy" data-copy-code>Copy</button></figcaption>${html}</figure>`
  );
}

const textOf = (node: HtmlNode): string =>
  node.type === "text"
    ? (node.value ?? "")
    : (node.children ?? []).map(textOf).join("");

function collectHeadings() {
  return (tree: HtmlNode, file: MarkdownFile) => {
    const slugger = new GithubSlugger();
    const headings: { id: string; text: string; depth: number }[] = [];
    const visit = (node: HtmlNode) => {
      if (
        node.type === "element" &&
        (node.tagName === "h2" || node.tagName === "h3")
      ) {
        const text = textOf(node).trim();
        const id = slugger.slug(text);
        node.properties = { ...node.properties, id };
        headings.push({ depth: node.tagName === "h2" ? 2 : 3, id, text });
      }
      (node.children ?? []).forEach(visit);
    };
    visit(tree);
    file.data.fm = { ...file.data.fm, headings };
  };
}

const markdownOptions = {
  extensions: [".md"],
  highlight: { highlighter: highlightCode },
  rehypePlugins: [collectHeadings],
};

export const docsMarkdown = () => mdsvex(markdownOptions);

const metadataQuery = "?metadata";
const metadataPrefix = "\0docs-metadata:";

export const docsMetadata = (): Plugin => ({
  enforce: "pre",
  async load(id) {
    if (!id.startsWith(metadataPrefix)) {
      return;
    }
    const source = await readFile(
      id.slice(metadataPrefix.length, -".js".length),
      "utf8"
    );
    const compiled = await compile(source, markdownOptions);
    return `export const metadata = ${JSON.stringify(compiled?.data?.fm ?? {})};`;
  },
  name: "docs-metadata",
  async resolveId(source, importer) {
    if (!source.endsWith(`.md${metadataQuery}`)) {
      return;
    }
    const resolved = await this.resolve(
      source.slice(0, -metadataQuery.length),
      importer,
      { skipSelf: true }
    );
    return resolved && `${metadataPrefix}${resolved.id}.js`;
  },
});
