const filters = document.querySelector<HTMLElement>('#news-filters');
const articles = [...document.querySelectorAll<HTMLElement>('.event-detail[data-event-category]')];
const status = document.querySelector<HTMLElement>('#news-filter-status');
if (filters && articles.length) {
  filters.hidden = false;
  window.addEventListener('hashchange', () => {
    const target = articles.find(article => '#'+article.id === location.hash);
    if (target?.hidden) {
      articles.forEach(article => { article.hidden = false; });
      filters.querySelectorAll<HTMLButtonElement>('button').forEach(item => item.setAttribute('aria-pressed', String(item.dataset.category === 'all')));
      if (status) status.textContent = `${articles.length}件の記事を表示しています。`;
      target.scrollIntoView();
    }
  });
  filters.querySelectorAll<HTMLButtonElement>('button').forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.category || 'all';
    let visible = 0;
    articles.forEach(article => { article.hidden = category !== 'all' && article.dataset.eventCategory !== category; if (!article.hidden) visible++; });
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    if (status) status.textContent = `${visible}件の記事を表示しています。`;
  }));
}

export {};
