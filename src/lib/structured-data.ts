import { type Locale } from "./i18n";
import { absoluteUrl, authorName, siteUrl } from "./metadata";
import { type PostData } from "./posts";

export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;

export function personData(locale: Locale) {
    return {
        "@type": "Person",
        "@id": personId,
        name: authorName,
        url: absoluteUrl(locale, "/about"),
        image: `${siteUrl}/jonatas.jpg`,
        sameAs: [
            "https://github.com/jonatascastro12",
            "https://x.com/jonatascastro12",
            "https://linkedin.com/in/jonatascastro12",
        ],
    };
}

export function siteStructuredData(locale: Locale) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            personData(locale),
            {
                "@type": "WebSite",
                "@id": websiteId,
                url: `${siteUrl}/`,
                name: authorName,
                inLanguage: [
                    "en",
                    "pt-BR",
                ],
                publisher: { "@id": personId },
            },
        ],
    };
}

export function profileStructuredData(locale: Locale) {
    const url = absoluteUrl(locale, "/about");
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: locale === "pt" ? `Sobre — ${authorName}` : `About — ${authorName}`,
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        isPartOf: { "@id": websiteId },
        mainEntity: personData(locale),
    };
}

export function articleStructuredData(locale: Locale, post: PostData) {
    const url = absoluteUrl(locale, `/blog/${post.slug}`);
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.description,
        inLanguage: locale === "pt" ? "pt-BR" : "en",
        datePublished: post.date,
        // Only claim a revision when the edition records one; never use build time.
        ...(post.revised ? { dateModified: post.revised } : {}),
        ...(post.image ? { image: `${siteUrl}${post.image}` } : {}),
        author: personData(locale),
        publisher: { "@id": personId },
        isPartOf: { "@id": websiteId },
    };
}

export function serializeJsonLd(data: Record<string, unknown>) {
    // Keep article text from ending the HTML script element.
    return JSON.stringify(data).replace(/</g, "\\u003c");
}
