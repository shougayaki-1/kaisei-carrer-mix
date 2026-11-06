/**
 * Shared navigation bootstrap. Vite injects this for EVERY park HTML page,
 * including independent attraction, dining and shop entrypoints.
 */
import './styles.css';
import './navigation.css';
import './search.css';
import './navigation-client';
import { renderIcons } from './icons';

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
