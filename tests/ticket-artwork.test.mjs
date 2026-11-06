import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {test} from 'node:test';
import {
  PARK_SITE_URL,
  PARK_QR_ROWS,
  ticketCardMarkup,
  ticketQrSvg
} from '../park/ticket-artwork.ts';

const sample = {
  code: 'DEMO-FDC-0011223344',
  date: '2027-03-17',
  pass: '2DAY EXPLORER PASS',
  guests: 3,
  total: 45400
};

test('QR encodes only the fixed park-home URL (verified with a QR reader)', () => {
  assert.equal(PARK_SITE_URL, 'https://mix.kaisei.shoug.org/park/');
  assert.equal(PARK_QR_ROWS.length, 33);
  assert.ok(PARK_QR_ROWS.every(row => row.length === 33 && /^[01]+$/.test(row)));
  assert.equal(
    createHash('sha256').update(PARK_QR_ROWS.join('')).digest('hex'),
    '4f4343cd56dd2d2f80f1bd7bc9243ecb98011700cf5003626a4348449958dc3f'
  );
  const svg = ticketQrSvg(false);
  assert.match(svg, /viewBox="0 0 41 41"/);
  assert.match(svg, /パーク公式サイトに移動するQRコード/);
});

test('souvenir face includes all fields and clearly prohibits using the QR for admission', () => {
  const ja = ticketCardMarkup(sample, false);
  assert.match(ja, /2DAY EXPLORER PASS/);
  assert.match(ja, /2027-03-17/);
  assert.match(ja, /3名/);
  assert.match(ja, /45,400円/);
  assert.match(ja, /DEMO-FDC-0011223344/);
  assert.match(ja, /サイト案内用QR・入場スキャン不可/);
  assert.match(ja, /SAMPLE \/ NOT VALID FOR ENTRY/);
  assert.match(ja, /https:\/\/mix\.kaisei\.shoug\.org\/park\//);
  const en = ticketCardMarkup(sample, true);
  assert.match(en, /3 guests/);
  assert.match(en, /¥45,400/);
  assert.match(en, /Website QR only — not an entry code/);
  assert.match(en, /No purchase, booking or admission/);
});

test('artwork escapes dynamic text rather than inserting HTML', () => {
  const html = ticketCardMarkup({...sample, pass: '<script>alert(1)</script>'}, true);
  assert.doesNotMatch(html, /<script>/);
  assert.match(html, /&lt;script&gt;/);
});
