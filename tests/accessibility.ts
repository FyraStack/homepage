import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';
import Sitemapper from 'sitemapper';

type AxeFixture = {
	makeAxeBuilder: () => AxeBuilder;
};

export const localURL = 'http://localhost:8787';
const localSitemap = `${localURL}/sitemap.xml`;

export async function getSitemap() {
	const sitemap = new Sitemapper({ url: localSitemap });
	const { sites } = await sitemap.fetch();

	if (sites.length === 0) {
		throw new Error(`No pages found in sitemap: ${localSitemap}`);
	}

	return sites.map((site) => {
		const { pathname, search, hash } = new URL(site);
		return `${localURL}${pathname}${search}${hash}`;
	});
}

export const test = base.extend<AxeFixture>({
	makeAxeBuilder: async ({ page }, use) => {
		const makeAxeBuilder = () =>
			new AxeBuilder({ page }).withTags([
				'wcag2a',
				'wcag21a',
				'wcag2aa',
				'wcag21aa',
				'wcag22aa',
				'best-practice'
			]);

		await use(makeAxeBuilder);
	}
});

export { expect } from '@playwright/test';
