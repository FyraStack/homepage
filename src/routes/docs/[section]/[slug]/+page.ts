import { error } from "@sveltejs/kit";
import {
  findPage,
  findSection,
  loadPageComponent,
  publishedPages,
} from "$lib/docs";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () =>
  publishedPages.map((page) => ({ section: page.section, slug: page.slug }));

export const load: PageLoad = async ({ params }) => {
  const page = findPage(params.section, params.slug);
  const section = page && findSection(page.section);
  if (!(page && section)) {
    error(404, "Not found");
  }
  return { content: await loadPageComponent(page), page, section };
};
