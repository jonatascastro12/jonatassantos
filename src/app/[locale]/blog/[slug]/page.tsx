import { PageShell } from "@/components/page-shell";
import { PostBadges } from "@/components/post-badges";
import { defaultComponents } from "@/mdx-components";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createElement } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { notFound } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/i18n";
import { absoluteUrl, authorName, pageMetadata, siteUrl } from "@/lib/metadata";
import { StructuredData } from "@/components/structured-data";
import { articleStructuredData } from "@/lib/structured-data";

type Params = {
    slug: string;
    locale: Locale;
};

type Props = {
    params: Params;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllPostIds().map(({ params }) => ({ slug: params.id }));
}

export async function generateMetadata({ params }: Props) {
    const postData = await getPostData(params.slug, params.locale);
    if (!postData) notFound();

    const metadata = pageMetadata(params.locale, `/blog/${params.slug}`, postData.title, postData.description);
    const images = postData.image ? [{ url: `${siteUrl}${postData.image}`, alt: postData.title }] : [];
    return {
        ...metadata,
        openGraph: {
            ...metadata.openGraph,
            type: "article" as const,
            publishedTime: postData.date,
            modifiedTime: postData.revised,
            authors: [absoluteUrl(params.locale, "/about")],
            images,
        },
        twitter: {
            card: postData.image ? "summary_large_image" as const : "summary" as const,
            title: postData.title,
            description: postData.description,
            images,
        },
    };
}

export default async function Post({ params }: Props) {
    const postData = await getPostData(params.slug, params.locale);
    if (!postData) notFound();

    return (
        <PageShell narrow locale={params.locale}>
            <StructuredData data={articleStructuredData(params.locale, postData)} />
            <article className="prose-content animate-fade-up">
                <h1 className="page-title">{postData.title}</h1>
                <div className="article-post-meta">
                    <span className="article-author">
                        {params.locale === "pt" ? "Por " : "By "}
                        <Link href={localizedPath(params.locale, "/about")} rel="author">{authorName}</Link>
                    </span>
                    <time className="blog-item-date" dateTime={postData.date}>
                        {format(parseISO(postData.date), "dd MMM yyyy", { locale: params.locale === "pt" ? ptBR : undefined })}
                    </time>
                    {postData.revised ? (
                        <span className="article-revised">
                            {params.locale === "pt" ? "Atualizado em " : "Updated "}
                            <time dateTime={postData.revised}>
                                {format(parseISO(postData.revised), "dd MMM yyyy", { locale: params.locale === "pt" ? ptBR : undefined })}
                            </time>
                        </span>
                    ) : null}
                    <PostBadges category={postData.category} tags={postData.tags} locale={params.locale} />
                </div>
                {postData.legacy ? (
                    <p className="article-archive-note">
                        {params.locale === "pt"
                            ? "Do arquivo de jonatascastro.com. O texto original em português foi preservado, com notas editoriais. Preços, produtos e referências refletem a época da publicação."
                            : "Originally published on jonatascastro.com. English edition translated and revised. Historical examples are identified in the text."}
                    </p>
                ) : null}
                <Markdown remarkPlugins={[remarkGfm]} components={{
                    ...defaultComponents,
                    a: ({ children, href }) => href?.startsWith("/")
                        ? <Link href={href}>{children}</Link>
                        : <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                    img: ({ node, ...props }) => createElement("img", { ...props, loading: "lazy", decoding: "async" }),
                    table: ({ children }) => (
                        <div className="article-table-scroll" role="region" tabIndex={0} aria-label={params.locale === "pt" ? "Tabela do artigo, role horizontalmente se necessário" : "Article table, scroll horizontally if needed"}>
                            <table>{children}</table>
                        </div>
                    ),
                    th: ({ children }) => <th scope="col">{children}</th>,
                }}>{postData.content}</Markdown>
            </article>
        </PageShell>
    );
}
