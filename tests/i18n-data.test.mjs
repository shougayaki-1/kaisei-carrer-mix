import test from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function bundle(entry) {
 const result = await build({entryPoints:[entry], bundle:true, platform:'node', format:'esm', write:false, logLevel:'silent'});
 return import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].text).toString('base64'));
}

test('each attraction has complete English copy and retains its routes and images', async () => {
 const [{attractions},{englishAttraction}] = await Promise.all([bundle('park/attractions-data.ts'),bundle('park/attractions-en.ts')]);
 assert.equal(attractions.length, 7);
 for (const original of attractions) {
  const translated = englishAttraction(original);
  assert.equal(translated.id, original.id);
  assert.equal(translated.title, original.en);
  assert.equal(translated.detail.gallery.length, original.detail.gallery.length);
  assert.deepEqual(translated.detail.relatedIds, original.detail.relatedIds);
  assert.ok(translated.detail.story.length && translated.detail.cautions.length && translated.detail.steps.length);
  const copy = [translated.zone,translated.condition,translated.duration,translated.detail.accessibility,...translated.detail.story,...translated.detail.cautions,...translated.detail.steps.flatMap(s=>[s.title,s.text]),...translated.detail.gallery.flatMap(g=>[g.alt,g.caption])].join(' ');
  assert.doesNotMatch(copy, /[\u3040-\u30ff\u3400-\u9fff]/u, original.id);
 }
});

test('English ticket availability follows the Japanese model throughout and around its published period', async () => {
 const [{englishTicketStatus},{getTicketScheduleStatus,addDays}] = await Promise.all([bundle('park/english-ticket.ts'),bundle('park/schedule-data.ts')]);
 for(let date='2027-03-29'; date<='2027-07-02'; date=addDays(date,1)) {
  for(const pass of ['day','two','night']) {
   const en=englishTicketStatus(date,pass),ja=getTicketScheduleStatus(date,pass);
   assert.equal(en.allowed,ja.allowed,`${date} ${pass}`);
   assert.equal(en.warnings.length,ja.warnings.length,`${date} ${pass} warnings`);
   assert.doesNotMatch([en.message,...en.warnings].join(' '),/[\u3040-\u30ff\u3400-\u9fff]/u);
  }
 }
});

test('English pages expose the primary links and operational cautions', async () => {
 const page = {innerHTML:''};
 const previousDocument = globalThis.document;
 globalThis.document = {querySelector: selector => selector === 'main' ? page : null};
 try {
  const home = await bundle('park/english-home.ts');
  home.renderEnglishHome();
  for (const link of ['/park/attractions.html','/park/tickets.html','/park/guide.html','/park/access.html']) assert.ok(page.innerHTML.includes(link), link);
  assert.match(page.innerHTML,/fictional school-project concept/i);
  const access = await bundle('park/english-access.ts');
  access.renderEnglishAccess();
  for (const area of ['komatsu','fukui','katsuyama','wakasa','echizen']) assert.ok(page.innerHTML.includes(`id="area-${area}"`), area);
  assert.match(page.innerHTML,/not operating public transport/i);
  const tickets = await bundle('park/english-ticket.ts');
  tickets.renderEnglishTicket();
  for (const id of ['pass-options','visit-date','ticket-schedule-notice','demo-purchase','ticket-dialog','ticket-confirm-purchase','ticket-success']) assert.ok(page.innerHTML.includes(`id="${id}"`), id);
  assert.match(page.innerHTML,/No real booking, payment or admission/i);
  const list = await bundle('park/english-attractions.ts');
  list.renderEnglishAttractions();
  for (const id of ['category-filters','attraction-search','filter-height','attraction-grid','attraction-modal']) assert.ok(page.innerHTML.includes(`id="${id}"`), id);
 } finally { globalThis.document = previousDocument; }
});

