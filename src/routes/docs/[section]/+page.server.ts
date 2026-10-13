import { error } from "@sveltejs/kit";
import { docSections, findSection } from "#lib/server/docs.js";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () =>
  docSections.map((section) => ({ section: section.id }));

export const load: PageServerLoad = ({ params }) => {
  const section = findSection(params.section);
  if (!section) {
    error(404, "Not found");
  }
  return { section };
};
