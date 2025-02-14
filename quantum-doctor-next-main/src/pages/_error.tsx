import React from 'react';
import { NextPage } from 'next';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

interface ErrorProps {
  statusCode?: number;
}

const Error: NextPage<ErrorProps> = ({ statusCode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">
            {statusCode || '500'}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {statusCode === 404
              ? 'Page Not Found'
              : 'Something went wrong'}
          </h2>
          <p className="text-gray-600 mb-8">
            {statusCode === 404
              ? "The page you're looking for doesn't exist or has been moved."
              : 'We apologize for the inconvenience. Please try again later.'}
          </p>
          <div className="space-x-4">
            <Link
              href={ROUTES.PUBLIC.HOME}
              className="inline-block px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark transition-colors"
            >
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-block px-6 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary-light hover:text-white transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
