import { error } from "@sveltejs/kit";
import { docSections, findSection } from "$lib/docs";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () =>
  docSections.map((section) => ({ section: section.id }));

export const load: PageLoad = ({ params }) => {
  const section = findSection(params.section);
  if (!section) {
    error(404, "Not found");
  }
  return { section };
};
