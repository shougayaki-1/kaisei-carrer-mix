import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const html = read('park/access.html');
const areas = read('park/areas-data.ts');
const map = read('park/assets/fukui-geography.svg');
const css = read('park/area-map.css');
const js = read('park/area-map.ts');
const ids = ['komatsu', 'fukui', 'katsuyama', 'wakasa', 'echizen'];

test('all five geo map pins, text fallbacks and detailed cards agree on IDs', () => {
  for (const id of ids) {
    assert.ok(html.includes('data-geo-pin="' + id + '"'), 'missing map pin: '+id);
    assert.ok(html.includes('data-geo-index="' + id + '"'), 'missing text fallback: '+id);
    assert.ok(html.includes('id="area-' + id + '"'), 'missing direct area anchor: '+id);
    assert.ok(html.includes('data-area-card="' + id + '"'), 'missing area card: '+id);
    assert.ok(html.includes('data-geo-select="' + id + '"'), 'missing map return link: '+id);
    assert.ok(areas.includes("id:'" + id + "'"), 'missing area data: '+id);
  }
  assert.equal([...html.matchAll(/data-geo-pin="/g)].length, 5);
  assert.equal([...html.matchAll(/data-area-card="/g)].length, 5);
  assert.ok(html.includes('aria-label="地図を使わずエリアを選ぶ"'));
  assert.ok(html.includes('src="/park/area-map.ts"'));
});

test('map is geographical, locally bundled and distinguishes concept illustration', () => {
  assert.match(map, /viewBox="0 0 780 750"/);
  assert.match(map, /<title id="map-title">福井県と小松空港周辺の位置図/);
  assert.match(map, /<path d="M[0-9.,LZ]+"/); // actual coastline geometry
  assert.match(html, /src="\/park\/assets\/fukui-geography\.svg"/);
  assert.match(html, /src="\/park\/assets\/world-map-ai\.webp"/);
  assert.match(html, /小松空港は石川県/);
  assert.match(html, /概念図/);
  assert.match(html, /id="area-journeys"/);
  assert.match(html, /id="area-travel"/);
});

test('area selection is keyboard accessible and does not depend on raster artwork', () => {
  assert.match(js, /addEventListener\('hashchange'/);
  assert.match(js, /aria-current/);
  assert.match(js, /data-geo-select/);
  assert.match(css, /@media\(max-width:700px\)/);
  assert.match(css, /\.geo-map-pin:focus-visible/);
  assert.ok(!html.includes('href="/park/dining.html"'), 'unmerged #3 route should not be linked yet');
  assert.ok(!html.includes('href="/park/attractions/'), 'unmerged #2 route should not be linked yet');
});

test('representative coordinates are within the expected geographical bounds', () => {
  const points = [...areas.matchAll(/id:'(komatsu|fukui|katsuyama|wakasa|echizen)',order:\d+,[\s\S]*?latitude:(\d+\.\d+),longitude:(\d+\.\d+)/g)];
  assert.equal(points.length, 5);
  const coords = Object.fromEntries(points.map(([,id,lat,lon])=>[id,{lat:Number(lat),lon:Number(lon)}]));
  for(const {lat,lon} of Object.values(coords)) {
    assert.ok(lat >= 35.3 && lat <= 36.5);
    assert.ok(lon >= 135.4 && lon <= 136.6);
  }
  assert.ok(coords.komatsu.lat > coords.fukui.lat);
  assert.ok(coords.katsuyama.lon > coords.fukui.lon);
  assert.ok(coords.wakasa.lat < coords.echizen.lat);
  assert.ok(coords.echizen.lon < coords.fukui.lon);
});
