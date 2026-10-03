import type { Component } from 'svelte';
import Cpu from '@lucide/svelte/icons/cpu';
import HardDrive from '@lucide/svelte/icons/hard-drive';
import ReceiptText from '@lucide/svelte/icons/receipt-text';
import SquareTerminal from '@lucide/svelte/icons/square-terminal';

export type DocHeading = { id: string; text: string; depth: number };

type DocMetadata = {
	title: string;
	description?: string;
	order: number;
	status?: 'soon';
	supported?: boolean;
	headings?: DocHeading[];
};

export type DocPage = DocMetadata & {
	section: string;
	slug: string;
	href: `/docs/${string}/${string}`;
	published: boolean;
};

export type DocSection = {
	id: string;
	title: string;
	description: string;
	icon: Component<{ class?: string; strokeWidth?: number }>;
	pages: DocPage[];
};

const sectionInfo: Omit<DocSection, 'pages'>[] = [
	{
		id: 'vps',
		title: 'VPS',
		description: 'First login, initial hardening, and setting up your environment.',
		icon: Cpu
	},
	{
		id: 'colocation',
		title: 'Colocation',
		description: 'IPMI access, power specs, and getting your hardware online.',
		icon: HardDrive
	},
	{
		id: 'linux',
		title: 'Linux & distros',
		description: 'Supported operating systems and distro-specific notes.',
		icon: SquareTerminal
	},
	{
		id: 'account-billing',
		title: 'Account & billing',
		description: 'Managing your plan, invoices, and cancellation.',
		icon: ReceiptText
	}
];

const metadataByPath = import.meta.glob<DocMetadata>('/src/content/docs/*/*.md', {
	eager: true,
	import: 'metadata'
});

const componentsByPath = import.meta.glob<Component>('/src/content/docs/*/*.md', {
	import: 'default'
});

const pathFor = (section: string, slug: string) => `/src/content/docs/${section}/${slug}.md`;

const pages: DocPage[] = Object.entries(metadataByPath).map(([path, metadata]) => {
	const [, section, slug] = path.match(/\/docs\/([^/]+)\/([^/]+)\.md$/) ?? [];
	return {
		...metadata,
		section,
		slug,
		href: `/docs/${section}/${slug}`,
		published: metadata.status !== 'soon'
	};
});

export const docSections: DocSection[] = sectionInfo.map((info) => ({
	...info,
	pages: pages
		.filter((page) => page.section === info.id)
		.sort((a, b) => Number(!a.published) - Number(!b.published) || a.order - b.order)
}));

export const publishedPages = docSections.flatMap((section) =>
	section.pages.filter((page) => page.published)
);

export const findSection = (id: string) => docSections.find((section) => section.id === id);

export const findPage = (section: string, slug: string) =>
	publishedPages.find((page) => page.section === section && page.slug === slug);

export const loadPageComponent = (page: DocPage) =>
	componentsByPath[pathFor(page.section, page.slug)]();
