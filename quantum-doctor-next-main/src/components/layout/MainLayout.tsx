import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('token');

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Vitals', href: '/my-vitals' },
    { name: 'Test Results', href: '/test-results' },
    { name: 'Chat Bot', href: '/chat-bot' },
  ];

  const authLinks = isAuthenticated
    ? [
        {
          name: 'Profile',
          href: '/profile',
        },
        {
          name: 'Logout',
          href: '#',
          onClick: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            router.push('/auth/login');
          },
        },
      ]
    : [
        {
          name: 'Login',
          href: '/auth/login',
        },
        {
          name: 'Sign Up',
          href: '/auth/signup',
        },
      ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <img
                    className="h-8 w-auto"
                    src="/images/logo.svg"
                    alt="Quantum Doctor"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) =>
                  (!isAuthenticated && item.href !== '/') ? null : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        router.pathname === item.href
                          ? 'border-blue-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {authLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={item.onClick}
                  className={`${
                    item.name === 'Sign Up'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-500">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-500">
                Terms of Service
              </Link>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} Quantum Doctor. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
