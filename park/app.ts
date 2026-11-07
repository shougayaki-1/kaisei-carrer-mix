import { getLanguage } from './language';
import { englishAttraction } from './attractions-en';
import { englishTicketStatus } from './english-ticket';
import { readTicketSelection, writeTicketSelection } from './ticket-selection';
import { initTicketArtwork, presentIssuedTicket } from './ticket-artwork';
import { favoriteButton } from './favorites';
import { attractionAreaId } from './areas-data';
import { renderIcons } from './icons';
import './styles.css';
import './food.css';
import './schedule.css';
import './schedule-page';
import { getTicketScheduleStatus, isISODate, SCHEDULE_START, type PassId } from './schedule-data';
import { passes, calculateTicketTotal, ageLabels, type AgeType } from './ticket-data';
import { attractions, categoryLabels, attractionDetailHref, type Attraction, type AttractionCategory } from './attractions-data';

const qs = <T extends Element>(selector:string):T|null => document.querySelector<T>(selector);
const byId = (id:string):HTMLElement|null => document.getElementById(id);
const english = getLanguage() === 'en' && document.documentElement.lang === 'en';
const tr = (ja:string,en:string):string => english ? en : ja;
const yen = new Intl.NumberFormat(english ? 'en-US' : 'ja-JP');
const esc = (s:string):string => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] || c));
const openModal = qs<HTMLDialogElement>('#attraction-modal');
const modalTitle = byId('modal-title');
const modalDescription = byId('modal-description');
const modalZone = byId('modal-zone');
const modalDuration = byId('modal-duration');
const modalCondition = byId('modal-condition');
const modalPageLink = qs<HTMLAnchorElement>('#modal-page-link');
function showAttraction(original:Attraction):void{
  if (!openModal) return;
  const a=english ? englishAttraction(original) : original;
  if(modalTitle)modalTitle.textContent=a.title;
  if(modalDescription)modalDescription.textContent=a.description;
  if(modalZone)modalZone.textContent=a.zone;
  if(modalDuration)modalDuration.textContent=a.duration;
  if(modalCondition)modalCondition.textContent=a.condition;
  if(modalPageLink)modalPageLink.href=attractionDetailHref(a);
  openModal.showModal();
}
qs<HTMLButtonElement>('#modal-close')?.addEventListener('click',()=>openModal?.close());
openModal?.addEventListener('click',e=>{if(e.target===openModal)openModal.close();});

