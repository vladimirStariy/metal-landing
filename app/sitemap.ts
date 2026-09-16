import type { MetadataRoute } from "next";
import { company } from "./company";
import { contentPages, pageHref } from "./content/pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: company.site, lastModified, priority: 1 },
    { url: `${company.site}/uslugi`, lastModified, priority: 0.9 },
    { url: `${company.site}/izdeliya`, lastModified, priority: 0.9 },
    { url: `${company.site}/proizvodstvo`, lastModified, priority: 0.8 },
    { url: `${company.site}/kak-rabotaem`, lastModified, priority: 0.7 },
    { url: `${company.site}/kontakty`, lastModified, priority: 0.7 },
    ...contentPages.map((page) => ({
      url: `${company.site}${pageHref(page)}`,
      lastModified,
      priority: 0.8,
    })),
  ];
}
