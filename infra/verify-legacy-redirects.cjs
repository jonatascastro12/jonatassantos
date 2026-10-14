// Live, read-only migration check. Pass CloudFront URLs before cutting over DNS.
// node infra/verify-legacy-redirects.cjs https://dtp534k2btzm.cloudfront.net
const assert = require('node:assert/strict');
const legacy = require('../src/content/legacy-posts.json');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(`${__dirname}/legacy-site-redirect.js`, 'utf8'), context);
const bases = process.argv.slice(2);
if (!bases.length) bases.push('http://jonatascastro.com', 'https://jonatascastro.com', 'http://www.jonatascastro.com', 'https://www.jonatascastro.com');
const checks = [];
const destination = 'https://www.jonatassantos.me';
for (const base of bases) {
  for (const post of legacy) {
    for (const path of [post.oldPath, post.oldPath.replace(/\/$/, ''), `${post.oldPath}index.html`]) {
      checks.push([base + path, 301, destination + post.portuguesePath]);
    }
  }
  for (const [id, path] of Object.entries(context.wordpressIds)) checks.push([`${base}/?p=${id}`, 301, destination + path]);
  for (const path of ['/', '/index.html', '/page/2/']) checks.push([base + path, 301, destination + '/pt/blog']);
  checks.push([base + '/?p=495&utm_source=old%20newsletter&utm_content=one&utm_content=two%26three', 301, destination + '/pt/blog/descomplicando-midi?utm_source=old%20newsletter&utm_content=one&utm_content=two%26three']);
  checks.push([base + '/wp-content/uploads/2016/05/0.jpg', 200]);
  checks.push([base + '/infografico-escala-de-blues/', 200]);
  checks.push([base + '/robots.txt', 200]);
}
for (const post of legacy) checks.push([destination + post.portuguesePath, 200]);
let passed = 0;
const errors = [];
async function worker() {
  while (checks.length) {
    const [url, status, location] = checks.shift();
    try {
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(20000) });
      await response.body?.cancel();
      assert.equal(response.status, status, `${url}: status`);
      if (location) {
        const actual = new URL(response.headers.get('location'));
        const expected = new URL(location);
        // CloudFront may reorder query keys; repeated values must still be preserved.
        actual.searchParams.sort();
        expected.searchParams.sort();
        assert.equal(actual.href, expected.href, `${url}: location`);
      }
      passed++;
    } catch (error) { errors.push(`${url}: ${error.message}`); }
  }
}
Promise.all(Array.from({ length: 6 }, worker)).then(() => {
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), bases, passed, failures: errors }, null, 2));
  process.exitCode = errors.length ? 1 : 0;
});
