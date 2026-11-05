import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findTransportRoute } from '../park/transport-data.ts';
const areas = ['komatsu', 'fukui', 'katsuyama', 'wakasa', 'echizen'];
test('all ordered area pairs connect in the requested direction', () => {
  for (const from of areas) for (const to of areas) {
    const route = findTransportRoute(from, to);
    if (from === to) { assert.equal(route.length, 0); continue; }
    let current = from;
    for (const { leg, outward } of route) {
      assert.equal(outward ? leg.from : leg.to, current);
      current = outward ? leg.to : leg.from;
    }
    assert.equal(current, to);
  }
});