const grid=byId('attraction-grid');
const count=byId('attraction-count');
const search=qs<HTMLInputElement>('#attraction-search');
let category:AttractionCategory|'all'='all';
function renderAttractions():void{
  if(!grid)return;
  const q=search?.value.trim().toLocaleLowerCase('ja-JP')||'';
  const area=qs<HTMLSelectElement>('#filter-area')?.value || '';
  const setting=qs<HTMLSelectElement>('#filter-setting')?.value || '';
  const audience=qs<HTMLSelectElement>('#filter-audience')?.value || '';
  const theme=qs<HTMLSelectElement>('#filter-theme')?.value || '';
  const height=Number(qs<HTMLSelectElement>('#filter-height')?.value || 0);
  const results=attractions.filter(a=>(!theme || (theme==='learning' && ['inside','ocean','fossil','coast'].includes(a.id)) || (theme==='thrill' && ['skyport','flight'].includes(a.id))) && (!height || (a.condition.includes('身長') && Number(a.condition.match(/\d+/)?.[0])<=height)) && (!area||attractionAreaId[a.id]===area) && (!setting||(setting==='indoor' && ['skyport','inside','flight','ocean'].includes(a.id))||(setting==='outdoor' && ['coast','night'].includes(a.id))) && (!audience||(audience==='no-age' && ['inside','ocean','fossil','night'].includes(a.id))||(audience==='height' && a.condition.includes('身長'))) && (category==='all'||a.category===category) && (a.title+' '+a.en+' '+a.zone+' '+a.description+(english ? ' '+englishAttraction(a).zone+' '+englishAttraction(a).description : '')).toLocaleLowerCase('ja-JP').includes(q));
  grid.innerHTML=results.map(original=>{ const a=english ? englishAttraction(original) : original; return '<article class="attraction-card"><div class="attraction-visual visual-'+esc(a.visual)+'"><div class="attraction-badges"><span>'+esc(english ? ({ride:'Ride',discovery:'Discovery',ocean:'Ocean',show:'Show'} as const)[a.category] : categoryLabels[a.category])+'</span><span>'+esc(a.tag)+'</span></div><span class="photo-index">'+String(attractions.indexOf(original)+1).padStart(2,'0')+' / 07</span></div><div class="attraction-content"><span class="eyebrow">'+esc(a.en)+'</span><h3>'+esc(a.title)+'</h3><p>'+esc(a.tagline)+'</p>'+favoriteButton('attraction:'+a.id,a.title)+'<div class="card-foot"><span>'+esc(a.zone)+'</span><button type="button" data-attr="'+esc(a.id)+'" aria-label="'+esc(a.title)+tr('の概要を見る',' overview')+'">'+tr('概要を見る','Overview')+'</button></div><a class="card-page-link" href="'+attractionDetailHref(a)+'" aria-label="'+esc(a.title+tr('の体験詳細・利用条件を見る',' — full details and requirements'))+'">'+tr('体験の詳細・利用条件を見る','Full details and requirements')+' <span aria-hidden="true">↗</span></a></div></article>'; }).join('')||'<p class="no-results">'+tr('該当するアトラクションがありません。条件を変更してください。','No attractions match. Try changing the filters.')+'</p>';
  if(count)count.textContent=String(results.length)+tr('つのアトラクション',' attractions');
  grid.querySelectorAll<HTMLButtonElement>('[data-attr]').forEach(button=>button.addEventListener('click',()=>{
    const a=attractions.find(x=>x.id===button.dataset.attr);if(a)showAttraction(a);
  }));
}
qs<HTMLElement>('#category-filters')?.querySelectorAll<HTMLButtonElement>('button[data-category]').forEach(b=>{
  b.addEventListener('click',()=>{
    category=(b.dataset.category||'all') as AttractionCategory|'all';
    qs<HTMLElement>('#category-filters')?.querySelectorAll('button').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});
    renderAttractions();
  });
});
search?.addEventListener('input',renderAttractions);
document.querySelectorAll<HTMLSelectElement>('.attraction-conditions select').forEach(el=>el.addEventListener('change',renderAttractions));
renderAttractions();
// Allow a direct link to the existing detail modal until #2 adds a separate page.
const linkedAttraction = new URLSearchParams(window.location.search).get('attraction');
if (linkedAttraction === 'night' && grid) {
  const night = attractions.find(a => a.id === 'night');
  if (night) showAttraction(night);
}

