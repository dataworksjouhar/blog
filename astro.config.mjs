import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// When you connect a custom domain later, change `site` to it,
// e.g. site: 'https://mohammedjouhar.com'
export default defineConfig({
  site: 'https://example.com',
  adapter: cloudflare()
});