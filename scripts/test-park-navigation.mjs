import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'http://127.0.0.1:5173';
const screenshots = join(root, 'artifacts');
const server = spawn(process.execPath,
  [join(root, 'node_modules/vite/bin/vite.js'), '--host', '127.0.0.1', '--port', '5173', '--strictPort'],
  { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] },
);
let serverOutput = '';
for (const stream of [server.stdout, server.stderr]) {
  stream.on('data', (chunk) => { serverOutput = (serverOutput + chunk.toString()).slice(-10000); });
}

async function untilReady() {
  for (let attempt = 0; attempt < 90; attempt++) {
    if (server.exitCode !== null) throw new Error('Vite exited: ' + serverOutput);
    try {
      const response = await fetch(base + '/park/attractions.html', { signal: AbortSignal.timeout(2500) });
      if (response.ok) return;
    } catch { /* Vite is booting. */ }
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
  throw new Error('Vite did not become ready: ' + serverOutput);
}

let browser;
async function inspectWidth(width) {
  const page = await browser.newPage({ viewport: { width, height: 844 } });
  try {
    await page.goto(base + '/park/attractions.html', { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('.park-header').count(), 1, width + ': shared header');
    assert.equal(await page.locator('.site-footer').count(), 1, width + ': shared footer');
    assert.equal(await page.locator('.park-nav-category').count(), 3, width + ': navigation groups');

    const layout = await page.evaluate(() => {
      const header = document.querySelector('.park-header');
      const brand = document.querySelector('.park-header .brand');
      const toggle = document.querySelector('.park-mobile-toggle');
      const desktop = document.querySelector('.park-desktop-nav');
      const ticket = document.querySelector('.park-header .header-ticket');
      const bounds = (element) => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, right: rect.right, width: rect.width, height: rect.height };
      };
      return {
        viewport: innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        header: bounds(header), brand: bounds(brand),
        toggle: bounds(toggle), desktop: bounds(desktop), ticket: bounds(ticket),
      };
    });
    assert.ok(layout.header.height >= 50 && layout.header.height < 110, width + ': header height');
    assert.ok(layout.documentWidth <= layout.viewport + 1,
      width + ': horizontal overflow ' + layout.documentWidth + '/' + layout.viewport);

    if (width <= 940) {
      const menu = page.locator('#park-mobile-menu');
      const summary = menu.locator(':scope > summary');
      assert.ok(layout.brand.right + 1 <= layout.toggle.x,
        width + ': brand and mobile menu overlap');
      assert.equal(await menu.getAttribute('open'), null, width + ': menu initially closed');
      await summary.click();
      assert.notEqual(await menu.getAttribute('open'), null, width + ': tap opens menu');
      const category = page.locator('.park-mobile-category').first();
      await category.locator('summary').click();
      assert.notEqual(await category.getAttribute('open'), null, width + ': category opens');
      assert.ok(await category.locator('a[href="/park/attractions.html"]').isVisible(),
        width + ': submenu item visible');
      assert.equal(await category.locator('a[href="/park/attractions.html"]').getAttribute('aria-current'),
        'page', width + ': mobile aria-current');

      await summary.focus();
      await page.keyboard.press('Tab');
      assert.ok(await page.locator('.park-mobile-home').evaluate((element) => document.activeElement === element),
        width + ': Tab goes into the menu');
      await page.keyboard.press('Shift+Tab');
      assert.ok(await summary.evaluate((element) => document.activeElement === element),
        width + ': Shift+Tab returns to the menu toggle');

      await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('open'), null, width + ': Escape closes');
      assert.ok(await summary.evaluate((element) => document.activeElement === element),
        width + ': Escape restores focus');

      await summary.click();
      await page.mouse.click(3, 650);
      assert.equal(await menu.getAttribute('open'), null, width + ': outside pointer closes');
    } else {
      assert.ok(layout.brand.right <= layout.desktop.x + 1,
        width + ': brand overlaps desktop navigation');
      assert.ok(layout.desktop.right <= layout.ticket.x + 1,
        width + ': desktop navigation overlaps CTA');
      const category = page.locator('.park-nav-category').first();
      assert.equal(await category.locator('summary').getAttribute('aria-current'), 'location',
        width + ': current desktop category');
      const chevron = category.locator('.park-nav-chevron');
      assert.ok(await chevron.evaluate((element) => {
        const style = getComputedStyle(element);
        return style.borderRightStyle === 'solid' && style.borderRightWidth !== '0px';
      }), width + ': chevron is visible without Lucide');
      await category.locator('summary').click();
      assert.notEqual(await category.getAttribute('open'), null, width + ': desktop menu opens');
      assert.ok(await category.locator('a[href="/park/attractions.html"]').isVisible(),
        width + ': desktop submenu visible');
      await category.locator('summary').focus();
      await page.keyboard.press('Tab');
      assert.ok(await category.locator('a[href="/park/attractions.html"]').evaluate(
        (element) => document.activeElement === element),
      width + ': desktop Tab enters the submenu');
      await page.keyboard.press('Escape');
      assert.equal(await category.getAttribute('open'), null, width + ': desktop Escape closes');
    }
    await page.screenshot({ path: join(screenshots, 'navigation-' + width + '.png') });
    console.log('Navigation responsive and keyboard smoke: ' + width + 'px OK');
  } finally {
    await page.close();
  }
}

try {
  await untilReady();
  await mkdir(screenshots, { recursive: true });
  browser = await chromium.launch({ headless: true });
  for (const width of [375, 390, 430, 940, 941, 1280]) await inspectWidth(width);

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await noJs.newPage();
  await page.goto(base + '/park/', { waitUntil: 'domcontentloaded' });
  assert.equal(await page.locator('.park-header').count(), 1, 'No-JS: server-rendered header');
  await page.locator('#park-mobile-menu > summary').click();
  assert.ok(await page.locator('.park-mobile-home').isVisible(), 'No-JS: native details links');
  await noJs.close();
  console.log('No-JS native navigation smoke: OK');
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
