import * as sitemap from 'super-sitemap/sveltekit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return await sitemap.response({
		origin: 'https://fyrastack.com'
	});
};
