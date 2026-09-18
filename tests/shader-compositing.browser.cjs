// PLAYWRIGHT_PATH and PNGJS_PATH can point to an isolated QA installation.
const { chromium, webkit, devices } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const { PNG } = require(process.env.PNGJS_PATH || 'pngjs');
const assert = require('node:assert/strict');
(async () => {
  for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
    const browser = await engine.launch(name === 'chromium' ? { args: ['--enable-unsafe-swiftshader'] } : {});
    try {
      for (const forcedPremultiplication of [true, false]) {
        for (const theme of ['dark', 'light']) {
          const page = await browser.newPage({ ...devices['iPhone 13'], colorScheme: theme, reducedMotion: 'reduce' });
          if (forcedPremultiplication) {
            // Model a compositor treating straight RGB as premultiplied RGB.
            await page.addInitScript(() => {
              const original = HTMLCanvasElement.prototype.getContext;
              HTMLCanvasElement.prototype.getContext = function(type, options) {
                return original.call(this, type, type === 'webgl' ? { ...options, premultipliedAlpha: true } : options);
              };
            });
          }
          await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3110');
          await page.waitForFunction(() => document.querySelector('.shader-bg canvas')?.dataset.ready === 'true');
          await page.screenshot({ path: `/tmp/compositing-${name}-${theme}-${forcedPremultiplication}.png` });
          // Remove text/video from the sample, without altering background layers.
          await page.addStyleTag({ content: '.radix-themes { visibility: hidden !important; }' });
          const png = PNG.sync.read(await page.screenshot({ scale: 'css' }));
          const i = (Math.floor(png.height / 2) * png.width + Math.floor(png.width / 2)) * 4;
          const rgb = [...png.data.subarray(i, i + 3)];
          const expected = theme === 'dark' ? [10, 14, 20] : [238, 242, 247];
          console.log(name, theme, { forcedPremultiplication, rgb });
          assert.ok(rgb.every((value, channel) => Math.abs(value - expected[channel]) < 12), `Reading column washed out: ${rgb}`);
          assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
          await page.close();
        }
      }
    } finally { await browser.close(); }
  }
  console.log('PASS: mobile light/dark palettes preserved in Chromium and WebKit, including alpha-compositor regression');
})().catch((error) => { console.error(error); process.exitCode = 1; });
