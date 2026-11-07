import { getLanguage } from './language';
import { getDaySchedule, scheduleDateLabel, isISODate, SCHEDULE_START, SCHEDULE_END, type DaySchedule } from './schedule-data';

const en = getLanguage() === 'en' && document.documentElement.lang === 'en';
const tr = (ja:string, english:string):string => en ? english : ja;
const dateLabel = (date:string):string => en ? new Intl.DateTimeFormat('en', {dateStyle:'full',timeZone:'UTC'}).format(new Date(date+'T00:00:00Z')) : scheduleDateLabel(date);
const areaNames:Record<string,string> = {komatsu:'Komatsu Airport',fukui:'Fukui Station',katsuyama:'Katsuyama',wakasa:'Wakasa Bay',echizen:'Echizen Coast'};
const programs:Record<string,string> = {komatsu:'Dinosaur Skyport',fukui:'Inside the Dinosaur / Sky Over Fukui / Night of the Giants',katsuyama:'Fossil Frontier',wakasa:'Dino Ocean',echizen:'Jurassic Coast'};
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
  heading.textContent = dateLabel(selected);
  areaGrid.replaceChildren();
  showPanel.replaceChildren();
  ticketLink.href = '/park/tickets.html?date=' + encodeURIComponent(selected);
  if (!day) {
    status.textContent = tr('日程未発表','Schedule not published');
    status.className = 'schedule-status unpublished';
    areaGrid.append(el('p','schedule-unpublished',tr('この日付の営業時間・ショー予定は未発表のため、チケットをお選びいただけません。公開日程は2027年4月1日〜6月30日です。未発表は休園・満席を意味しません。','Tickets are not available for unpublished dates. The published schedule covers April 1 through June 30, 2027; unpublished does not mean closed or sold out.')));
    ticketLink.hidden = true;
    return;
  }
  const closed = day.areas.every(a => a.status === 'suspended');
  status.textContent = closed ? tr('全エリア休止予定','All areas closed') : tr('本日の運営スケジュール','Today’s schedule');
  status.className = 'schedule-status ' + (closed ? 'suspended' : 'scheduled');
  if (closed) areaGrid.append(el('p','schedule-day-note',tr('全エリア休止予定のため、この日のチケットは発行できません。','All areas are suspended; tickets cannot be issued for this date.')));
  else if (day.areas.some(area => area.status === 'suspended')) areaGrid.append(el('p','schedule-day-note',tr('一部エリアは休止予定です。各エリアの案内をご確認ください。','Some areas are suspended. Please check each area.')));
  if(day.note) areaGrid.append(el('p','schedule-day-note',en ? 'All areas are suspended for model maintenance.' : day.note));
  for (const area of day.areas) {
    const card = el('article','schedule-area-card' + (area.status === 'suspended' ? ' is-suspended' : ''));
    const name = el('h4','',en ? areaNames[area.id] : area.name);
    const time = el('strong','schedule-area-hours',area.hours || tr('休止予定','Suspended'));
    const program = el('p','schedule-area-program',en ? programs[area.id] : area.program);
    const note = el('p','schedule-area-note',en ? (area.status === 'suspended' ? 'Suspended for maintenance.' : area.id === 'komatsu' ? 'Themed flight attraction, not actual airport transport.' : area.id === 'echizen' ? 'Outdoor activities may change with weather and local conditions.' : 'Main park area.') : area.note);
    card.append(name,time,program,note);
    areaGrid.append(card);
  }
  const eyebrow = el('p','eyebrow highlight','NIGHT SHOW / FUKUI');
  const showTitle = el('h4','',en ? 'Night of the Giants' : day.show.title);
  const showHours = el('strong','schedule-show-hours',day.show.startsAt ? day.show.startsAt + (en ? ' · about ' : ' 開演予定・約') + day.show.durationMinutes + (en ? ' minutes' : '分') : tr('休演予定','Suspended'));
  const note = el('p','',en ? (day.show.status === 'suspended' ? 'Suspended for maintenance.' : 'A dramatic spectacle of light, sound and images in Fukui.') : day.show.note);
  const weather = el('p','schedule-weather-note',en ? 'Outdoor effects may change or be cancelled due to weather. This is not a forecast or live information.' : day.show.weatherNote);
  const detailLink = el('a','schedule-show-link',tr('ショーの体験内容を見る','Show details')) as HTMLAnchorElement;
  detailLink.href = '/park/attractions/night.html';
  showPanel.append(eyebrow,showTitle,showHours,note,weather,detailLink);
  ticketLink.hidden = closed;
}
function render():void {
  if(!calendar || !title || !monthInfo) return;
  title.textContent = en ? new Intl.DateTimeFormat('en',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,1))) : year + '年' + month + '月';
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
        button.setAttribute('aria-label', dateLabel(date) + (closed?tr('、全エリア休止予定',', all areas suspended'):partial?tr('、一部予定変更',', some changes'):schedule?tr('、予定あり',', scheduled'):tr('、日程未発表',', unpublished')));
        if(date===todayISO) button.setAttribute('aria-current','date');
        td.append(button);
      }
      row.append(td);
    }
    body.append(row);
  }
  calendar.replaceChildren(body);
  monthInfo.textContent = (iso(year,month,1)>SCHEDULE_END || iso(year,month,last)<SCHEDULE_START)
    ? tr('この月は日程未発表です。公開中の営業期間は2027年4月1日〜6月30日です。日付を選んで案内を確認できます。','This month is unpublished. The published operating period is April 1 through June 30, 2027.') : tr('日付を選ぶと5エリアとショーの予定を表示します。矢印キー、Home、Endでも移動できます。','Select a date for all five areas and the show. Use arrow keys, Home and End to navigate.');
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
