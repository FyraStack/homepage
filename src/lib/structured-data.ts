import { allPlans, planSpecs } from "#lib/components/landing/plans.js";
import { absoluteUrl, siteName, siteUrl, socialLinks } from "#lib/site.js";

const organizationId = `${siteUrl}/#organization`;

const organization = {
  "@id": organizationId,
  "@type": "Organization",
  email: "support@fyrastack.com",
  logo: absoluteUrl("/icon-512.png"),
  name: siteName,
  parentOrganization: {
    "@type": "Organization",
    name: "Fyra Labs",
    url: "https://fyralabs.com",
  },
  sameAs: Object.values(socialLinks),
  url: siteUrl,
};

const website = {
  "@id": `${siteUrl}/#website`,
  "@type": "WebSite",
  name: siteName,
  publisher: { "@id": organizationId },
  url: siteUrl,
};

const vpsProduct = {
  "@type": "Product",
  brand: { "@id": organizationId },
  description:
    "Virtual private servers on Intel Cascade Lake with enterprise SAS3 SSDs, a dedicated IPv4 and a /64 of IPv6, in Chicago.",
  name: "Fyra Stack VPS",
  offers: allPlans.map((plan) => ({
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    description: planSpecs(plan),
    name: plan.name,
    price: plan.price.toFixed(2),
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.price.toFixed(2),
      priceCurrency: "USD",
      unitCode: "MON",
    },
    url: absoluteUrl("/#pricing"),
  })),
};

const toJsonLdScript = (graph: object[]) =>
  `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replaceAll("<", "\\u003c")}</script>`;

export const homeJsonLd = toJsonLdScript([organization, website, vpsProduct]);
