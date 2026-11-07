import type { AreaId } from './areas-data';

export type PlanStop = { period: string; area: AreaId; title: string; description: string; href: string; link: string };
export type Plan = { id: string; title: string; audience: string; duration: string; start: AreaId; end: AreaId; ticket: '1DAY DINO PASS' | '2DAY EXPLORER PASS'; intro: string; rain: string; stops: readonly PlanStop[] };
/** Fictional itineraries: order is illustrative, not a timetable or booking. */
export const plans: readonly Plan[] = [
  { id:'city', title:'ダイノシティ 1DAY', audience:'初めての方・友人同士', duration:'1日', start:'fukui', end:'fukui', ticket:'1DAY DINO PASS', intro:'福井駅周辺に絞り、昼の体験から夜のショーまで街で過ごすプラン。', rain:'屋内を想定した体内探検を中心に、荒天時のショー実施は営業カレンダーで確認。', stops:[
    {period:'午前',area:'fukui',title:'恐竜の体内を探検',description:'福井駅周辺を出発し、骨格や体の仕組みをたどります。',href:'/park/attractions/inside.html',link:'体内探検の詳細'},
    {period:'昼食・休憩',area:'fukui',title:'太古の森でランチ',description:'森をテーマにしたレストランで食事と休憩を。',href:'/park/dining.html#venue-ancient-forest-grill',link:'レストランを見る'},
    {period:'午後',area:'fukui',title:'翼竜の視点で空へ',description:'翼竜は恐竜とは異なる飛行爬虫類。身長などの利用条件を確認。',href:'/park/attractions/flight.html',link:'フライトの詳細'},
    {period:'夕方・夜',area:'fukui',title:'ショーで締めくくる',description:'夕食や休憩の後、実施日ならナイトショーへ。休演日は駅周辺で過ごします。',href:'/park/attractions/night.html',link:'ナイトショーの詳細'}] },
  { id:'grand', title:'2DAY グランドアドベンチャー', audience:'初めての広域周遊・友人同士', duration:'1泊2日', start:'fukui', end:'wakasa', ticket:'2DAY EXPLORER PASS', intro:'1日目は勝山と福井駅、2日目は若狭湾方面へ。海岸全域を1日で詰め込まない旅。', rain:'屋内想定の発掘ラボや海洋体験を中心に、現地交通の運行を確認。', stops:[
    {period:'1日目・午前',area:'katsuyama',title:'勝山で化石を探る',description:'福井駅からえちぜん鉄道で勝山駅へ。駅から先は地域交通を確認し、模擬発掘を体験。',href:'/park/attractions/fossil.html',link:'発掘体験の詳細'},
    {period:'1日目・昼食',area:'katsuyama',title:'発掘のあとはランチ',description:'発掘をテーマにしたユニークなメニューで美味しい休憩を。',href:'/park/dining.html#venue-fossil-lab-kitchen',link:'キッチンを見る'},
    {period:'1日目・夕方',area:'fukui',title:'福井駅へ戻り宿泊',description:'えちぜん鉄道で福井駅へ戻り、夕食と宿泊。ホテルの予約・料金は各施設で確認。',href:'/park/transport.html?from=katsuyama&to=fukui',link:'勝山からの交通'},
    {period:'2日目',area:'wakasa',title:'若狭湾で古代の海へ',description:'福井駅から敦賀方面の鉄道、小浜線や地域交通を検討。昼食・休憩を挟み海棲爬虫類の世界へ。帰路も先に確認。',href:'/park/attractions/ocean.html',link:'海洋体験の詳細'}] },
  { id:'family', title:'家族でゆっくり探検', audience:'小さなお子さま連れ・家族', duration:'1日', start:'fukui', end:'fukui', ticket:'1DAY DINO PASS', intro:'福井駅周辺で移動を抑え、屋内体験と食事・休憩を中心に過ごすプラン。', rain:'屋内型の体内探検やショップを中心に、雨の日でも快適に楽しめます。', stops:[
    {period:'午前',area:'fukui',title:'体内探検へ',description:'全年齢対象。暗所や音響演出があるため事前に利用条件をご確認ください。',href:'/park/attractions/inside.html',link:'体験と利用条件'},
    {period:'昼食・休憩',area:'fukui',title:'森のレストランでひと休み',description:'食事の時間を長めに取り、家族のペースで過ごします。',href:'/park/dining.html#venue-ancient-forest-grill',link:'レストランを見る'},
    {period:'午後',area:'fukui',title:'旅の記念を探す',description:'駅周辺のショップでグッズを選び、疲れに合わせて帰路へ。',href:'/park/shops.html#venue-dino-city-store',link:'ショップを見る'},
    {period:'余裕があれば',area:'fukui',title:'翼竜フライト',description:'身長制限を含む利用条件を確認し、利用できない家族は交代で休憩。',href:'/park/attractions/flight.html',link:'利用条件を見る'}] },
  { id:'geology', title:'地球史ディスカバリー', audience:'地学・化石に関心のある方、学校団体', duration:'1泊2日', start:'fukui', end:'fukui', ticket:'2DAY EXPLORER PASS', intro:'勝山の化石と越前海岸の地形を別の日に訪ねる、学びを深める旅。', rain:'海岸での観察は中止し、屋内の発掘ラボを中心に。風雨や波の情報を事前に確認。', stops:[
    {period:'1日目・午前',area:'katsuyama',title:'勝山で化石と地層を学ぶ',description:'福井駅からえちぜん鉄道で勝山駅へ。駅から先の交通を確認して模擬発掘へ。',href:'/park/attractions/fossil.html',link:'発掘体験の詳細'},
    {period:'1日目・昼食',area:'katsuyama',title:'発掘の記録を振り返る',description:'キッチンで食事と休憩を取り、発見したことを話し合います。',href:'/park/dining.html#venue-fossil-lab-kitchen',link:'キッチンを見る'},
    {period:'1日目・夕方',area:'fukui',title:'福井駅周辺に戻り宿泊',description:'勝山駅から鉄道で戻り、夕食と宿泊を別途手配。',href:'/park/transport.html?from=katsuyama&to=fukui',link:'戻りの交通'},
    {period:'2日目',area:'echizen',title:'越前海岸の地形を観察',description:'福井駅から海岸方面のバスなどを確認。食事・休憩と復路を計画し、天候が悪ければ無理に海岸へ出ない。海岸全体を同一年代の地層とは扱いません。',href:'/park/attractions/coast.html',link:'海岸体験の詳細'}] },
  { id:'airport', title:'小松空港から始まる旅', audience:'飛行機で到着する方', duration:'1泊2日', start:'komatsu', end:'fukui', ticket:'2DAY EXPLORER PASS', intro:'石川県の小松空港を入口に、福井駅と勝山を訪ねるプラン。航空便とバスの接続を先に確認。', rain:'屋内想定のスカイポートや体内探検を中心に。天候による交通への影響も確認。', stops:[
    {period:'1日目・到着後',area:'komatsu',title:'空港で物語に出会う',description:'スカイポートで迫力のフライト体験を楽しんだ後は、連絡バス等で福井駅へ移動します。',href:'/park/attractions/skyport.html',link:'スカイポートの詳細'},
    {period:'1日目・移動',area:'fukui',title:'実際の交通で福井駅へ',description:'京福バス小松空港線を検討し、航空便との接続と満席時の代替を確認。到着後は食事と休憩を。',href:'/park/transport.html?from=komatsu&to=fukui',link:'空港からの交通'},
    {period:'1日目・午後',area:'fukui',title:'街で恐竜の体内を探る',description:'福井駅周辺で体内探検を楽しみ、夕食後は駅周辺に宿泊。',href:'/park/attractions/inside.html',link:'体内探検の詳細'},
    {period:'2日目',area:'katsuyama',title:'勝山で化石の世界へ',description:'えちぜん鉄道で勝山へ。食事・休憩を取り、帰りの列車と空港への接続を確認。',href:'/park/attractions/fossil.html',link:'発掘体験の詳細'}] },
];
