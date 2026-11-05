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
    description: '巨大恐竜の体内探検の余韻をそのままに、太古の森を思わせるダイニング空間へ。福井の食材をヒントにしたプレート料理を中心に、家族でも一緒に楽しめるメニューを構想しています。',
    hours: '11:00–20:00（企画上の設定）', style: 'テーブルサービスを想定',
    sceneImage: '/park/assets/dining-forest-room.jpg', sceneAlt: '架空の太古の森レストランを描いた写真調AI生成の内装イメージ',
    focusImage: '/park/assets/dining-forest-plate.jpg', focusAlt: '恐竜の足跡をモチーフにした料理プレートの写真調AI生成イメージ',
    items: [
      {name:'ダイノ・フットプリントプレート', price:2180,description:'足跡モチーフのライスとグリルを組み合わせたメインプレート。',label:'シグネチャー'},
      {name:'古代の森のベジタブルシチュー',price:1680,description:'季節の野菜をたっぷり使う温かな一皿。'},
      {name:'ちびっこ探検家プレート',price:1280,description:'小さなお子さま向けの量を想定したワンプレート。',label:'キッズ想定'}
    ],
    information:['キッズ向けメニューを構想中。提供対象年齢・量は未決定です。','アレルゲン原材料・調理器具共用の情報は未確定です。','席の予約・テイクアウト・設備の利用条件は検討段階です。'],
    related:'インサイド・ザ・ダイナソー'
  },
  {
    id:'ocean-blue-cafe', type:'dining', name:'オーシャン・ブルー カフェ',
    en:'OCEAN BLUE CAFE', area:'wakasa', areaLabel:'若狭湾 / オーシャンワールド',
    tagline:'古代の海を眺めながら、ひと休み。',
    description:'若狭湾の海色をテーマにしたカフェ。古代の海棲爬虫類を学んだ後に、海をイメージしたドリンクや軽食を楽しむ休憩スポットです。海棲爬虫類は恐竜とは別の生き物として紹介します。',
    hours:'10:00–18:00（企画上の設定）', style:'カウンターでの注文を想定',
    sceneImage:'/park/assets/dining-ocean-room.jpg', sceneAlt:'架空の海中景観をテーマにしたカフェの写真調AI生成内装イメージ',
    focusImage:'/park/assets/dining-ocean-plate.jpg', focusAlt:'海色のソーダとシーフードサンドの写真調AI生成イメージ',
    items:[
      {name:'若狭ブルーソーダ',price:680,description:'海のグラデーションを表現したソーダドリンク。',label:'シグネチャー'},
      {name:'潮風シーフードサンド',price:1480,description:'海の恵みをテーマにしたボリュームサンド。'},
      {name:'こども海のプレート',price:1080,description:'小さなサンドとデザートのセットを想定。',label:'キッズ想定'}
    ],
    information:['雨天時も休憩できる屋内カフェを構想しています。','魚介類・乳・小麦などを含む可能性があります。確定した原材料情報はありません。','予約・持ち帰り・提供方法は未確定です。'],
    related:'ダイノ・オーシャン'
  },
  {
    id:'fossil-lab-kitchen',type:'dining',name:'フォッシル・ラボ キッチン',
    en:'FOSSIL LAB KITCHEN',area:'katsuyama',areaLabel:'勝山 / フォッシルディスカバリー',
    tagline:'発掘のあとに、もうひとつの発見を。',
    description:'化石の研究所をイメージした実験的なキッチン。地層を重ねたようなデザートや、食べ進めると中身が現れるカレーで、子どもの発見する楽しさを食事へ広げます。',
    hours:'10:00–17:00（企画上の設定）', style:'カジュアルダイニングを想定',
    sceneImage:'/park/assets/dining-fossil-room.jpg', sceneAlt:'化石標本と岩石壁に囲まれた架空のレストランの写真調AI生成内装イメージ',
    focusImage:'/park/assets/dining-fossil-plate.jpg', focusAlt:'発掘カレーと地層パフェの写真調AI生成イメージ',
    items:[
      {name:'発掘スパイスカレー',price:1780,description:'ライスの下から具材が現れる発掘テーマのカレー。',label:'シグネチャー'},
      {name:'地層の化石パフェ',price:980,description:'層状の食感が楽しいデザート。'},
      {name:'キッズ発掘ボックス',price:1180,description:'少量のカレーとサイドを組み合わせたセットを想定。',label:'キッズ想定'}
    ],
    information:['化石の研究を楽しむ親子を対象にしたメニューを構想しています。','特定原材料等の表示は企画段階であり、食物アレルギー対応は未確定です。','屋内席・席数・予約の取り扱いは検討中です。'],
    related:'フォッシル・フロンティア'
  }
];

