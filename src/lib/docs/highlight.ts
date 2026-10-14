import {
  type BundledLanguage,
  bundledLanguages,
  createHighlighter,
  type Highlighter,
} from "shiki";
import { codeThemeName, fyraStackCodeTheme } from "./shiki-theme.ts";

let highlighterPromise: Promise<Highlighter> | undefined;

const getHighlighter = () => {
  highlighterPromise ??= createHighlighter({
    langs: [],
    themes: [fyraStackCodeTheme],
  });
  return highlighterPromise;
};

export const isBundledLanguage = (
  lang?: string | null
): lang is BundledLanguage => Boolean(lang && lang in bundledLanguages);

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

export async function highlightToHtml(
  code: string,
  language: BundledLanguage | "text"
) {
  const highlighter = await highlighterFor(language);
  // Keep Shiki's tabindex="0" so scrollable code blocks are keyboard-accessible.
  return highlighter.codeToHtml(code, { lang: language, theme: codeThemeName });
}
