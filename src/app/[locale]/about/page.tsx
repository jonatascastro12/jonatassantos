import EnglishAbout from "@/content/pages/about.en.mdx";
import PortugueseAbout from "@/content/pages/about.pt.mdx";
import { PageShell } from "@/components/page-shell";
import { messages, type Locale } from "@/lib/i18n";
import { pageDescriptions, pageMetadata } from "@/lib/metadata";
import { StructuredData } from "@/components/structured-data";
import { profileStructuredData } from "@/lib/structured-data";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
    return pageMetadata(params.locale, "/about", `${messages[params.locale].about} — Jônatas Santos`, pageDescriptions[params.locale].about);
}

export default function About({ params }: { params: { locale: Locale } }) {
    const Content = params.locale === "pt" ? PortugueseAbout : EnglishAbout;
    return (
        <PageShell narrow locale={params.locale}>
            <StructuredData data={profileStructuredData(params.locale)} />
            <div className="prose-content animate-fade-up"><Content /></div>
        </PageShell>
    );
}
