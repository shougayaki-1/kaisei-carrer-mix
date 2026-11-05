import { getDaySchedule, scheduleDateLabel, isISODate, SCHEDULE_START, SCHEDULE_END, type DaySchedule } from './schedule-data';

const weekdays = ['日','月','火','水','木','金','土'];
const calendar = document.getElementById('schedule-days');
const title = document.getElementById('schedule-month-label');
const heading = document.getElementById('schedule-selected-date');
const status = document.getElementById('schedule-status');
const areaGrid = document.getElementById('schedule-areas');
const showPanel = document.getElementById('schedule-show');
const monthInfo = document.getElementById('schedule-month-info');
const ticketLink = document.getElementById('schedule-ticket-link') as HTMLAnchorElement | null;
const prevButton = document.getElementById('schedule-prev');
const nextButton = document.getElementById('schedule-next');

const today = new Date();
const todayISO = [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-');
const params = new URLSearchParams(window.location.search);
const requestDate = params.get('date') || '';
let selected = isISODate(requestDate) ? requestDate : todayISO < SCHEDULE_START || todayISO > SCHEDULE_END ? SCHEDULE_START : todayISO;
let [year, month] = selected.split('-').map(Number);
const el = (tag:string, className?:string, text?:string):HTMLElement => {
  const node = document.createElement(tag);
  if(className) node.className = className;
  if(text !== undefined) node.textContent = text;
  return node;
};
const iso = (y:number,m:number,d:number):string => [String(y).padStart(4,'0'),String(m).padStart(2,'0'),String(d).padStart(2,'0')].join('-');
function renderDay(day:DaySchedule|null):void {
  if (!heading || !status || !areaGrid || !showPanel || !ticketLink) return;
  heading.textContent = scheduleDateLabel(selected);
  areaGrid.replaceChildren();
  showPanel.replaceChildren();
  ticketLink.href = '/park/tickets.html?date=' + encodeURIComponent(selected);
  if (!day) {
    status.textContent = '日程未発表';
    status.className = 'schedule-status unpublished';
    areaGrid.append(el('p','schedule-unpublished','この日付の営業時間・ショー予定は未発表のため、デモチケットを選べません。モデル日程は2027年4月1日〜6月30日です。未発表は休園・満席を意味しません。'));
    ticketLink.hidden = true;
    return;
  }
  const closed = day.areas.every(a => a.status === 'suspended');
  status.textContent = closed ? '全エリア休止予定（モデル設定）' : '日別モデルスケジュール';
  status.className = 'schedule-status ' + (closed ? 'suspended' : 'scheduled');
  if (closed) areaGrid.append(el('p','schedule-day-note','全エリア休止予定のため、この日のデモチケットは発行できません。'));
  else if (day.areas.some(area => area.status === 'suspended')) areaGrid.append(el('p','schedule-day-note','一部エリアは休止予定です。各エリアの案内をご確認ください。'));
  if(day.note) areaGrid.append(el('p','schedule-day-note',day.note));
  for (const area of day.areas) {
    const card = el('article','schedule-area-card' + (area.status === 'suspended' ? ' is-suspended' : ''));
    const name = el('h4','',area.name);
    const time = el('strong','schedule-area-hours',area.hours || '休止予定');
    const program = el('p','schedule-area-program',area.program);
    const note = el('p','schedule-area-note',area.note);
    card.append(name,time,program,note);
    areaGrid.append(card);
  }
  const eyebrow = el('p','eyebrow highlight','NIGHT SHOW / FUKUI');
  const showTitle = el('h4','',day.show.title);
  const showHours = el('strong','schedule-show-hours',day.show.startsAt ? day.show.startsAt + ' 開演予定・約' + day.show.durationMinutes + '分' : '休演予定');
  const note = el('p','',day.show.note);
  const weather = el('p','schedule-weather-note',day.show.weatherNote);
  const detailLink = el('a','schedule-show-link','ショーの体験内容を見る') as HTMLAnchorElement;
  // #2 will add a standalone detail URL; the existing attraction detail modal works now.
  detailLink.href = '/park/attractions.html?attraction=night';
  showPanel.append(eyebrow,showTitle,showHours,note,weather,detailLink);
  ticketLink.hidden = closed;
}
function render():void {
  if(!calendar || !title || !monthInfo) return;
  title.textContent = year + '年' + month + '月';
  const first = new Date(Date.UTC(year,month-1,1)).getUTCDay();
  const last = new Date(Date.UTC(year,month,0)).getUTCDate();
  const body = document.createDocumentFragment();
  const totalCells = Math.ceil((first+last)/7)*7;
  for(let cell=0;cell<totalCells;cell+=7){
    const row = document.createElement('tr');
    for(let n=cell;n<cell+7;n++){
      const td = document.createElement('td');
      const dayNum = n-first+1;
      if(dayNum>=1 && dayNum<=last){
        const date=iso(year,month,dayNum);
        const schedule=getDaySchedule(date);
        const closed = schedule?.areas.every(a=>a.status==='suspended');
        const partial = !!schedule && (schedule.areas.some(a=>a.status==='suspended') || schedule.show.status==='suspended');
        const button = el('button','schedule-day' + (!schedule?' unannounced':closed?' all-closed':partial?' has-change':'') + (date===selected?' is-selected':''),String(dayNum)) as HTMLButtonElement;
        button.type='button';
        button.dataset.date=date;
        button.setAttribute('aria-pressed', String(date===selected));
        button.setAttribute('aria-label', scheduleDateLabel(date) + (closed?'、全エリア休止予定':partial?'、一部予定変更':schedule?'、予定あり':'、日程未発表'));
        if(date===todayISO) button.setAttribute('aria-current','date');
        td.append(button);
      }
      row.append(td);
    }
    body.append(row);
  }
  calendar.replaceChildren(body);
  monthInfo.textContent = (iso(year,month,1)>SCHEDULE_END || iso(year,month,last)<SCHEDULE_START)
    ? 'この月は日程未発表です。モデル公開期間は2027年4月1日〜6月30日です。日付を選んで案内を確認できます。' : '日付を選ぶと5エリアとショーの予定を表示します。矢印キー、Home、Endでも移動できます。';
  renderDay(getDaySchedule(selected));
}
function selectDate(date:string, focus=false):void {
  if(!isISODate(date))return;
  selected=date;
  [year,month]=date.split('-').map(Number);
  const url=new URL(window.location.href);
  url.searchParams.set('date',date);
  window.history.replaceState(null,'',url);
  render();
  if(focus)calendar?.querySelector<HTMLButtonElement>('[data-date="'+date+'"]')?.focus();
}
function changeMonth(amount:number):void {
  const next = new Date(Date.UTC(year,month-1+amount,1));
  const y=next.getUTCFullYear(), m=next.getUTCMonth()+1;
  const last=new Date(Date.UTC(y,m,0)).getUTCDate();
  selectDate(iso(y,m,Math.min(Number(selected.slice(-2)),last)));
}
if(calendar){
  calendar.addEventListener('click',event=>{
    const target=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-date]');
    if(target?.dataset.date)selectDate(target.dataset.date,true);
  });
  calendar.addEventListener('keydown',event=>{
    const target=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-date]');
    if(!target?.dataset.date)return;
    const steps:Record<string,number>={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};
    let days=steps[event.key];
    if(event.key==='Home')days=-(new Date(target.dataset.date+'T00:00:00Z').getUTCDay());
    if(event.key==='End')days=6-new Date(target.dataset.date+'T00:00:00Z').getUTCDay();
    if(days===undefined)return;
    event.preventDefault();
    const d=new Date(target.dataset.date+'T00:00:00Z');d.setUTCDate(d.getUTCDate()+days);
    selectDate(d.toISOString().slice(0,10),true);
  });
  prevButton?.addEventListener('click',()=>changeMonth(-1));
  nextButton?.addEventListener('click',()=>changeMonth(1));
  render();
}
