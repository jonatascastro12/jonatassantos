import type { Locale } from "@/lib/i18n";
import { categories, tags as tagLabels, type PostTaxonomy } from "@/lib/post-taxonomy";

export function PostBadges({ category, tags = [], locale }: PostTaxonomy & { locale: Locale }) {
    if (!category && !tags.length) return null;

    return (
        <div className="post-badges" role="group" aria-label={locale === "pt" ? "Categoria e temas" : "Category and topics"}>
            {category ? (
                <span className="post-badge post-badge--category">
                    <span className="sr-only">{locale === "pt" ? "Categoria: " : "Category: "}</span>
                    {categories[category]?.[locale] ?? category}
                </span>
            ) : null}
            {tags.map((tag) => (
                <span key={tag} className="post-badge">
                    {tagLabels[tag]?.[locale] ?? tag}
                </span>
            ))}
        </div>
    );
}
