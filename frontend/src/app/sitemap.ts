import type { MetadataRoute } from 'next';
import { MOCK_ARTICLES } from '@/data/conseils';
import { products } from '@/lib/products';
import { defaultLocale, locales } from '@/i18n';
import { getSiteUrl, getLocalizedUrl } from '@/lib/seo';

const staticPaths = [
  '',
  '/a-propos',
  '/confidentialite',
  '/conseils',
  '/contact',
  '/cookies',
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

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPaths = [
    ...products.map((product) => `/produits/${product.id}`),
    ...MOCK_ARTICLES.map((article) => `/conseils/${article.slug}`),
  ];

  const allPaths = [...staticPaths, ...dynamicPaths];

  return locales.flatMap((locale) =>
    allPaths.map((path) => {
      const languages: Record<string, string> = {};
      locales.forEach((loc) => {
        languages[loc] = getLocalizedUrl(loc, path);
      });
      languages['x-default'] = getLocalizedUrl(defaultLocale, path);

      return {
        url: getLocalizedUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
        priority: path === '' ? 1 : path.startsWith('/produits') || path === '/pharmacies' ? 0.9 : 0.7,
        alternates: {
          languages,
        },
      };
    }),
  );
}
