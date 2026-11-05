/**
 * Single source of truth for the park header, mobile menu and footer.
 * Only register routes after the matching page and links are available.
 * All park HTML entries, including nested directories, are discovered by Vite.
 */
export interface ParkNavLink {
  label: string;
  href: string;
  description?: string;
  /** Highlight this group on nested detail pages without marking the list link as current. */
  activePrefixes?: readonly string[];
}

export interface ParkNavGroup {
  id: string;
  title: string;
  english: string;
  links: readonly ParkNavLink[];
}

export const parkNavGroups: readonly ParkNavGroup[] = [
  {
    id: 'explore',
    title: '楽しむ',
    english: 'EXPLORE',
    links: [
      { label: 'アトラクション', href: '/park/attractions.html', description: '7つの冒険を探す', activePrefixes: ['/park/attractions/'] },
      { label: 'レストラン・カフェ', href: '/park/dining.html', description: '3つの食事スポット' },
      { label: 'ショップ・グッズ', href: '/park/shops.html', description: '2つのお土産ショップ' },
      { label: 'エリアガイド', href: '/park/access.html#area-fukui', description: '県全域の5つのエリア' },
    ],
  },
  {
    id: 'plan',
    title: '計画する',
    english: 'PLAN YOUR VISIT',
    links: [
      { label: 'チケット・料金', href: '/park/tickets.html', description: '券種と料金シミュレーション' },
      { label: 'アクセス・エリアマップ', href: '/park/access.html', description: '旅の始まりと移動の案内' },
      { label: '営業時間・ガイド', href: '/park/guide.html', description: '来園前に確認すること' },
    ],
  },
  {
    id: 'support',
    title: 'サポート',
    english: 'GUEST SUPPORT',
    links: [
      { label: 'ゲストサービス', href: '/park/guide.html#guest-services', description: '設備と安心のサポート' },
      { label: 'よくある質問', href: '/park/guide.html#faq', description: '疑問を解決する' },
      { label: '学校団体向け', href: '/park/guide.html#school-program', description: '学びを深める体験' },
    ],
  },
];

/** No browser APIs: this is rendered at build time and by the Vite dev server. */
const htmlEntities: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};
const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);

function normalizePage(path: string): string {
  const pathname = path.split('?')[0].split('#')[0];
  // Cloudflare/Vite serves /park/attractions.html at the clean URL /park/attractions.
  // Treat both forms as the same page for current-location highlighting.
  if (/^\/park(?:\/|\/index(?:\.html)?)?$/.test(pathname)) return '/park/';
  if (pathname.startsWith('/park/') && !pathname.endsWith('/') && !/\.[^/]+$/.test(pathname)) {
    return pathname + '.html';
  }
  return pathname;
}

function brand(): string {
  return '<a class="brand" href="/park/" aria-label="FUKUI DINO CITY パークTOP">' +
    '<span class="brand-icon"><i data-lucide="mountain" aria-hidden="true"></i></span>' +
    '<span class="brand-name">FUKUI <b>DINO CITY</b>' +
    '<small>THE ENTIRE PREFECTURE IS YOUR PARK</small></span></a>';
}

function linksForGroup(group: ParkNavGroup, current: string, variant: 'desktop' | 'mobile'): string {
  return '<ul class="park-nav-items">' + group.links.map((link) => {
    const isCurrent = !link.href.includes('#') && normalizePage(link.href) === current;
    const currentAttribute = isCurrent ? ' aria-current="page"' : '';
    const description = variant === 'desktop' && link.description
      ? '<small>' + escapeHtml(link.description) + '</small>' : '';
    return '<li><a href="' + escapeHtml(link.href) + '"' + currentAttribute + '>' +
      '<span>' + escapeHtml(link.label) + '</span>' + description + '</a></li>';
  }).join('') + '</ul>';
}

