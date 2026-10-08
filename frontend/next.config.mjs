import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    qualities: [75, 90],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'afaq-lilac.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
