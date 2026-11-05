import type { AreaId } from './areas-data';

/** Real-world gateway guidance, not routes to the fictional attractions. */
export type TransportLeg = {
  id: string;
  from: AreaId;
  to: AreaId;
  heading: string;
  outward: string;
  returnTrip: string;
  source: { label: string; url: string };
};
export const transportLegs: readonly TransportLeg[] = [
  { id: 'airport-city', from: 'komatsu', to: 'fukui', heading: '小松空港（石川県）と福井駅', outward: '小松空港から京福バスの小松空港線で福井駅東口へ。便によっては航空便との接続がありません。', returnTrip: '福井駅東口から小松空港線を利用。先着順のため満席時は乗車できません。', source: { label: '京福バス 小松空港線', url: 'https://bus.keifuku.co.jp/highway/komatsu/' } },
  { id: 'city-fossil', from: 'fukui', to: 'katsuyama', heading: '福井駅と勝山駅', outward: '福井駅からえちぜん鉄道かつやま永平寺線で勝山駅へ。駅から先は目的地に合わせて市内交通等を確認してください。', returnTrip: '勝山駅からえちぜん鉄道で福井駅へ。帰りの接続と最終便を先に確認しましょう。', source: { label: '勝山市 勝山市へのアクセス', url: 'https://www.city.katsuyama.fukui.jp/site/mayor7/4088.html' } },
  { id: 'city-wakasa', from: 'fukui', to: 'wakasa', heading: '福井駅と若狭湾方面', outward: '福井駅から敦賀方面へ鉄道で移動し、目的地に応じて小浜線や地域交通へ乗り継ぐことを検討します。若狭湾は広く、下車駅とその先の交通は行き先で異なります。', returnTrip: '目的地から最寄り駅への交通を確認し、敦賀方面で福井方面の列車へ乗り継ぎます。', source: { label: '若狭路へのアクセス', url: 'https://wakasabay.jp/list/access' } },
  { id: 'city-coast', from: 'fukui', to: 'echizen', heading: '福井駅と越前海岸方面', outward: '福井駅から越前海岸方面への路線バスなどを検討します。海岸は広いため、目的地に近い停留所と運行日を確認してください。', returnTrip: '行き先に対応するバス停から福井駅方面へ。便数や最終便を出発前に確認してください。', source: { label: '越前町 海岸方面へのアクセス', url: 'https://www.town.echizen.fukui.jp/chousei/11/02/p005065_d/fil/3_3.pdf' } },
];

/** Ordered hub-based legs for a pair; undefined when both endpoints are equal. */
export function findTransportRoute(from: AreaId, to: AreaId): { leg: TransportLeg; outward: boolean }[] {
  if (from === to) return [];
  const legFor = (id: AreaId) => transportLegs.find((leg) => leg.from === id || leg.to === id);
  const points: AreaId[] = from === 'fukui' || to === 'fukui' ? [from, to] : [from, 'fukui', to];
  return points.slice(0, -1).map((start, i) => {
    const end = points[i + 1];
    const leg = legFor(start === 'fukui' ? end : start);
    if (!leg) throw new Error(`Missing transport leg: ${start} to ${end}`);
    return { leg, outward: start === leg.from };
  });
}
