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
        darkMode: "Switch to dark mode",
        lightMode: "Switch to light mode",
        toggleTheme: "Toggle theme",
        sculptureLabel: "Interactive 3D sculpture",
        sculptureReset: "Reset sculpture",
        sculptureHelp: "Drag or use the arrow keys to rotate. Click or press Enter to release energy. Press Home or Escape to reset. On touchscreens, swipe horizontally to rotate and vertically to scroll. Energy effects are disabled when reduced motion is enabled.",
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
        darkMode: "Ativar modo escuro",
        lightMode: "Ativar modo claro",
        toggleTheme: "Alternar tema",
        sculptureLabel: "Escultura 3D interativa",
        sculptureReset: "Restaurar escultura",
        sculptureHelp: "Arraste ou use as setas para girar. Clique ou pressione Enter para soltar energia. Pressione Home ou Escape para restaurar. No celular, deslize na horizontal para girar e na vertical para rolar a página. Os efeitos de energia ficam desativados quando a redução de movimento está ativa.",
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
