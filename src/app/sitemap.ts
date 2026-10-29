import type { MetadataRoute } from "next";

const BASE = "https://www.marokkoinvestment.de";

/* Indexable pages only; the document variants are noindex (see their page.tsx) */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/marokko-investieren-eignungscheck`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/marokko-investoren-memorandum`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
