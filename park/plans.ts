import { favoriteButton } from './favorites';
import { plans } from './plans-data';
import { areaById } from './areas-data';
import { findTransportRoute } from './transport-data';

const root = document.querySelector<HTMLElement>('#plans-list');
const escape = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] || c));
const planActions = [
  { href: '/park/tickets.html', label: 'チケットを比較する', primary: true },
  { href: '/park/guide.html#operating-calendar', label: '営業カレンダーを見る', primary: false },
  { href: '/park/access.html#geo-explorer', label: '地図で位置を確認', primary: false },
] as const;

function renderPlanActions(planTitle: string): string {
  return `<nav class="plan-actions" aria-label="${escape(planTitle)}の関連リンク">${planActions.map(({ href, label, primary }) =>
    `<a class="plan-action${primary ? ' plan-action--primary' : ''}" href="${escape(href)}">${escape(label)}</a>`
  ).join('')}</nav>`;
}

if (root) root.innerHTML = plans.map(plan => {
  let previous = plan.start;
  const stops = plan.stops.map(stop => {
    const from = previous; previous = stop.area;
    const journey = from === stop.area ? '' : `<li class="plan-transfer"><strong>移動：${escape(areaById[from].name)} → ${escape(areaById[stop.area].name)}</strong><p>${findTransportRoute(from,stop.area).map(({leg,outward}) => escape(outward ? leg.outward : leg.returnTrip)).join(' ')}</p><a href="/park/transport.html?from=${from}&amp;to=${stop.area}">乗り継ぎ案内を見る</a></li>`;
    return `${journey}<li class="plan-stop"><p class="plan-period">${escape(stop.period)} · ${escape(areaById[stop.area].name)}</p><h4>${escape(stop.title)}</h4><p>${escape(stop.description)}</p><a href="${escape(stop.href)}">${escape(stop.link)} →</a></li>`;
  }).join('');
  const returnJourney = previous === plan.end ? '' : `<li class="plan-transfer"><strong>帰路：${escape(areaById[previous].name)} → ${escape(areaById[plan.end].name)}</strong><p>${findTransportRoute(previous,plan.end).map(({leg,outward}) => escape(outward ? leg.outward : leg.returnTrip)).join(' ')}</p><a href="/park/transport.html?from=${previous}&amp;to=${plan.end}">帰りの交通を確認</a></li>`;
  return `<article class="plan-card" id="${escape(plan.id)}"><div class="plan-heading"><p class="eyebrow highlight">${escape(plan.duration)} / ${escape(plan.audience)}</p><h3>${escape(plan.title)}</h3>${favoriteButton(`plan:${plan.id}`,plan.title)}<p>${escape(plan.intro)}</p><p><strong>出発：</strong>${escape(areaById[plan.start].name)}　<strong>到着：</strong>${escape(areaById[plan.end].name)}</p></div><ol class="plan-timeline">${stops}${returnJourney}</ol><div class="plan-notes"><p><strong>雨の日：</strong>${escape(plan.rain)}</p><p><strong>おすすめのパス：</strong>${escape(plan.ticket)}。※利用基準は各アトラクション詳細をご確認ください。実際の交通費・食事・宿泊費は含まれません。</p>${renderPlanActions(plan.title)}</div></article>`;
}).join('');
