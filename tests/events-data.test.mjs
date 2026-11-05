import test from 'node:test';
import assert from 'node:assert/strict';
import {events,renderEventCards,renderEventDetails,renderNewsHeadline} from '../park/events-data.ts';
import {getDaySchedule,SCHEDULE_START} from '../park/schedule-data.ts';
test('news cards, article anchors and show schedule share one data source',()=>{
 assert.equal(new Set(events.map(e=>e.id)).size,events.length);
 assert.deepEqual([...events].sort((a,b)=>b.published.localeCompare(a.published)).map(e=>e.id),events.map(e=>e.id));
 for(const e of events){assert.ok(renderEventDetails().includes(`id="${e.id}"`));assert.ok(e.links.length>=2);}
 assert.ok(renderEventCards(3).includes(`/park/news.html#${events[0].id}`));
 assert.ok(renderNewsHeadline().includes(events[0].title));
 assert.ok(events[0].time.includes(getDaySchedule(SCHEDULE_START).show.startsAt));
});
