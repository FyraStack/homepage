import { docSections } from "$lib/server/docs";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => ({ docSections });
