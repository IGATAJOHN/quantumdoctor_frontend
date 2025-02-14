import React from 'react';
import { AppProps } from 'next/app';
import { Lexend } from 'next/font/google';
import { Toaster } from 'sonner';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getPublicPaths, getUserPaths, getDoctorPaths, getAdminPaths } from '@/lib/routes';
import '../styles/globals.css';

const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lexend',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const getLayout = (path: string) => {
    // Check if path starts with any dashboard paths
    const isDashboardPath = [
        ...getUserPaths(),
        ...getDoctorPaths(),
        ...getAdminPaths()
    ].some(route => path === route || path.startsWith(route + '/'));
    
    if (isDashboardPath) {
        return DashboardLayout;
    }
    
    // Use MainLayout for main paths and as default
    return MainLayout;
};

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const Layout = getLayout(router.pathname);

    return (
        <div className={lexend.className}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
            <Toaster 
                position="top-right"
                closeButton
                richColors
                theme="light"
                duration={4000}
                className="toaster-container"
                toastOptions={{
                    className: 'toast',
                    style: {
                        background: 'var(--toast-bg)',
                        color: 'var(--toast-color)',
                    }
                }}
            />
        </div>
    );
}
