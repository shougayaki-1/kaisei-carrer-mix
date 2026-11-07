import './app';
import { favoriteButton } from './favorites';
import './food.css';
import { renderIcons } from './icons';
import { restaurants, shops, venueHref, type FoodArea, type Venue } from './food-data';

const page = document.body.dataset.catalog;
const venues: Venue[] = page === 'dining' ? restaurants : page === 'shops' ? shops : [];
const list = document.querySelector<HTMLElement>('#food-card-grid');
const details = document.querySelector<HTMLElement>('#food-venue-details');
const count = document.querySelector<HTMLElement>('#food-result-count');
const filters = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-food-filter]'));
const yen = new Intl.NumberFormat('ja-JP');
const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, c => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c] || c));
const price = (value:number):string => '¥' + yen.format(value) + '（税込）';
let activeArea: FoodArea | 'all' = 'all';

function card(venue:Venue):string {
  const name=escapeHtml(venue.name);
  const id=escapeHtml(venue.id);
  return `<article class="food-card" data-area="${escapeHtml(venue.area)}">
    <a class="food-card-visual" href="${escapeHtml(venueHref(venue))}" aria-label="${name} の詳細を見る">
      <img src="${escapeHtml(venue.sceneImage)}" alt="${escapeHtml(venue.sceneAlt)}" loading="lazy" decoding="async">
      <span class="food-card-area">${escapeHtml(venue.areaLabel)}</span>
    </a>
    <div class="food-card-copy">
      <p class="eyebrow">${escapeHtml(venue.en)}</p>
      <h3><a href="#venue-${id}">${name}</a></h3>
      <p>${escapeHtml(venue.tagline)}</p>${venue.type==='dining'?favoriteButton(`venue:${venue.id}`,venue.name):''}
      <div class="food-card-bottom">
        <span>${escapeHtml(venue.hours.replace('（企画上の設定）',''))}</span>
        <a href="#venue-${id}">店舗の詳細を見る <i data-lucide="arrow-up-right" aria-hidden="true"></i></a>
      </div>
    </div>
  </article>`;
}

function detail(venue: Venue,index:number): string {
  const isDining=venue.type==='dining';
  const rows=venue.items.map(item=>`<li class="food-item">
    <div><div class="food-item-name">${escapeHtml(item.name)}${item.label ? ` <span class="food-item-badge">${escapeHtml(item.label)}</span>` : ''}</div>
    <p>${escapeHtml(item.description)}</p></div><strong>${price(item.price)}</strong>
  </li>`).join('');
  const notices=venue.information.map(item=>`<li>${escapeHtml(item)}</li>`).join('');
  return `<article class="food-venue" id="venue-${escapeHtml(venue.id)}" data-area="${escapeHtml(venue.area)}" aria-labelledby="venue-title-${escapeHtml(venue.id)}">
    <div class="food-venue-heading"><div>
      <p class="eyebrow">0${index+1} / ${isDining?'DINING EXPERIENCE':'SHOPPING EXPERIENCE'}</p>
      <p class="food-venue-area">${escapeHtml(venue.areaLabel)}</p>
      <h2 id="venue-title-${escapeHtml(venue.id)}">${escapeHtml(venue.name)}</h2>
      <p class="food-venue-tagline">${escapeHtml(venue.tagline)}</p>
      <p class="food-venue-lead">${escapeHtml(venue.description)}</p>
    </div><a class="food-map-link" href="/park/access.html#area-${escapeHtml(venue.area)}">
      <i data-lucide="map" aria-hidden="true"></i> エリア案内を見る
    </a></div>
    <div class="food-gallery">
      <figure class="food-gallery-scene"><img src="${escapeHtml(venue.sceneImage)}" alt="${escapeHtml(venue.sceneAlt)}" loading="lazy" decoding="async"><figcaption>${isDining?'店舗内装イメージ':'店内イメージ'}</figcaption></figure>
      <figure class="food-gallery-focus"><img src="${escapeHtml(venue.focusImage)}" alt="${escapeHtml(venue.focusAlt)}" loading="lazy" decoding="async"><figcaption>${isDining?'おすすめメニュー':'注目アイテム'}</figcaption></figure>
    </div>
    <div class="food-venue-content">
      <div class="food-venue-menu">
        <div class="food-subhead"><p class="eyebrow">${isDining?'FEATURED MENU':'FEATURED GOODS'}</p><h3>${isDining?'おすすめメニュー':'主な商品'}</h3><p>価格はすべて税込です。</p></div>
        <ul class="food-item-list">${rows}</ul>
      </div>
      <aside class="food-venue-aside" aria-label="${escapeHtml(venue.name)} の利用案内">
        <p class="eyebrow">STORE GUIDE</p><h3>店舗情報・ご案内</h3>
        <dl><div><dt>エリア</dt><dd>${escapeHtml(venue.areaLabel)}</dd></div>
        <div><dt>営業時間</dt><dd>${escapeHtml(venue.hours)}</dd></div>
        <div><dt>利用スタイル</dt><dd>${escapeHtml(venue.style)}</dd></div></dl>
        <ul class="food-information">${notices}</ul>
        <a class="food-aside-link" href="/park/attractions.html">近くの体験：${escapeHtml(venue.related)} <i data-lucide="arrow-up-right" aria-hidden="true"></i></a>
      </aside>
    </div>
  </article>`;
}

function render():void {
  if (!list || !details) return;
  const visible=venues.filter(venue=>activeArea==='all'||venue.area===activeArea);
  list.innerHTML=visible.map(card).join('');
  details.innerHTML=visible.map(venue=>detail(venue,venues.indexOf(venue))).join('');
  if(count)count.textContent=`${visible.length}件の${page==='dining'?'レストラン':'ショップ'}を表示中`;
  filters.forEach(btn=>{
    const selected=btn.dataset.foodFilter===activeArea;
    btn.classList.toggle('selected',selected);
    btn.setAttribute('aria-pressed',String(selected));
  });
  renderIcons(list);
  renderIcons(details);
}

filters.forEach(button=>button.addEventListener('click',()=>{
  activeArea=(button.dataset.foodFilter||'all') as FoodArea|'all';
  render();
}));

// Hash links remain functional even when an area filter is active.
window.addEventListener('hashchange',()=>{
  const id=window.location.hash.slice(1);
  const venue=venues.find(item=>'venue-'+item.id===id);
  if(venue&&activeArea!=='all'&&venue.area!==activeArea){activeArea='all';render();}
  if(venue)requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));
});
render();
// A link from an area guide can open this page with a venue fragment.
if(window.location.hash.startsWith('#venue-')){
  const id=window.location.hash.slice(1);
  requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({block:'start'}));
}
