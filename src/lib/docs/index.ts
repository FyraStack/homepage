import Cpu from "@lucide/svelte/icons/cpu";
import HardDrive from "@lucide/svelte/icons/hard-drive";
import ReceiptText from "@lucide/svelte/icons/receipt-text";
import SquareTerminal from "@lucide/svelte/icons/square-terminal";
import type { Component } from "svelte";

export interface DocHeading {
  depth: number;
  id: string;
  text: string;
}

interface DocMetadata {
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
  icon: Component<{ class?: string; strokeWidth?: number }>;
  id: string;
  pages: DocPage[];
  title: string;
}

const sectionInfo: Omit<DocSection, "pages">[] = [
  {
    description:
      "First login, initial hardening, and setting up your environment.",
    icon: Cpu,
    id: "vps",
    title: "VPS",
  },
  {
    description: "IPMI access, power specs, and getting your hardware online.",
    icon: HardDrive,
    id: "colocation",
    title: "Colocation",
  },
  {
    description: "Supported operating systems and distro-specific notes.",
    icon: SquareTerminal,
    id: "linux",
    title: "Linux & distros",
  },
  {
    description: "Managing your plan, invoices, and cancellation.",
    icon: ReceiptText,
    id: "account-billing",
    title: "Account & billing",
  },
];

const metadataByPath = import.meta.glob<DocMetadata>(
  "/src/content/docs/*/*.md",
  {
    eager: true,
    import: "metadata",
    query: "?metadata",
  }
);

const componentsByPath = import.meta.glob<Component>(
  "/src/content/docs/*/*.md",
  {
    import: "default",
  }
);

const docPathPattern = /\/docs\/([^/]+)\/([^/]+)\.md$/;

const pathFor = (section: string, slug: string) =>
  `/src/content/docs/${section}/${slug}.md`;

const pages: DocPage[] = Object.entries(metadataByPath).map(
  ([path, metadata]) => {
    const [, section, slug] = path.match(docPathPattern) ?? [];
    return {
      ...metadata,
      href: `/docs/${section}/${slug}`,
      published: metadata.status !== "soon",
      section,
      slug,
    };
  }
);

export const docSections: DocSection[] = sectionInfo.map((info) => ({
  ...info,
  pages: pages
    .filter((page) => page.section === info.id)
    .sort(
      (a, b) => Number(!a.published) - Number(!b.published) || a.order - b.order
    ),
}));

export const publishedPages = docSections.flatMap((section) =>
  section.pages.filter((page) => page.published)
);

export const findSection = (id: string) =>
  docSections.find((section) => section.id === id);

export const findPage = (section: string, slug: string) =>
  publishedPages.find((page) => page.section === section && page.slug === slug);

export const loadPageComponent = (page: DocPage) =>
  componentsByPath[pathFor(page.section, page.slug)]();
