import type { Metadata } from "next";
import { localizedPath, type Locale } from "./i18n";

export const siteUrl = "https://www.jonatassantos.me";

export function pageMetadata(locale: Locale, pathname: string, title: string, description?: string): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical: localizedPath(locale, pathname),
            languages: {
                en: localizedPath("en", pathname),
                "pt-BR": localizedPath("pt", pathname),
                "x-default": localizedPath("en", pathname),
            },
        },
        openGraph: {
            title,
            description,
            url: localizedPath(locale, pathname),
            locale: locale === "pt" ? "pt_BR" : "en_US",
            alternateLocale: locale === "pt" ? "en_US" : "pt_BR",
            siteName: "Jônatas Santos",
        },
    };
}
