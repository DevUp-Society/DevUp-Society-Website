import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    icon(),
  ],
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: false,
    edgeMiddleware: false,
    runtime: 'nodejs20.x',
  }),
  site: "https://www.devupvjit.in",
});
