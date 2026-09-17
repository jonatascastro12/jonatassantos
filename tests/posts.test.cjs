const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const ts = require('typescript');

require.extensions['.tsx'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  module._compile(outputText, filename);
};

const { getSortedPostsData, getAllPostIds } = require('../src/lib/posts.tsx');

test('blog combines all project articles with local posts in descending date order', () => {
  const posts = getSortedPostsData();
  const external = posts.filter((post) => post.externalUrl);
  assert.equal(external.length, 7);
  assert.equal(new Set(posts.map((post) => post.id)).size, posts.length);
  assert.deepEqual(posts.map((post) => post.date), posts.map((post) => post.date).sort().reverse());
  const projects = fs.readFileSync('src/app/projects/page.mdx', 'utf8');
  const workosUrls = [...projects.matchAll(/type="paper" \/> \[[^\]]+\]\((https:\/\/workos.com[^)]+)\)/g)].map((match) => match[1]);
  for (const url of workosUrls) assert.ok(external.some((post) => post.externalUrl === url), url);
  for (const post of external) {
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(Number.isFinite(Date.parse(post.date)));
    assert.ok(!post.externalUrl.includes('/me/stats/'));
  }
  const localIds = getAllPostIds().map(({ params }) => params.id);
  assert.deepEqual(posts.filter((post) => !post.externalUrl).map((post) => post.id).sort(), localIds.sort());
  assert.ok(external.every((post) => !localIds.includes(post.id)));
});
