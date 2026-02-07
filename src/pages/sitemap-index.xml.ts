/**
 * Extended Sitemap Index for Enhanced SEO & AI Discovery
 *
 * This provides additional sitemap metadata beyond the standard @astrojs/sitemap.
 * Includes all pages, AI discovery files, and entity-relevant URLs.
 *
 * ENTITY: DevUp Society — Student Developer Community at VJIT, Hyderabad
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const siteUrl = "https://www.devupvjit.in";
  const lastmod = new Date().toISOString();

  // All indexable pages with priorities and change frequencies
  const pages = [
    { loc: "/", priority: "1.0", changefreq: "weekly" },
    { loc: "/about", priority: "0.9", changefreq: "monthly" },
    { loc: "/events", priority: "0.9", changefreq: "weekly" },
    { loc: "/team", priority: "0.8", changefreq: "monthly" },
    { loc: "/teams", priority: "0.8", changefreq: "monthly" },
    { loc: "/faq", priority: "0.8", changefreq: "monthly" },
    { loc: "/join", priority: "0.8", changefreq: "monthly" },
    { loc: "/community", priority: "0.7", changefreq: "monthly" },
    { loc: "/projects", priority: "0.7", changefreq: "monthly" },
    { loc: "/resources", priority: "0.7", changefreq: "monthly" },
  ];

  // Build the URL set with full metadata
  const urlEntries = pages
    .map(
      (page) => `  <url>
    <loc>${siteUrl}${page.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
};
