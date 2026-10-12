import type { DocMetadata, DocPage, DocSection } from "$lib/docs";

const sectionInfo: Omit<DocSection, "pages">[] = [
  {
    description:
      "First login, initial hardening, and setting up your environment.",
    id: "vps",
    title: "VPS",
  },
  {
    description: "IPMI access, power specs, and getting your hardware online.",
    id: "colocation",
    title: "Colocation",
  },
  {
    description: "Supported operating systems and distro-specific notes.",
    id: "linux",
    title: "Linux & distros",
  },
  {
    description: "Managing your plan, invoices, and cancellation.",
    id: "account-billing",
    title: "Account & billing",
  },
];

const metadataByPath = import.meta.glob<DocMetadata>(
  "/src/content/docs/*/*.md",
  { eager: true, import: "metadata" }
);

const docPathPattern = /\/docs\/([^/]+)\/([^/]+)\.md$/;

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
