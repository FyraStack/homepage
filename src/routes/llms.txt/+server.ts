import {
  colocationTiers,
  planSpecs,
  plans,
} from "$lib/components/landing/plans";
import { docSections } from "$lib/docs";
import { absoluteUrl, socialLinks } from "$lib/site";
import type { RequestHandler } from "./$types";

export const prerender = true;

const vpsPlanLines = plans.map(
  (plan) => `- ${plan.name}: $${plan.price}/mo, ${planSpecs(plan)}`
);

const colocationLines = colocationTiers.map(
  (tier) => `- ${tier.units}U, ${tier.watts} W, 1 Gbps: $${tier.price}/mo`
);

const docsLines = docSections.flatMap((section) => [
  "",
  `### ${section.title}`,
  "",
  ...section.pages
    .filter((page) => page.published)
    .map((page) => {
      const summary = page.description ? `: ${page.description}` : "";
      return `- [${page.title}](${absoluteUrl(page.href)})${summary}`;
    }),
]);

const llmsText = [
  "# Fyra Stack",
  "",
  "> Fast, independent VPS hosting and colocation in Chicago, run by Fyra Labs on hardware it owns. Plans start at $5/mo with $0 egress.",
  "",
  "Fyra Stack (Stack for short) is built by Fyra Labs, the team behind Terra and Ultramarine Linux. Servers run on Intel Cascade Lake CPUs in Dell PowerEdge chassis with enterprise SAS3 SSDs. Every server gets a dedicated IPv4 address, a /64 of IPv6, full root access and a 1 Gbps uplink with fair-use bandwidth that's never billed per GB. There are no hidden fees and you can cancel anytime.",
  "",
  "## VPS plans",
  "",
  ...vpsPlanLines,
  "",
  "## Colocation",
  "",
  ...colocationLines,
  "",
  "## Links",
  "",
  `- [Home and pricing](${absoluteUrl("/")})`,
  `- [About](${absoluteUrl("/about")})`,
  `- [Docs](${absoluteUrl("/docs")})`,
  "- [Dashboard](https://dash.fyrastack.com)",
  "- [Support](mailto:support@fyrastack.com)",
  `- [GitHub](${socialLinks.github})`,
  `- [Discord](${socialLinks.discord})`,
  "",
  "## Docs",
  ...docsLines,
  "",
].join("\n");

export const GET: RequestHandler = () =>
  new Response(llmsText, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
