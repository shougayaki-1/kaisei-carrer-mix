/**
 * Shared navigation bootstrap. Vite injects this for EVERY park HTML page,
 * including independent attraction, dining and shop entrypoints.
 */
import './styles.css';
import './navigation.css';
import './search.css';
import './navigation-client';
import './language-ui';
import { getLanguage } from './language';
import { renderEnglishTicket } from './english-ticket';
import { renderEnglishAttractions } from './english-attractions';
import { renderEnglishHome } from './english-home';
import { renderEnglishAccess } from './english-access';
import { renderEnglishGuide } from './english-guide';

if (getLanguage() === 'en' && /^\/park\/tickets(?:\.html)?\/?$/.test(location.pathname)) {
  document.documentElement.lang = 'en';
  document.title = 'Tickets and prices | FUKUI DINO CITY';
  document.querySelector('meta[name=description]')?.setAttribute('content', 'Compare fictional passes and try the FUKUI DINO CITY ticket demo.');
  renderEnglishTicket();
}
import { renderIcons } from './icons';

if (getLanguage() === 'en' && /^\/park\/attractions(?:\.html)?\/?$/.test(location.pathname)) {
  document.documentElement.lang = 'en';
  document.title = 'Attractions | FUKUI DINO CITY';
  document.querySelector('meta[name=description]')?.setAttribute('content', 'Explore fictional attractions across Fukui and learn about their requirements.');
  renderEnglishAttractions();
}

const pages = [
  {path:/^\/park(?:\/|\/index(?:\.html)?)?$/, title:'Park home', render:renderEnglishHome},
  {path:/^\/park\/access(?:\.html)?\/?$/, title:'Access and map', render:renderEnglishAccess},
  {path:/^\/park\/guide(?:\.html)?\/?$/, title:'Hours and visitor guide', render:renderEnglishGuide},
];
const page = pages.find(item => item.path.test(location.pathname));
if (getLanguage() === 'en' && page) {
  document.documentElement.lang = 'en';
  document.title = page.title + ' | FUKUI DINO CITY';
  document.querySelector('meta[name=description]')?.setAttribute('content', page.title + ' for the fictional FUKUI DINO CITY concept.');
  page.render();
}

const mountNavigationIcons = (): void => {
  const header = document.querySelector('.park-header');
  const footer = document.querySelector('.site-footer');
  if (header) renderIcons(header);
  if (footer) renderIcons(footer);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountNavigationIcons, { once: true });
} else {
  mountNavigationIcons();
}
