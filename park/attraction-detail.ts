
import { attractions, attractionDetailHref, categoryLabels, type Attraction } from './attractions-data';
import { renderIcons } from './icons';
import './styles.css';
const esc=(s:string):string=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
const root=document.getElementById('attraction-detail-root');
const item=attractions.find(a=>a.id===root?.dataset.attractionId);
const relatedCard=(a:Attraction):string=>'<a href="'+attractionDetailHref(a)+'"><img src="'+esc(a.detail.gallery[0].src)+'" alt="'+esc(a.detail.gallery[0].alt)+'" loading="lazy" decoding="async"><div class="ad-related__body"><p class="eyebrow">'+esc(a.en)+'</p><h3>'+esc(a.title)+'</h3><p>'+esc(a.tagline)+'</p><span class="ad-related__link">体験を見る ↗</span></div></a>';
if(root&&item){
 const a=item,d=a.detail;
 const related=d.relatedIds.map(id=>attractions.find(x=>x.id===id)).filter((x):x is Attraction=>Boolean(x));
 root.innerHTML=`
 <div class="wrap breadcrumb ad-breadcrumb"><a href="/park/">パークTOP</a> / <a href="/park/attractions.html">アトラクション</a> / ${esc(a.title)}</div>
 <section class="ad-hero" aria-labelledby="ad-title"><img class="ad-hero__image" src="${esc(d.gallery[0].src)}" alt="${esc(d.gallery[0].alt)}" fetchpriority="high">
 <div class="wrap ad-hero__inner"><p class="eyebrow">ATTRACTION / ${esc(categoryLabels[a.category])}</p><h1 id="ad-title">${esc(a.title)}</h1><p class="ad-hero__english">${esc(a.en)}</p><p class="ad-hero__lead">${esc(a.tagline)}</p>
 <div class="ad-hero__actions"><a href="#ad-story" class="button button-bright">体験の世界を見る <i data-lucide="arrow-right" aria-hidden="true"></i></a><a href="/park/attractions.html" class="button button-ghost">すべての体験へ</a></div></div></section>
 <div class="wrap">
 <section class="ad-section ad-overview" id="ad-story" aria-labelledby="ad-story-title"><div class="ad-story"><p class="eyebrow">THE EXPERIENCE</p><h2 id="ad-story-title">${esc(d.storyTitle)}</h2>${d.story.map(p=>'<p>'+esc(p)+'</p>').join('')}</div>
 <aside class="ad-facts" aria-labelledby="ad-facts-title"><h2 id="ad-facts-title">アトラクション情報</h2><dl>
 <div><dt>エリア</dt><dd>${esc(a.zone)}</dd></div><div><dt>体験時間</dt><dd>${esc(a.duration)}</dd></div>
 <div><dt>利用条件</dt><dd>${esc(a.condition)}</dd></div><div><dt>カテゴリー</dt><dd>${esc(categoryLabels[a.category])}</dd></div>
 <div><dt>屋内外・体験方式</dt><dd>${esc(d.environment)}</dd></div><div><dt>アクセシビリティ</dt><dd>${esc(d.accessibility)}</dd></div></dl>
 <p class="ad-facts__notice">体験時間・利用条件・設備は架空パークの設定です。実際の営業・予約・運行を示すものではありません。</p></aside></section>
 <section class="ad-section" aria-labelledby="ad-gallery-title"><p class="eyebrow">PHOTO GALLERY</p><h2 id="ad-gallery-title">体験の風景</h2><div class="ad-gallery">
 ${d.gallery.map(g=>'<figure><img src="'+esc(g.src)+'" alt="'+esc(g.alt)+'" loading="lazy" decoding="async"><figcaption>'+esc(g.caption)+'</figcaption></figure>').join('')}</div></section>
 <section class="ad-section" aria-labelledby="ad-steps-title"><p class="eyebrow">YOUR JOURNEY</p><h2 id="ad-steps-title">体験の流れ</h2><ol class="ad-steps">
 ${d.steps.map(s=>'<li><h3>'+esc(s.title)+'</h3><p>'+esc(s.text)+'</p></li>').join('')}</ol></section>
 <section class="ad-section" aria-labelledby="ad-safety-title"><p class="eyebrow">GOOD TO KNOW</p><h2 id="ad-safety-title">ご利用前のご案内</h2>
 <div class="ad-safety"><div><h3>条件・注意事項</h3><ul>${d.cautions.map(c=>'<li>'+esc(c)+'</li>').join('')}</ul></div>
 <div><h3>各種サポート・来園ガイド</h3><p>${esc(d.accessibility)}。詳細は今後の設計に合わせて更新します。</p><a href="/park/guide.html" class="button button-outline">営業時間・ゲストガイド <i data-lucide="arrow-right" aria-hidden="true"></i></a></div></div></section>
 <section class="ad-section" aria-labelledby="ad-related-title"><p class="eyebrow">KEEP EXPLORING</p><h2 id="ad-related-title">次に巡りたい体験</h2><div class="ad-related">${related.map(relatedCard).join('')}</div></section>
 </div>
 <section class="ad-final"><div class="wrap"><div><p class="eyebrow">PLAN YOUR ADVENTURE</p><h2>冒険の続きを、計画しよう。</h2></div><a href="/park/tickets.html" class="button button-bright">チケット・料金を見る <i data-lucide="arrow-right" aria-hidden="true"></i></a></div></section>
 <p class="wrap ad-footnote">掲載内容・画像は FUKUI DINO CITY の架空の体験設定・イメージです。実在する施設の予約状況を示すものではありません。</p>`;
 renderIcons(root);
}else if(root){root.innerHTML='<div class="wrap ad-section"><h1>アトラクションが見つかりません</h1><p><a href="/park/attractions.html">アトラクション一覧へ</a></p></div>';}
