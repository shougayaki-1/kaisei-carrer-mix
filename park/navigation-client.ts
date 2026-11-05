/**
 * Progressive enhancement for native <details> menus.
 * Navigation links remain accessible when JavaScript does not run.
 */
const mobileMenu = document.querySelector<HTMLDetailsElement>('#park-mobile-menu');
const mobileToggle = mobileMenu?.querySelector<HTMLElement>(':scope > summary') || null;
const mobileNav = mobileMenu?.querySelector<HTMLElement>('.park-mobile-nav') || null;
const desktopMenus = Array.from(document.querySelectorAll<HTMLDetailsElement>('.park-desktop-nav > details'));
const mobileCategories = Array.from(document.querySelectorAll<HTMLDetailsElement>('.park-mobile-category'));

function closeMobile(restoreFocus = false): void {
  if (!mobileMenu?.open) return;
  mobileMenu.open = false;
  document.body.classList.remove('park-menu-open');
  if (restoreFocus) mobileToggle?.focus();
}

desktopMenus.forEach((menu) => {
  menu.addEventListener('toggle', () => {
    if (!menu.open) return;
    desktopMenus.forEach((other) => {
      if (other !== menu) other.open = false;
    });
  });
});

mobileMenu?.addEventListener('toggle', () => {
  const isOpen = mobileMenu.open && window.innerWidth <= 940;
  document.body.classList.toggle('park-menu-open', isOpen);
  if (!mobileMenu.open) mobileCategories.forEach((category) => { category.open = false; });
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => closeMobile());
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (mobileMenu?.open) {
    closeMobile(true);
    event.preventDefault();
    return;
  }
  const openDesktop = desktopMenus.find((menu) => menu.open);
  if (openDesktop) {
    openDesktop.open = false;
    openDesktop.querySelector<HTMLElement>('summary')?.focus();
    event.preventDefault();
  }
});

document.addEventListener('pointerdown', (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (mobileMenu?.open && !mobileNav?.contains(target) && !mobileToggle?.contains(target)) {
    closeMobile();
  }
  desktopMenus.forEach((menu) => {
    if (menu.open && !menu.contains(target)) menu.open = false;
  });
});

document.addEventListener('focusin', (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  // A normal Tab sequence may leave the menu; it is dismissed instead of trapping focus.
  if (mobileMenu?.open && !mobileMenu.contains(target)) closeMobile();
  desktopMenus.forEach((menu) => {
    if (menu.open && !menu.contains(target)) menu.open = false;
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 940) closeMobile();
  desktopMenus.forEach((menu) => { menu.open = false; });
});

// The served path can be an extensionless URL even when Vite built a .html file.
// Resolve active links against the browser URL, independent of the HTML transform's
// route metadata. Keep server-rendered links usable when JavaScript is disabled.
function currentParkPage(path: string): string {
  const pathname = path.split('?')[0].split('#')[0];
  if (/^\/park(?:\/|\/index(?:\.html)?)?$/.test(pathname)) return '/park/';
  if (pathname.startsWith('/park/') && !pathname.endsWith('/') && !/\.[^/]+$/.test(pathname)) {
    return pathname + '.html';
  }
  return pathname;
}

const activePath = currentParkPage(window.location.pathname);
const navigationRoot = document.querySelector('.park-header');
navigationRoot?.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
  const href = anchor.getAttribute('href') || '';
  // Fragment links represent sections, not the current page.
  if (!href.startsWith('/park/') || href.includes('#')) return;
  const current = currentParkPage(anchor.pathname) === activePath;
  if (current) anchor.setAttribute('aria-current', 'page');
  else anchor.removeAttribute('aria-current');
});
navigationRoot?.querySelectorAll<HTMLDetailsElement>('.park-nav-category, .park-mobile-category').forEach((group) => {
  const current = Array.from(group.querySelectorAll('a[href]')).some((anchor) => {
    const target = anchor.getAttribute('href') || '';
    return target.startsWith('/park/') && !target.includes('#') &&
      currentParkPage((anchor as HTMLAnchorElement).pathname) === activePath;
  }) || (activePath.startsWith('/park/attractions/') &&
    Boolean(group.querySelector('a[href="/park/attractions.html"]')));
  group.classList.toggle('is-current', current);
  const summary = group.querySelector('summary');
  if (current) summary?.setAttribute('aria-current', 'location');
  else summary?.removeAttribute('aria-current');
});
