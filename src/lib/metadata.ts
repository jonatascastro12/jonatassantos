import type { Metadata } from "next";
import { localizedPath, type Locale } from "./i18n";

export const siteUrl = "https://www.jonatassantos.me";
export const authorName = "Jônatas Santos";

export function absoluteUrl(locale: Locale, pathname: string) {
    return new URL(localizedPath(locale, pathname), siteUrl).href;
}

export const pageDescriptions = {
    en: {
        home: "Jônatas Santos, software engineer at WorkOS. Explore projects and articles on software engineering, technology, MIDI, piano, and music production.",
        about: "Meet Jônatas Santos: a software engineer at WorkOS with experience in startups, SaaS, developer tools, and system reliability.",
        projects: "Software projects, open-source tools, and publications by Jônatas Santos, including authentication, SSO, SCIM, and developer tooling at WorkOS.",
        blog: "Articles by Jônatas Santos on software engineering, MIDI, keyboards, music production, and personal reflections, with an archive in English and Portuguese.",
    },
    pt: {
        home: "Jônatas Santos, engenheiro de software na WorkOS. Conheça projetos e artigos sobre engenharia de software, tecnologia, MIDI, piano e produção musical.",
        about: "Conheça Jônatas Santos: engenheiro de software na WorkOS com experiência em startups, SaaS, ferramentas para desenvolvedores e confiabilidade de sistemas.",
        projects: "Projetos de software, ferramentas de código aberto e publicações de Jônatas Santos sobre autenticação, SSO, SCIM e desenvolvimento na WorkOS.",
        blog: "Artigos de Jônatas Santos sobre engenharia de software, MIDI, teclados, produção musical e reflexões pessoais, com arquivo em português e inglês.",
    },
} as const;

export function pageMetadata(locale: Locale, pathname: string, title: string, description: string): Metadata {
    return {
        title,
        description,
        authors: [{ name: authorName, url: absoluteUrl(locale, "/about") }],
        alternates: {
            canonical: localizedPath(locale, pathname),
            languages: {
                en: localizedPath("en", pathname),
                "pt-BR": localizedPath("pt", pathname),
                "x-default": localizedPath("en", pathname),
            },
        },
        openGraph: {
            type: "website",
            title,
            description,
            url: localizedPath(locale, pathname),
            locale: locale === "pt" ? "pt_BR" : "en_US",
            alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
            siteName: authorName,
            images: [{ url: `${siteUrl}/jonatas.jpg`, alt: authorName }],
        },
        twitter: { card: "summary", title, description, images: [`${siteUrl}/jonatas.jpg`] },
    };
}
