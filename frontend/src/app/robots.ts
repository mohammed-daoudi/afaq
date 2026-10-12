import type { MetadataRoute } from 'next';

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afaqhealth.com').replace(/\/$/, '');
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
