import { docSections, publishedPages } from "$lib/server/docs";
import { absoluteUrl } from "$lib/site";
import type { RequestHandler } from "./$types";

export const prerender = true;

const staticPaths = [
  "/",
  "/about",
  "/docs",
  "/privacy-statement",
  "/terms-of-service",
];

const sitemapPaths = () => [
  ...staticPaths,
  ...docSections.map((section) => `/docs/${section.id}`),
  ...publishedPages.map((page) => page.href),
];

const urlEntry = (path: string) =>
  `  <url><loc>${absoluteUrl(path)}</loc></url>`;

export const GET: RequestHandler = () =>
  new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...sitemapPaths().map(urlEntry),
      "</urlset>",
      "",
    ].join("\n"),
    { headers: { "content-type": "application/xml" } }
  );
