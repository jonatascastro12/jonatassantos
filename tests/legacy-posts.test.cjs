const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');
const matter = require('gray-matter');
const legacy = require('../src/content/legacy-posts.json');
const base = process.env.TEST_BASE_URL || 'http://localhost:3100';

test('the complete sixteen-post archive has substantive English and Portuguese editions with original dates', () => {
  assert.equal(legacy.length, 16);
  assert.equal(new Set(legacy.map((post) => post.slug)).size, 16);
  assert.equal(fs.readdirSync('src/content').filter((name) => name.endsWith('.md')).length, 19);
  for (const post of legacy) {
    for (const locale of ['en', 'pt']) {
      const filename = `src/content/${locale === 'pt' ? 'pt/' : ''}${post.slug}.md`;
      const { data, content } = matter(fs.readFileSync(filename, 'utf8'));
      assert.equal(data.date, post.date, filename);
      assert.equal(data.legacy, true, filename);
      assert.ok(content.trim().length > 300, filename);
      assert.ok(!content.includes('[wdgpo'), filename);
      for (const [, source] of content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
        const image = source.split(' "')[0];
        assert.ok(image.startsWith('/blog-images/legacy/'), `${filename}: image is self-hosted: ${image}`);
        assert.ok(fs.existsSync(path.join('public', image)), `${filename}: image exists: ${image}`);
      }
      for (const [, destination] of content.matchAll(/(?<!!)\[[^\[\]]+\]\((\/[^)]+)\)/g)) {
        const href = destination.split(' "')[0];
        if (href.startsWith('/blog-images/')) {
          assert.ok(fs.existsSync(path.join('public', href)), `${filename}: linked original image exists: ${href}`);
        } else {
          const prefix = locale === 'pt' ? '/pt/blog/' : '/blog/';
          assert.ok(href.startsWith(prefix), `${filename}: related article retains locale: ${href}`);
          assert.ok(fs.existsSync(`src/content/${locale === 'pt' ? 'pt/' : ''}${href.slice(prefix.length)}.md`), `${filename}: related article exists: ${href}`);
        }
      }
    }
  }
});

test('known corrections, videos, and missing ebook downloads are represented honestly', () => {
  const midi = fs.readFileSync('src/content/descomplicando-midi.md', 'utf8');
  assert.ok(midi.includes('16,383') && midi.includes('8,192'));
  const table = fs.readFileSync('src/content/tabela-de-controles-midi-em-portugues.md', 'utf8');
  assert.ok(table.includes('| 99 | 63h | Non-Registered Parameter Number MSB |'));
  for (const post of legacy.filter((post) => post.videos.length)) {
    for (const video of post.videos) {
      for (const directory of ['src/content', 'src/content/pt']) {
        assert.ok(fs.readFileSync(`${directory}/${post.slug}.md`, 'utf8').includes(`https://www.youtube.com/watch?v=${video}`));
      }
    }
  }
  for (const slug of ['12-escalas-maiores-naturalidade-ao-piano', '7-passos-para-criar-listas-de-e-mail-do-zero']) {
    assert.match(fs.readFileSync(`src/content/${slug}.md`, 'utf8'), /PDF has not yet been recovered/);
    assert.match(fs.readFileSync(`src/content/pt/${slug}.md`, 'utf8'), /PDF do e-book ainda não foi recuperado/);
  }
});

test('legacy flat URLs redirect individually to their Portuguese counterparts and retain queries', async () => {
  for (const post of legacy) {
    for (const oldPath of [post.oldPath, post.oldPath.replace(/\/$/, '')]) {
      const response = await fetch(`${base}${oldPath}?from=archive`, { redirect: 'manual' });
      // Next canonicalizes trailing slashes before middleware on this configuration.
      let target = new URL(response.headers.get('location'), base);
      if (response.status === 308) {
        const next = await fetch(target, { redirect: 'manual' });
        assert.equal(next.status, 301);
        target = new URL(next.headers.get('location'), base);
      } else assert.equal(response.status, 301);
      assert.equal(target.pathname, post.portuguesePath);
      assert.equal(target.search, '?from=archive');
    }
  }
});

test('the MIDI reference renders accessible tables instead of pipe-separated text', async () => {
  const html = await (await fetch(`${base}/blog/tabela-de-controles-midi-em-portugues`)).text();
  assert.ok(html.includes('<table>'));
  assert.ok(html.includes('<th scope="col">Decimal</th>'));
  assert.ok(html.includes('class="article-table-scroll" role="region" tabindex="0"'));
  assert.ok(html.includes('<td>99</td><td>63h</td><td>Non-Registered Parameter Number MSB</td>'));
});
