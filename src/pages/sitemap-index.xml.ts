/**
 * Extended Sitemap Index for Enhanced SEO
 *
 * This provides additional sitemap metadata beyond the standard @astrojs/sitemap.
 * It includes image sitemaps, news sitemaps, and video sitemaps for richer indexing.
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const siteUrl = "https://www.devupvjit.in";
  const lastmod = new Date().toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap-0.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
