import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Locale } from "@/lib/i18n";

type PageShellProps = {
    children: React.ReactNode;
    narrow?: boolean;
    locale?: Locale;
};

export function PageShell({ children, narrow = false, locale = "en" }: PageShellProps) {
    return (
        <>
            <SiteHeader locale={locale} />
            <main className={`page-main ${narrow ? "page-main--narrow" : ""}`}>
                {children}
            </main>
            <SiteFooter locale={locale} />
        </>
    );
}
