import type { AreaId } from './areas-data';
/**
 * FUKUI DINO CITY: fictional dining and retail concepts.
 * Prices are tax-inclusive planning figures, not offers or reservations.
 */
export type FoodArea = Extract<AreaId, 'fukui' | 'katsuyama' | 'wakasa'>;
export type VenueType = 'dining' | 'shops';
export type VenueItem = {
  name: string;
  price: number;
  description: string;
  label?: string;
};
export type Venue = {
  id: string;
  type: VenueType;
  name: string;
  en: string;
  area: FoodArea;
  areaLabel: string;
  tagline: string;
  description: string;
  hours: string;
  style: string;
  sceneImage: string;
  sceneAlt: string;
  focusImage: string;
  focusAlt: string;
  items: VenueItem[];
  information: string[];
  related: string;
};

export const restaurants: Venue[] = [
  {
    id: 'ancient-forest-grill', type: 'dining', name: '太古の森レストラン',
    en: 'ANCIENT FOREST GRILL', area: 'fukui', areaLabel: '福井駅周辺 / シティゾーン',
    tagline: '大きな樹々に包まれ、冒険の続きを味わう。',
    description: '巨大恐竜の体内探検の余韻をそのままに、太古の森を思わせるダイニング空間へ。福井の食材をヒントにしたプレート料理を中心に、家族でも一緒に楽しめるメニューを取り揃えています。',
    hours: '11:00–20:00', style: 'テーブルサービス',
    sceneImage: '/park/assets/dining-forest-room.jpg', sceneAlt: '太古の森レストランの落ち着いたダイニング空間',
    focusImage: '/park/assets/dining-forest-plate.jpg', focusAlt: '恐竜の足跡をあしらった特製グリルプレート',
    items: [
      {name:'ダイノ・フットプリントプレート', price:2180,description:'足跡モチーフのライスとグリルを組み合わせたメインプレート。',label:'シグネチャー'},
      {name:'古代の森のベジタブルシチュー',price:1680,description:'季節の野菜をたっぷり使う温かな一皿。'},
      {name:'ちびっこ探検家プレート',price:1280,description:'小さなお子さま向けのワンプレート。',label:'キッズ向け'}
    ],
    information:['キッズメニューあり（アレルゲン対応は店舗でご確認ください）。','座席の事前予約は受け付けておりません。','テイクアウトの取り扱いはございません。'],
    related:'インサイド・ザ・ダイナソー'
  },
  {
    id:'ocean-blue-cafe', type:'dining', name:'オーシャン・ブルー カフェ',
    en:'OCEAN BLUE CAFE', area:'wakasa', areaLabel:'若狭湾 / オーシャンワールド',
    tagline:'古代の海を眺めながら、ひと休み。',
    description:'若狭湾の海色をテーマにしたカフェ。古代の海棲爬虫類を学んだ後に、海をイメージしたドリンクや軽食を楽しむ休憩スポットです。海棲爬虫類は恐竜とは別の生き物として紹介します。',
    hours:'10:00–18:00', style:'カウンターサービス',
    sceneImage:'/park/assets/dining-ocean-room.jpg', sceneAlt:'若狭湾の海中世界を思わせるブルー基調の店内',
    focusImage:'/park/assets/dining-ocean-plate.jpg', focusAlt:'青のグラデーションソーダとシーフードサンドイッチ',
    items:[
      {name:'若狭ブルーソーダ',price:680,description:'海のグラデーションを表現したソーダドリンク。',label:'シグネチャー'},
      {name:'潮風シーフードサンド',price:1480,description:'海の恵みをテーマにしたボリュームサンド。'},
      {name:'こども海のプレート',price:1080,description:'小さなサンドとデザートのセット。',label:'キッズ向け'}
    ],
    information:['雨天時も安心してお過ごしいただける屋内カフェです。','魚介類・乳・小麦等を含むメニューがございます。アレルギー情報は店舗にてご確認ください。','座席予約は承っておりません。'],
    related:'ダイノ・オーシャン'
  },
  {
    id:'fossil-lab-kitchen',type:'dining',name:'フォッシル・ラボ キッチン',
    en:'FOSSIL LAB KITCHEN',area:'katsuyama',areaLabel:'勝山 / フォッシルディスカバリー',
    tagline:'発掘のあとに、もうひとつの発見を。',
    description:'化石の研究所をイメージした実験的なキッチン。地層を重ねたようなデザートや、食べ進めると中身が現れるカレーで、子どもの発見する楽しさを食事へ広げます。',
    hours:'10:00–17:00', style:'カジュアルダイニング',
    sceneImage:'/park/assets/dining-fossil-room.jpg', sceneAlt:'化石標本と地層の壁に囲まれた研究室風の店内',
    focusImage:'/park/assets/dining-fossil-plate.jpg', focusAlt:'地層を模した特製カレーと発掘パフェ',
    items:[
      {name:'発掘スパイスカレー',price:1780,description:'ライスの下から具材が現れる発掘テーマのカレー。',label:'シグネチャー'},
      {name:'地層の化石パフェ',price:980,description:'層状の食感が楽しいデザート。'},
      {name:'キッズ発掘ボックス',price:1180,description:'少量のカレーとサイドを組み合わせたセット。',label:'キッズ向け'}
    ],
    information:['ファミリーやお子さま向けのメニューをご用意しています。','食物アレルギー情報や特定原材料の詳細は店舗にてご確認ください。','座席予約は受け付けておりません。'],
    related:'フォッシル・フロンティア'
  }
];

