import { PageShell } from "@/components/page-shell";
import MyTypewriter from "@/components/typewriter";
import Link from "next/link";

export default function Home() {
    return (
        <PageShell>
            <section className="hero animate-fade-up">
                <div>
                    <h1 className="hero-name">Jônatas Santos</h1>
                    <p className="hero-role">
                        Software Engineer @{" "}
                        <Link href="https://workos.com" target="_blank" rel="noreferrer">
                            WorkOS
                        </Link>
                    </p>
                    <p className="hero-typewriter">
                        I&apos;ve been <MyTypewriter />
                    </p>
                </div>

                <div className="video-portrait-wrap animate-fade-in" style={{ animationDelay: "0.15s" }}>
                    <div className="video-portrait-glow" aria-hidden="true" />
                    <div className="video-portrait">
                        <video autoPlay loop muted playsInline>
                            <source src="/jonatas-website-hevc-safari.mp4" type='video/mp4; codecs="hvc1"' />
                            <source src="/jonatas-website-vp9-chrome.webm" type="video/webm" />
                        </video>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
