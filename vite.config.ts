import { defineConfig } from 'vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderParkHeader, renderParkFooter } from './park/navigation';

const root = fileURLToPath(new URL('.', import.meta.url));

/**
 * Include every park HTML page (also nested attraction details) without editing
 * this file for each new route. The concept landing page stays separate.
 */
function parkHtmlFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) return parkHtmlFiles(file);
      return entry.isFile() && entry.name.endsWith('.html')
        ? [relative(root, file).split(sep).join('/')] : [];
    }).sort();
}

const parkInputs = Object.fromEntries(
  parkHtmlFiles(join(root, 'park')).map((path) => ['park-' + path.slice(5).replace(/[^a-z0-9]+/gi, '-'), path]),
);

/** A missing or legacy shell must fail CI, never silently ship old navigation. */
function renderParkShell(html: string, pathname: string): string {
  const headerMarker = '<!-- PARK_HEADER -->';
  const footerMarker = '<!-- PARK_FOOTER -->';
  if (html.split(headerMarker).length !== 2 || html.split(footerMarker).length !== 2) {
    throw new Error('[park navigation] ' + pathname + ': one PARK_HEADER and PARK_FOOTER placeholder is required');
  }
  if (/<header\b[^>]*class=["'][^"']*\bpark-header\b/i.test(html) ||
      /<footer\b[^>]*class=["'][^"']*\bsite-footer\b/i.test(html)) {
    throw new Error('[park navigation] ' + pathname + ': legacy park header/footer remains');
  }
  const rendered = html.replace(headerMarker, renderParkHeader(pathname))
    .replace(footerMarker, renderParkFooter());
  if (!/<\/head\s*>/i.test(rendered)) {
    throw new Error('[park navigation] ' + pathname + ': missing head element');
  }
  // Inject the shared JS/CSS entry even on pages that do not import app.ts.
  return rendered.replace(/<\/head\s*>/i,
    '<script type="module" src="/park/navigation-entry.ts"></script>\n</head>');
}

export default defineConfig({
  plugins: [
    {
      name: 'park-shared-navigation',
      enforce: 'pre',
      transformIndexHtml: {
        order: 'pre',
        handler(html, context) {
          const filename = context.filename.replaceAll('\\', '/');
          const isPark = /\/park\/.*\.html$/.test(filename) || /^\/park\//.test(context.path);
          // Vite may serve a clean URL without .html; normalizePage handles both forms.
          return isPark ? renderParkShell(html, context.path) : html;
        },
      },
    },
    cloudflare(),
  ],
  build: {
    rollupOptions: {
      input: {
        concept: 'index.html',
        ...parkInputs,
      },
    },
  },
});
