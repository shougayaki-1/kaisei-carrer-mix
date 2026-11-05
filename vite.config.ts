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
        attraction_skyport: 'park/attractions/skyport.html',
        attraction_inside: 'park/attractions/inside.html',
        attraction_flight: 'park/attractions/flight.html',
        attraction_ocean: 'park/attractions/ocean.html',
        attraction_fossil: 'park/attractions/fossil.html',
        attraction_coast: 'park/attractions/coast.html',
        attraction_night: 'park/attractions/night.html',
        tickets: 'park/tickets.html',
        access: 'park/access.html',
        guide: 'park/guide.html',
      },
    },
  },
});
