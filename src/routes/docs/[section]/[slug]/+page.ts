import { loadPageComponent } from "$lib/docs";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ data }) => ({
  ...data,
  content: await loadPageComponent(data.page),
});
