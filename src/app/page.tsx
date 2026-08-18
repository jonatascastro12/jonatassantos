import { PageShell } from "@/components/page-shell";
import MyTypewriter from "@/components/typewriter";
import Link from "next/link";

const quickLinks = [
    { label: "About", href: "/about", description: "Background & career" },
    { label: "Projects", href: "/projects", description: "Work & writing" },
    { label: "Blog", href: "/blog", description: "Personal posts" },
];

export default function Home() {
    return (
        <PageShell>
            <section className="hero hero--text animate-fade-up">
                <div className="hero-content">
                    <p className="hero-eyebrow">Software Engineer</p>
                    <h1 className="hero-name">Jônatas Santos</h1>
                    <p className="hero-role">
                        Building at{" "}
                        <Link href="https://workos.com" target="_blank" rel="noreferrer">
                            WorkOS
                        </Link>
                    </p>
                    <p className="hero-typewriter">
                        I&apos;ve been <MyTypewriter />
                    </p>
                </div>

                <nav className="hero-links" aria-label="Explore">
                    {quickLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hero-link">
                            <span className="hero-link-label">{link.label}</span>
                            <span className="hero-link-desc">{link.description}</span>
                        </Link>
                    ))}
                </nav>
            </section>
        </PageShell>
    );
}
