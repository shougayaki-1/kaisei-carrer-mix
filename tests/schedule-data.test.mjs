import test from 'node:test';
import assert from 'node:assert/strict';
import { SCHEDULE_START, SCHEDULE_END, isISODate, addDays, getDaySchedule, getTicketScheduleStatus, PARK_AREAS } from '../park/schedule-data.ts';

test('the date parser rejects malformed and impossible calendar dates', () => {
  assert.equal(isISODate('2027-02-30'), false);
  assert.equal(isISODate('2027-04-01'), true);
  assert.equal(isISODate('2027-4-1'), false);
  assert.equal(addDays('2027-04-30',1), '2027-05-01');
});

test('only published fictional model dates return a schedule', () => {
  assert.equal(SCHEDULE_START, '2027-04-01');
  assert.equal(SCHEDULE_END, '2027-06-30');
  assert.equal(getDaySchedule('2027-03-31'), null);
  assert.equal(getDaySchedule('2027-07-01'), null);
  assert.equal(getDaySchedule('2027-02-30'), null);
  const day = getDaySchedule(SCHEDULE_START);
  assert.ok(day);
  assert.deepEqual(day.areas.map(a=>a.id), PARK_AREAS.map(a=>a.id));
  assert.equal(day.areas.find(a=>a.id==='fukui')?.hours, '09:00–21:00');
  assert.equal(day.areas.find(a=>a.id==='katsuyama')?.hours, '10:00–18:00');
  assert.equal(day.show.startsAt, '20:00');
  assert.equal(day.show.durationMinutes, 15);
});

test('maintenance closures are date scoped and do not claim real weather', () => {
  const partial = getDaySchedule('2027-04-14');
  assert.equal(partial?.areas.find(a=>a.id==='katsuyama')?.status, 'suspended');
  assert.equal(partial?.areas.find(a=>a.id==='wakasa')?.status, 'scheduled');
  assert.equal(getDaySchedule('2027-04-15')?.areas.find(a=>a.id==='katsuyama')?.status, 'scheduled');
  const show = getDaySchedule('2027-06-04')?.show;
  assert.equal(show?.status, 'suspended');
  assert.equal(show?.startsAt, null);
  assert.match(show?.weatherNote || '', /天気予報やリアルタイム運行情報ではありません/);
});

test('the ticket simulator blocks unpublished or full-closure days', () => {
  assert.equal(getTicketScheduleStatus('2027-07-01','day').allowed,false);
  assert.equal(getTicketScheduleStatus('2027-05-12','day').allowed,false);
  assert.equal(getTicketScheduleStatus('2027-05-12','night').allowed,false);
  assert.equal(getTicketScheduleStatus('2027-05-11','two').allowed,false);
  assert.equal(getTicketScheduleStatus('2027-06-30','two').allowed,false);
  assert.equal(getTicketScheduleStatus('2027-04-01','day').allowed,true);
});

test('partial closures and nighttime show cancellation are shown as warnings', () => {
  const day = getTicketScheduleStatus('2027-04-14','day');
  assert.equal(day.allowed, true);
  assert.ok(day.warnings.some(text=>text.includes('勝山')));
  const night = getTicketScheduleStatus('2027-06-04','night');
  assert.equal(night.allowed, true);
  assert.ok(night.warnings.some(text=>text.includes('ナイトショー')));
  const two = getTicketScheduleStatus('2027-04-13','two');
  assert.ok(two.warnings.some(text=>text.includes('4月14日')));
});
