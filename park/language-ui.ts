import { getLanguage, setLanguage } from './language';
import './language.css';

const englishNavigation: Record<string, string> = {
 'パークTOP':'Park home','楽しむ':'Explore','計画する':'Plan','サポート':'Support',
 'ニュース・イベント':'News & events','最新の物語と企画':'Stories and events','アトラクション':'Attractions','7つの冒険を探す':'Explore seven experiences',
 'レストラン・カフェ':'Dining','3つの食事スポット':'Three dining concepts','ショップ・グッズ':'Shopping','2つのお土産ショップ':'Two shop concepts',
 'エリアガイド':'Area guide','県全域の5つのエリア':'Five destinations','モデルコース':'Itineraries','旅の順路を考える':'Plan your route',
 '宿泊エリアガイド':'Where to stay','旅の拠点を選ぶ':'Choose a base','チケット・料金':'Tickets and prices','券種と料金シミュレーション':'Compare and simulate tickets',
 'アクセス・エリアマップ':'Access and map','旅の始まりと移動の案内':'Plan your arrival and travel','エリア間の交通':'Getting around','実際の移動を計画する':'Plan real-world transport',
 '営業時間・ガイド':'Hours and guide','来園前に確認すること':'Before you visit','ゲストサービス':'Guest services','設備と安心のサポート':'Facilities and support',
 'よくある質問':'FAQ','疑問を解決する':'Common questions','学校団体向け':'School groups','学びを深める体験':'Learning experiences',
 '検索・お気に入り':'Search & favorites','チケットを選ぶ':'Choose tickets','メニュー':'Menu','パークについて':'About the park',
 'アクセシビリティ':'Accessibility','事業構想について':'About the concept',
 '授業で制作した架空のパーク構想です。実際の予約・決済には対応していません。':'This is a fictional park concept created for a school project. No actual bookings or payments are available.'
};

/** Pages without a complete translation remain explicitly Japanese. */
export function hasEnglishPage(path = location.pathname): boolean {
 return /^\/park(?:\/|\/index(?:\.html)?)?$/.test(path) || /^\/park\/(access|guide)(?:\.html)?\/?$/.test(path) || /^\/park\/attractions(?:\.html)?\/?$/.test(path) || /^\/park\/tickets(?:\.html)?\/?$/.test(path) || /^\/park\/attractions\/(skyport|inside|flight|ocean|fossil|coast|night)(?:\.html)?\/?$/.test(path);
}
function translateNavigation(): void {
 for (const root of document.querySelectorAll('.park-header, .site-footer')) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
   const key = node.data.trim();
   if (englishNavigation[key]) node.data = node.data.replace(key, englishNavigation[key]);
  }
 }
 document.querySelectorAll<HTMLElement>('.park-header [aria-label], .site-footer [aria-label]').forEach(el=>{
  const label=el.getAttribute('aria-label') || '';
  const labels:Record<string,string>={'パークのメインナビゲーション':'Main navigation','モバイルナビゲーション':'Mobile navigation','FUKUI DINO CITY パークTOP':'FUKUI DINO CITY park home','楽しむ':'Explore','計画する':'Plan','サポート':'Support','パークについて':'About the park'};
  if(labels[label])el.setAttribute('aria-label',labels[label]);
 });
 const about=document.querySelector('.park-footer-about p');
 if(about)about.textContent='All of Fukui becomes one adventure. Start your journey here.';
}
function initLanguageUI():void {
 const english=getLanguage()==='en';
 const available=hasEnglishPage();
 const header=document.querySelector('.park-header .header-inner');
 if (!header) return;
 const wrapper=document.createElement('div');
 wrapper.className='park-language';
 wrapper.innerHTML='<label for="park-language-select">Language / 言語</label><select id="park-language-select" aria-label="Language / 言語"><option value="ja">日本語</option><option value="en">English</option></select>';
 header.insertBefore(wrapper, header.querySelector('.park-mobile-menu'));
 const select=wrapper.querySelector<HTMLSelectElement>('select')!;
 select.value=english?'en':'ja';
 select.addEventListener('change',()=>setLanguage(select.value==='en'?'en':'ja'));
 // Preserve the language even when browser storage is unavailable, without
 // discarding existing date/filter query parameters or fragment identifiers.
 document.addEventListener('click', event => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || !url.pathname.startsWith('/park/')) return;
  url.searchParams.set('lang', getLanguage());
  link.href = url.href;
 }, {capture:true});
 if (available) {
  // The language-specific query identifies the translated version of the same route.
  const canonical = new URL(location.pathname, location.origin);
  for (const [rel, lang, value] of [['canonical', '', english ? 'en' : 'ja'], ['alternate', 'ja', 'ja'], ['alternate', 'en', 'en'], ['alternate', 'x-default', 'ja']]) {
   const url = new URL(canonical);
   url.searchParams.set('lang', value);
   const link = document.createElement('link');
   link.rel = rel;
   if (lang) link.hreflang = lang;
   link.href = url.href;
   document.head.append(link);
  }
 }
 if(english && available) translateNavigation();
 if(english && !available) {
  const notice=document.createElement('p');
  notice.className='language-unavailable wrap';
  notice.setAttribute('lang','en');
  notice.textContent='This page is currently available in Japanese. Your English preference will be kept for translated pages.';
  document.querySelector('main')?.before(notice);
 }
}
initLanguageUI();
