import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const navigation = readFileSync(join(root, 'park/navigation.ts'), 'utf8');
const links = [...navigation.matchAll(/href:\s*'([^']+)'/g)].map((match) => match[1]);

// The header and footer use these two fixed routes in addition to parkNavGroups.
links.push('/park/', '/');
const errors = [];

for (const href of links) {
  const url = new URL(href, 'https://park.example');
  if (url.origin !== 'https://park.example') {
    errors.push('External URL is not supported by the local navigation: ' + href);
    continue;
  }
  const relativePath = url.pathname === '/' ? 'index.html'
    : url.pathname === '/park/' ? 'park/index.html'
    : url.pathname.slice(1);
  const file = join(root, relativePath);
  if (!existsSync(file)) {
    errors.push('Missing page: ' + href + ' -> ' + relativePath);
    continue;
  }
  if (url.hash) {
    const id = decodeURIComponent(url.hash.slice(1));
    const html = readFileSync(file, 'utf8');
    const escapedId = id.replace(/[.*+?^\u0024{}()|[\]\\]/g, '\\$&');
    if (!new RegExp('\\bid=["\\\'"]' + escapedId + '["\\\'"]').test(html)) {
      errors.push('Missing anchor: ' + href);
    }
  }
}

if (errors.length > 0) {
  console.error('Park navigation link check failed:\n' + errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Park navigation: verified ' + links.length + ' local links and anchors.');
}
