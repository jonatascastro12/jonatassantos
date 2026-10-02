import type { MetadataRoute } from "next";
import { getAllPostIds } from "@/lib/posts";
import { locales, localizedPath } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { getTaxonomyParams } from "@/lib/post-taxonomy";

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = [
        "/",
        "/about",
        "/projects",
        "/blog",
        ...getTaxonomyParams().map(({ taxonomy, term }) => `/blog/${taxonomy}/${term}`),
        ...getAllPostIds().map(({ params }) => `/blog/${params.id}`),
    ];
    return paths.flatMap((pathname) => locales.map((locale) => ({
        url: `${siteUrl}${localizedPath(locale, pathname)}`,
        alternates: {
            languages: {
                en: `${siteUrl}${localizedPath("en", pathname)}`,
                "pt-BR": `${siteUrl}${localizedPath("pt", pathname)}`,
                "x-default": `${siteUrl}${localizedPath("en", pathname)}`,
            },
        },
    })));
}
