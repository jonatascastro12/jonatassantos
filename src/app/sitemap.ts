import type { MetadataRoute } from "next";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { locales, localizedPath } from "@/lib/i18n";
import { siteUrl } from "@/lib/metadata";
import { getTaxonomyParams } from "@/lib/post-taxonomy";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPaths = [
        "/",
        "/about",
        "/projects",
        "/blog",
        ...getTaxonomyParams().map(({ taxonomy, term }) => `/blog/${taxonomy}/${term}`),
    ];
    const paths = [
        ...staticPaths,
        ...getAllPostIds().map(({ params }) => `/blog/${params.id}`),
    ];
    return Promise.all(paths.flatMap((pathname) => locales.map(async (locale) => {
        const post = staticPaths.includes(pathname) ? null : await getPostData(pathname.slice("/blog/".length), locale);
        return {
            url: `${siteUrl}${localizedPath(locale, pathname)}`,
            // Unknown modification dates are omitted, not replaced by publication or build time.
            ...(post?.revised ? { lastModified: post.revised } : {}),
            alternates: {
                languages: {
                    en: `${siteUrl}${localizedPath("en", pathname)}`,
                    "pt-BR": `${siteUrl}${localizedPath("pt", pathname)}`,
                    "x-default": `${siteUrl}${localizedPath("en", pathname)}`,
                },
            },
        };
    })));
}
