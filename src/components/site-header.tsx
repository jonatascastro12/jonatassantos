"use client";

import { XLogoIcon } from "@/components/x-logo-icon";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Switch } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Suspense } from "react";

const navItems = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
];

export function SiteHeader() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();

    const switchTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link href="/" className="site-mark">
                    Jônatas Santos
                </Link>

                <nav className="site-nav site-nav--desktop" aria-label="Main">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={pathname === item.href ? "page" : undefined}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="site-actions social">
                    <Suspense fallback={<Switch checked={theme === "dark"} />}>
                        <Switch
                            onClick={switchTheme}
                            checked={theme === "dark"}
                            aria-label="Toggle dark mode"
                        />
                    </Suspense>
                    <a href="https://github.com/jonatascastro12" target="_blank" rel="noreferrer" aria-label="GitHub">
                        <GitHubLogoIcon />
                    </a>
                    <a href="https://x.com/jonatascastro12" target="_blank" rel="noreferrer" aria-label="X">
                        <XLogoIcon />
                    </a>
                    <a href="https://linkedin.com/in/jonatascastro12" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <LinkedInLogoIcon />
                    </a>
                </div>
            </div>

            <nav className="site-nav site-nav--mobile" aria-label="Mobile">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={pathname === item.href ? "page" : undefined}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
