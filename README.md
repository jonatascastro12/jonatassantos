## Project

Tasks:

- [x] Mobile responsive
- [x] Write About
- [x] Add Projects
- [x] Add Dark Mode
- [ ] Add sound features

## Languages

English uses the existing URLs (`/`, `/about`, `/projects`, `/blog`). Portuguese uses `/pt` and the same page paths below it. The header language switch opens the matching page or article in the other language. The English `/en` prefix is internal and redirects to the existing public URLs.

Shared interface translations live in `src/lib/i18n.ts`. About and Projects use matching `.en.mdx` and `.pt.mdx` files in `src/content/pages`.

Each local article has an English Markdown file in `src/content` and a Portuguese file with the same filename in `src/content/pt`. Keep the original publication date in both versions. Add both versions together so the language switch always has a destination. Localized diagram assets can use `.en.svg` alongside the Portuguese original.

External articles keep their original destination. Their Portuguese titles use `titlePt` in `src/content/external-posts.json`, and the Portuguese blog marks those links as English content.

Both editions have their own canonical URL and reciprocal language metadata. `/sitemap.xml` lists both languages; `/robots.txt` exposes the sitemap.

## Validation

Use Node.js 24, matching the deployment runtime and the Volta pin in `package.json`.

```sh
node --test tests/posts.test.cjs tests/typewriter.test.cjs
pnpm build
pnpm start --port 3100
```

With the site running, validate article links, language editions, search metadata, and missing-page responses:

```sh
TEST_BASE_URL=http://localhost:3100 node --test tests/blog.test.cjs tests/i18n.test.cjs
```

## Legacy blog archive

The 16 posts linked from `jonatascastro.com` now have matching English and Portuguese editions. Imported posts are marked as archive entries, retain their original dates, and use local recovered images. See [the migration record](docs/legacy-migration.md) for editorial decisions, missing ebook PDFs, asset inventory, and old-domain redirect preparation.

With the production build running, include the migration checks:

```sh
TEST_BASE_URL=http://localhost:3100 node --test tests/posts.test.cjs tests/typewriter.test.cjs tests/blog.test.cjs tests/i18n.test.cjs tests/legacy-posts.test.cjs tests/legacy-redirect.test.cjs
```
