import type { MetadataRoute } from 'next';
import { MOCK_ARTICLES } from '@/data/conseils';
import { products } from '@/lib/products';
import { defaultLocale, locales } from '@/i18n';

const staticPaths = [
  '',
  '/a-propos',
  '/conseils',
  '/contact',
  '/expertise',
  '/faq',
  '/marques',
  '/marques/colagenova',
  '/marques/naturamins-kids',
  '/marques/sotya',
  '/mentions-legales',
  '/pharmacies',
  '/produits',
];

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://afaq-lilac.vercel.app').replace(/\/$/, '');
}

function getLocalizedPath(locale: string, path: string) {
  const localizedPrefix = locale === defaultLocale ? '' : `/${locale}`;
  return `${localizedPrefix}${path || ''}` || '/';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const dynamicPaths = [
    ...products.map((product) => `/produits/${product.id}`),
    ...MOCK_ARTICLES.map((article) => `/conseils/${article.slug}`),
  ];

  return locales.flatMap((locale) =>
    [...staticPaths, ...dynamicPaths].map((path) => ({
      url: `${siteUrl}${getLocalizedPath(locale, path)}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
    })),
  );
}
