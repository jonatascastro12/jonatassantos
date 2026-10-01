import { PageShell } from "@/components/page-shell";
import { defaultComponents } from "@/mdx-components";
import { getAllPostIds, getPostData } from "@/lib/posts";
import Markdown from "react-markdown";
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
                <Markdown components={defaultComponents}>{postData.content}</Markdown>
            </article>
        </PageShell>
    );
}
