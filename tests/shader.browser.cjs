// PLAYWRIGHT_PATH=/path/to/playwright node tests/shader.browser.cjs
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ args: ['--enable-unsafe-swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3101');
    const canvas = page.locator('.shader-bg canvas');
    await canvas.waitFor();
    await page.waitForFunction(() => document.querySelector('.shader-bg canvas')?.dataset.ready === 'true');
    assert.equal(await page.locator('.wave-strip').count(), 0);
    for (const theme of ['light', 'dark']) {
      await page.evaluate((theme) => localStorage.setItem('theme', theme), theme);
      await page.reload();
      await page.waitForFunction(() => document.querySelector('.shader-bg canvas')?.dataset.ready === 'true');
      await page.waitForTimeout(250);
      await page.screenshot({ path: `/tmp/site-shader-${theme}.png` });
    }
    // Hide foreground typing/video so pixel checks isolate the shader.
    await page.addStyleTag({ content: '.radix-themes { visibility: hidden !important; }' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(150);
    const first = await canvas.screenshot();
    await page.waitForTimeout(200);
    assert.ok(first.equals(await canvas.screenshot()), 'Reduced motion must freeze shader');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(150);
    const moving = await canvas.screenshot();
    await page.waitForTimeout(200);
    assert.ok(!moving.equals(await canvas.screenshot()), 'Shader must animate normally');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto((process.env.TEST_BASE_URL || 'http://localhost:3101') + '/blog');
    await page.waitForFunction(() => document.querySelector('.shader-bg canvas')?.dataset.ready === 'true');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: '/tmp/site-shader-mobile.png' });
    const [popup] = await Promise.all([page.waitForEvent('popup'), page.locator('a[href="https://workos.com/blog/retiring-home-grown-scim"]').click()]);
    assert.ok(popup.url().includes('workos.com'));
    await popup.close();
    assert.deepEqual(errors, []);
    // GPU-unavailable fallback must retain page content and usable links.
    const fallback = await browser.newPage();
    await fallback.addInitScript(() => { HTMLCanvasElement.prototype.getContext = () => null; });
    await fallback.goto(process.env.TEST_BASE_URL || 'http://localhost:3101');
    assert.ok(await fallback.locator('h1').isVisible());
    assert.equal(await fallback.locator('.shader-bg').count(), 1);
    console.log('PASS: WebGL initialization, both themes, motion preferences, mobile overflow, new tab, no runtime errors, no-GPU fallback');
  } finally { await browser.close(); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
