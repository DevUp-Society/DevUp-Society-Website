/**
 * Web App Manifest for DevUp Society
 *
 * Enables Progressive Web App (PWA) features and provides additional
 * metadata for search engines and social platforms.
 */

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const manifest = {
    name: "DevUp Society - Student Developer Community",
    short_name: "DevUp",
    description:
      "India's premier student developer community. Build real products, join hackathons, learn industry skills.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#22C55E",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/favicon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    categories: ["education", "social", "productivity"],
    screenshots: [
      {
        src: "/screenshots/homepage.png",
        sizes: "1280x720",
        type: "image/png",
        label: "DevUp Society Homepage",
      },
    ],
    shortcuts: [
      {
        name: "Join Community",
        short_name: "Join",
        description: "Join the DevUp Society community",
        url: "/join",
        icons: [{ src: "/icons/join.png", sizes: "96x96" }],
      },
      {
        name: "Upcoming Events",
        short_name: "Events",
        description: "View upcoming hackathons and workshops",
        url: "/events",
        icons: [{ src: "/icons/events.png", sizes: "96x96" }],
      },
      {
        name: "Projects",
        short_name: "Projects",
        description: "Explore student developer projects",
        url: "/projects",
        icons: [{ src: "/icons/projects.png", sizes: "96x96" }],
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
