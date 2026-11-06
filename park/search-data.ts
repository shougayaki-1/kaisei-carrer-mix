import { attractions, attractionDetailHref } from './attractions-data';
import { parkAreas } from './areas-data';
import { allVenues, venueHref } from './food-data';
import { plans } from './plans-data';
import { events } from './events-data';
import { faqs, services } from './services-data';
export type SearchItem = { id:string; category:string; title:string; description:string; href:string; keywords:string; favorite?:boolean };
export const searchItems: readonly SearchItem[] = [
  ...attractions.map(a=>({id:`attraction:${a.id}`,category:'アトラクション',title:a.title,description:a.tagline,href:attractionDetailHref(a),keywords:[a.en,a.zone,a.description,a.condition].join(' '),favorite:true})),
  ...parkAreas.map(a=>({id:`area:${a.id}`,category:'エリア',title:a.name,description:a.tagline,href:`/park/access.html#area-${a.id}`,keywords:[a.english,a.description,a.geology].join(' ')})),
  ...allVenues.map(v=>({id:`venue:${v.id}`,category:v.type==='dining'?'レストラン':'ショップ',title:v.name,description:v.tagline,href:venueHref(v),keywords:[v.en,v.areaLabel,v.description,...v.items.map(i=>i.name)].join(' '),favorite:v.type==='dining'})),
  ...plans.map(p=>({id:`plan:${p.id}`,category:'モデルコース',title:p.title,description:p.intro,href:`/park/plans.html#${p.id}`,keywords:[p.audience,p.duration,...p.stops.map(s=>s.title)].join(' '),favorite:true})),
  ...events.map(e=>({id:`event:${e.id}`,category:'ニュース・イベント',title:e.title,description:e.summary,href:`/park/news.html#${e.id}`,keywords:[e.areaName,e.categoryLabel,e.period].join(' ')})),
  ...services.map(s=>({id:`service:${s.id}`,category:'ゲストサービス',title:s.title,description:s.content,href:`/park/services.html#${s.id}`,keywords:[s.location,s.conditions].join(' ')})),
  ...faqs.map((f,i)=>({id:`faq:${i}`,category:'よくある質問',title:f.question,description:f.answer,href:`/park/services.html#faq-category-${[...new Set(faqs.map(x=>x.category))].indexOf(f.category)}`,keywords:f.category})),
];
export function findSearchItems(query:string): SearchItem[] {
 const terms=query.normalize('NFKC').toLocaleLowerCase('ja-JP').trim().split(/\s+/).filter(Boolean);
 return searchItems.filter(item=>terms.every(term=>`${item.title} ${item.description} ${item.keywords}`.normalize('NFKC').toLocaleLowerCase('ja-JP').includes(term)));
}
