import type { Component } from "svelte";
import Cpu from "~icons/nucleo/cpu";
import HardDrive from "~icons/nucleo/hard-drive";
import ReceiptText from "~icons/nucleo/receipt";
import SquareTerminal from "~icons/nucleo/square-terminal";

export interface DocHeading {
  depth: number;
  id: string;
  text: string;
}

export interface DocMetadata {
  description?: string;
  headings?: DocHeading[];
  order: number;
  status?: "soon";
  supported?: boolean;
  title: string;
}

export type DocPage = DocMetadata & {
  section: string;
  slug: string;
  href: `/docs/${string}/${string}`;
  published: boolean;
};

export interface DocSection {
  description: string;
  id: string;
  pages: DocPage[];
  title: string;
}

export const sectionIcons: Record<string, Component<{ class?: string }>> = {
  "account-billing": ReceiptText,
  colocation: HardDrive,
  linux: SquareTerminal,
  vps: Cpu,
};

const componentsByPath = import.meta.glob<Component>(
  "/src/content/docs/*/*.md",
  { import: "default" }
);

export const loadPageComponent = (page: DocPage) =>
  componentsByPath[`/src/content/docs/${page.section}/${page.slug}.md`]();
