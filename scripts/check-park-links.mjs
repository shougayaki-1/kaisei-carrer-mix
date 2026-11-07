import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const parkRoot = join(root, 'park');
const navigation = readFileSync(join(parkRoot, 'navigation.ts'), 'utf8');
const errors = [];

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.isFile() && entry.name.endsWith('.html') ? [full] : [];
  });
}

const pages = htmlFiles(parkRoot).sort();
if (!pages.length) errors.push('No park HTML pages found');

for (const file of pages) {
  const path = relative(root, file).split(sep).join('/');
  const html = readFileSync(file, 'utf8');
  for (const token of ['<!-- PARK_HEADER -->', '<!-- PARK_FOOTER -->']) {
    const count = html.split(token).length - 1;
    if (count !== 1) errors.push(path + ': expected exactly one ' + token + ' (found ' + count + ')');
  }
  if (/<header\b[^>]*class=["'][^"']*\bpark-header\b/i.test(html) ||
      /<footer\b[^>]*class=["'][^"']*\bsite-footer\b/i.test(html)) {
    errors.push(path + ': legacy header/footer HTML remains; replace it with placeholders');
  }
  if (!/<main\b/i.test(html)) errors.push(path + ': missing main landmark');
}

// Links are defined as string literals on ParkNavGroup entries in navigation.ts.
// The header/footer also contain the fixed home and concept URLs.
const links = [...navigation.matchAll(/\bhref:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
links.push('/park/', '/concept/');

for (const href of links) {
  let url;
  try { url = new URL(href, 'https://park.example'); }
  catch { errors.push('Invalid navigation link: ' + href); continue; }
  if (url.origin !== 'https://park.example' || !href.startsWith('/')) {
    errors.push('Navigation link must be an absolute local path: ' + href);
    continue;
  }
  const relativePath = url.pathname === '/' ? 'index.html'
    : url.pathname.endsWith('/') ? url.pathname.slice(1) + 'index.html'
    : url.pathname.slice(1);
  const file = join(root, relativePath);
  if (!existsSync(file)) {
    errors.push('Missing navigation target: ' + href + ' -> ' + relativePath);
    continue;
  }
  if (url.hash) {
    const anchor = decodeURIComponent(url.hash.slice(1));
    const html = readFileSync(file, 'utf8');
    if (!html.includes('id="' + anchor + '"') && !html.includes("id='" + anchor + "'")) {
      errors.push('Missing navigation anchor: ' + href);
    }
  }
}


/* Verify the QR entrypoint and preserve the original business pitch. */
const redirects = readFileSync(join(root, 'public/_redirects'), 'utf8');
const redirectRules = redirects.split(/\r?\n/).map((line) => line.trim().split(/\s+/));
for (const source of ['/', '/index.html']) {
  if (!redirectRules.some(([from, to, status]) =>
    from === source && to === '/park/' && status === '302')) {
    errors.push('Missing Cloudflare redirect: ' + source + ' -> /park/');
  }
}
const rootHtml = readFileSync(join(root, 'index.html'), 'utf8');
if (!rootHtml.includes('url=/park/')) {
  errors.push('Local root fallback must redirect to /park/');
}
const conceptHtml = readFileSync(join(root, 'concept/index.html'), 'utf8');
if (!conceptHtml.includes('id="business"') || !conceptHtml.includes('/src/main.ts')) {
  errors.push('Concept presentation or revenue simulator entry is missing');
}
/* Keep the project presentation aligned with the public-facing park. */
const expectedAttractions = ['skyport', 'inside', 'flight', 'night', 'fossil', 'ocean', 'coast'];
const conceptDetails = [...conceptHtml.matchAll(/class="zone-detail" href="([^"]+)"/g)].map((match) => match[1]);
if (conceptDetails.length !== expectedAttractions.length ||
    expectedAttractions.some((id) => !conceptDetails.includes('/park/attractions/' + id + '.html'))) {
  errors.push('Concept presentation must show all seven current park experiences, with links');
}
for (const anchor of ['idea', 'experience', 'region', 'operation', 'science', 'business']) {
  if (!conceptHtml.includes('id="' + anchor + '"')) errors.push('Missing concept section: ' + anchor);
}
if (conceptHtml.includes('LOST<span>ERA</span>')) {
  errors.push('Concept page still uses the obsolete LOST ERA brand');
}
const parkIcons = readFileSync(join(parkRoot, 'icons.ts'), 'utf8');
const supportedIcons = new Set([...parkIcons.matchAll(/^\s+"([a-z0-9-]+)":/gm)].map((match) => match[1]));
for (const match of conceptHtml.matchAll(/data-lucide="([^"]+)"/g)) {
  if (!supportedIcons.has(match[1])) errors.push('Unrecognized concept icon: ' + match[1]);
}
const conceptLinks = [...conceptHtml.matchAll(/\bhref="(\/[^"]+)"/g)].map((match) => match[1]);
for (const href of conceptLinks) {
  const url = new URL(href, 'https://park.example');
  const path = url.pathname.endsWith('/') ? url.pathname.slice(1) + 'index.html' : url.pathname.slice(1);
  if (!existsSync(join(root, path)) && !existsSync(join(root, 'public', path))) {
    errors.push('Missing concept link target: ' + href);
  }
  if (url.hash && url.pathname === '/concept/' &&
      !conceptHtml.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"')) {
    errors.push('Missing concept link fragment: ' + href);
  }
}
const conceptAssumptions = readFileSync(join(root, 'src/assumptions.ts'), 'utf8');
const parkTickets = readFileSync(join(parkRoot, 'ticket-data.ts'), 'utf8');
const simulationPrice = Number(conceptAssumptions.match(/ticketPriceYen:\s*(\d+)/)?.[1]);
const dayPassAdultPrice = Number(parkTickets.match(/day:\{[^\n]*prices:\{adult:(\d+)/)?.[1]);
if (!simulationPrice || simulationPrice !== dayPassAdultPrice) {
  errors.push('Concept simulator must use the park 1DAY adult price (simplified assumption)');
}
if (!conceptHtml.includes('実際のチケット購入や予約はできません')) {
  errors.push('Concept park design must disclose that tickets and bookings are fictional');
}

const parkHome = readFileSync(join(parkRoot, 'index.html'), 'utf8');
if (!parkHome.includes('href="/concept/"') || !navigation.includes('href="/concept/"')) {
  errors.push('Park entry links to /concept/ are missing');
}
const englishHome = readFileSync(join(parkRoot, 'english-home.ts'), 'utf8');
if (!/href="\/concept\/" class="button button-bright">Read the project presentation/.test(englishHome)) {
  errors.push('English park presentation link must target /concept/');
}
if (/href="\/" class="button button-bright">Read the project presentation/.test(englishHome)) {
  errors.push('English park presentation must not link to the redirected root');
}

/* Keep the stay-area CTA meaningful and consistently placed. */
for (const page of ['index.html', 'plans.html', 'access.html']) {
  const html = readFileSync(join(parkRoot, page), 'utf8');
  if (!/<section class="stay-cta" aria-labelledby="stay-cta-title">/.test(html)) {
    errors.push(page + ': stay-area CTA section is missing');
  }
  if (!/<a class="button stay-cta__button" href="\/park\/stay\.html">/.test(html)) {
    errors.push(page + ': stay-area CTA destination or button is missing');
  }
  if (/<p class="wrap"><a href="\/park\/stay\.html">/.test(html)) {
    errors.push(page + ': bare stay-area link remains');
  }
  const banner = html.indexOf('<section class="bottom-banner">');
  const cta = html.indexOf('<section class="stay-cta"');
  if (banner !== -1 && cta >= banner) {
    errors.push(page + ': stay-area CTA must precede the closing banner');
  }
}

if (errors.length) {
  console.error('Park navigation checks failed:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Park shell: ' + pages.length + ' HTML pages with shared header/footer markers; ' +
    links.length + ' navigation links verified.');
}
