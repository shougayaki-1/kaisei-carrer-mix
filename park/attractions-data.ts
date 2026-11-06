export type AttractionCategory = 'ride' | 'discovery' | 'ocean' | 'show';
export type AttractionDetail = {
  storyTitle: string; story: string[]; environment: string; accessibility: string;
  cautions: string[]; steps: {title:string;text:string}[];
  gallery: {src:string;alt:string;caption:string}[]; relatedIds: string[];
};
export type Attraction = {
  id: string; title: string; en: string; zone: string; category: AttractionCategory;
  tagline: string; description: string; condition: string; duration: string; visual: string; tag: string; detail: AttractionDetail;
};
export const attractions: Attraction[] = [
  {
    id:'skyport', title:'ダイナソー・スカイポート', en:'DINOSAUR SKYPORT',
    zone:'小松空港・エントランス', category:'ride',
    tagline:'空港に着いた瞬間、冒険が始まる。',
    description:'小松空港から福井へ向かう旅を、巨大な恐竜の背中に乗っているかのように演出する架空のライド。離陸から福井へのアプローチまで、壮大な映像と可動ライドで旅の幕開けを演出。',
    condition:'身長110cm以上', duration:'約20分',
    visual:'skyport', tag:'シグネチャー',
    detail: {
    "storyTitle": "空の玄関口から始まる、想像上の冒険。",
    "story": [
        "石川県の小松空港を福井への玄関口とする構想。巨大な恐竜の背中に乗り込む設定のライドで、空港を出た瞬間から冒険が始まります。",
        "大きなパノラマ映像と可動する座席で雲や山並みを越える旅を演出。実際に空港から福井へ運ぶ交通機関ではなく、移動を物語に変えるシミュレーション体験です。"
    ],
    "environment": "屋内型シミュレーターを想定",
    "accessibility": "乗降方法・車いす利用条件は検討中",
    "cautions": [
        "身長110cm以上（企画上の設定）。",
        "動き・振動・大型映像を伴う想定です。利用上の細則は検討中。",
        "実際の空港連絡・航空輸送・送迎ではありません。"
    ],
    "steps": [
        {
            "title": "ゲートに向かう",
            "text": "小松空港を出発点とした冒険の導入を楽しむ。"
        },
        {
            "title": "恐竜の背中に搭乗",
            "text": "大型映像と座席の動きが連動する。"
        },
        {
            "title": "福井の空へ",
            "text": "街と山が広がる演出で次のエリアへとつなぐ。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/skyport.webp",
            "alt": "恐竜型ライドが空港から出発する演出イメージ",
            "caption": "巨大な恐竜とともに始まる空の旅"
        },
        {
            "src": "/park/assets/city.webp",
            "alt": "福井のダイノシティを表現した都市景観イメージ",
            "caption": "旅の先に広がる街のイメージ"
        }
    ],
    "relatedIds": [
        "inside",
        "flight"
    ]
}
  },
  {
    id:'inside', title:'インサイド・ザ・ダイナソー', en:'INSIDE THE DINOSAUR',
    zone:'福井駅・ダイノシティ', category:'ride',
    tagline:'巨大な恐竜の体内へ、探検に出発。',
    description:'駅前に出現した巨大恐竜の中に入り、骨格、心臓、消化器などをめぐるウォークスルー型の体験。迫力ある空間演出と、生物学の知識を掛け合わせる。',
    condition:'年齢制限なし', duration:'約25分',
    visual:'inside', tag:'屋内・全天候',
    detail: {
    "storyTitle": "巨大恐竜の体内を、歩いて探る。",
    "story": [
        "福井駅エリアに現れた巨大な恐竜の中に入り、骨格や筋肉、呼吸・循環・消化の仕組みをめぐるウォークスルー体験。スケール感のある空間演出と学びを組み合わせます。",
        "骨格から分かることと、現生動物から推定する体内の仕組みを区別して紹介。臓器などの再現は科学的な推定を含む展示演出です。"
    ],
    "environment": "屋内ウォークスルー型を想定",
    "accessibility": "通路幅・段差・補助設備の詳細は検討中",
    "cautions": [
        "年齢制限なし（企画上の設定）。",
        "暗い空間や大きな音の演出を想定。",
        "恐竜の軟組織・臓器の表現には推定が含まれます。"
    ],
    "steps": [
        {
            "title": "骨格ゲートを通る",
            "text": "大きな骨の構造から体を支える仕組みを知る。"
        },
        {
            "title": "体内をめぐる",
            "text": "呼吸・循環・消化を映像と音で体感する。"
        },
        {
            "title": "研究者の視点へ",
            "text": "化石で分かることと、分からないことを考える。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/inside.webp",
            "alt": "巨大恐竜の体内を探検する没入型空間のイメージ",
            "caption": "巨大な内部構造を歩いて探る"
        },
        {
            "src": "/park/assets/inside-alt.webp",
            "alt": "骨格や筋肉の模型に沿って歩く、架空の体内展示のイメージ",
            "caption": "光と造形によるウォークスルー体験"
        }
    ],
    "relatedIds": [
        "flight",
        "night"
    ]
}
  },
  {
    id:'flight', title:'スカイ・オーバー・フクイ', en:'SKY OVER FUKUI',
    zone:'福井駅・ダイノシティ', category:'ride',
    tagline:'背中に飛び乗れ。福井のすべてが眼下に。',
    description:'巨大な翼竜の肩・背中に乗り、福井の街並み、山、海を飛び越えるフライトシミュレーター。風、振動、映像で実際に空を飛んでいるような感覚をつくる。※翼竜は恐竜とは別の爬虫類の仲間。',
    condition:'身長120cm以上', duration:'約8分',
    visual:'flight', tag:'スリル',
    detail: {
    "storyTitle": "翼竜の視点で、福井の山・街・海を飛ぶ。",
    "story": [
        "翼竜の背中から眺めるように、福井の山地・平野・海岸を一気に飛び越えるフライトシミュレーター。大画面・風・振動で空中を移動する感覚を作ります。",
        "上空から土地の形を見比べる体験を通じて、同じ県内に異なる地形が広がることを発見します。翼竜は恐竜ではなく、空を飛んだ別系統の爬虫類です。"
    ],
    "environment": "屋内フライトシミュレーターを想定",
    "accessibility": "座席への移乗や身体保持条件は検討中",
    "cautions": [
        "身長120cm以上（企画上の設定）。",
        "動き・風・大型映像を伴う想定です。",
        "翼竜は恐竜ではありません。"
    ],
    "steps": [
        {
            "title": "出発前のブリーフィング",
            "text": "翼竜と福井の地形を知る。"
        },
        {
            "title": "空中へ飛び立つ",
            "text": "映像と座席が連動し、空を飛ぶ感覚を体験。"
        },
        {
            "title": "海まで見渡す",
            "text": "平野・山地・海岸のつながりを眺める。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/flight.webp",
            "alt": "翼竜と一緒に飛ぶ空中アトラクションのイメージ",
            "caption": "翼竜の背から見渡す景観"
        },
        {
            "src": "/park/assets/flight-alt.webp",
            "alt": "山、平野、海岸を空から見渡す架空の風景イメージ",
            "caption": "福井に着想を得た架空の空からの眺め"
        }
    ],
    "relatedIds": [
        "inside",
        "skyport"
    ]
}
  },
  {
    id:'ocean', title:'ダイノ・オーシャン', en:'DINO OCEAN',
    zone:'若狭湾・マリンワールド', category:'ocean',
    tagline:'海の底には、もうひとつの太古の世界。',
    description:'若狭湾沿岸に広がる「恐竜水族館」。巨大な水槽風の映像空間や水中シミュレーターを通して、首長竜やモササウルスなど古代の海の生物を観察する。※これらは恐竜ではない海棲爬虫類。',
    condition:'年齢制限なし', duration:'約45分',
    visual:'ocean', tag:'ファミリー',
    detail: {
    "storyTitle": "恐竜とは異なる、太古の海の主役たち。",
    "story": [
        "若狭湾沿岸を舞台にした大型映像の海の世界。首長竜やモササウルスなどの海棲爬虫類と出会う、没入型水族館のような展示を想定しています。",
        "海の生き物たちを化石からどのように復元するのかを考える展示を配置。生体の飼育ではなく、映像・造形による古生物の再現です。"
    ],
    "environment": "屋内映像・展示型を想定",
    "accessibility": "展示経路や体験設備の詳細は検討中",
    "cautions": [
        "年齢制限なし（企画上の設定）。",
        "暗い映像空間・水中演出を想定。",
        "首長竜・モササウルスは恐竜ではなく海棲爬虫類です。"
    ],
    "steps": [
        {
            "title": "古代の海へ入る",
            "text": "時代ごとの海の環境を学ぶ。"
        },
        {
            "title": "海棲爬虫類に出会う",
            "text": "大きな映像空間で生き物を観察する。"
        },
        {
            "title": "化石の謎を解く",
            "text": "骨や歯から分かることを考える。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/ocean.webp",
            "alt": "海棲爬虫類の映像を観客が眺める、架空の展示イメージ",
            "caption": "水中を再現した太古の世界"
        },
        {
            "src": "/park/assets/ocean-alt.webp",
            "alt": "海中トンネルと遠くを泳ぐ海棲爬虫類を描いた架空の展示イメージ",
            "caption": "水中の奥行きを感じる空間"
        }
    ],
    "relatedIds": [
        "coast",
        "fossil"
    ]
}
  },
  {
    id:'fossil', title:'フォッシル・フロンティア', en:'FOSSIL FRONTIER',
    zone:'勝山・ディスカバリー', category:'discovery',
    tagline:'化石を見つけるのは、あなた。',
    description:'勝山の化石産地という地域性を生かした模擬発掘ラボ。地層の重なり、化石化の仕組み、恐竜の生きた白亜紀の環境を体感しながら学べる。',
    condition:'年齢制限なし', duration:'約35分',
    visual:'fossil', tag:'学び',
    detail: {
    "storyTitle": "勝山の化石産地に着想を得た発掘ラボ。",
    "story": [
        "福井県勝山市が恐竜化石の産地として知られることから生まれた模擬発掘アトラクション。地層を観察し、化石の形を少しずつ見つけていきます。",
        "化石がどの地層から見つかったか、周囲にどんな堆積物があったかを記録することも発掘の大切な仕事。発見から解釈までを体験します。"
    ],
    "environment": "発掘ラボ型を想定（屋内外は検討中）",
    "accessibility": "作業台・補助器具などの詳細は検討中",
    "cautions": [
        "年齢制限なし（企画上の設定）。",
        "模擬発掘です。実際の産地での採集を認めるものではありません。",
        "工具や姿勢などの安全条件は検討中。"
    ],
    "steps": [
        {
            "title": "地層を観察",
            "text": "重なりから過去の環境を考える。"
        },
        {
            "title": "模擬化石を発掘",
            "text": "場所を記録しながら掘り進める。"
        },
        {
            "title": "発見を調べる",
            "text": "骨の特徴と化石化の過程を学ぶ。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/fossil.webp",
            "alt": "ヘルメット姿の参加者が骨格を模擬発掘する架空の施設イメージ",
            "caption": "勝山を舞台に化石を探す"
        },
        {
            "src": "/park/assets/fossil-alt.webp",
            "alt": "地層の壁と化石標本、研究道具を描いた架空の展示イメージ",
            "caption": "架空の地層・標本展示。特定の産地の記録ではありません"
        }
    ],
    "relatedIds": [
        "ocean",
        "coast"
    ]
}
  },
  {
    id:'coast', title:'ジュラシック・コースト', en:'JURASSIC COAST',
    zone:'越前海岸・ワイルドコースト', category:'discovery',
    tagline:'海岸の絶景に、地球の記憶を重ねる。',
    description:'越前海岸の地形を手がかりに、巨大な地球史のタイムラインを体験する散策型エリア。AR演出で「今の海岸」と「過去の地球」を見比べる。',
    condition:'歩行型・一部バリアフリー対応', duration:'約40分',
    visual:'coast', tag:'絶景',
    detail: {
    "storyTitle": "今の海岸と、長い地球史を重ね合わせる。",
    "story": [
        "越前海岸の岩場と海食地形を観察しながら歩く散策型体験。ARを重ねることで、現在の景観と過去の地球の姿を比較する構想です。",
        "「ジュラシック」は冒険の演出名です。越前海岸全体がジュラ紀の地質だと断定するものではありません。実際の地形観察と想像上の復元映像を分けて案内します。"
    ],
    "environment": "屋外散策・AR型を想定",
    "accessibility": "一部バリアフリー対応を想定。対象区間・路面条件は検討中",
    "cautions": [
        "歩行型・一部バリアフリー対応（企画上の設定）。",
        "荒天・高波時の実施条件は検討中。",
        "名称の『ジュラシック』は海岸全域の地質年代を意味しません。"
    ],
    "steps": [
        {
            "title": "海岸の岩を観察",
            "text": "波や地形の働きを知る。"
        },
        {
            "title": "ARで過去を再現",
            "text": "現在の風景に異なる時代の映像を重ねる。"
        },
        {
            "title": "地球史を振り返る",
            "text": "長い時間による地形変化を考える。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/coast.webp",
            "alt": "岩の海岸で散策者が古生物のAR演出を眺める架空の体験イメージ",
            "caption": "現在と過去を重ねる海岸の冒険"
        },
        {
            "src": "/park/assets/coast-alt.webp",
            "alt": "岩礁に波が打ち寄せる海岸のイメージ",
            "caption": "波が作る景観を見つめる"
        }
    ],
    "relatedIds": [
        "ocean",
        "fossil"
    ]
}
  },
  {
    id:'night', title:'ナイト・オブ・ザ・ジャイアンツ', en:'NIGHT OF THE GIANTS',
    zone:'福井駅・ダイノシティ', category:'show',
    tagline:'夜の街が、恐竜たちのステージに。',
    description:'福井駅周辺の建物を背景に、光・音・巨大映像で太古の世界を映し出すナイトショー。ファンタジーと科学的な解説を組み合わせ、1日の冒険を締めくくる。',
    condition:'どなたでも', duration:'約15分',
    visual:'night', tag:'ナイトショー',
    detail: {
    "storyTitle": "福井駅の街を、夜だけのステージへ。",
    "story": [
        "福井駅周辺の建物を背景に、巨大な映像・光・音で太古の世界を表現するナイトショー。山や海で体験した物語を夜の街へとつなぎます。",
        "幻想的な演出に、古生物についての短い解説を交える構想です。実際の建物への投影・開催日・許可は決定していません。"
    ],
    "environment": "屋外観覧型ショーを想定",
    "accessibility": "観覧場所・車いすスペース・音量配慮は検討中",
    "cautions": [
        "どなたでも（企画上の設定）。",
        "大きな音・強い光を伴う想定です。",
        "実際の開催・公共空間での投影は未決定です。"
    ],
    "steps": [
        {
            "title": "夜の広場へ",
            "text": "街の景観がショーの舞台となる。"
        },
        {
            "title": "巨人たちの登場",
            "text": "光と音が重なり太古の世界を描く。"
        },
        {
            "title": "冒険のフィナーレ",
            "text": "昼間に見た世界とのつながりを振り返る。"
        }
    ],
    "gallery": [
        {
            "src": "/park/assets/night.webp",
            "alt": "建物の壁に恐竜の映像を投影する架空の夜のショーのイメージ",
            "caption": "福井駅エリアの夜の演出"
        },
        {
            "src": "/park/assets/city.webp",
            "alt": "都市の建物を表した景観イメージ",
            "caption": "街全体がショーの舞台となる構想"
        }
    ],
    "relatedIds": [
        "inside",
        "flight"
    ]
}
  }
];
export const categoryLabels: Record<AttractionCategory,'ライド'|'体験・学習'|'海の世界'|'ショー'> = {
  ride:'ライド', discovery:'体験・学習', ocean:'海の世界', show:'ショー'
};

/** Canonical per-attraction URL, shared by cards, modal and related links. */
export const attractionDetailHref = (a: Attraction): string => '/park/attractions/' + encodeURIComponent(a.id) + '.html';
