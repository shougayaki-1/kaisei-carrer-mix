import type { PassId } from './schedule-data';
export type AgeType = 'adult' | 'junior' | 'child';
export const ageLabels: Record<AgeType, string> = { adult:'大人（18歳以上）', junior:'中高生（12〜17歳）', child:'こども（4〜11歳）' };
export const passes: Record<PassId, { label:string; eyebrow:string; description:string; validity:string; areas:string; experiences:string; show:string; prices:Record<AgeType,number> }> = {
  day:{label:'1DAY DINO PASS',eyebrow:'DAY TICKET',description:'選択した1日のモデル営業時間内に、5エリアの対象体験を楽しむ設定。',validity:'選択した1日・各エリアのモデル営業時間',areas:'5エリア（小松空港は石川県）',experiences:'スカイポート、体内探検、翼竜フライト、海洋体験、発掘体験、海岸探検、ナイトショー（休止・利用条件あり）',show:'実施日のみ',prices:{adult:12800,junior:8800,child:6400}},
  two:{label:'2DAY EXPLORER PASS',eyebrow:'TWO DAYS',description:'選択した日と翌日の連続2日間、5エリアを巡る設定。',validity:'選択日と翌日の連続2日間',areas:'5エリア（小松空港は石川県）',experiences:'スカイポート、体内探検、翼竜フライト、海洋体験、発掘体験、海岸探検、ナイトショー（休止・利用条件あり）',show:'各日の実施日のみ',prices:{adult:21800,junior:14800,child:10800}},
  night:{label:'NIGHT DINO PASS',eyebrow:'AFTER 17:00',description:'福井駅エリアのナイトショーを17:00以降に楽しむ設定。休演日は発行対象外。',validity:'選択日17:00以降',areas:'福井駅エリアのみ',experiences:'ナイトショーのみ。昼の体験は対象外',show:'休演日は発行対象外',prices:{adult:6800,junior:4800,child:3400}},
};
export const passIds: readonly PassId[] = ['day','two','night'];
export function calculateTicketTotal(pass:PassId, quantity:Record<AgeType,number>):number {
  return (Object.keys(ageLabels) as AgeType[]).reduce((sum,age)=>sum+passes[pass].prices[age]*quantity[age],0);
}
const money=(n:number)=>'¥'+n.toLocaleString('ja-JP');
/** Build-time output retains the comparison and prices without JavaScript. */
export function renderTicketOptions():string {
 return passIds.map((id,i)=>{const p=passes[id];return `<button type="button" class="pass-option${i===0?' selected':''}" data-pass="${id}" aria-pressed="${i===0}"><span class="pass-top"><span><span class="eyebrow">${p.eyebrow}</span><strong>${p.label}</strong></span><span class="price">${money(p.prices.adult)}</span></span><p>${p.description}</p></button>`;}).join('');
}
export function renderTicketComparison():string {
 const rows:[string,(id:PassId)=>string][]=[['利用期間',id=>passes[id].validity],['対象エリア',id=>passes[id].areas],['対象体験',id=>passes[id].experiences],['ナイトショー',id=>passes[id].show],['大人（18歳以上）',id=>money(passes[id].prices.adult)],['中高生（12〜17歳）',id=>money(passes[id].prices.junior)],['こども（4〜11歳）',id=>money(passes[id].prices.child)]];
 return `<div class="ticket-comparison-scroll" tabindex="0" role="region" aria-label="券種比較表。横にスクロールできます"><table class="ticket-table ticket-comparison"><caption>3券種の比較（すべて架空の税込設定）</caption><thead><tr><th scope="col">項目</th>${passIds.map(id=>`<th scope="col">${passes[id].label}</th>`).join('')}</tr></thead><tbody>${rows.map(([label,value])=>`<tr><th scope="row">${label}</th>${passIds.map(id=>`<td>${value(id)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
