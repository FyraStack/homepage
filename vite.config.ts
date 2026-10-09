import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import { docsMarkdown, docsMetadata } from "./src/lib/docs/markdown";

const pathSeparator = /[/\\]/;

export default defineConfig({
  plugins: [
    docsMetadata(),
    tailwindcss(),
    sveltekit({
      adapter: adapter(),
      compilerOptions: {
        // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
        runes: ({ filename }) =>
          filename.split(pathSeparator).includes("node_modules") ||
          filename.endsWith(".md")
            ? undefined
            : true,
      },
      extensions: [".svelte", ".md"],
      preprocess: [vitePreprocess(), docsMarkdown()],
    }),
    Icons({
      compiler: "svelte",
      customCollections: {
        nucleo: FileSystemIconLoader("./src/lib/icons"),
      },
      transform(svg, collection) {
        return collection === "lucide"
          ? svg.replace(/stroke-width="2"/g, 'stroke-width="1.5"')
          : svg;
      },
    }),
  ],
});
