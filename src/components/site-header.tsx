"use client";

import { XLogoIcon } from "@/components/x-logo-icon";
import { GitHubLogoIcon, GlobeIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Switch } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Suspense } from "react";
import { localizedPath, messages, withoutLocale, type Locale } from "@/lib/i18n";

const navItems = [
    { label: "about", href: "/about" },
    { label: "projects", href: "/projects" },
    { label: "blog", href: "/blog" },
] as const;

export function SiteHeader({ locale = "en" }: { locale?: Locale }) {
    const pathname = usePathname();
    const currentPath = withoutLocale(pathname);
    const text = messages[locale];
    const targetLocale = locale === "en" ? "pt" : "en";
    const { resolvedTheme, setTheme } = useTheme();

    const switchTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <>
        <header className="site-header">
            <div className="site-header-inner">
                <Link href={localizedPath(locale, "/")} className="site-mark">
                    Jônatas Santos
                </Link>

                <nav className="site-nav site-nav--desktop" aria-label={text.navigation}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={localizedPath(locale, item.href)}
                            aria-current={currentPath === item.href || currentPath.startsWith(`${item.href}/`) ? "page" : undefined}
                        >
                            {text[item.label]}
                        </Link>
                    ))}
                </nav>

                <div className="site-actions social">
                    <Link
                        href={localizedPath(targetLocale, currentPath)}
                        className="language-switch"
                        hrefLang={targetLocale === "pt" ? "pt-BR" : "en"}
                        aria-label={text.switchLanguage}
                    >
                        <GlobeIcon aria-hidden="true" />
                        <span lang={targetLocale === "pt" ? "pt-BR" : "en"}>{text.language}</span>
                    </Link>
                    <Suspense fallback={<Switch checked={resolvedTheme === "dark"} />}>
                        <Switch
                            onClick={switchTheme}
                            checked={resolvedTheme === "dark"}
                            aria-label={text.darkMode}
                        />
                    </Suspense>
                    <a className="social-link" href="https://github.com/jonatascastro12" target="_blank" rel="noreferrer" aria-label="GitHub">
                        <GitHubLogoIcon />
                    </a>
                    <a className="social-link" href="https://x.com/jonatascastro12" target="_blank" rel="noreferrer" aria-label="X">
                        <XLogoIcon />
                    </a>
                    <a className="social-link" href="https://linkedin.com/in/jonatascastro12" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <LinkedInLogoIcon />
                    </a>
                </div>
            </div>
        </header>

            <nav className="site-nav site-nav--mobile" aria-label={text.mobileNavigation}>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={localizedPath(locale, item.href)}
                        aria-current={currentPath === item.href || currentPath.startsWith(`${item.href}/`) ? "page" : undefined}
                    >
                        {text[item.label]}
                    </Link>
                ))}
            </nav>
        </>
    );
}
