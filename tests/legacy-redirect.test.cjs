const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const vm = require('node:vm');
const legacy = require('../src/content/legacy-posts.json');
const source = fs.readFileSync('infra/legacy-site-redirect.js', 'utf8');
const context = vm.createContext({});
vm.runInContext(source, context);
const request = (uri, querystring = {}) => ({ uri, querystring, method: 'GET', headers: {} });

test('prepared CloudFront redirects preserve each article and WordPress ID without swallowing unknown paths', () => {
  assert.ok(Buffer.byteLength(source) < 10000);
  for (const post of legacy) {
    for (const uri of [post.oldPath, post.oldPath.replace(/\/$/, '')]) {
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
