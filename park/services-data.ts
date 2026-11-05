import type { AreaId } from './areas-data';
type Link = {label:string;href:string};
export type Service = {id:string;title:string;areas:readonly AreaId[];location:string;content:string;conditions:string;hours:string;links:readonly Link[]};
export type FAQ = {category:string;question:string;answer:string;href:string;link:string};
export const services:readonly Service[] = [
 {id:'family',title:'ファミリーサポート',areas:['fukui','katsuyama'],location:'福井駅エリアの案内拠点、勝山の発掘ラボ付近を構想',content:'授乳・おむつ替えスペース、ベビーカー利用時の休憩、迷子の相談先を検討。はぐれた場合は同行者と待ち合わせ場所を決める想定です。',conditions:'設置場所、貸出の有無・台数、迷子対応は未確定。身長制限により乗れない場合は同行者が交代して休憩する例を紹介します。',hours:'各エリアのモデル営業時間内を想定。詳細未定。',links:[{label:'家族向けコース',href:'/park/plans.html#family'},{label:'翼竜フライトの利用条件',href:'/park/attractions/flight.html'}]},
 {id:'accessibility',title:'アクセシビリティ',areas:['fukui','katsuyama','wakasa'],location:'福井駅の体内探検、勝山のラボ、若狭湾の海洋体験で検討',content:'段差の少ない動線、車いす対応トイレ、字幕・音声案内、静かに過ごせる場所を構想しています。',conditions:'経路、乗降介助、トイレ、字幕や感覚配慮の提供範囲は未確定。全施設で利用できる保証ではありません。実際の交通機関の設備は各事業者に確認してください。',hours:'設備・対応時間とも未定。',links:[{label:'体内探検の利用条件',href:'/park/attractions/inside.html'},{label:'交通と移動時の配慮',href:'/park/transport.html'}]},
 {id:'rain',title:'雨の日の過ごし方',areas:['fukui','katsuyama','wakasa','echizen'],location:'福井駅・勝山・若狭湾の屋内想定施設、越前海岸の屋外体験',content:'体内探検、発掘ラボ、古代海洋展示を中心に予定を組み替えます。海岸の散策は波や風が強いときは中止を想定します。',conditions:'施設は架空です。現実の海岸では天候・波浪・交通情報を確認し、危険な場所に近づかないでください。',hours:'日別の休止・ショー休演はモデルカレンダーで確認。',links:[{label:'営業カレンダー',href:'/park/guide.html#operating-calendar'},{label:'地学コース',href:'/park/plans.html#geology'}]},
 {id:'school',title:'学校団体・探究プログラム',areas:['katsuyama'],location:'勝山の架空の発掘ラボ周辺を想定。実際の集合場所は未定。',content:'小学校高学年から高校生を想定し、地層の順序、化石の産状の記録、推定の根拠を学ぶ構想です。ワークシートには「観察・推測・根拠・新しい疑問」を記入します。',conditions:'模擬発掘であり、実際の採集地や博物館の予約ではありません。引率人数、集合場所、所要時間、受付方法は未定です。翼竜や海棲爬虫類は恐竜と区別します。',hours:'勝山エリアのモデル営業時間内を想定。所要時間は未定。',links:[{label:'発掘体験',href:'/park/attractions/fossil.html'},{label:'地球史コース',href:'/park/plans.html#geology'}]},
 {id:'support',title:'休憩・救護・落とし物',areas:['komatsu','fukui','katsuyama','wakasa','echizen'],location:'福井駅の案内拠点を中心に、各地域の休憩・案内場所を構想',content:'給水、屋根のある休憩、落とし物相談、体調不良時の案内を検討しています。',conditions:'案内所・救護所・スタッフは実在せず、設置や医療対応を保証しません。実際の緊急時は地域の救急・警察等の公的窓口へ連絡してください。',hours:'設備・対応時間とも未定。',links:[{label:'5エリアの位置',href:'/park/access.html#geo-explorer'},{label:'営業カレンダー',href:'/park/guide.html#operating-calendar'}]},
 {id:'food',title:'飲食・物販サポート',areas:['fukui','katsuyama','wakasa'],location:'福井駅の森のレストラン、勝山のキッチン、若狭湾のカフェと2ショップを構想',content:'家族向けメニューや休憩しやすい席、商品選びの案内を検討。店舗ごとの企画内容をご覧ください。',conditions:'アレルギー対応、原材料、持込み、商品の在庫・支払い方法は未定。実際の注文や購入はできません。',hours:'各店舗の企画上の営業時間。営業実績ではありません。',links:[{label:'レストラン',href:'/park/dining.html'},{label:'ショップ',href:'/park/shops.html'}]},
 {id:'transport',title:'エリア間移動のサポート',areas:['komatsu','fukui','katsuyama','wakasa','echizen'],location:'小松空港（石川県）と福井駅を玄関口に、県内各地域へ',content:'福井駅を経由する代表的な公共交通の考え方と、ベビーカー・車いす・荷物の事前確認事項を案内します。',conditions:'恐竜ライドやディノ・トランジットは架空で運行しません。実際の運賃・時刻・介助は各交通事業者で確認してください。',hours:'実際の交通機関の運行日・時刻を確認。',links:[{label:'エリア間交通',href:'/park/transport.html'},{label:'モデルコース',href:'/park/plans.html'}]},
];
export const faqs:readonly FAQ[] = [
 {category:'チケット',question:'チケットは購入できますか？',answer:'券種と人数を選ぶ体験用シミュレーションです。購入・決済・予約はできず、サンプル券で入場もできません。',href:'/park/tickets.html',link:'デモチケット'},
 {category:'チケット',question:'2DAY と NIGHT の違いは？',answer:'2DAYは連続2日間、NIGHTはショー実施日の17時以降の設定。休演日はNIGHTデモ券を発行できません。',href:'/park/tickets.html',link:'券種を比較'},
 {category:'移動',question:'小松空港から恐竜ライドで福井へ移動できますか？',answer:'いいえ。小松空港は石川県にあり、ライドは架空の演出です。実際の移動は空港バスなどを別途確認してください。',href:'/park/transport.html?from=komatsu&to=fukui',link:'交通案内'},
 {category:'移動',question:'県内の5エリアは徒歩で回れますか？',answer:'広い地域に分かれているため徒歩だけの周遊は想定していません。目的地と乗り継ぎを事前に確認してください。',href:'/park/access.html',link:'エリアマップ'},
 {category:'家族',question:'ベビーカーの貸出や授乳室はありますか？',answer:'架空のサービスとして検討中で、設置・貸出台数は未定です。実際の交通機関や施設は各運営者に確認してください。',href:'/park/services.html#family',link:'ファミリーサポート'},
 {category:'家族',question:'子どもが体験条件を満たさない場合は？',answer:'同伴者が交代して休むなどの過ごし方を想定しています。各体験の身長・年齢条件をご覧ください。',href:'/park/attractions/flight.html',link:'フライトの条件'},
 {category:'アクセシビリティ',question:'車いすで全ての体験を利用できますか？',answer:'動線や介助設備を構想中ですが、利用可能範囲は未定で、全体験の利用を保証できません。',href:'/park/services.html#accessibility',link:'アクセシビリティ'},
 {category:'アクセシビリティ',question:'字幕や静かな場所はありますか？',answer:'字幕・音声案内や静かな場所を検討していますが、設置・提供は未確定です。',href:'/park/services.html#accessibility',link:'サポートの構想'},
 {category:'雨天',question:'雨の日はどの体験を選べますか？',answer:'体内探検、発掘ラボ、海洋展示を屋内と想定しています。海岸は状況に応じて中止する設定です。',href:'/park/services.html#rain',link:'雨の日の案内'},
 {category:'学校',question:'学校団体を予約できますか？',answer:'学習プログラムは構想段階で、実際の受付や予約はありません。',href:'/park/services.html#school',link:'探究プログラム'},
 {category:'地学',question:'首長竜・モササウルス・翼竜は恐竜ですか？',answer:'いずれも恐竜とは異なる爬虫類です。翼竜は飛行爬虫類、首長竜とモササウルスは海棲爬虫類です。',href:'/park/attractions/ocean.html',link:'古代の海を探る'},
 {category:'食事',question:'食物アレルギーに対応していますか？',answer:'架空店舗の原材料・アレルギー対応は未確定で、実際の注文はできません。',href:'/park/dining.html',link:'飲食の構想'},
 {category:'救護',question:'体調が悪くなったときは？',answer:'パーク救護所は実在しません。実際の緊急時は地域の公的な救急窓口へ連絡してください。',href:'/park/services.html#support',link:'休憩・救護の構想'},
];
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
export function renderServices():string{return services.map(s=>`<article class="service-detail" id="${s.id}"><h2>${esc(s.title)}</h2><dl><div><dt>場所の構想</dt><dd>${esc(s.location)}</dd></div><div><dt>サービス</dt><dd>${esc(s.content)}</dd></div><div><dt>条件・注意</dt><dd>${esc(s.conditions)}</dd></div><div><dt>利用時間</dt><dd>${esc(s.hours)}</dd></div></dl><p>${s.links.map(l=>`<a href="${esc(l.href)}">${esc(l.label)} →</a>`).join('　')}</p></article>`).join('');}
export function renderFAQs():string{const cats=[...new Set(faqs.map(f=>f.category))];return cats.map((cat,i)=>`<section class="faq-category" id="faq-category-${i}"><h3>${esc(cat)}</h3>${faqs.filter(f=>f.category===cat).map(f=>`<details><summary>${esc(f.question)}</summary><p>${esc(f.answer)} <a href="${esc(f.href)}">${esc(f.link)} →</a></p></details>`).join('')}</section>`).join('');}
export function renderFAQIndex():string{return [...new Set(faqs.map(f=>f.category))].map((c,i)=>`<a href="#faq-category-${i}">${esc(c)}</a>`).join('');}
