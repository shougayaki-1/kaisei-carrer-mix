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
