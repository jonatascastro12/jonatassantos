// PLAYWRIGHT_PATH can point to an isolated QA installation.
const { chromium, webkit } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const base = process.env.TEST_BASE_URL || 'http://localhost:3216';
const artifacts = process.env.SCULPTURE_ARTIFACT_DIR || '/tmp/jonatas-sculpture';

async function ready(page) {
  await page.waitForFunction(() => document.querySelector('.shader-bg canvas')?.dataset.ready === 'true');
  await page.locator('.hero-artwork[data-ready="true"]').waitFor();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-artwork canvas')).opacity === '1');
}

(async () => {
  await fs.mkdir(artifacts, { recursive: true });
  for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
    const browser = await engine.launch(name === 'chromium' ? { args: ['--enable-unsafe-swiftshader'] } : {});
    try {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      let releaseModel;
      let modelRequested;
      const loading = new Promise(resolve => { releaseModel = resolve; });
      const requested = new Promise(resolve => { modelRequested = resolve; });
      await page.route('**/_next/static/chunks/*.js', async route => {
        const response = await route.fetch();
        if ((await response.text()).includes('RoomEnvironment')) {
          modelRequested();
          await loading;
        }
        await route.fulfill({ response });
      });
      await page.goto(`${base}/pt`, { waitUntil: 'domcontentloaded' });
      await requested;
      await page.evaluate(() => document.fonts.ready);
      const reserved = await page.locator('.hero-artwork').boundingBox();
      assert.equal(await page.locator('.hero-artwork svg, .hero-artwork img').count(), 0, 'No loading illustration is rendered');
      assert.equal(await page.locator('.hero-artwork canvas').evaluate(node => getComputedStyle(node).opacity), '0');
      await page.screenshot({ path: path.join(artifacts, `${name}-loading.png`) });
      releaseModel();
      await page.waitForFunction(() => {
        const opacity = Number(getComputedStyle(document.querySelector('.hero-artwork canvas')).opacity);
        return document.querySelector('.hero-artwork').dataset.ready === 'true' && opacity > 0 && opacity < 1;
      });
      const fadeOpacity = await page.locator('.hero-artwork canvas').evaluate(node => Number(getComputedStyle(node).opacity));
      await ready(page);
      assert.deepEqual(await page.locator('.hero-artwork').boundingBox(), reserved, 'Loading does not move or resize the sculpture area');
      await fs.writeFile(path.join(artifacts, `${name}-fade.json`), JSON.stringify({ reserved, fadeOpacity, finalOpacity: 1 }, null, 2));
      assert.equal(await page.title(), 'Jônatas Santos — Engenheiro de software');
      assert.match(await page.locator('h1').innerText(), /Jônatas Santos/);
      assert.equal(await page.locator('main img[alt="Jônatas Santos"]').count(), 0, 'No portrait on the home page');
      assert.match(await page.locator('h1').evaluate(node => getComputedStyle(node).fontFamily), /Manrope/);
      assert.equal(await page.locator('nextjs-portal').count(), 0, 'No framework error overlay');

      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
        const headingSize = await page.locator('h1').evaluate(node => parseFloat(getComputedStyle(node).fontSize));
        assert.ok(width === 1440 ? headingSize >= 89 && headingSize <= 94 : headingSize >= 48 && headingSize <= 50, 'Heading is modestly smaller');
        for (const dark of [false, true]) {
          const currentDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
          if (currentDark !== dark) await page.getByRole('button', { name: dark ? 'Ativar modo escuro' : 'Ativar modo claro' }).click();
          await page.waitForFunction(dark => document.documentElement.classList.contains('dark') === dark, dark);
          await page.waitForTimeout(200);
          assert.ok(await page.getByRole('button', { name: dark ? 'Ativar modo claro' : 'Ativar modo escuro' }).isVisible());
          assert.ok(await page.locator(dark ? '.theme-icon-sun' : '.theme-icon-moon').isVisible());
          assert.equal(await page.getByRole('switch').count(), 0);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name} ${width}: no horizontal overflow`);
          const art = page.locator('.hero-artwork');
          await art.scrollIntoViewIfNeeded();
          assert.equal(await art.evaluate(node => getComputedStyle(node.querySelector('canvas')).opacity), '1');
          await page.screenshot({ path: path.join(artifacts, `${name}-${width}-${dark ? 'dark' : 'light'}.png`), fullPage: false });
        }
      }

      await page.setViewportSize({ width: 1440, height: 900 });
      await page.reload();
      await ready(page);
      assert.ok(await page.getByRole('button', { name: 'Ativar modo claro' }).isVisible(), 'Theme action survives reload');
      assert.ok(await page.locator('.theme-icon-sun').isVisible(), 'Theme icon survives reload');
      await page.getByRole('link', { name: 'English: Ler esta página em inglês', exact: true }).focus();
      // WebKit on macOS uses Option+Tab for full keyboard navigation.
      await page.keyboard.press(name === 'webkit' ? 'Alt+Tab' : 'Tab');
      assert.ok(await page.locator('.theme-toggle').evaluate(node => node === document.activeElement));
      assert.equal(await page.locator('.theme-toggle').evaluate(node => getComputedStyle(node).outlineStyle), 'solid');
      await page.keyboard.press('Enter');
      await page.getByRole('button', { name: 'Ativar modo escuro' }).waitFor();
      await page.evaluate(() => scrollTo(0, 0));
      // Isolate the sculpture: a moving background cannot make this test pass.
      const isolation = await page.addStyleTag({ content: '.shader-bg { visibility: hidden !important; }' });
      const art = page.locator('.hero-artwork');
      const moving = await art.screenshot();
      await page.waitForTimeout(400);
      assert.ok(!moving.equals(await art.screenshot()), `${name}: sculpture changes pixels over time`);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.waitForTimeout(150);
      const still = await art.screenshot();
      await page.waitForTimeout(350);
      assert.ok(still.equals(await art.screenshot()), `${name}: reduced motion freezes sculpture`);
      await isolation.evaluate(node => node.remove());

      await page.getByRole('link', { name: 'English: Ler esta página em inglês', exact: true }).click();
      await page.waitForURL(`${base}/`);
      await ready(page);
      assert.equal(await page.locator('.language-flag').getAttribute('src'), '/flags/br.svg');
      assert.ok(await page.getByRole('button', { name: 'Switch to dark mode' }).isVisible());
      await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'About', exact: true }).click();
      await page.waitForURL(`${base}/about`);
      assert.ok(await page.locator('main img').count(), 'About page retains its images');
      await page.getByRole('banner').getByRole('link', { name: 'Jônatas Santos', exact: true }).click();
      await page.waitForURL(`${base}/`);
      await ready(page);

      // Context loss must leave a clear reserved area and a usable page.
      await page.locator('.hero-artwork canvas').evaluate(canvas => canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true })));
      assert.equal(await art.getAttribute('data-ready'), null);
      await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-artwork canvas')).opacity === '0');
      assert.equal(await page.locator('.hero-artwork svg, .hero-artwork img').count(), 0);
      assert.ok(await page.getByRole('heading', { name: 'Jônatas Santos', exact: true }).isVisible());
      assert.deepEqual(errors, []);

      const fallback = await browser.newPage();
      await fallback.addInitScript(() => {
        const original = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(type, ...args) {
          return type === 'webgl' || type === 'webgl2' ? null : original.call(this, type, ...args);
        };
      });
      await fallback.goto(`${base}/pt`);
      assert.equal(await fallback.locator('.hero-artwork svg, .hero-artwork img').count(), 0);
      assert.equal(await fallback.locator('.hero-artwork canvas').evaluate(node => getComputedStyle(node).opacity), '0');
      await fallback.getByRole('navigation', { name: 'Navegação principal', exact: true }).getByRole('link', { name: 'Blog', exact: true }).click();
      await fallback.waitForURL(`${base}/pt/blog`);
      assert.ok(await fallback.locator('h1').isVisible());
      const reduced = await browser.newPage({ reducedMotion: 'reduce', colorScheme: 'dark' });
      await reduced.goto(`${base}/pt`);
      await ready(reduced);
      assert.equal(await reduced.locator('.hero-artwork canvas').evaluate(node => getComputedStyle(node).transitionProperty), 'none');
      assert.ok(await reduced.getByRole('button', { name: 'Ativar modo claro' }).isVisible());
      assert.ok(await reduced.locator('.theme-icon-sun').isVisible());
      console.log(`PASS ${name}: fresh-load fade without placeholder or shift, smaller heading, keyboard/theme persistence, responsive layouts, motion, reduced motion, navigation, and clean no-WebGL state`);
    } finally { await browser.close(); }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
