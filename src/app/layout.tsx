import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes';
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './globals.css'

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

export const metadata: Metadata = {
    title: 'Jônatas Santos',
    description: 'Software Engineering, Technology and Music',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${newsreader.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
        >
            <body>
                <ThemeProvider attribute="class">
                    <Theme accentColor="gold" scaling="100%" style={{ height: '100%' }}>
                        {children}
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    )
}
