/** Routes with complete English content. Shared by HTML generation and the language UI. */
export function englishPagePath(pathname: string): string | null {
 const path = pathname.split(/[?#]/, 1)[0];
 if (/^\/park(?:\/|\/index(?:\.html)?)?$/.test(path)) return '/park/';
 const match = /^\/park\/(access|guide|attractions|tickets|attractions\/(?:skyport|inside|flight|ocean|fossil|coast|night))(?:\.html)?\/?$/.exec(path);
 return match ? '/park/' + match[1] : null;
}

/** Absolute URLs allow search crawlers to discover both language versions without running JS. */
export function renderLanguageAlternates(pathname: string): string {
 const path = englishPagePath(pathname);
 if (!path) return '';
 const base = 'https://mix.kaisei.shoug.org' + path;
 return ['ja', 'en', 'x-default'].map(lang => {
  const target = lang === 'en' ? 'en' : 'ja';
  return `<link rel="alternate" hreflang="${lang}" href="${base}?lang=${target}">`;
 }).join('\n');
}
