import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { renderParkHeader, renderParkFooter } from './park/navigation';

export default defineConfig({
  plugins: [
    {
      name: 'park-shared-navigation',
      enforce: 'pre',
      transformIndexHtml(html, context) {
        if (!html.includes('<!-- PARK_HEADER -->')) return html;
        if (!html.includes('<!-- PARK_FOOTER -->')) {
          throw new Error('Park page is missing PARK_FOOTER placeholder: ' + context.path);
        }
        return html
          .replace('<!-- PARK_HEADER -->', renderParkHeader(context.path))
          .replace('<!-- PARK_FOOTER -->', renderParkFooter());
      },
    },
    cloudflare(),
  ],
  build: {
    rollupOptions: {
      input: {
        concept: 'index.html',
        park: 'park/index.html',
        attractions: 'park/attractions.html',
        tickets: 'park/tickets.html',
        access: 'park/access.html',
        guide: 'park/guide.html',
      },
    },
  },
});
