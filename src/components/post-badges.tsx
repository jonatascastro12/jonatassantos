import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import { categories, tags as tagLabels, type PostTaxonomy } from "@/lib/post-taxonomy";

export function PostBadges({ category, tags = [], locale }: PostTaxonomy & { locale: Locale }) {
    if (!category && !tags.length) return null;

    return (
        <div className="post-badges" role="group" aria-label={locale === "pt" ? "Categoria e temas" : "Category and topics"}>
            {category ? (
                <Link className="post-badge post-badge--category" href={localizedPath(locale, `/blog/category/${category}`)}>
                    <span className="sr-only">{locale === "pt" ? "Categoria: " : "Category: "}</span>
                    {categories[category]?.[locale] ?? category}
                </Link>
            ) : null}
            {tags.map((tag) => (
                <Link key={tag} className="post-badge" href={localizedPath(locale, `/blog/tag/${tag}`)}>
                    {tagLabels[tag]?.[locale] ?? tag}
                </Link>
            ))}
        </div>
    );
}
