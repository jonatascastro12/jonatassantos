import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import { categories } from "@/lib/post-taxonomy";

export function BlogCategories({ locale, activeCategory }: { locale: Locale; activeCategory?: string }) {
    return (
        <nav className="blog-categories animate-fade-up" aria-label={locale === "pt" ? "Categorias do blog" : "Blog categories"}>
            <Link href={localizedPath(locale, "/blog")} aria-current={activeCategory === "all" ? "page" : undefined}>
                {locale === "pt" ? "Todos os artigos" : "All posts"}
            </Link>
            {Object.entries(categories).map(([
                id,
                labels,
            ]) => (
                <Link key={id} href={localizedPath(locale, `/blog/category/${id}`)} aria-current={activeCategory === id ? "page" : undefined}>
                    {labels[locale]}
                </Link>
            ))}
        </nav>
    );
}
