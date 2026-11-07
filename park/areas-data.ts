/** Shared area IDs for #2 attractions, #3 venues, #4 itineraries and #6 transit.
 * Geographic markers represent real gateways / representative coastal locations;
 * fictional experiences have no established physical site.
 */
export type AreaId = 'komatsu' | 'fukui' | 'katsuyama' | 'wakasa' | 'echizen';
export type ParkArea = {
  id: AreaId;
  order: number;
  name: string;
  english: string;
  prefecture: string;
  locationNote: string;
  latitude: number;
  longitude: number;
  tagline: string;
  description: string;
  geology: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  attractionIds: readonly string[];
  attractionNames: readonly string[];
  foodAndShop: readonly string[];
  services: string;
  suggestedVisit: string;
  travelNote: string;
};
export const parkAreas: readonly ParkArea[] = [
  {
    id:'komatsu',order:1,name:'小松空港',english:'SKYPORT / KOMATSU',
    prefecture:'石川県',locationNote:'地図のピンは小松空港付近。福井県の外に位置します。',
    latitude:36.3939,longitude:136.4075,
    tagline:'旅のはじまりを、ひとつの体験に。',
    description:'石川県の小松空港を福井県広域パークの空の玄関口に。巨大恐竜に乗って飛び立つ、映像と可動シートによるダイナミックなフライト体験です。',
    geology:'空港を起点に、平野から山地・海岸へと景色が変わる福井への旅を想像します。',
    image:'/park/assets/skyport.webp',imageAlt:'空港から巨大恐竜型ライドで飛び立つフライト体験イメージ',
    imageCaption:'スカイポートの演出イメージ（※実際の交通機関ではありません）',
    attractionIds:['skyport'],attractionNames:['ダイナソー・スカイポート'],
    foodAndShop:['空港内飲食・物販施設'],
    services:'インフォメーション、手荷物預かり等の案内（※実際の空港運行施設とは異なります）。',
    suggestedVisit:'福井への入口として物語を体験し、実際の交通手段で福井駅方面へ。',
    travelNote:'小松空港は石川県内です。福井への移動は現実の公共交通等を別途確認してください。'
  },
  {
    id:'fukui',order:2,name:'福井駅周辺',english:'CITY ZONE / FUKUI',
    prefecture:'福井県',locationNote:'地図のピンは福井駅を示します。実在の駅周辺の代表地点です。',
    latitude:36.0621772,longitude:136.2233784,
    tagline:'街全体が、冒険のメインステージ。',
    description:'駅前を中心に、恐竜の体内探検、翼竜の飛行シミュレーション、夜の巨大映像ショーがつながる都市型エリア。昼と夜で異なる冒険をお楽しみいただけます。',
    geology:'福井平野と周囲の山並みを見比べると、地形と都市のつながりを発見できます。',
    image:'/park/assets/inside.webp',imageAlt:'巨大恐竜の体内を歩く没入型アトラクションのイメージ',
    imageCaption:'体内探検の演出イメージ',
    attractionIds:['inside','flight','night'],attractionNames:['インサイド・ザ・ダイナソー','スカイ・オーバー・フクイ','ナイト・オブ・ザ・ジャイアンツ'],
    foodAndShop:['太古の森レストラン','DINO CITY STORE'],
    services:'総合インフォメーション・休憩所・ゲストサポート',
    suggestedVisit:'昼は屋内体験を巡り、夕方は街歩き、夜は映像ショーを楽しむ。',
    travelNote:'広域周遊の拠点となる福井駅。エリア間の実移動は鉄道・バス等を別途確認してください。'
  },
  {
    id:'katsuyama',order:3,name:'勝山',english:'FOSSIL DISCOVERY / KATSUYAMA',
    prefecture:'福井県',locationNote:'地図のピンは勝山駅付近の代表地点です。発掘施設の位置ではありません。',
    latitude:36.05629,longitude:136.492085,
    tagline:'化石が語る、白亜紀の福井。',
    description:'恐竜化石の研究で知られる勝山の地域性を生かし、模擬発掘や地層の観察を楽しむ学習エリア。発見だけでなく、記録と研究の大切さを体感します。',
    geology:'勝山市周辺の恐竜化石・手取層群に着想を得ています。体験は模擬発掘の設定です。',
    image:'/park/assets/fossil.webp',imageAlt:'勝山の模擬発掘ラボで恐竜化石を探す体験イメージ',
    imageCaption:'発掘体験の演出イメージ',
    attractionIds:['fossil'],attractionNames:['フォッシル・フロンティア'],
    foodAndShop:['フォッシル・ラボ キッチン','フォッシル・マーケット'],
    services:'学習ガイド・ファミリー向け休憩スペース',
    suggestedVisit:'発掘体験の前後に地学を学び、化石と地層の関係を観察する。',
    travelNote:'福井駅周辺とは離れた内陸の地域。列車・バス等の時刻は最新の案内をご確認ください。'
  },
  {
    id:'wakasa',order:4,name:'若狭湾',english:'OCEAN WORLD / WAKASA BAY',
    prefecture:'福井県',locationNote:'地図のピンは若狭湾沿岸・小浜市付近の代表地点です。',
    latitude:35.495593,longitude:135.746647,
    tagline:'海の奥に広がる、もうひとつの古代。',
    description:'若狭湾の海を舞台に、首長竜やモササウルスなどの海棲爬虫類を大迫力の映像で体感する没入型シアター。これらは恐竜とは異なる古代の海棲爬虫類です。',
    geology:'入り組んだ若狭湾沿岸の地形と海の生態系から、地球史への興味を広げます。',
    image:'/park/assets/ocean.webp',imageAlt:'首長竜などの古代海棲爬虫類が泳ぐ映像水族館のイメージ',
    imageCaption:'映像型シアターの演出イメージ',
    attractionIds:['ocean'],attractionNames:['ダイノ・オーシャン'],
    foodAndShop:['オーシャン・ブルー カフェ'],
    services:'屋内休憩所・ファミリー向けサポート',
    suggestedVisit:'海の映像展示と若狭湾沿岸の景色を組み合わせ、ゆったり滞在する。',
    travelNote:'若狭湾は広い範囲を指します。海沿いの訪問先と実際の移動経路を個別に確認してください。'
  },
  {
    id:'echizen',order:5,name:'越前海岸',english:'WILD COAST / ECHIZEN',
    prefecture:'福井県',locationNote:'地図のピンは越前海岸（福井市居倉町付近）の代表地点です。',
    latitude:36.012814,longitude:135.991022,
    tagline:'地形がつくった景色に、時を重ねる。',
    description:'越前海岸の岩場や海岸線を歩き、ARで過去の地球環境を重ねる散策型体験。ジュラシックという名称は演出で、越前海岸全体がジュラ紀の地質という意味ではありません。',
    geology:'日本海に面する岩石海岸と海岸地形を観察することが学びの入口です。',
    image:'/park/assets/coast.webp',imageAlt:'越前海岸の岩場とARで太古の世界を重ねた散策イメージ',
    imageCaption:'海岸散策とARの演出イメージ',
    attractionIds:['coast'],attractionNames:['ジュラシック・コースト'],
    foodAndShop:['周辺の地域飲食店・物販店'],
    services:'散策時の安全案内・周辺休憩スポット',
    suggestedVisit:'風景を見ながら海岸地形を観察し、AR演出による地球史の物語を楽しむ。',
    travelNote:'日本海側の海岸線に沿うエリア。天候・道路状況・利用可能な交通を確認してください。'
  }
];
export const areaById = Object.fromEntries(parkAreas.map(a=>[a.id,a])) as Record<AreaId,ParkArea>;
export const attractionAreaId: Readonly<Record<string,AreaId>> = Object.fromEntries(
  parkAreas.flatMap(a=>a.attractionIds.map(id=>[id,a.id] as const))
);
