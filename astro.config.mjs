import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
    // sitemap integration temporarily disabled - install locally if needed
    // sitemap({ filter: (page) => !page.includes("/api/") }),
  ],
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: false,
  }),
  site: "https://www.devupvjit.in",
});
