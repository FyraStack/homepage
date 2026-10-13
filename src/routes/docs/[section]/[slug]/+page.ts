import { loadPageComponent } from "#lib/docs/index.js";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => ({
  ...data,
  content: await loadPageComponent(data.page),
});
