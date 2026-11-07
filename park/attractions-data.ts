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
    description:'小松空港から福井へ向かう旅を、巨大な恐竜の背中に乗って飛び立つフライト体験。離陸から福井へのアプローチまで、壮大なパノラマ映像とダイナミックな座席演出で旅の幕開けを飾ります。',
    condition:'身長110cm以上', duration:'約20分',
    visual:'skyport', tag:'シグネチャー',
    detail: {
    "storyTitle": "空の玄関口から始まる、想像上の冒険。",
    "story": [
        "石川県の小松空港を福井への空の玄関口に。巨大な恐竜の背中に乗り込むフライト体験で、空港に降り立った瞬間から冒険が始まります。",
        "パノラマスクリーンと可動シートが連動し、雲海や山並みを越える大飛行を体感。旅の移動そのものを冒険ストーリーへと変えるシミュレーターアトラクションです（※実際の空港連絡交通ではありません）。"
    ],
    "environment": "屋内型フライトシミュレーター",
    "accessibility": "車いすをご利用の方は同伴者のサポートによりご搭乗いただけます（段差・補助はお近くのクルーまで）",
    "cautions": [
        "身長110cm以上（安全のため必ずご確認ください）。",
        "激しい動き・振動・大型スクリーンの光刺激を伴います。",
        "実際の空港アクセス交通（バス・列車）ではありません。"
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
            "alt": "恐竜型ライドが空港から出発するフライトイメージ",
            "caption": "巨大な恐竜とともに始まる空の旅"
        },
        {
            "src": "/park/assets/city.webp",
            "alt": "福井のダイノシティを表現した都市景観イメージ",
            "caption": "旅の先に広がる壮大な街並み"
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
    "environment": "屋内ウォークスルー型",
    "accessibility": "車いす対応（一部通路に緩やかな傾斜・暗所あり）",
    "cautions": [
        "年齢制限なし（小さなお子さまもご入場いただけます）。",
        "暗所や心音などの大きな音響演出を含みます。",
        "体内臓器や軟組織の造形表現は最新の研究に基づく推定展示です。"
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
            "alt": "骨格や筋肉の模型に沿って歩く巨大恐竜の体内展示イメージ",
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
    "environment": "屋内型フライトシミュレーター",
    "accessibility": "自立歩行・座席への単独移乗が必要となります",
    "cautions": [
        "身長120cm以上（安全のため必ずご確認ください）。",
        "高所感・浮遊感・激しい揺れを伴うアトラクションです。",
        "心臓疾患・乗り物酔いしやすい方はご利用をお控えください。"
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
            "alt": "山、平野、海岸を空から見渡す雄大なパノラマ風景イメージ",
            "caption": "福井の自然美を着想とした雄大な空からの眺め"
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
    "environment": "屋内シアター・展示型",
    "accessibility": "車いすでの観覧スペース・スロープ対応",
    "cautions": [
        "年齢制限なし。",
        "深海をイメージした暗所演出と音響効果があります。",
        "登場する首長竜・モササウルス類は恐竜とは異なる海棲爬虫類です。"
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
            "alt": "巨大な海棲爬虫類が泳ぐオーシャンシアターの展示イメージ",
            "caption": "水中を再現した太古の世界"
        },
        {
            "src": "/park/assets/ocean-alt.webp",
            "alt": "海中トンネルと遠くを泳ぐ海棲爬虫類を描いた展示イメージ",
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
    "environment": "屋内体験・展示型",
    "accessibility": "車いす対応の体験テーブルをご用意しています",
    "cautions": [
        "年齢制限なし（未就学児は保護者同伴）。",
        "細かな砂や模擬道具を使用します。汚れてもよい服装をおすすめします。",
        "展示・体験は安全な屋内ラボでの模擬発掘プログラムです。"
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
            "alt": "ヘルメット姿の参加者が骨格を模擬発掘する体験ラボのイメージ",
            "caption": "勝山を舞台に化石を探す"
        },
        {
            "src": "/park/assets/fossil-alt.webp",
            "alt": "地層の壁と化石標本、研究道具を描いた展示イメージ",
            "caption": "白亜紀の地層と化石標本の展示空間"
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
        "越前海岸の岩場と海食地形を観察しながら歩く散策型体験。ARを重ねることで、現在の景観と過去の地球の姿を重ね合わせて観察します。",
        "「ジュラシック」は冒険のストーリー名称です。越前海岸の実際の地形観察と、古代生物の復元演出を合わせてお楽しみいただけます。"
    ],
    "environment": "屋外散策・ARフィールド型",
    "accessibility": "一部段差・階段あり（舗装ルートは車いす・ベビーカー通行可能）",
    "cautions": [
        "歩きやすい靴・動きやすい服装でご参加ください。",
        "荒天・強風・波浪注意報等によりコースが制限される場合があります。",
        "『ジュラシック』は体験名称であり、海岸全域の地質年代を示すものではありません。"
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
            "alt": "岩の海岸で散策者が古生物のAR演出を眺める体験イメージ",
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
        "幻想的なプロジェクション演出に、古生物についての解説を交えてお届けします。天候や安全管理により演出内容の変更または休演となる場合があります。"
    ],
    "environment": "屋外観覧型ナイトショー",
    "accessibility": "専用車いす観覧エリアあり（混雑時はスタッフがご案内します）",
    "cautions": [
        "どなたでもご観覧いただけます。",
        "大音響・レーザー光・特殊効果演出を含みます。",
        "雨天・荒天時は安全のため演出内容の変更または中止となる場合があります。"
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
            "alt": "建物の壁面に恐竜の映像が投射される迫力のナイトショーイメージ",
            "caption": "福井駅エリアの夜の演出"
        },
        {
            "src": "/park/assets/city.webp",
            "alt": "都市の建物を表した景観イメージ",
            "caption": "街全体がショーの舞台となる夜の演出"
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