export const shops: Venue[] = [
  {
    id:'fossil-market',type:'shops',name:'フォッシル・マーケット',
    en:'FOSSIL MARKET',area:'katsuyama',areaLabel:'勝山 / フォッシルディスカバリー',
    tagline:'持ち帰るのは、お土産だけじゃない。',
    description:'発掘の感動を学びにつなげる知育ショップ。化石のレプリカや地層ノートなど、帰宅後も地球の歴史を調べたくなる商品を想定しています。実物の化石標本の販売は設定していません。',
    hours:'10:00–18:00（企画上の設定）', style:'学び・知育グッズ',
    sceneImage:'/park/assets/shop-fossil-interior.jpg',sceneAlt:'化石・地層の知育グッズが並ぶ架空のショップの写真調AI生成内装イメージ',
    focusImage:'/park/assets/shop-fossil-kit.jpg',focusAlt:'化石レプリカ学習キットと地層ノートの写真調AI生成商品イメージ',
    items:[
      {name:'化石レプリカ探究キット',price:2400,description:'レプリカ標本と学習カードを組み合わせた知育セット。',label:'人気商品案'},
      {name:'地層フィールドノート',price:780,description:'観察・スケッチ・記録を残すオリジナルノート。'},
      {name:'発掘ツールポーチ',price:1900,description:'探究道具をまとめられるキャンバスポーチ。'}
    ],
    information:['価格は税込の企画値です。実際の商品販売はありません。','セット内容・対象年齢・素材・安全基準は検討段階です。','店頭受取・通販・在庫検索には対応していません。'],
    related:'フォッシル・フロンティア'
  },
  {
    id:'dino-city-store',type:'shops',name:'DINO CITY STORE',
    en:'DINO CITY STORE',area:'fukui',areaLabel:'福井駅周辺 / シティゾーン',
    tagline:'福井をめぐった記憶を、日常へ。',
    description:'福井駅周辺のメインストア。街・山・海の広域パークを表現したロゴグッズや旅の相棒になるアイテムを揃える想定です。地域の土産品との連携も今後の検討テーマです。',
    hours:'10:00–21:00（企画上の設定）', style:'オリジナルパークグッズ',
    sceneImage:'/park/assets/shop-city-interior.jpg',sceneAlt:'恐竜をテーマにした架空の大型ショップの写真調AI生成内装イメージ',
    focusImage:'/park/assets/shop-city-goods.jpg',focusAlt:'フィールドボトルやTシャツなどの写真調AI生成商品イメージ',
    items:[
      {name:'DINO CITY フィールドボトル',price:2600,description:'旅先でも使いやすい携帯ボトル。',label:'人気商品案'},
      {name:'アドベンチャーTシャツ',price:3800,description:'パークの世界観をあしらったオリジナルTシャツ。'},
      {name:'5エリア ピンバッジセット',price:1200,description:'5つのエリアをモチーフにしたコレクション。'}
    ],
    information:['価格は税込の企画値です。実際の商品販売はありません。','素材・サイズ展開・品質表示などの製品仕様は未決定です。','取り置き・オンライン注文・決済・配送はできません。'],
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
