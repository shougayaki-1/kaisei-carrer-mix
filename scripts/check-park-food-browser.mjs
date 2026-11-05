/**
 * Real-browser smoke checks for Issue #3. Run after the production Vite build.
 * Usage: PARK_TEST_BASE=http://127.0.0.1:4173 node scripts/check-park-food-browser.mjs
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.env.PARK_TEST_BASE || 'http://127.0.0.1:4173';
const viewports = [375, 390, 430, 768, 1280];
const catalogs = [
  { name: 'dining', total: 3, areas: { fukui: 1, katsuyama: 1, wakasa: 1 }, items: 9 },
  { name: 'shops', total: 2, areas: { fukui: 1, katsuyama: 1 }, items: 6 },
];
const browser = await chromium.launch({ headless: true });
let inspected = 0;
const visitedAssets = new Set();

async function ensureImages(page) {
  const images = page.locator('.food-card-visual img, .food-gallery img');
  const attrs = await images.evaluateAll((nodes) => nodes.map((img) => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
  })));
  for (const { src, alt } of attrs) {
    assert.ok(src?.startsWith('/park/assets/'), 'Image must be repository-local: ' + src);
    assert.ok(alt?.trim(), 'Image missing alt: ' + src);
    if (visitedAssets.has(src)) continue;
    visitedAssets.add(src);
    const response = await page.request.get(new URL(src, origin).href);
    assert.equal(response.status(), 200, 'Missing image: ' + src);
    assert.match(response.headers()['content-type'] || '', /image\//, 'Incorrect MIME: ' + src);
  }
}

async function testCatalog(catalog, width) {
  const page = await browser.newPage({ viewport: { width, height: 820 }, deviceScaleFactor: 1 });
  try {
    const response = await page.goto(origin + '/park/' + catalog.name + '.html', { waitUntil: 'networkidle' });
    assert.equal(response?.status(), 200, 'Catalog route failed');
    await page.locator('.food-card').first().waitFor();
    assert.equal(await page.locator('.food-card').count(), catalog.total, 'Catalog card count');
    assert.equal(await page.locator('.food-venue').count(), catalog.total, 'Catalog detail count');
    assert.equal(await page.locator('.food-item strong').count(), catalog.items, 'Menu/product price count');
    assert.equal(await page.locator('.food-venue .food-map-link').count(), catalog.total, 'Map links');
    assert.equal(await page.locator('.park-header a[href="/park/dining.html"]').count(), 2, 'Shared header dining desktop/mobile');
    assert.equal(await page.locator('.park-header a[href="/park/shops.html"]').count(), 2, 'Shared header shops desktop/mobile');
    assert.ok(await page.locator('.site-footer a[href="/park/dining.html"]').count(), 'Shared footer dining missing');
    assert.ok(await page.locator('.site-footer a[href="/park/shops.html"]').count(), 'Shared footer shops missing');

    // Detect unintended horizontal overflow at all requested viewport widths.
    const metrics = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    assert.ok(metrics.document <= width + 1 && metrics.body <= width + 1,
      'Horizontal overflow at ' + width + 'px: ' + JSON.stringify(metrics));
    await ensureImages(page);

    // All area filters work via mouse and via native keyboard activation.
    for (const [area, count] of Object.entries(catalog.areas)) {
      const filter = page.locator('[data-food-filter="' + area + '"]');
      await filter.focus();
      await page.keyboard.press('Enter');
      assert.equal(await filter.getAttribute('aria-pressed'), 'true', 'Keyboard filter state');
      assert.equal(await page.locator('.food-card').count(), count, 'Filtered cards: ' + area);
      assert.equal(await page.locator('.food-venue').count(), count, 'Filtered detail: ' + area);
      assert.equal(await page.locator('#food-result-count').innerText(),
        count + '件の' + (catalog.name === 'dining' ? 'レストラン' : 'ショップ') + 'を表示中');
    }
    await page.locator('[data-food-filter="all"]').click();
    assert.equal(await page.locator('.food-card').count(), catalog.total);

    // The first card points to an on-page detail. The location hash resolves.
    const detailLink = page.locator('.food-card-visual').first();
    const href = await detailLink.getAttribute('href');
    assert.ok(href?.includes('#venue-'), 'Venue URL missing fragment');
    await detailLink.click();
    const target = new URL(page.url()).hash.slice(1);
    assert.ok(target.startsWith('venue-') && await page.locator('[id="' + target + '"]').count() === 1,
      'Venue fragment target is missing: ' + target);

    // The area map anchor must resolve on the access page.
    const mapHref = await page.locator('.food-venue .food-map-link').first().getAttribute('href');
    assert.ok(mapHref?.startsWith('/park/access.html#area-'), 'Area map URL');
    const mapUrl = new URL(mapHref, origin);
    const map = await page.request.get(mapUrl.href.split('#')[0]);
    assert.equal(map.status(), 200, 'Area map route');
    const mapHtml = await map.text();
    assert.ok(mapHtml.includes('id="' + mapUrl.hash.slice(1) + '"'), 'Map anchor target missing');

    // Shared native <details> mobile menu remains operable at phone widths.
    if (width <= 430) {
      const toggle = page.locator('#park-mobile-menu > summary');
      await toggle.click();
      assert.ok(await page.locator('#park-mobile-menu').evaluate(el => el.open), 'Mobile menu not opened');
      assert.ok(await page.locator('#park-mobile-menu a[href="/park/shops.html"]').isVisible(), 'Mobile shop link hidden');
      await page.keyboard.press('Escape');
      assert.ok(!(await page.locator('#park-mobile-menu').evaluate(el => el.open)), 'Escape did not close mobile menu');
    }
    inspected += 1;
    console.log('PASS catalog=' + catalog.name + ' width=' + width);
  } finally { await page.close(); }
}

async function checkExistingFeatures() {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  try {
    await page.goto(origin + '/park/attractions.html', { waitUntil: 'networkidle' });
    await page.locator('.attraction-card').first().waitFor();
    assert.equal(await page.locator('.attraction-card').count(), 7, 'Seven attractions must remain available');
    await page.locator('.attraction-card [data-attr]').first().click();
    assert.ok(await page.locator('#attraction-modal').evaluate(el => el.open), 'Attraction modal broken');
    await page.locator('#modal-close').click();

    await page.goto(origin + '/park/tickets.html', { waitUntil: 'networkidle' });
    await page.locator('[data-pass="two"]').click();
    assert.equal(await page.locator('#selected-pass').innerText(), '2DAY EXPLORER PASS');
    await page.locator('#demo-purchase').click();
    assert.ok(await page.locator('#ticket-dialog').evaluate(el => el.open), 'Demo confirmation broken');
    assert.ok((await page.locator('.checkout-notice').innerText()).includes('体験用'), 'Demo disclaimer missing');
    await page.locator('#ticket-close').click();
    console.log('PASS existing attractions + demo ticket flows');
  } finally { await page.close(); }
}

try {
  for (const width of viewports) for (const catalog of catalogs) await testCatalog(catalog, width);
  await checkExistingFeatures();
  console.log('PASS all ' + inspected + ' catalog viewport cases, ' + visitedAssets.size + ' local asset references');
} finally {
  await browser.close();
}
