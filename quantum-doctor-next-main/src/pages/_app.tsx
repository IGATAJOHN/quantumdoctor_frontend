import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { Lexend } from 'next/font/google';
import { Toaster } from 'sonner';
import { useRouter } from 'next/router';
import MainLayout from '@/components/layout/MainLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getPublicPaths, getUserPaths, getDoctorPaths, getAdminPaths } from '@/lib/routes';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import '../styles/globals.css';

const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lexend',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const getLayout = (path: string) => {
    const isDashboardPath = [
        ...getUserPaths(),
        ...getDoctorPaths(),
        ...getAdminPaths()
    ].some(route => path === route || path.startsWith(route + '/'));
    
    return isDashboardPath ? DashboardLayout : MainLayout;
};

export default function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const Layout = getLayout(router.pathname);

    useEffect(() => {
        setMounted(true);
        const handleStart = () => setIsLoading(true);
        const handleComplete = () => setIsLoading(false);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    if (!mounted) {
        return null;
    }

    return (
        <div className={lexend.className}>
            <ErrorBoundary>
                {isLoading && <LoadingSpinner />}
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Toaster position="top-right" />
            </ErrorBoundary>
        </div>
    );
}
