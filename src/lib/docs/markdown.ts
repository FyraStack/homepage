import GithubSlugger from "github-slugger";
import { mdsvex } from "mdsvex";
import { highlightToHtml, isBundledLanguage } from "./highlight.ts";

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

const languageLabels: Record<string, string> = {
  bash: "Shell",
  sh: "Shell",
  shell: "Shell",
  text: "Text",
};

const escapeSvelte = (html: string) =>
  html.replaceAll("{", "&#123;").replaceAll("}", "&#125;");

async function highlightCode(code: string, lang?: string | null) {
  const language = isBundledLanguage(lang) ? lang : "text";
  const html = await highlightToHtml(code, language);
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

export const docsMarkdown = () =>
  mdsvex({
    extensions: [".md"],
    highlight: { highlighter: highlightCode },
    rehypePlugins: [collectHeadings],
  });
