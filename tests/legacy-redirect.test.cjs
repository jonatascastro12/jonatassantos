const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const legacy = require('../src/content/legacy-posts.json');
const source = fs.readFileSync('infra/legacy-site-redirect.js', 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context);
const request = (uri, querystring = {}) => ({ uri, querystring, method: 'GET', headers: {} });

test('the old domain remains crawlable and advertises the destination sitemap', () => {
  const response = context.handler({ request: request('/robots.txt') });
  assert.equal(response.statusCode, 200);
  assert.equal(response.body, 'User-agent: *\nAllow: /\nSitemap: https://www.jonatassantos.me/sitemap.xml\n');
});

test('CloudFront redirects preserve each article and WordPress ID without swallowing unknown paths', () => {
  assert.ok(Buffer.byteLength(source) < 10000);
  for (const post of legacy) {
    for (const uri of [post.oldPath, post.oldPath.replace(/\/$/, ''), `${post.oldPath}index.html`]) {
      const response = context.handler({ request: request(uri) });
      assert.equal(response.statusCode, 301);
      assert.equal(response.headers.location.value, `https://www.jonatassantos.me${post.portuguesePath}`);
    }
  }
  assert.equal(Object.keys(context.wordpressIds).length, 16);
  for (const [id, path] of Object.entries(context.wordpressIds)) {
    const response = context.handler({ request: request('/', { p: { value: id } }) });
    assert.equal(response.statusCode, 301);
    assert.equal(response.headers.location.value, `https://www.jonatassantos.me${path}`);
  }
  for (const uri of ['/unmapped-post/', '/wp-content/uploads/original.jpg']) {
    const original = request(uri);
    assert.equal(context.handler({ request: original }), original);
  }
  const unknownId = request('/', { p: { value: 'not-a-post' } });
  assert.equal(context.handler({ request: unknownId }), unknownId);
});

test('redirects preserve encoded campaign parameters and repeated values without retaining the WordPress ID', () => {
  const response = context.handler({ request: request('/index.html', {
    p: { value: '495' },
    utm_source: { value: 'old%20newsletter' },
    utm_content: { value: 'one', multiValue: [{ value: 'one' }, { value: 'two%26three' }] },
    empty: { value: '' }
  }) });
  assert.equal(response.headers.location.value, 'https://www.jonatassantos.me/pt/blog/descomplicando-midi?utm_source=old%20newsletter&utm_content=one&utm_content=two%26three&empty=');
  for (const uri of ['/', '/index.html', '/page/2/']) {
    assert.equal(context.handler({ request: request(uri) }).headers.location.value, 'https://www.jonatassantos.me/pt/blog');
  }
});
