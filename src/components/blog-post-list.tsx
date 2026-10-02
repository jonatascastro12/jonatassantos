import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { PostBadges } from "@/components/post-badges";
import { localizedPath, messages, type Locale } from "@/lib/i18n";
import type { PostSummary } from "@/lib/posts";

export function BlogPostList({ posts, locale }: { posts: PostSummary[]; locale: Locale }) {
    const text = messages[locale];
    const firstArchiveId = posts.find((post) => post.legacy)?.id;

    return (
        <ul className="blog-list animate-fade-up">
            {posts.map((post) => (
                <li key={post.id} className="blog-item">
                    <div className="blog-item-main">
                        {post.externalUrl ? (
                            <a className="blog-item-title" href={post.externalUrl} target="_blank" rel="noopener noreferrer">
                                {post.title}{" "}
                                <ExternalLinkIcon className="inline-block align-baseline" aria-hidden="true" />
                                {locale === "pt" ? <span className="blog-external-language"> ({text.externalLanguage})</span> : null}
                                <span className="sr-only"> ({post.source}, {text.externalLink})</span>
                            </a>
                        ) : (
                            <Link className="blog-item-title" id={post.id === firstArchiveId ? "archive" : undefined} href={localizedPath(locale, `/blog/${post.id}`)}>
                                {post.title}
                                {post.legacy ? <span className="blog-archive-label"> · {locale === "pt" ? "Arquivo" : "Archive"}</span> : null}
                            </Link>
                        )}
                        <PostBadges category={post.category} tags={post.tags} locale={locale} />
                    </div>
                    <time className="blog-item-date" dateTime={post.date}>
                        {format(parseISO(post.date), "dd MMM yyyy", { locale: locale === "pt" ? ptBR : undefined })}
                    </time>
                </li>
            ))}
        </ul>
    );
}
