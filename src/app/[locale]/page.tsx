import { PageShell } from "@/components/page-shell";
import MyTypewriter from "@/components/typewriter";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import portrait from "../../../public/jonatas.jpg";
import { localizedPath, messages, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const quickLinks = [
    { label: "about", href: "/about", description: "aboutDescription" },
    { label: "projects", href: "/projects", description: "projectsDescription" },
    { label: "blog", href: "/blog", description: "blogDescription" },
] as const;

export function generateMetadata({ params }: { params: { locale: Locale } }) {
    return pageMetadata(params.locale, "/", "Jônatas Santos", messages[params.locale].description);
}

export default function Home({ params }: { params: { locale: Locale } }) {
    const text = messages[params.locale];
    return (
        <PageShell locale={params.locale}>
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-eyebrow">{text.engineer}</p>
                    <h1 className="hero-name">Jônatas Santos</h1>
                    <p className="hero-role">
                        {text.buildingAt}{" "}
                        <Link href="https://workos.com" target="_blank" rel="noreferrer">
                            WorkOS
                        </Link>
                    </p>
                    <p className="hero-typewriter">
                        {text.typewriterIntro}{" "}<MyTypewriter key={params.locale} locale={params.locale} />
                    </p>
                </div>

                <nav className="hero-links" aria-label={text.explore}>
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={localizedPath(params.locale, link.href)} className="hero-link">
                            <span className="hero-link-copy">
                                <span className="hero-link-label">{text[link.label]}</span>
                                <span className="hero-link-desc">{text[link.description]}</span>
                            </span>
                            <ArrowRightIcon className="hero-link-arrow" aria-hidden="true" />
                        </Link>
                    ))}
                </nav>
                <Image
                    className="hero-portrait"
                    src={portrait}
                    alt="Jônatas Santos"
                    priority
                    sizes="(max-width: 768px) 88px, 352px"
                />
            </section>
        </PageShell>
    );
}
