const assert = require('node:assert/strict');
const { test } = require('node:test');
const external = require('../src/content/external-posts.json');

// Run against `npm run dev -- --port 3100` or a production build.
test('blog renders external articles as safe new-tab links with dates and icons', async () => {
  const response = await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3100'}/blog`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const items = html.match(/<li class="blog-item">[\s\S]*?<\/li>/g) || [];
  for (const post of external) {
    const item = items.find((item) => item.includes(`href="${post.externalUrl}"`));
    assert.ok(item, `Missing external link: ${post.title}`);
    assert.match(item, /target="_blank"/);
    assert.match(item, /rel="noopener noreferrer"/);
    assert.match(item, /<svg/);
    assert.match(item, /opens in a new tab/);
    assert.ok(item.includes(`dateTime="${post.date}"`) || item.includes(`datetime="${post.date}"`));
  }
  const internal = items.filter((item) => item.includes('href="/blog/'));
  assert.equal(internal.length, 3);
  assert.ok(internal.every((item) => !item.includes('target="_blank"')));
  const dates = items.map((item) => item.match(/dateTime="([^"]+)"/i)[1]);
  assert.deepEqual(dates, [...dates].sort().reverse());
});
