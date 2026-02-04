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
  ],
  output: "hybrid",
  adapter: vercel({
    functionPerRoute: false,
  }),
  site: "https://devup-society.com",
});
