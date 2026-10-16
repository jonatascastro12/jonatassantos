const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const matter = require('gray-matter');

const base = process.env.TEST_BASE_URL || 'http://localhost:3100';
const site = 'https://www.jonatassantos.me';
const slugs = fs.readdirSync('src/content').filter((name) => name.endsWith('.md')).map((name) => name.slice(0, -3));
const localized = (locale, pathname) => locale === 'pt' ? `/pt${pathname}` : pathname;
const schemas = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => {
  const data = JSON.parse(match[1]);
  assert.equal(data['@context'], 'https://schema.org');
  return data['@graph'] || [data];
});

test('every local article exposes faithful, linked authorship and dates in its initial HTML', async () => {
  for (const locale of ['en', 'pt']) {
    for (const slug of slugs) {
      const { data } = matter(fs.readFileSync(`src/content/${locale === 'pt' ? 'pt/' : ''}${slug}.md`, 'utf8'));
      assert.ok(data.description?.trim(), `${locale}/${slug}: editorial description required`);
      const pathname = localized(locale, `/blog/${slug}`);
      const response = await fetch(`${base}${pathname}`);
      assert.equal(response.status, 200, pathname);
      assert.equal(response.headers.get('x-robots-tag'), null, pathname);
      const html = await response.text();
      assert.doesNotMatch(html, /<meta[^>]+content="[^"]*(?:noindex|nosnippet)/);
      const nodes = schemas(html);
      const articles = nodes.filter((node) => node['@type'] === 'BlogPosting');
      assert.equal(articles.length, 1, pathname);
      const article = articles[0];
      assert.equal(article.headline, data.title);
      assert.equal(article.description, data.description);
      assert.equal(article.url, `${site}${pathname}`);
      assert.equal(article.mainEntityOfPage, article.url);
      assert.equal(article.inLanguage, locale === 'pt' ? 'pt-BR' : 'en');
      assert.equal(article.datePublished, data.date);
      assert.equal(article.dateModified, data.revised);
      for (const date of [article.datePublished, article.dateModified].filter(Boolean)) {
        assert.ok(html.includes(`dateTime="${date}"`), `Visible date: ${pathname} ${date}`);
      }
      assert.equal(article.author['@id'], `${site}/#person`);
      assert.equal(article.author.url, `${site}${localized(locale, '/about')}`);
      assert.ok(html.includes(`href="${localized(locale, '/about')}"`) && html.includes('rel="author"'));
      const person = nodes.find((node) => node['@type'] === 'Person');
      assert.equal(person['@id'], article.author['@id']);
      for (const profile of person.sameAs) assert.ok(html.includes(`href="${profile}"`));
      assert.ok(html.includes('<meta property="og:type" content="article"/>'));
      assert.ok(html.includes(`<meta property="article:published_time" content="${data.date}"/>`));
      if (article.image) {
        const path = new URL(article.image).pathname;
        assert.ok(fs.existsSync(`public${path}`), path);
        assert.ok(html.includes(`src="${path}"`), `Schema image appears in article: ${pathname}`);
        assert.ok(html.includes(`<meta property="og:image" content="${article.image}"/>`));
      }
    }
  }
});

test('both author profile editions identify the same person and projects use a public publication URL', async () => {
  for (const locale of ['en', 'pt']) {
    const pathname = localized(locale, '/about');
    const html = await (await fetch(`${base}${pathname}`)).text();
    const nodes = schemas(html);
    const profile = nodes.find((node) => node['@type'] === 'ProfilePage');
    assert.equal(profile.url, `${site}${pathname}`);
    assert.equal(profile.mainEntity['@id'], `${site}/#person`);
    assert.equal(profile.mainEntity.name, 'Jônatas Santos');
    assert.ok(nodes.some((node) => node['@type'] === 'WebSite' && node.url === `${site}/`));
    const projects = await (await fetch(`${base}${localized(locale, '/projects')}`)).text();
    assert.ok(projects.includes('https://medium.com/@jonatascastro12/understanding-self-signed-certificate-in-chain-issues-on-node-js-npm-git-and-other-applications-ad88547e7028'));
    assert.ok(!projects.includes('medium.com/me/stats/'));
  }
});

test('sitemap only declares known revision dates and keeps the existing crawler policy', async () => {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  assert.equal(new Set(entries.map((entry) => entry.match(/<loc>([^<]+)<\/loc>/)[1])).size, entries.length);
  for (const locale of ['en', 'pt']) {
    for (const slug of slugs) {
      const { data } = matter(fs.readFileSync(`src/content/${locale === 'pt' ? 'pt/' : ''}${slug}.md`, 'utf8'));
      const url = `${site}${localized(locale, `/blog/${slug}`)}`;
      const entry = entries.find((entry) => entry.includes(`<loc>${url}</loc>`));
      assert.ok(entry, url);
      const lastmod = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
      assert.equal(lastmod, data.revised, url);
    }
  }
  const robots = await (await fetch(`${base}/robots.txt`)).text();
  assert.equal(robots.trim(), `User-Agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml`);
});
