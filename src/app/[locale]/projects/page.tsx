import EnglishProjects from "@/content/pages/projects.en.mdx";
import PortugueseProjects from "@/content/pages/projects.pt.mdx";
import { PageShell } from "@/components/page-shell";
import { messages, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: { params: { locale: Locale } }) {
    return pageMetadata(params.locale, "/projects", `${messages[params.locale].projects} — Jônatas Santos`, messages[params.locale].projectsDescription);
}

export default function Projects({ params }: { params: { locale: Locale } }) {
    const Content = params.locale === "pt" ? PortugueseProjects : EnglishProjects;
    return (
        <PageShell narrow locale={params.locale}>
            <div className="prose-content animate-fade-up"><Content /></div>
        </PageShell>
    );
}
