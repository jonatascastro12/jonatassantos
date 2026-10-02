import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { BlogCategories } from "@/components/blog-categories";
import { BlogPostList } from "@/components/blog-post-list";
import { getSortedPostsData } from "@/lib/posts";
import { getTaxonomyLabel } from "@/lib/post-taxonomy";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/i18n";

type Props = { locale: Locale; taxonomy: "category" | "tag"; term: string };

export function taxonomyMetadata(params: Props) {
    const label = getTaxonomyLabel(params.taxonomy, params.term, params.locale);
    if (!label) notFound();

    return pageMetadata(
        params.locale,
        `/blog/${params.taxonomy}/${params.term}`,
        `${label} — Blog — Jônatas Santos`,
        params.locale === "pt" ? `Artigos sobre ${label} de Jônatas Santos.` : `Posts about ${label} by Jônatas Santos.`,
    );
}

export function BlogTaxonomyPage(params: Props) {
    const { locale, taxonomy, term } = params;
    const label = getTaxonomyLabel(taxonomy, term, locale);
    if (!label) notFound();

    const posts = getSortedPostsData(locale).filter((post) =>
        taxonomy === "category" ? post.category === term : post.tags?.includes(term),
    );

    return (
        <PageShell narrow locale={locale}>
            <p className="blog-taxonomy-label animate-fade-up">
                {taxonomy === "category" ? (locale === "pt" ? "Categoria" : "Category") : (locale === "pt" ? "Tema" : "Topic")}
            </p>
            <h1 className="page-title animate-fade-up">{label}</h1>
            <BlogCategories locale={locale} activeCategory={taxonomy === "category" ? term : undefined} />
            <BlogPostList posts={posts} locale={locale} />
        </PageShell>
    );
}
