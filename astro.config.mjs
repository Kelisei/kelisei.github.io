import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://kelisei.github.io',
  base: '/https://github.com/Kelisei/kelisei.github.io',
});