export const shops: Venue[] = [
  {
    id:'fossil-market',type:'shops',name:'フォッシル・マーケット',
    en:'FOSSIL MARKET',area:'katsuyama',areaLabel:'勝山 / フォッシルディスカバリー',
    tagline:'持ち帰るのは、お土産だけじゃない。',
    description:'発掘の感動を学びにつなげる知育ショップ。化石のレプリカや地層ノートなど、帰宅後も地球の歴史を調べたくなる商品を取り揃えています。実物の化石標本の販売は設定していません。',
    hours:'10:00–18:00', style:'学び・知育グッズ',
    sceneImage:'/park/assets/shop-fossil-interior.jpg',sceneAlt:'化石発掘キットや知育グッズが並ぶ店内',
    focusImage:'/park/assets/shop-fossil-kit.jpg',focusAlt:'化石レプリカ作成キットとフィールドノート',
    items:[
      {name:'化石レプリカ探究キット',price:2400,description:'レプリカ標本と学習カードを組み合わせた知育セット。',label:'人気商品'},
      {name:'地層フィールドノート',price:780,description:'観察・スケッチ・記録を残すオリジナルノート。'},
      {name:'発掘ツールポーチ',price:1900,description:'探究道具をまとめられるキャンバスポーチ。'}
    ],
    information:['化石発掘をテーマにした知育キットや書籍を取り揃えています。','販売商品はレプリカおよび学習用教材です（実物化石ではありません）。','通信販売・事前予約・配送は承っておりません。'],
    related:'フォッシル・フロンティア'
  },
  {
    id:'dino-city-store',type:'shops',name:'DINO CITY STORE',
    en:'DINO CITY STORE',area:'fukui',areaLabel:'福井駅周辺 / シティゾーン',
    tagline:'福井をめぐった記憶を、日常へ。',
    description:'福井駅周辺のメインストア。街・山・海の広域パークを表現したロゴグッズや旅の相棒になるアイテムを取り揃えています。地域の土産品との連携も大切にしています。',
    hours:'10:00–21:00', style:'オリジナルパークグッズ',
    sceneImage:'/park/assets/shop-city-interior.jpg',sceneAlt:'福井駅前の広々としたパーク公式ストアの店内',
    focusImage:'/park/assets/shop-city-goods.jpg',focusAlt:'恐竜ロゴ入りフィールドボトルとオリジナルTシャツ',
    items:[
      {name:'DINO CITY フィールドボトル',price:2600,description:'旅先でも使いやすい携帯ボトル。',label:'人気商品'},
      {name:'アドベンチャーTシャツ',price:3800,description:'パークの世界観をあしらったオリジナルTシャツ。'},
      {name:'5エリア ピンバッジセット',price:1200,description:'5つのエリアをモチーフにしたコレクション。'}
    ],
    information:['お菓子・ステーショナリー・アパレルなど豊富な限定グッズをご用意。','福井駅隣接でご来園時やお帰りの際にも便利にご利用いただけます。','通信販売・お取り置き・配送は承っておりません。'],
    related:'インサイド・ザ・ダイナソー'
  }
];

/**
 * Integration contract for PR #19 park/areas-data.ts.
 * These three IDs are a strict subset of its five AreaId values:
 * komatsu | fukui | katsuyama | wakasa | echizen.
 * AreaId is imported from the now-merged #19 area data contract.
 */
export const foodAreaIds = ['fukui', 'katsuyama', 'wakasa'] as const satisfies readonly FoodArea[];
export const allVenues: readonly Venue[] = [...restaurants, ...shops];
export const venueHref = (venue: Pick<Venue, 'id' | 'type'>): string =>
  '/park/' + (venue.type === 'dining' ? 'dining' : 'shops') + '.html#venue-' + encodeURIComponent(venue.id);
export const venuesByArea = (area: FoodArea): readonly Venue[] => allVenues.filter(venue => venue.area === area);

/** PR #15 attraction IDs; use these related venues when rendering detail pages. */
export const relatedVenueIdsByAttraction: Readonly<Record<string, readonly string[]>> = {
  skyport: [], inside: ['ancient-forest-grill', 'dino-city-store'],
  flight: ['ancient-forest-grill', 'dino-city-store'],
  ocean: ['ocean-blue-cafe'],
  fossil: ['fossil-lab-kitchen', 'fossil-market'],
  coast: [], night: ['ancient-forest-grill', 'dino-city-store'],
};
export const venuesForAttraction = (attractionId: string): readonly Venue[] => {
  const ids = relatedVenueIdsByAttraction[attractionId] ?? [];
  return ids.map(id => allVenues.find(venue => venue.id === id)).filter((venue): venue is Venue => Boolean(venue));
};
