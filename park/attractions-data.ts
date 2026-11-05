export type AttractionCategory = 'ride' | 'discovery' | 'ocean' | 'show';
export type Attraction = {
  id: string; title: string; en: string; zone: string; category: AttractionCategory;
  tagline: string; description: string; condition: string; duration: string; visual: string; tag: string;
};
export const attractions: Attraction[] = [
  {
    id:'skyport', title:'ダイナソー・スカイポート', en:'DINOSAUR SKYPORT',
    zone:'小松空港・エントランス', category:'ride',
    tagline:'空港に着いた瞬間、冒険が始まる。',
    description:'小松空港と福井をつなぐ、巨大な恐竜の背中に乗って移動する専用空中トランスファー。離陸から福井へのアプローチまで、壮大な映像と可動ライドで旅の幕開けを演出。',
    condition:'身長110cm以上', duration:'約20分',
    visual:'skyport', tag:'シグネチャー'
  },
  {
    id:'inside', title:'インサイド・ザ・ダイナソー', en:'INSIDE THE DINOSAUR',
    zone:'福井駅・ダイノシティ', category:'ride',
    tagline:'巨大な恐竜の体内へ、探検に出発。',
    description:'駅前に出現した巨大恐竜の中に入り、骨格、心臓、消化器などをめぐるウォークスルー型の体験。迫力ある空間演出と、生物学の知識を掛け合わせる。',
    condition:'年齢制限なし', duration:'約25分',
    visual:'inside', tag:'屋内・全天候'
  },
  {
    id:'flight', title:'スカイ・オーバー・フクイ', en:'SKY OVER FUKUI',
    zone:'福井駅・ダイノシティ', category:'ride',
    tagline:'背中に飛び乗れ。福井のすべてが眼下に。',
    description:'巨大な翼竜の肩・背中に乗り、福井の街並み、山、海を飛び越えるフライトシミュレーター。風、振動、映像で実際に空を飛んでいるような感覚をつくる。※翼竜は恐竜とは別の爬虫類の仲間。',
    condition:'身長120cm以上', duration:'約8分',
    visual:'flight', tag:'スリル'
  },
  {
    id:'ocean', title:'ダイノ・オーシャン', en:'DINO OCEAN',
    zone:'若狭湾・マリンワールド', category:'ocean',
    tagline:'海の底には、もうひとつの太古の世界。',
    description:'若狭湾沿岸に広がる「恐竜水族館」。巨大な水槽風の映像空間や水中シミュレーターを通して、首長竜やモササウルスなど古代の海の生物を観察する。※これらは恐竜ではない海棲爬虫類。',
    condition:'年齢制限なし', duration:'約45分',
    visual:'ocean', tag:'ファミリー'
  },
  {
    id:'fossil', title:'フォッシル・フロンティア', en:'FOSSIL FRONTIER',
    zone:'勝山・ディスカバリー', category:'discovery',
    tagline:'化石を見つけるのは、あなた。',
    description:'勝山の化石産地という地域性を生かした模擬発掘ラボ。地層の重なり、化石化の仕組み、恐竜の生きた白亜紀の環境を体感しながら学べる。',
    condition:'年齢制限なし', duration:'約35分',
    visual:'fossil', tag:'学び'
  },
  {
    id:'coast', title:'ジュラシック・コースト', en:'JURASSIC COAST',
    zone:'越前海岸・ワイルドコースト', category:'discovery',
    tagline:'海岸の絶景に、地球の記憶を重ねる。',
    description:'越前海岸の地形を手がかりに、巨大な地球史のタイムラインを体験する散策型エリア。AR演出で「今の海岸」と「過去の地球」を見比べる。',
    condition:'歩行型・一部バリアフリー対応', duration:'約40分',
    visual:'coast', tag:'絶景'
  },
  {
    id:'night', title:'ナイト・オブ・ザ・ジャイアンツ', en:'NIGHT OF THE GIANTS',
    zone:'福井駅・ダイノシティ', category:'show',
    tagline:'夜の街が、恐竜たちのステージに。',
    description:'福井駅周辺の建物を背景に、光・音・巨大映像で太古の世界を映し出すナイトショー。ファンタジーと科学的な解説を組み合わせ、1日の冒険を締めくくる。',
    condition:'どなたでも', duration:'約15分',
    visual:'night', tag:'ナイトショー'
  }
];
export const categoryLabels: Record<AttractionCategory,'ライド'|'体験・学習'|'海の世界'|'ショー'> = {
  ride:'ライド', discovery:'体験・学習', ocean:'海の世界', show:'ショー'
};
