import type { AreaId } from './areas-data';
export type { AreaId } from './areas-data';
/**
 * FUKUI DINO CITY fictional operational model.
 * This is NOT a live venue, weather report, transportation timetable or reservation system.
 * #7 owns the schedule contract; #8/#9 should reuse these exports.
 */
export const SCHEDULE_START = '2027-04-01';
export const SCHEDULE_END = '2027-06-30';
export type AreaStatus = 'scheduled' | 'suspended';
export type PassId = 'day' | 'two' | 'night';
export interface AreaSchedule {
  id: AreaId;
  name: string;
  program: string;
  status: AreaStatus;
  hours: string | null;
  note: string;
}
export interface ShowSchedule {
  id: 'night';
  title: string;
  area: AreaId;
  status: 'scheduled' | 'suspended';
  startsAt: string | null;
  durationMinutes: number;
  note: string;
  weatherNote: string;
}
export interface DaySchedule {
  date: string;
  areas: AreaSchedule[];
  show: ShowSchedule;
  note: string | null;
}
export interface TicketScheduleStatus {
  allowed: boolean;
  message: string;
  warnings: string[];
}
export const PARK_AREAS: ReadonlyArray<{
  id: AreaId; name: string; program: string; hours: string; note: string;
}> = [
  { id:'fukui', name:'福井駅・ダイノシティ', program:'インサイド・ザ・ダイナソー／スカイ・オーバー・フクイ／ナイトショー', hours:'09:00–21:00', note:'福井駅周辺のメインエリア（構想設定）' },
  { id:'katsuyama', name:'勝山・ディスカバリー', program:'フォッシル・フロンティア', hours:'10:00–18:00', note:'化石・地学体験エリア（構想設定）' },
  { id:'wakasa', name:'若狭湾・マリンワールド', program:'ダイノ・オーシャン', hours:'10:00–18:00', note:'海棲爬虫類の展示・学習エリア（構想設定）' },
  { id:'echizen', name:'越前海岸・ワイルドコースト', program:'ジュラシック・コースト', hours:'10:00–18:00', note:'屋外散策は気象・現地状況により変更の可能性あり' },
  { id:'komatsu', name:'小松空港・スカイポート', program:'ダイナソー・スカイポート', hours:'09:00–19:00', note:'石川県の小松空港を入口とする架空演出。実際の空港運行とは無関係' },
] as const;

// Static editorial examples. These dates are NOT real facility closures or forecasts.
const areaExceptions: Partial<Record<string, Partial<Record<AreaId, string>>>> = {
  '2027-04-14': { katsuyama:'発掘ラボ機材点検のため休止予定（モデル設定）' },
  '2027-05-19': { wakasa:'展示設備の点検のため休止予定（モデル設定）' },
  '2027-06-18': { echizen:'海岸遊歩道の保守点検のため休止予定（モデル設定）' },
};
const fullClosure: Readonly<Record<string,string>> = {
  '2027-05-12': '全エリアの設備点検日（モデル設定）',
};
const showExceptions: Readonly<Record<string,string>> = {
  '2027-06-04': '演出設備の定期点検により休演予定（モデル設定）',
};
const WEATHER_NOTE = '屋外演出のため、雨天・強風などの状況によって変更・休演する場合があります。天気予報やリアルタイム運行情報ではありません。';

export function isISODate(value:string):boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + 'T00:00:00Z');
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0,10) === value;
}
export function addDays(value:string, amount:number):string {
  const date = new Date(value + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() + amount);
  return date.toISOString().slice(0,10);
}
export function scheduleDateLabel(value:string):string {
  if (!isISODate(value)) return '日付未選択';
  const [year, month, day] = value.split('-').map(Number);
  const weekday = ['日','月','火','水','木','金','土'][new Date(value + 'T00:00:00Z').getUTCDay()];
  return `${year}年${month}月${day}日（${weekday}）`;
}
export function getDaySchedule(date:string):DaySchedule|null {
  if (!isISODate(date) || date < SCHEDULE_START || date > SCHEDULE_END) return null;
  const dayClosed = fullClosure[date];
  const exception = areaExceptions[date];
  const areas = PARK_AREAS.map(area => {
    const reason = dayClosed || exception?.[area.id];
    return {
      id: area.id,
      name: area.name,
      program: area.program,
      status: reason ? 'suspended' : 'scheduled',
      hours: reason ? null : area.hours,
      note: reason || area.note,
    } satisfies AreaSchedule;
  });
  const showReason = dayClosed || showExceptions[date];
  return {
    date, areas,
    show: {
      id:'night', title:'ナイト・オブ・ザ・ジャイアンツ', area:'fukui',
      status: showReason ? 'suspended' : 'scheduled',
      startsAt: showReason ? null : '20:00',
      durationMinutes:15,
      note: showReason || '福井駅・ダイノシティで20:00開演予定。光・音・映像で太古の世界を描く。',
      weatherNote:WEATHER_NOTE,
    },
    note: dayClosed || null,
  };
}
export function getTicketScheduleStatus(date:string, pass:PassId):TicketScheduleStatus {
  if (!isISODate(date)) return {allowed:false, message:'来場日を正しく選択してください。', warnings:[]};
  const dates = pass === 'two' ? [date, addDays(date,1)] : [date];
  const days = dates.map(getDaySchedule);
  if (days.some(day => day === null)) {
    return {
      allowed:false,
      message:pass === 'two' ? '2DAYパスは初日・翌日とも予定が発表された日付を選んでください。' : '選択した日付は日程未発表です。モデルスケジュールの公開期間を選んでください。',
      warnings:[],
    };
  }
  const confirmed = days.filter((day):day is DaySchedule => day !== null);
  if (confirmed.some(day => day.areas.every(area => area.status === 'suspended'))) {
    return {allowed:false, message:'選択期間に全エリア休止予定日が含まれるため、デモ券発行の対象外です。', warnings:[]};
  }
  if (confirmed.some(day => day.areas.find(area => area.id === 'fukui')?.status !== 'scheduled')) {
    return {allowed:false, message:'福井駅メインエリアが休止予定のため、この券種のデモ発行はできません。', warnings:[]};
  }
  const warnings:string[] = [];
  for (const day of confirmed) {
    for (const area of day.areas) {
      if (area.status === 'suspended') warnings.push(`${scheduleDateLabel(day.date)}：${area.name}は休止予定（${area.note}）`);
    }
    if (day.show.status === 'suspended') warnings.push(`${scheduleDateLabel(day.date)}：ナイトショーは休演予定（${day.show.note}）`);
  }
  return {
    allowed:true,
    message:'モデル営業予定を確認しました。実際の購入・予約・入場はできません。',
    warnings,
  };
}
