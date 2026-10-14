# Legacy blog migration

The two public archive pages on `jonatascastro.com` listed 16 posts. All 16 now have English and Portuguese Markdown editions, in addition to the three articles already on this site. The original publication dates are retained.

English editions were translated and edited for clarity. Historical model examples are labeled; obsolete pricing, unsupported marketing statistics, and incorrect MIDI pitch-bend values are not presented as current guidance. Portuguese editions preserve the original prose, with visible corrections and archive context. Original third-party attributions are retained.

`src/content/legacy-posts.json` records each original URL, title, publication date, new language URLs, video IDs, and missing images. Article links stay in the selected language. Both editions are included in the sitemap and have reciprocal language metadata.

## Assets and outstanding source material

108 image files (about 14 MiB) were recovered to `public/blog-images/legacy`. `docs/legacy-assets.json` records their source URLs and local destinations, plus six assets that were unavailable during import. Unavailable images are omitted with a visible note where relevant; they are not replaced with guessed originals.

The original YouTube links were recovered for the five articles containing videos. The videos remain hosted by YouTube; playback availability was not established by this import.

The original PDF downloads for **12 escalas maiores** and **7 passos para criar listas de e-mail do zero** could not be recovered. Their introductory articles are migrated, and their pages explain that the PDF is unavailable. Recover the actual files before adding new download links. Do not substitute newly generated material for the original ebooks.

## Retiring the old domain

Content import and traffic redirection are separate release steps. Old flat article paths on this application's domain redirect individually to their Portuguese equivalents. This does not configure `jonatascastro.com`.

`infra/legacy-site-redirect.js` is deployed as a CloudFront viewer-request function as of **2026-10-14**. It maps all 16 original post paths and WordPress `?p=` IDs directly to their Portuguese counterparts on `https://www.jonatassantos.me`. Home and the second archive page map to the Portuguese blog index. Trailing-slash and `index.html` variants are supported, and campaign parameters and repeated query values are preserved. Unknown paths pass through to the existing S3 origin, preserving assets and other unmapped resources. The function also serves a readable `robots.txt` with the new sitemap, replacing the old bucket's 403 response for that path.

The migration uses distribution `E25JYUPO14WOBG` (`dtp534k2btzm.cloudfront.net`) with aliases `jonatascastro.com` and `www.jonatascastro.com`, function `jonatascastro-migration-301` on the LIVE stage, and an ACM certificate issued in `us-east-1`. The origin is the explicit `jonatascastro.com.s3-website-us-west-2.amazonaws.com` endpoint, so changing public DNS cannot create an origin loop. HTTP viewers receive a direct 301 to the new HTTPS URL; HTTPS uses the same mapping. Unmapped S3 pages retain their prior HTTP behavior and are also accessible through HTTPS.

Route 53 zone `Z2DUPUUFTTRE5O` now has A/AAAA aliases for both hostnames. Change `C071120913RCD2NAGN77X` reached INSYNC at cutover; the distribution reached Deployed. Existing email records and other distributions were retained. `infra/legacy-cloudfront-distribution.json` and `infra/legacy-dns-cutover.json` record the applied configuration; they are deployment records, not an instruction to create another distribution or rerun the original DNS CREATE operations.

### Verification and baseline

- Local redirect tests passed, followed by CloudFront's own test-function checks.
- Before DNS cutover, 158 live checks passed through the temporary CloudFront HTTP/HTTPS hostnames.
- After cutover, **300 live checks passed** across HTTP/HTTPS and apex/www: all 16 posts, slash and index variants, WordPress IDs, home/archive routes, campaign parameters, a legacy image, the unmigrated blues infographic, robots.txt, and all 16 Portuguese destination pages.
- Run `node infra/verify-legacy-redirects.cjs` to repeat the read-only public checks. Pass one or more base URLs to check another distribution before a future DNS change.
- Search Console baseline for `http://jonatascastro.com/`, 2026-07-12 through 2026-10-11: 247 clicks, 30,645 impressions, 0.8% CTR, average position 6.5. The MIDI control table accounted for 114 clicks. The blues infographic (2 clicks), about page (2), and contact page (1) remain on the S3 origin because they were not part of the 16-post import.
- `https://www.jonatassantos.me/` was verified automatically through GTM. Its sitemap was submitted and processed with 110 discovered URLs on 2026-10-14. Discovered URLs are not a claim of completed indexing.
- Search Console accepted separate changes of address from `jonatascastro.com` and `www.jonatascastro.com` to `www.jonatassantos.me` on 2026-10-14. Both properties show the move in progress; this is not a claim that Google has finished reindexing.

### Rollback and retention

The CloudShell directory `~/jonatascastro-migration-20261014` contains the original complete DNS snapshot, certificate/function/distribution responses, cutover and rollback batches, and the change response. `infra/legacy-dns-rollback.json` contains only the website DNS changes needed to restore the previous S3 routing; review current DNS before applying it with `aws route53 change-resource-record-sets --hosted-zone-id Z2DUPUUFTTRE5O --change-batch file://infra/legacy-dns-rollback.json`. It does not remove the certificate or distribution. A DNS rollback does not undo browser-cached 301s immediately, and the Search Console move would need to be canceled separately.

Keep the old domain registered and redirects operating for at least a year. Retain the S3 bucket while unmigrated pages, images, or downloads are still needed. Additional source pages found during deployment include `/infografico-escala-de-blues/`, `/sobre/`, `/contato/`, `/solucoes-e-consultoria/`, and category/tag archives; migrate or assess these before deleting the source. Compare the saved traffic baseline with the new property's search performance as Google recrawls the URLs.

Monitor indexing and traffic before removing any source resources. Sources: [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) and [Change of Address requirements](https://support.google.com/webmasters/answer/9370220).

The CloudFront response shape follows [AWS's CloudFront Functions tutorial](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-tutorial.html).
