
import { attractions, attractionDetailHref, categoryLabels, type Attraction } from './attractions-data';
import { renderIcons } from './icons';
import { getLanguage } from './language';
import { englishAttraction } from './attractions-en';
import './styles.css';
const esc=(s:string):string=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
const root=document.getElementById('attraction-detail-root');
const english = getLanguage() === 'en';
const tr = (ja:string,en:string):string => english ? en : ja;
const original=attractions.find(a=>a.id===root?.dataset.attractionId);
const item=original && (english ? englishAttraction(original) : original);
const categories = english ? {ride:'Ride',discovery:'Discovery',ocean:'Ocean',show:'Show'} : categoryLabels;
if (english && item) { document.documentElement.lang='en'; document.title = item.en + ' | FUKUI DINO CITY'; document.querySelector('meta[name=description]')?.setAttribute('content', item.description); }
const relatedCard=(a:Attraction):string=>'<a href="'+attractionDetailHref(a)+'"><img src="'+esc(a.detail.gallery[0].src)+'" alt="'+esc(a.detail.gallery[0].alt)+'" loading="lazy" decoding="async"><div class="ad-related__body"><p class="eyebrow">'+esc(a.en)+'</p><h3>'+esc(a.title)+'</h3><p>'+esc(a.tagline)+'</p><span class="ad-related__link">'+tr('体験を見る ↗','Explore ↗')+'</span></div></a>';
if(root&&item){
 const a=item,d=a.detail;
 const related=d.relatedIds.map(id=>attractions.find(x=>x.id===id)).filter((x):x is Attraction=>Boolean(x)).map(x=>english ? englishAttraction(x) : x);
 root.innerHTML=`
 <div class="wrap breadcrumb ad-breadcrumb"><a href="/park/">${tr('パークTOP','Park home')}</a> / <a href="/park/attractions.html">${tr('アトラクション','Attractions')}</a> / ${esc(a.title)}</div>
 <section class="ad-hero" aria-labelledby="ad-title"><img class="ad-hero__image" src="${esc(d.gallery[0].src)}" alt="${esc(d.gallery[0].alt)}" fetchpriority="high">
 <div class="wrap ad-hero__inner"><p class="eyebrow">ATTRACTION / ${esc(categories[a.category])}</p><h1 id="ad-title">${esc(a.title)}</h1><p class="ad-hero__english">${esc(a.en)}</p><p class="ad-hero__lead">${esc(a.tagline)}</p>
 <div class="ad-hero__actions"><a href="#ad-story" class="button button-bright">${tr('体験の世界を見る','Explore the experience')} <i data-lucide="arrow-right" aria-hidden="true"></i></a><a href="/park/attractions.html" class="button button-ghost">${tr('すべての体験へ','All attractions')}</a></div></div></section>
 <div class="wrap">
 <section class="ad-section ad-overview" id="ad-story" aria-labelledby="ad-story-title"><div class="ad-story"><p class="eyebrow">THE EXPERIENCE</p><h2 id="ad-story-title">${esc(d.storyTitle)}</h2>${d.story.map(p=>'<p>'+esc(p)+'</p>').join('')}</div>
 <aside class="ad-facts" aria-labelledby="ad-facts-title"><h2 id="ad-facts-title">${tr('アトラクション情報','Attraction information')}</h2><dl>
 <div><dt>${tr('エリア','Area')}</dt><dd>${esc(a.zone)}</dd></div><div><dt>${tr('体験時間','Duration')}</dt><dd>${esc(a.duration)}</dd></div>
 <div><dt>${tr('利用条件','Requirements')}</dt><dd>${esc(a.condition)}</dd></div><div><dt>${tr('カテゴリー','Category')}</dt><dd>${esc(categories[a.category])}</dd></div>
 <div><dt>${tr('屋内外・体験方式','Setting and format')}</dt><dd>${esc(d.environment)}</dd></div><div><dt>${tr('アクセシビリティ','Accessibility')}</dt><dd>${esc(d.accessibility)}</dd></div></dl>
 <p class="ad-facts__notice">${tr('※ 所要時間や利用条件は目安です。天候や安全点検等により、予告なく運営内容を変更または休止する場合があります。','Durations and requirements are guidelines. Operations may change or be suspended due to weather or safety inspections.')}</p></aside></section>
 <section class="ad-section" aria-labelledby="ad-gallery-title"><p class="eyebrow">PHOTO GALLERY</p><h2 id="ad-gallery-title">${tr('体験の風景','Gallery')}</h2><div class="ad-gallery">
 ${d.gallery.map(g=>'<figure><img src="'+esc(g.src)+'" alt="'+esc(g.alt)+'" loading="lazy" decoding="async"><figcaption>'+esc(g.caption)+'</figcaption></figure>').join('')}</div></section>
 <section class="ad-section" aria-labelledby="ad-steps-title"><p class="eyebrow">YOUR JOURNEY</p><h2 id="ad-steps-title">${tr('体験の流れ','Your journey')}</h2><ol class="ad-steps">
 ${d.steps.map(s=>'<li><h3>'+esc(s.title)+'</h3><p>'+esc(s.text)+'</p></li>').join('')}</ol></section>
 <section class="ad-section" aria-labelledby="ad-safety-title"><p class="eyebrow">GOOD TO KNOW</p><h2 id="ad-safety-title">${tr('ご利用前のご案内','Before you visit')}</h2>
 <div class="ad-safety"><div><h3>${tr('条件・注意事項','Conditions and cautions')}</h3><ul>${d.cautions.map(c=>'<li>'+esc(c)+'</li>').join('')}</ul></div>
 <div><h3>${tr('各種サポート・来園ガイド','Support and visitor guide')}</h3><p>${esc(d.accessibility)}</p><a href="/park/guide.html" class="button button-outline">${tr('営業時間・ゲストガイド','Hours and guest guide')} <i data-lucide="arrow-right" aria-hidden="true"></i></a></div></div></section>
 <section class="ad-section" aria-labelledby="ad-related-title"><p class="eyebrow">KEEP EXPLORING</p><h2 id="ad-related-title">${tr('次に巡りたい体験','Explore next')}</h2><div class="ad-related">${related.map(relatedCard).join('')}</div></section>
 </div>
 <section class="ad-final"><div class="wrap"><div><p class="eyebrow">PLAN YOUR ADVENTURE</p><h2>${tr('冒険の続きを、計画しよう。','Plan your next adventure.')}</h2></div><a href="/park/tickets.html" class="button button-bright">${tr('チケット・料金を見る','Tickets and prices')} <i data-lucide="arrow-right" aria-hidden="true"></i></a></div></section>
 <p class="wrap ad-footnote">${tr('※ 掲載内容は FUKUI DINO CITY の体験モデル設定・イメージです。実際の施設予約・交通運行を示すものではありません。','Experiences and images are for the FUKUI DINO CITY concept model; they do not indicate real facility reservations or transport services.')}</p>`;
 renderIcons(root);
}else if(root){root.innerHTML=`<div class="wrap ad-section"><h1>${tr('アトラクションが見つかりません','Attraction not found')}</h1><p><a href="/park/attractions.html">${tr('アトラクション一覧へ','All attractions')}</a></p></div>`;}
