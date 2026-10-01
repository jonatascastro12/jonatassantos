import { PageShell } from "@/components/page-shell";
import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { localizedPath, messages, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
    return pageMetadata(params.locale, "/blog", "Blog — Jônatas Santos", messages[params.locale].blogDescription);
}

export default function Page({ params }: { params: { locale: Locale } }) {
    const postsData = getSortedPostsData(params.locale);
    const text = messages[params.locale];

    return (
        <PageShell narrow locale={params.locale}>
            <h1 className="page-title animate-fade-up">Blog</h1>
            <ul className="blog-list animate-fade-up">
                {postsData.map((post) => (
                    <li key={post.id} className="blog-item">
                        {post.externalUrl ? (
                            <a href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                                {post.title}{" "}
                                <ExternalLinkIcon className="inline-block align-baseline" aria-hidden="true" />
                                {params.locale === "pt" ? <span className="blog-external-language"> ({text.externalLanguage})</span> : null}
                                <span className="sr-only"> ({post.source}, {text.externalLink})</span>
                            </a>
                        ) : (
                            <Link href={localizedPath(params.locale, `/blog/${post.id}`)}>{post.title}</Link>
                        )}
                        <time className="blog-item-date" dateTime={post.date}>
                            {format(parseISO(post.date), "dd MMM yyyy", { locale: params.locale === "pt" ? ptBR : undefined })}
                        </time>
                    </li>
                ))}
            </ul>
        </PageShell>
    );
}
