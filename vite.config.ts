import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';

export default defineConfig({
  plugins: [cloudflare()],
  build: {
    rollupOptions: {
      input: {
        concept: 'index.html',
        park: 'park/index.html',
        attractions: 'park/attractions.html',
        tickets: 'park/tickets.html',
        access: 'park/access.html',
        guide: 'park/guide.html',
        dining: 'park/dining.html',
        shops: 'park/shops.html',
      },
    },
  },
});
