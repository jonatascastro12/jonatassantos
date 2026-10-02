import { differenceInMonths, differenceInYears, format, formatISO, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

const content = [
    {
        title: "Software Engineer",
        titlePt: "Engenheiro de software",
        company: "WorkOS",
        url: "https://workos.com",
        location: "Remote from Brazil",
        period: { start: "2022-07-01", end: null },
    },
    {
        title: "Senior Software Engineer",
        titlePt: "Engenheiro de software sênior",
        company: "Zapier",
        url: "https://zapier.com",
        location: "Remote from Brazil",
        period: { start: "2020-10-01", end: "2022-07-01" },
    },
    {
        title: "Senior Python Engineer",
        titlePt: "Engenheiro Python sênior",
        company: "LeafLink",
        url: "https://leaflink.com",
        location: "Remote from Brazil",
        period: { start: "2019-10-01", end: "2020-10-01" },
    },
    {
        title: "Analyst of Planning and Management in IT",
        titlePt: "Analista de planejamento e gestão em TI",
        company: "IBGE",
        url: "https://www.ibge.gov.br",
        location: "Rio de Janeiro, Brazil",
        period: { start: "2014-06-01", end: "2019-09-01" },
    },
    {
        title: "Full Stack Developer and Researcher",
        titlePt: "Desenvolvedor full stack e pesquisador",
        company: "TV Globo",
        url: "https://globo.com",
        location: "Rio de Janeiro, Brazil",
        period: { start: "2013-09-01", end: "2014-05-01" },
    },
    {
        title: "Business Analyst - Technology Advisory",
        titlePt: "Analista de negócios — consultoria em tecnologia",
        company: "Deloitte",
        url: "https://www2.deloitte.com",
        location: "Rio de Janeiro, Brazil",
        period: { start: "2013-01-01", end: "2013-08-01" },
    },
    {
        title: "Web Developer",
        titlePt: "Desenvolvedor web",
        company: "Grupo Emídia",
        url: "https://grupoemidia.com",
        location: "Juiz de Fora, Brazil",
        period: { start: "2012-03-01", end: "2012-11-01" },
    },
    {
        title: "Web Developer",
        titlePt: "Desenvolvedor web",
        company: "Brasdev Devenvolvedores",
        url: null,
        location: "Juiz de Fora, Brazil",
        period: { start: "2010-01-01", end: "2010-12-01" },
    },
] as const;

const monthFormat = (date: string, locale: Locale) => format(parseISO(date), "MMM yyyy", { locale: locale === "pt" ? ptBR : undefined });

const distanceFormat = (start: string, end: string, locale: Locale) => {
    const deltaYears = differenceInYears(end, start);
    const deltaMonths = differenceInMonths(end, start) % 12;

    const months = (() => {
        if (deltaMonths === 0) return "";
        if (deltaMonths === 1) return locale === "pt" ? "1 mês" : "1 m";
        return locale === "pt" ? `${deltaMonths} meses` : `${deltaMonths} m`;
    })();

    if (deltaYears === 0) return months;

    const years = (() => {
        if (deltaYears === 1) return locale === "pt" ? "1 ano" : "1 yr";
        return locale === "pt" ? `${deltaYears} anos` : `${deltaYears} yrs`;
    })();

    if (months && deltaYears) return `${years}, ${months}`;
    return years;
};

const Carrer = ({ locale = "en" }: { locale?: Locale }) => {
    return (
        <div className="career-timeline">
            {content.map((item, index) => (
                <article key={index} className="career-entry">
                    <h3 className="career-entry-title">{locale === "pt" ? item.titlePt : item.title}</h3>
                    <p className="career-entry-meta">
                        {item.url ? (
                            <Link href={item.url} target="_blank" rel="noreferrer">
                                {item.company}
                            </Link>
                        ) : (
                            item.company
                        )}
                        {" · "}
                        {locale === "pt" ? item.location.replace("Remote from Brazil", "Remoto, do Brasil").replace("Brazil", "Brasil") : item.location}
                    </p>
                    <p className="career-entry-dates">
                        {monthFormat(item.period.start, locale)} –{" "}
                        {item.period.end ? monthFormat(item.period.end, locale) : locale === "pt" ? "Atual" : "Current"}
                        {" · "}
                        ({distanceFormat(item.period.start, item.period.end ?? formatISO(new Date()), locale)})
                    </p>
                </article>
            ))}
        </div>
    );
};

export default Carrer;
