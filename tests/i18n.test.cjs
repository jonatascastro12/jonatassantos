const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const matter = require('gray-matter');

const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const canonicalBase = 'https://www.jonatassantos.me';
const postIds = fs.readdirSync('src/content').filter((name) => name.endsWith('.md')).map((name) => name.slice(0, -3));
const articlePaths = postIds.map((id) => `/blog/${id}`);
const posts = [...postIds.map((id) => matter(fs.readFileSync(`src/content/${id}.md`, 'utf8')).data), ...require('../src/content/external-posts.json')];
const taxonomyPaths = [...new Set(posts.flatMap((post) => [`/blog/category/${post.category}`, ...post.tags.map((tag) => `/blog/tag/${tag}`)]))];
const paths = ['/', '/about', '/projects', '/blog', ...articlePaths, ...taxonomyPaths];
const escapeHtml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
const localized = (path, locale) => locale === 'pt' ? `/pt${path === '/' ? '' : path}` : path;

test('every page has a translated edition, a matching language switch, and reciprocal search metadata', async () => {
  await Promise.all(paths.flatMap((path) => ['en', 'pt'].map(async (locale) => {
    const publicPath = localized(path, locale);
    const response = await fetch(`${base}${publicPath}`);
    assert.equal(response.status, 200, publicPath);
    const html = (await response.text()).replace(/<!--[\s\S]*?-->/g, '');
    assert.match(html, new RegExp(`<html[^>]*lang="${locale === 'pt' ? 'pt-BR' : 'en'}"`), publicPath);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.ok(canonical, `Canonical exists: ${publicPath}`);
    assert.equal(new URL(canonical).href, new URL(`${canonicalBase}${publicPath}`).href, `Canonical: ${publicPath}`);
    for (const [language, alternative] of [['en', localized(path, 'en')], ['pt-BR', localized(path, 'pt')]]) {
      const href = html.match(new RegExp(`<link rel="alternate" hrefLang="${language}" href="([^"]+)"`))?.[1];
      assert.ok(href, `Language alternative exists: ${publicPath}`);
      assert.equal(new URL(href).href, new URL(`${canonicalBase}${alternative}`).href, `Language alternative: ${publicPath} -> ${alternative}`);
    }
    const switchLink = html.match(/<a[^>]*class="language-switch"[^>]*>[\s\S]*?<\/a>/)?.[0];
    assert.ok(switchLink?.includes(`href="${localized(path, locale === 'pt' ? 'en' : 'pt')}"`), `Same-page switch: ${publicPath}`);
    assert.ok(switchLink?.includes(locale === 'pt' ? 'English' : 'Português'), publicPath);
    if (articlePaths.includes(path)) {
      const id = path.slice('/blog/'.length);
      const file = `src/content/${locale === 'pt' ? 'pt/' : ''}${id}.md`;
      const title = matter(fs.readFileSync(file, 'utf8')).data.title;
      assert.ok(html.includes(escapeHtml(title)), `Translated article title: ${publicPath}`);
    }
  })));
});

test('the Portuguese blog keeps internal navigation Portuguese and identifies external English articles', async () => {
  const html = (await (await fetch(`${base}/pt/blog`)).text()).replace(/<!--[\s\S]*?-->/g, '');
  const items = html.match(/<li class="blog-item">[\s\S]*?<\/li>/g) || [];
  const internal = items.filter((item) => !item.includes('target="_blank"'));
  assert.equal(internal.length, postIds.length);
  assert.ok(internal.every((item) => item.includes('href="/pt/blog/')));
  const external = items.filter((item) => item.includes('target="_blank"'));
  assert.ok(external.every((item) => item.includes('(em inglês)') && item.includes('abre em uma nova aba')));
  assert.ok(html.includes('ago 2026'));
});

test('both language editions are discoverable without indexing the internal English prefix', async () => {
  const response = await fetch(`${base}/sitemap.xml`);
  assert.equal(response.status, 200);
  const sitemap = await response.text();
  const entries = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(entries.length, paths.length * 2);
  assert.ok(entries.every((url) => !new URL(url).pathname.startsWith('/en')));
  for (const path of paths) {
    assert.ok(entries.includes(`${canonicalBase}${localized(path, 'en')}`));
    assert.ok(entries.includes(`${canonicalBase}${localized(path, 'pt')}`));
  }
  assert.ok(sitemap.includes('hreflang="pt-BR"'));
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.ok(robots.includes(`Sitemap: ${canonicalBase}/sitemap.xml`));
  const redirect = await fetch(`${base}/en/about?from=test`, { redirect: 'manual' });
  assert.equal(redirect.status, 308);
  assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/about');
  assert.equal(new URL(redirect.headers.get('location'), base).search, '?from=test');
});

test('unknown articles return 404 in both languages instead of a file-reading failure', async () => {
  for (const path of ['/blog/not-a-post', '/pt/blog/not-a-post']) {
    assert.equal((await fetch(`${base}${path}`)).status, 404, path);
  }
});
