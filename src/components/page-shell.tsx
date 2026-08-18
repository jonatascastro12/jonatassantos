import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
    children: React.ReactNode;
    narrow?: boolean;
};

export function PageShell({ children, narrow = false }: PageShellProps) {
    return (
        <>
            <SiteHeader />
            <main className={`page-main ${narrow ? "page-main--narrow" : ""}`}>
                {children}
            </main>
            <SiteFooter />
        </>
    );
}
