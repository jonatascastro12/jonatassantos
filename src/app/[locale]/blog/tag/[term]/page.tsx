import { BlogTaxonomyPage, taxonomyMetadata } from "@/components/blog-taxonomy-page";
import { tags } from "@/lib/post-taxonomy";
import type { Locale } from "@/lib/i18n";

type Props = { params: { locale: Locale; term: string } };

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(tags).map((term) => ({ term }));
}

export function generateMetadata({ params }: Props) {
    return taxonomyMetadata({ ...params, taxonomy: "tag" });
}

export default function Page({ params }: Props) {
    return <BlogTaxonomyPage {...params} taxonomy="tag" />;
}
