import { PageShell } from "@/components/page-shell";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return (
        <PageShell narrow>
            <div className="prose-content animate-fade-up">{children}</div>
        </PageShell>
    );
}
