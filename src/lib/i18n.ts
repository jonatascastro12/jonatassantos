export const locales = [
    "en",
    "pt",
] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
    return value === "en" || value === "pt";
}

export function withoutLocale(pathname: string) {
    return pathname.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
}

export function localizedPath(locale: Locale, pathname: string) {
    const path = withoutLocale(pathname);
    return locale === "pt" ? `/pt${path === "/" ? "" : path}` : path;
}

export const messages = {
    en: {
        about: "About",
        projects: "Projects",
        blog: "Blog",
        navigation: "Main navigation",
        mobileNavigation: "Mobile navigation",
        socialLinks: "Social links",
        darkMode: "Toggle dark mode",
        language: "Português",
        switchLanguage: "Read this page in Portuguese",
        engineer: "Software Engineer",
        buildingAt: "Building at",
        typewriterIntro: "I've been",
        explore: "Explore",
        aboutDescription: "Background & career",
        projectsDescription: "Work & writing",
        blogDescription: "Personal posts",
        externalLink: "opens in a new tab",
        externalLanguage: "in English",
        description: "Software Engineering, Technology and Music",
    },
    pt: {
        about: "Sobre",
        projects: "Projetos",
        blog: "Blog",
        navigation: "Navegação principal",
        mobileNavigation: "Navegação no celular",
        socialLinks: "Redes sociais",
        darkMode: "Alternar modo escuro",
        language: "English",
        switchLanguage: "Ler esta página em inglês",
        engineer: "Engenheiro de software",
        buildingAt: "Desenvolvendo na",
        typewriterIntro: "Tenho trabalhado",
        explore: "Explore",
        aboutDescription: "Trajetória e carreira",
        projectsDescription: "Trabalho e publicações",
        blogDescription: "Artigos pessoais",
        externalLink: "abre em uma nova aba",
        externalLanguage: "em inglês",
        description: "Engenharia de software, tecnologia e música",
    },
} as const;
