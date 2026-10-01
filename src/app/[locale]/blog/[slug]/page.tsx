import { PageShell } from "@/components/page-shell";
import { defaultComponents } from "@/mdx-components";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createElement } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

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

    return pageMetadata(params.locale, `/blog/${params.slug}`, postData.title, postData.description);
}

export default async function Post({ params }: Props) {
    const postData = await getPostData(params.slug, params.locale);
    if (!postData) notFound();

    return (
        <PageShell narrow locale={params.locale}>
            <article className="prose-content animate-fade-up">
                <h1 className="page-title">{postData.title}</h1>
                <time className="blog-item-date" dateTime={postData.date}>
                    {format(parseISO(postData.date), "dd MMM yyyy", { locale: params.locale === "pt" ? ptBR : undefined })}
                </time>
                {postData.legacy ? (
                    <p className="article-archive-note">
                        {params.locale === "pt"
                            ? "Do arquivo de jonatascastro.com. O texto original em português foi preservado, com notas editoriais. Preços, produtos e referências refletem a época da publicação."
                            : `Originally published on jonatascastro.com. English edition translated and revised${postData.revised ? ` ${format(parseISO(postData.revised), "dd MMM yyyy")}` : ""}. Historical examples are identified in the text.`}
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
