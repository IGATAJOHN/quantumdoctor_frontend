import React from 'react'
import { AppProps } from 'next/app'
import RootLayout from '../layouts/root'
import '../styles/globals.css'
import { Lexend } from 'next/font/google'
import { SidebarProvider } from '@/components/ui/sidebar'

const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lexend',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SidebarProvider>
            <div className={lexend.className + " w-full min-h-screen overflow-x-hidden bg-white text-text-primary"}>
                <RootLayout>
                    <Component {...pageProps} />
                </RootLayout>
            </div>
        </SidebarProvider>
    )
}
