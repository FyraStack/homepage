import { error } from "@sveltejs/kit";
import { findPage, findSection, publishedPages } from "#lib/server/docs.js";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () =>
  publishedPages.map((page) => ({ section: page.section, slug: page.slug }));

export const load: PageServerLoad = ({ params }) => {
  const page = findPage(params.section, params.slug);
  const section = page && findSection(page.section);
  if (!(page && section)) {
    error(404, "Not found");
  }
  const position = publishedPages.indexOf(page);
  return {
    next: publishedPages[position + 1],
    page,
    previous: publishedPages[position - 1],
    section,
  };
};