// Client-side checkout simulation; no payment, booking or personal data is transmitted.
type PassType = PassId;
const dateField=qs<HTMLInputElement>('#visit-date');
const initialSelection = readTicketSelection(new URLSearchParams(dateField ? window.location.search : ''));
let activePass:PassType=initialSelection.pass;
const quantity:Record<AgeType,number>={...initialSelection.quantity};
function saveTicketSelection():void {
  if (!dateField) return;
  const url=writeTicketSelection(new URL(window.location.href), {pass:activePass,quantity});
  window.history.replaceState(null,'',url);
}
const ticketSchedule = () => english ? englishTicketStatus(dateField?.value || '', activePass) : getTicketScheduleStatus(dateField?.value || '', activePass);
const validDate=():boolean=>dateField !== null && isISODate(dateField.value) && dateField.value >= (dateField.min || '0000-00-00') && ticketSchedule().allowed;
if(dateField){
  // The simulator uses fictional model dates, independent of the visitor's current date.
  dateField.value = SCHEDULE_START;
  const linkedDate = new URLSearchParams(window.location.search).get('date') || '';
  if (isISODate(linkedDate)) dateField.value = linkedDate;
}
function ticketTotal():number{
  return calculateTicketTotal(activePass, quantity);
}
function updateTickets():void{
  (Object.keys(quantity) as AgeType[]).forEach(type=>{
    const v=byId('qty-'+type);if(v)v.textContent=String(quantity[type]);
    const minus=qs<HTMLButtonElement>('[data-age="'+type+'"][data-delta="-1"]');
    const plus=qs<HTMLButtonElement>('[data-age="'+type+'"][data-delta="1"]');
    if(minus)minus.disabled=quantity[type]<=0;
    if(plus)plus.disabled=quantity[type]>=9;
  });
  const current=passes[activePass];
  if(byId('selected-pass'))byId('selected-pass')!.textContent=current.label;
  if(byId('selected-date'))byId('selected-date')!.textContent=dateField?.value||tr('日付未選択','No date selected');
  if(byId('total-price'))byId('total-price')!.textContent=tr(yen.format(ticketTotal())+'円','¥'+yen.format(ticketTotal()));
  if(byId('selected-count'))byId('selected-count')!.textContent=String(Object.values(quantity).reduce((a,b)=>a+b,0))+(english?'':'名');
  const breakdown=byId('ticket-breakdown');
  if(breakdown)breakdown.textContent=(Object.keys(quantity) as AgeType[]).filter(age=>quantity[age]>0).map(age=>english ? `${({adult:'Adult',junior:'Youth',child:'Child'} as const)[age]} ¥${yen.format(current.prices[age])} × ${quantity[age]} = ¥${yen.format(current.prices[age]*quantity[age])}` : `${ageLabels[age]} ${yen.format(current.prices[age])}円 × ${quantity[age]}名 = ${yen.format(current.prices[age]*quantity[age])}円`).join(' / ') || tr('人数を選択してください。','Choose at least one guest.');
  const schedule = ticketSchedule();
  const scheduleNotice = byId('ticket-schedule-notice');
  if (scheduleNotice) {
    scheduleNotice.textContent = schedule.message + (schedule.warnings.length ? tr(' 注意：',' Warning: ') + schedule.warnings.join(' / ') : '');
    scheduleNotice.classList.toggle('is-unavailable', !schedule.allowed);
  }
  const scheduleLink = qs<HTMLAnchorElement>('#ticket-schedule-link');
  if (scheduleLink && dateField) scheduleLink.href = '/park/guide.html?date=' + encodeURIComponent(dateField.value) + '#operating-calendar';
  const purchaseButton=qs<HTMLButtonElement>('#demo-purchase');
  if(purchaseButton)purchaseButton.disabled=Object.values(quantity).every(x=>x===0)||!validDate();
}
qs<HTMLElement>('#pass-options')?.querySelectorAll<HTMLButtonElement>('[data-pass]').forEach(b=>{
  const selected=b.dataset.pass===activePass;
  b.classList.toggle('selected',selected);
  b.setAttribute('aria-pressed',String(selected));
  b.addEventListener('click',()=>{
  activePass=b.dataset.pass as PassType;
  qs<HTMLElement>('#pass-options')?.querySelectorAll<HTMLButtonElement>('[data-pass]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});
  saveTicketSelection();
  updateTickets();
});
});
document.querySelectorAll<HTMLButtonElement>('[data-age][data-delta]').forEach(b=>b.addEventListener('click',()=>{
  const age=b.dataset.age as AgeType;
  const delta=Number(b.dataset.delta);
  quantity[age]=Math.min(9,Math.max(0,quantity[age]+delta));saveTicketSelection();updateTickets();
}));
dateField?.addEventListener('change',()=>{
  const url=new URL(window.location.href);
  if (dateField.value) url.searchParams.set('date',dateField.value);
  else url.searchParams.delete('date');
  window.history.replaceState(null,'',url);
  updateTickets();
});
updateTickets();
qs<HTMLButtonElement>('#demo-purchase')?.addEventListener('click',()=>{
  const total=Object.values(quantity).reduce((a,b)=>a+b,0);
  if(total<1||!validDate())return;
  const dialog=qs<HTMLDialogElement>('#ticket-dialog');
  const content=byId('ticket-confirmation');
  if(content)content.textContent=passes[activePass].label+'｜'+(dateField?.value ?? '')+'｜'+total+tr('名｜',' guests | ')+(byId('ticket-breakdown')?.textContent || '')+tr('｜合計 ',' | Total ')+(english?'¥':'')+yen.format(ticketTotal())+tr('円。','.')+ticketSchedule().warnings.join(' ／ ');
  dialog?.showModal();
});
qs<HTMLButtonElement>('#ticket-close')?.addEventListener('click',()=>qs<HTMLDialogElement>('#ticket-dialog')?.close());

// Access explorer: only imaginary park-route descriptions, not real transit schedules.
const routes:Record<string,{title:string,route:string,description:string,tip:string}>={
  komatsu:{title:'小松空港から',route:'小松空港 → ダイナソー・スカイポート → ダイノシティ（福井駅エリア）',description:'空の玄関口から恐竜の世界へ。フライトシミュレーター演出で福井への旅へ出発します。',tip:'※ダイナソー・スカイポートはアトラクション演出です。小松空港から福井への実際の移動は連絡バスや鉄道をご利用ください。'},
  fukui:{title:'福井駅から',route:'福井駅 → ダイノシティ・メインエントランス → 各エリアへ',description:'新幹線を降りたら冒険の始まり。体内探検ライド、フライトシアター、夜のショーを巡るメインハブです。',tip:'※福井駅周辺の施設やアトラクションは体験モデルの設定です。実際の駅施設や営業情報は各運行事業者・施設をご確認ください。'},
  coast:{title:'若狭湾・越前海岸へ',route:'ダイノシティ → ディノ・トランジット → マリンワールド／ワイルドコースト',description:'福井駅から海へと広がる冒険の旅。古代の海洋展示や荒々しい日本海の絶景へと繋がります。',tip:'※ディノ・トランジットは世界観を繋ぐストーリー演出です。実際の移動にはハピラインふくい・小浜線や路線バスをご利用ください。'}
};
const routeResult=byId('route-result');
qs<HTMLElement>('#route-tabs')?.querySelectorAll<HTMLButtonElement>('button[data-route]').forEach(b=>b.addEventListener('click',()=>{
  const routeId=b.dataset.route||'komatsu';
  const enRoutes:typeof routes={komatsu:{title:'From Komatsu Airport',route:'Komatsu Airport → Dinosaur Skyport → Fukui Station Area',description:'Take off on an immersive flight simulator journey from the airport gateway towards Fukui.',tip:'Dinosaur Skyport is a park attraction concept. For real travel between Komatsu Airport and Fukui, please use actual airport buses or trains.'},fukui:{title:'From Fukui Station',route:'Fukui Station → Dino City Main Gateway → Park Areas',description:'Step off the Shinkansen straight into adventure: explore inside a dinosaur, fly over Fukui, and enjoy our evening show.',tip:'Park gateways and attractions are part of this concept model. Please consult real station and municipal resources for local travel.'},coast:{title:'To Wakasa Bay & Echizen Coast',route:'Dino City → Dino Transit → Coastal Areas',description:'Journey across Fukui to explore deep prehistory, from ancient marine depths to the rugged Sea of Japan coast.',tip:'Dino Transit is a story setting. For actual travel to the coasts, please use local trains and buses.'}};
  const route=(english?enRoutes:routes)[routeId];if(!route||!routeResult)return;
  qs<HTMLElement>('#route-tabs')?.querySelectorAll<HTMLButtonElement>('button').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});
  routeResult.innerHTML='<p class="eyebrow">'+esc(route.title)+'</p><h3>'+esc(route.route)+'</h3><p>'+esc(route.description)+'</p><div class="access-tip">'+esc(route.tip)+'</div>';
}));

