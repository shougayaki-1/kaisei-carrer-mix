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
links.push('/park/', '/');

for (const href of links) {
  let url;
  try { url = new URL(href, 'https://park.example'); }
  catch { errors.push('Invalid navigation link: ' + href); continue; }
  if (url.origin !== 'https://park.example' || !href.startsWith('/')) {
    errors.push('Navigation link must be an absolute local path: ' + href);
    continue;
  }
  const relativePath = url.pathname === '/' ? 'index.html'
    : url.pathname === '/park/' ? 'park/index.html'
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

if (errors.length) {
  console.error('Park navigation checks failed:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Park shell: ' + pages.length + ' HTML pages with shared header/footer markers; ' +
    links.length + ' navigation links verified.');
}
