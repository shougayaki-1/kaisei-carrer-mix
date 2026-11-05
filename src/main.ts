import './style.css';
import { assumptions } from './assumptions';

const yenFormatter = new Intl.NumberFormat('ja-JP');

function formatMoney(yen: number): string {
  if (yen >= 100_000_000) {
    return (yen / 100_000_000).toFixed(2) + '億円';
  }
  if (yen >= 10_000) {
    return (yen / 10_000).toFixed(1) + '万円';
  }
  return yenFormatter.format(yen) + '円';
}

function putText(id: string, value: string): void {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function updateSimulation(visitorsPerDay: number): void {
  const yearVisitors = visitorsPerDay * assumptions.openDaysPerYear;
  const tickets = yearVisitors * assumptions.ticketPriceYen;
  const local = yearVisitors * assumptions.localSpendYen;
  const combined = tickets + local;

  const value = document.getElementById('visitor-value');
  if (value) {
    value.replaceChildren(document.createTextNode(yenFormatter.format(visitorsPerDay)));
    const unit = document.createElement('span');
    unit.textContent = '人';
    value.append(unit);
  }

  const visitors = document.getElementById('annual-visitors');
  if (visitors) {
    visitors.replaceChildren(document.createTextNode(yenFormatter.format(yearVisitors)));
    const unit = document.createElement('small');
    unit.textContent = '人';
    visitors.append(unit);
  }

  putText('ticket-revenue', formatMoney(tickets));
  putText('local-revenue', formatMoney(local));
  const ticketBar = document.getElementById('bar-ticket');
  const localBar = document.getElementById('bar-local');
  if (ticketBar && localBar && combined > 0) {
    ticketBar.style.width = ((tickets / combined) * 100).toFixed(2) + '%';
    localBar.style.width = ((local / combined) * 100).toFixed(2) + '%';
  }
}

const range = document.querySelector<HTMLInputElement>('#visitors');
if (range) {
  range.value = String(assumptions.initialVisitorsPerDay);
  range.addEventListener('input', () => updateSimulation(Number(range.value)));
  updateSimulation(Number(range.value));
}
putText('ticket-price', yenFormatter.format(assumptions.ticketPriceYen) + '円');
putText('local-spend', yenFormatter.format(assumptions.localSpendYen) + '円');
putText('open-days', yenFormatter.format(assumptions.openDaysPerYear) + '日');

const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav');

function closeMenu(): void {
  if (!menuButton || !mobileNav) return;
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
}

menuButton?.addEventListener('click', () => {
  if (!mobileNav) return;
  const nextOpen = mobileNav.hidden;
  mobileNav.hidden = !nextOpen;
  menuButton.setAttribute('aria-expanded', String(nextOpen));
  menuButton.setAttribute('aria-label', nextOpen ? 'メニューを閉じる' : 'メニューを開く');
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 920) closeMenu();
});

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, current) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        current.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