export function renderParkHeader(path: string): string {
  const current = normalizePage(path);
  const homeCurrent = current === '/park/' ? ' aria-current="page"' : '';
  const desktopCategories = parkNavGroups.map((group) => {
    const isCurrent = group.links.some((link) =>
      normalizePage(link.href) === current || link.activePrefixes?.some((prefix) => current.startsWith(prefix)));
    return '<details class="park-nav-category' + (isCurrent ? ' is-current' : '') + '">' +
      '<summary' + (isCurrent ? ' aria-current="location"' : '') + '><span>' + escapeHtml(group.title) +
      '</span><span class="park-nav-chevron" aria-hidden="true"></span></summary>' +
      '<div class="park-nav-popover">' +
      '<p class="park-nav-eyebrow">' + escapeHtml(group.english) + '</p>' +
      '<p class="park-nav-heading">' + escapeHtml(group.title) + '</p>' +
      linksForGroup(group, current, 'desktop') + '</div></details>';
  }).join('');
  const mobileCategories = parkNavGroups.map((group) =>
    '<details class="park-mobile-category">' +
    '<summary' + (group.links.some((link) => normalizePage(link.href) === current ||
      link.activePrefixes?.some((prefix) => current.startsWith(prefix))) ? ' aria-current="location"' : '') +
    '>' + escapeHtml(group.title) +
    '<span aria-hidden="true" class="park-mobile-chevron"></span></summary>' +
    linksForGroup(group, current, 'mobile') + '</details>'
  ).join('');

  return '<header class="park-header"><div class="wrap header-inner">' +
    brand() +
    '<nav class="park-desktop-nav" aria-label="パークのメインナビゲーション">' +
    '<a class="park-home-link" href="/park/"' + homeCurrent + '>パークTOP</a>' +
    desktopCategories + '</nav>' +
    '<a class="header-ticket" href="/park/tickets.html">' +
    '<i data-lucide="ticket" aria-hidden="true"></i><span>チケットを選ぶ</span>' +
    '<i data-lucide="arrow-right" aria-hidden="true"></i></a>' +
    '<details class="park-mobile-menu" id="park-mobile-menu">' +
    '<summary class="park-mobile-toggle"><span class="park-hamburger" aria-hidden="true"></span>' +
    '<span>メニュー</span></summary>' +
    '<nav class="park-mobile-nav" aria-label="モバイルナビゲーション">' +
    '<a class="park-mobile-home" href="/park/"' + homeCurrent + '>パークTOP</a>' +
    mobileCategories +
    '<a class="park-mobile-ticket" href="/park/tickets.html">チケットを選ぶ' +
    '<i data-lucide="arrow-right" aria-hidden="true"></i></a>' +
    '</nav></details></div></header>';
}

export function renderParkFooter(): string {
  const sections = parkNavGroups.map((group) =>
    '<nav class="park-footer-column" aria-label="' + escapeHtml(group.title) + '">' +
    '<h2>' + escapeHtml(group.title) + '</h2>' +
    '<ul>' + group.links.map((link) => '<li><a href="' + escapeHtml(link.href) + '">' +
      escapeHtml(link.label) + '</a></li>').join('') + '</ul></nav>'
  ).join('');
  return '<footer class="site-footer"><div class="wrap park-footer-grid">' +
    '<div class="park-footer-about">' + brand() +
    '<p>福井県全体が、ひとつの冒険になる。<br>あなたの旅を、ここから。</p></div>' +
    sections +
    '<nav class="park-footer-column park-footer-about-links" aria-label="パークについて">' +
    '<h2>パークについて</h2><ul>' +
    '<li><a href="/park/">パークTOP</a></li>' +
    '<li><a href="/park/guide.html#guest-services">アクセシビリティ</a></li>' +
    '<li><a href="/">事業構想について</a></li>' +
    '</ul></nav></div>' +
    '<div class="wrap park-footer-bottom">' +
    '<p class="park-footer-notice">授業で制作した架空のパーク構想です。実際の予約・決済には対応していません。</p>' +
    '<p>© <span id="park-year">' + String(new Date().getFullYear()) +
    '</span> FUKUI DINO CITY</p></div></footer>';
}
