import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Check the built HTML, not only the source renderer, so a Vite plugin ordering
// change or a missing multi-page entry cannot silently remove the annotations.
const assets = resolve('.cloudflare/output/v0/workers/default/assets');
const pages = [
  ['index.html','/park/'], ['tickets.html','/park/tickets'],
  ['access.html','/park/access'], ['guide.html','/park/guide'],
  ['attractions.html','/park/attractions'],
  ...['inside','skyport','flight','ocean','fossil','coast','night']
    .map(id => [`attractions/${id}.html`,`/park/attractions/${id}`]),
];
const headOf = page => {
 const html = readFileSync(resolve(assets, 'park', page), 'utf8');
 const match = /<head\b[^>]*>([\s\S]*?)<\/head>/i.exec(html);
 if (!match) throw new Error(`${page}: missing head`);
 return match[1];
};
for (const [page,path] of pages) {
 const head = headOf(page);
 const links = [...head.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"\s*\/?\s*>/g)];
 const expected = {ja:'ja',en:'en','x-default':'ja'};
 if (links.length !== Object.keys(expected).length) throw new Error(`${page}: expected three alternate links`);
 for (const [language,parameter] of Object.entries(expected)) {
  const url = `https://mix.kaisei.shoug.org${path}?lang=${parameter}`;
  if (!links.some(([,actual,href])=>actual===language && href===url)) throw new Error(`${page}: missing ${language} alternate ${url}`);
 }
}
for (const page of ['stay.html','plans.html','transport.html','services.html']) {
 if (/\bhreflang=/i.test(headOf(page))) throw new Error(`${page}: untranslated page has language alternates`);
}
console.log(`Verified language alternatives in ${pages.length} built pages.`);
