import { PageShell } from "@/components/page-shell";
import { BlogCategories } from "@/components/blog-categories";
import { BlogPostList } from "@/components/blog-post-list";
import { getSortedPostsData } from "@/lib/posts";
import { type Locale } from "@/lib/i18n";
import { pageDescriptions, pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
    return pageMetadata(params.locale, "/blog", "Blog — Jônatas Santos", pageDescriptions[params.locale].blog);
}

export default function Page({ params }: { params: { locale: Locale } }) {
    return (
        <PageShell narrow locale={params.locale}>
            <h1 className="page-title animate-fade-up">Blog</h1>
            <BlogCategories locale={params.locale} activeCategory="all" />
            <BlogPostList posts={getSortedPostsData(params.locale)} locale={params.locale} />
        </PageShell>
    );
}