initTicketArtwork(english);
qs<HTMLButtonElement>('#ticket-confirm-purchase')?.addEventListener('click',()=>{
 const date=dateField?.value||'';
 if(!validDate()||Object.values(quantity).every(v=>v===0))return;
 const numbers=new Uint8Array(5);crypto.getRandomValues(numbers);
 const code='DEMO-FDC-'+Array.from(numbers,n=>n.toString(16).padStart(2,'0')).join('').toUpperCase();
 const guests=Object.values(quantity).reduce((a,b)=>a+b,0);
 const ticket={code,date,pass:passes[activePass].label,guests,total:ticketTotal()};
 presentIssuedTicket(ticket,english);
 try{const current=JSON.parse(localStorage.getItem('fdc-tickets')||'[]') as object[];
   current.unshift(ticket);
   localStorage.setItem('fdc-tickets',JSON.stringify(current.slice(0,20)));
 }catch{/* Storage is optional; the issued ticket remains visible on screen. */}
 qs<HTMLDialogElement>('#ticket-dialog')?.close();
 qs<HTMLDialogElement>('#ticket-success')?.showModal();
});
const successDialog=qs<HTMLDialogElement>('#ticket-success');
qs<HTMLButtonElement>('#ticket-success-close')?.addEventListener('click',()=>successDialog?.close());
successDialog?.addEventListener('close',()=>qs<HTMLButtonElement>('#demo-purchase')?.focus());
const year=byId('park-year');
if(year)year.textContent=String(new Date().getFullYear());

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => renderIcons());
else renderIcons();
// Attraction cards are updated dynamically when filters or search change.
const legacyRenderAttractions=renderAttractions;
void legacyRenderAttractions;
