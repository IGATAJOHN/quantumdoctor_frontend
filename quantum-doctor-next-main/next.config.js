/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/auth/:path*',
        destination: '/auth/:path*',
      },
      {
        source: '/dashboard/:path*',
        destination: '/dashboard/:path*',
      },
      {
        source: '/my-vitals',
        destination: '/my-vitals',
      },
      {
        source: '/test-results',
        destination: '/test-results',
      },
      {
        source: '/chat-bot',
        destination: '/chat-bot',
      },
      {
        source: '/schedule',
        destination: '/schedule',
      },
      {
        source: '/future-predictions',
        destination: '/future-predictions',
      },
      {
        source: '/recommendations',
        destination: '/recommendations',
      }
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    serverActions: true,
  }
};

module.exports = nextConfig;
