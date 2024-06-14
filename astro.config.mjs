import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://www.murexrobotics.com",
  site: "https://www.mrx.ee/qr"
  integrations: [tailwind(), react(), partytown(), prefetch(), sitemap(), compress()]
});
