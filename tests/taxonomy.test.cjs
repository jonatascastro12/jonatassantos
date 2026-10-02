const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const matter = require('gray-matter');
const external = require('../src/content/external-posts.json');

const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const posts = [
  ...fs.readdirSync('src/content').filter((name) => name.endsWith('.md')).map((name) => ({
    id: name.slice(0, -3), ...matter(fs.readFileSync(`src/content/${name}`, 'utf8')).data,
  })),
  ...external,
].sort((a, b) => b.date.localeCompare(a.date));
const categories = ['engineering', 'music', 'marketing', 'personal', 'faith'];
const terms = [
  ...categories.map((term) => ({ kind: 'category', term })),
  ...[...new Set(posts.flatMap((post) => post.tags))].map((term) => ({ kind: 'tag', term })),
];
const localized = (path, locale) => `${locale === 'pt' ? '/pt' : ''}${path}`;
const titleLinks = (html) => [...html.matchAll(/<a\b(?=[^>]*class="blog-item-title")[^>]*href="([^"]+)"/g)].map((match) => match[1]);
const destination = (post, locale) => post.externalUrl || localized(`/blog/${post.id}`, locale);
const navigation = (html) => html.match(/<nav class="blog-categories[^>]*>[\s\S]*?<\/nav>/)?.[0];

test('every category and topic page contains exactly its matching posts in date order', async () => {
  for (const locale of ['en', 'pt']) {
    for (const { kind, term } of terms) {
      const path = localized(`/blog/${kind}/${term}`, locale);
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      const expected = posts.filter((post) => kind === 'category' ? post.category === term : post.tags.includes(term));
      assert.deepEqual(titleLinks(html), expected.map((post) => destination(post, locale)), path);
      const nav = navigation(html);
      assert.ok(nav, `Category navigation on ${path}`);
      assert.equal((nav.match(/aria-current="page"/g) || []).length, kind === 'category' ? 1 : 0, path);
      if (kind === 'category') {
        assert.match(nav, new RegExp(`<a(?=[^>]*href="${path}")(?=[^>]*aria-current="page")[^>]*>`), path);
      }
    }
  }
});

test('the category bar and post badges link to localized listings without changing article links', async () => {
  for (const locale of ['en', 'pt']) {
    const html = await (await fetch(`${base}${localized('/blog', locale)}`)).text();
    const nav = navigation(html);
    assert.ok(nav);
    assert.equal((nav.match(/<a /g) || []).length, 6);
    assert.equal((nav.match(/aria-current="page"/g) || []).length, 1);
    assert.ok(nav.includes(locale === 'pt' ? 'Todos os artigos' : 'All posts'));
    for (const category of categories) assert.ok(nav.includes(`href="${localized(`/blog/category/${category}`, locale)}"`));
    assert.deepEqual(titleLinks(html), posts.map((post) => destination(post, locale)));
    const items = html.match(/<li class="blog-item">[\s\S]*?<\/li>/g) || [];
    for (const [index, post] of posts.entries()) {
      for (const path of [`/blog/category/${post.category}`, ...post.tags.map((tag) => `/blog/tag/${tag}`)]) {
        assert.ok(items[index].includes(`href="${localized(path, locale)}"`), `${post.id}: ${path}`);
      }
    }
  }
});

test('unknown categories, topics, and taxonomy types return 404 in both languages', async () => {
  for (const locale of ['en', 'pt']) {
    for (const path of ['/blog/category/missing', '/blog/tag/missing', '/blog/category/constructor', '/blog/unknown/music']) {
      assert.equal((await fetch(`${base}${localized(path, locale)}`)).status, 404, path);
    }
  }
});
