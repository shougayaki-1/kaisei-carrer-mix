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
