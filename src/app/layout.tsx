import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html>
        <body>
        <Theme appearance="light" accentColor="cyan" radius="full" scaling="105%" style={{height: "100%"}}>
            {children}
        </Theme>
        </body>
        </html>
    )
}