test('language URLs override storage, preserve other URL state, and tolerate unavailable storage', async () => {
 const {getLanguage,setLanguage} = await bundle('park/language.ts');
 const oldWindow = globalThis.window, oldStorage = globalThis.localStorage;
 const values = new Map([['fdc-language','ja']]);
 let assigned = '';
 try {
  globalThis.localStorage = {getItem:key=>values.get(key) ?? null,setItem:(key,value)=>values.set(key,value)};
  globalThis.window = {location:{search:'?date=2027-04-14&lang=en',href:'https://example.test/park/guide.html?date=2027-04-14&lang=en#operating-calendar',assign:value=>{assigned=value;}}};
  assert.equal(getLanguage(),'en');
  assert.equal(values.get('fdc-language'),'en');
  setLanguage('ja');
  const url=new URL(assigned);
  assert.equal(url.searchParams.get('lang'),'ja');
  assert.equal(url.searchParams.get('date'),'2027-04-14');
  assert.equal(url.hash,'#operating-calendar');
  globalThis.window.location.search='';
  assert.equal(getLanguage(),'ja');
  globalThis.localStorage={getItem:()=>{throw new Error('storage unavailable');},setItem:()=>{throw new Error('storage unavailable');}};
  assert.equal(getLanguage(),'ja');
  globalThis.window.location.search='?lang=en';
  assert.equal(getLanguage(),'en');
  assert.doesNotThrow(()=>setLanguage('en'));
 } finally { globalThis.window=oldWindow;globalThis.localStorage=oldStorage; }
});

test('English daily schedule shows model closures, unpublished dates and preserves selected date', async () => {
 const {renderEnglishGuide} = await bundle('park/english-guide.ts');
 const oldDocument=globalThis.document,oldLocation=globalThis.location,oldHistory=globalThis.history;
 const page={innerHTML:''}, output={innerHTML:''};
 let onChange=()=>{}, updated='';
 const input={value:'',addEventListener:(type,handler)=>{if(type==='change')onChange=handler;}};
 try {
  globalThis.location={search:'?lang=en&date=2027-04-14',href:'https://example.test/park/guide.html?lang=en&date=2027-04-14#operating-calendar'};
  globalThis.history={replaceState:(_state,_title,url)=>{updated=String(url);}};
  globalThis.document={querySelector:selector=>({'main':page,'#english-schedule-date':input,'#english-schedule-result':output})[selector] ?? null};
  renderEnglishGuide();
  assert.equal(input.value,'2027-04-14');
  assert.match(output.innerHTML,/Katsuyama/);
  assert.match(output.innerHTML,/Suspended for maintenance/);
  input.value='2027-05-12';onChange();
  assert.match(output.innerHTML,/All areas suspended/);
  assert.doesNotMatch(output.innerHTML,/Choose a demo ticket/);
  assert.equal(new URL(updated).searchParams.get('lang'),'en');
  assert.equal(new URL(updated).searchParams.get('date'),'2027-05-12');
  input.value='2027-07-01';onChange();
  assert.match(output.innerHTML,/Schedule not published/);
 } finally { globalThis.document=oldDocument;globalThis.location=oldLocation;globalThis.history=oldHistory; }
});

test('translated routes expose crawlable language alternatives and unsupported pages do not', async () => {
 const {englishPagePath,renderLanguageAlternates}=await bundle('park/locale-routes.ts');
 for (const [input, expected] of [
  ['/park/index.html','/park/'], ['/park/','/park/'], ['/park/tickets.html','/park/tickets'],
  ['/park/access','/park/access'], ['/park/guide.html','/park/guide'], ['/park/attractions.html','/park/attractions'],
  ['/park/attractions/skyport.html','/park/attractions/skyport'], ['/park/attractions/ocean','/park/attractions/ocean']
 ]) {
  assert.equal(englishPagePath(input),expected);
  const html=renderLanguageAlternates(input);
  assert.match(html,/hreflang="ja"/);
  assert.match(html,/hreflang="en"/);
  assert.match(html,/hreflang="x-default"/);
  assert.ok(html.includes(`https://mix.kaisei.shoug.org${expected}?lang=en`));
 }
 for(const path of ['/park/stay.html','/park/plans.html','/park/attractions/unknown.html','/']) {
  assert.equal(englishPagePath(path),null);
  assert.equal(renderLanguageAlternates(path),'');
 }
});
