import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type ProjectType = "professional" | "side" | "paper" | "academic";

const labels: Record<ProjectType, string> = {
    professional: "Professional project",
    side: "Side project",
    paper: "Paper or article",
    academic: "Academic work",
};

const portugueseLabels: Record<ProjectType, string> = {
    professional: "Projeto profissional",
    side: "Projeto pessoal",
    paper: "Artigo ou publicação",
    academic: "Trabalho acadêmico",
};

const icons: Record<ProjectType, ReactNode> = {
    professional: (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M3 5.5 8 2.5l5 3v6.5H3V5.5Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
            />
            <path
                d="M6 8.5h4M6 10.5h2.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
            />
        </svg>
    ),
    side: (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M3.5 11.5V6.8L8 4l4.5 2.8v4.7"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
            />
            <path
                d="M6 8.2h4M5.2 10.2h5.6"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
            />
        </svg>
    ),
    paper: (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M4.5 2.5h4.7L12.5 5.3v8.2H4.5V2.5Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
            />
            <path
                d="M9.2 2.7V5h2.8M6 8h4M6 10h4M6 12h2.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
            />
        </svg>
    ),
    academic: (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
                d="M1.5 5.5 8 2.5l6.5 3-6.5 3-6.5-3Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
            />
            <path
                d="M4 7v3.2c0 .9 1.8 1.8 4 1.8s4-.9 4-1.8V7"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
            />
            <path
                d="M12.5 5.8V10"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
            />
        </svg>
    ),
};

type ProjectIconProps = {
    type: ProjectType;
    locale?: Locale;
};

export function ProjectIcon({ type, locale = "en" }: ProjectIconProps) {
    const label = locale === "pt" ? portugueseLabels[type] : labels[type];
    return (
        <span className={`project-icon project-icon--${type}`} title={label}>
            {icons[type]}
            <span className="sr-only">{label}: </span>
        </span>
    );
}

const legendItems: { type: ProjectType; label: string; labelPt: string }[] = [
    { type: "professional", label: "Professional", labelPt: "Profissional" },
    { type: "side", label: "Side project", labelPt: "Projeto pessoal" },
    { type: "paper", label: "Paper / article", labelPt: "Artigo / publicação" },
    { type: "academic", label: "Academic", labelPt: "Acadêmico" },
];

export function ProjectLegend({ locale = "en" }: { locale?: Locale }) {
    return (
        <div className="project-legend" aria-label={locale === "pt" ? "Tipos de projeto" : "Project types"}>
            {legendItems.map((item) => (
                <span key={item.type} className="project-legend__item">
                    <ProjectIcon type={item.type} locale={locale} />
                    <span>{locale === "pt" ? item.labelPt : item.label}</span>
                </span>
            ))}
        </div>
    );
}
