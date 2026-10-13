import { docSections } from "#lib/server/docs.js";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = () => ({ docSections });
