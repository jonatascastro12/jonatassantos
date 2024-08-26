import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Jônatas Santos',
    description: 'Software Engineering, Technology and Music',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return <html suppressHydrationWarning={true}>
    <body>
    <ThemeProvider attribute="class">
        <Theme accentColor={'gold'} scaling="105%" style={{height: "100%"}}>
            {children}
        </Theme>
    </ThemeProvider>
    </body>
    </html>
}
