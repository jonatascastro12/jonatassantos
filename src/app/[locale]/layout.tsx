import { ShaderBackground } from '@/components/shader-background';
import { GoogleTagManager } from '@/components/google-tag-manager';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes';
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google'
import { notFound } from 'next/navigation';
import { isLocale, locales, messages, type Locale } from '@/lib/i18n';
import { siteUrl } from '@/lib/metadata';
import '@radix-ui/themes/styles.css';
import '../globals.css'

const newsreader = Newsreader({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
})

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    weight: [
        '400',
        '500',
        '600',
    ],
    variable: '--font-body',
    display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: [
        '400',
        '500',
    ],
    variable: '--font-mono',
    display: 'swap',
})

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
    if (!isLocale(params.locale)) notFound();
    return {
        metadataBase: new URL(siteUrl),
        title: 'Jônatas Santos',
        description: messages[params.locale].description,
    };
}

export default function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { locale: Locale }
}) {
    if (!isLocale(params.locale)) notFound();
    const analyticsEnabled = process.env.VERCEL_ENV === "production";
    return (
        <html
            lang={params.locale === "pt" ? "pt-BR" : "en"}
            suppressHydrationWarning
            className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
        >
            <body>
                {analyticsEnabled ? (
                    <noscript>
                        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5HQWTBB8" height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
                    </noscript>
                ) : null}
                {analyticsEnabled ? <GoogleTagManager /> : null}
                <ShaderBackground />
                <ThemeProvider attribute="class">
                    <Theme accentColor="teal" scaling="100%" style={{ height: '100%' }}>
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    )
}
