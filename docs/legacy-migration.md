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

`infra/legacy-site-redirect.js` is a prepared CloudFront viewer-request function. It maps all 16 original post paths and WordPress `?p=` IDs directly to their Portuguese counterparts on `https://www.jonatassantos.me`. Home and the second archive page map to the Portuguese blog index. Unknown paths pass through to the existing S3 origin, preserving assets and other unmapped resources. The function is prepared and tested locally; it has not been attached to a distribution.

Publish and verify the destination articles before activating any old-domain redirects. Inspect the actual AWS setup first: an S3 bucket-level redirect that preserves paths alone cannot map the old paths to `/pt/blog/<slug>`. Confirm the domain variants, DNS, HTTPS certificate, and existing CloudFront distribution before choosing the deployment method.

After activation, verify the old HTTP/HTTPS and www/non-www URLs reach each matching article. Keep redirects for at least a year, submit the new sitemap, and monitor indexing and traffic. Check Search Console and access logs for important image or other URLs absent from the public archive before removing the S3 origin. Source: [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

The CloudFront response shape follows [AWS's CloudFront Functions tutorial](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-tutorial.html).
