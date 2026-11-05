import test from 'node:test';
import assert from 'node:assert/strict';
import {passes,passIds,calculateTicketTotal,renderTicketComparison} from '../park/ticket-data.ts';
test('all pass and age prices drive both calculations and comparison',()=>{
 for(const id of passIds) for(const age of ['adult','junior','child']) {
  const q={adult:0,junior:0,child:0};q[age]=2;
  assert.equal(calculateTicketTotal(id,q),passes[id].prices[age]*2);
  assert.ok(renderTicketComparison().includes('¥'+passes[id].prices[age].toLocaleString('ja-JP')));
 }
 assert.equal(calculateTicketTotal('two',{adult:1,junior:2,child:3}),83800);
});
