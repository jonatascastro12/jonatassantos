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

Post front matter includes a `category` and `tags` using stable IDs from `src/lib/post-taxonomy.ts`. Keep these IDs identical in both language editions; badge labels are translated by the shared taxonomy. External entries use the same fields in `src/content/external-posts.json`. Badges appear below titles in the blog list and beside article metadata.

Badges link to `/blog/category/[category]` and `/blog/tag/[tag]`, with matching Portuguese pages under `/pt`. The category bar at the top of blog listings includes an All posts link and highlights the current category. These pages are generated from the shared taxonomy, filter both local and external articles, and appear in the bilingual sitemap.

External articles keep their original destination. Their Portuguese titles use `titlePt` in `src/content/external-posts.json`, and the Portuguese blog marks those links as English content.

Both editions have their own canonical URL and reciprocal language metadata. `/sitemap.xml` lists both languages; `/robots.txt` exposes the sitemap.

## Analytics

The production Vercel deployment loads Google Tag Manager container `GTM-5HQWTBB8`. Local development and preview deployments do not load it. The container sends data to the existing GA4 web stream `G-WWX2439MQM` in property `368213084`.

`GoogleTagManager` emits one `site_page_view` data-layer event per page navigation, including language and category changes, with `page_location`, `page_title`, and `page_referrer`. In GTM, the Google tag must have `send_page_view` set to `false`, and a GA4 `page_view` event tag must consume `site_page_view` with those three data-layer variables. Keep automatic history-based page views disabled in the GA4 stream to avoid duplicates.

## Validation

Use Node.js 24, matching the deployment runtime and the Volta pin in `package.json`.

```sh
node --test tests/posts.test.cjs tests/typewriter.test.cjs
pnpm build
pnpm start --port 3100
```

With the site running, validate article links, language editions, search metadata, and missing-page responses:

```sh
TEST_BASE_URL=http://localhost:3100 node --test tests/blog.test.cjs tests/i18n.test.cjs tests/taxonomy.test.cjs
```

## Legacy blog archive

The 16 posts linked from `jonatascastro.com` now have matching English and Portuguese editions. Imported posts are marked as archive entries, retain their original dates, and use local recovered images. See [the migration record](docs/legacy-migration.md) for editorial decisions, missing ebook PDFs, asset inventory, and old-domain redirect preparation.

With the production build running, include the migration checks:

```sh
TEST_BASE_URL=http://localhost:3100 node --test tests/posts.test.cjs tests/typewriter.test.cjs tests/blog.test.cjs tests/i18n.test.cjs tests/legacy-posts.test.cjs tests/legacy-redirect.test.cjs
```
