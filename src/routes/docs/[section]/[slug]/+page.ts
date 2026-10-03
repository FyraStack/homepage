import { error } from '@sveltejs/kit';
import { findPage, loadPageComponent, publishedPages } from '$lib/docs';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	publishedPages.map((page) => ({ section: page.section, slug: page.slug }));

export const load: PageLoad = async ({ params }) => {
	const page = findPage(params.section, params.slug);
	if (!page) error(404, 'Not found');
	return { page, content: await loadPageComponent(page) };
};
