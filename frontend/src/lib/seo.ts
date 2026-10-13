import type { Metadata } from 'next';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.afaqhealth.com').replace(/\/$/, '');

export function getSiteUrl(): string {
  return BASE_URL;
}

export function getLocalizedUrl(locale: string, path: string = ''): string {
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  if (locale === 'fr') {
    return `${BASE_URL}${cleanPath}` || `${BASE_URL}/`;
  }
  return `${BASE_URL}/${locale}${cleanPath}`;
}

export function buildPageMetadata({
  locale,
  path = '',
  title,
  description,
  image = '/icon.png',
  type = 'website',
}: {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
}): Metadata {
  const canonicalUrl = getLocalizedUrl(locale, path);
  const imageUrl = image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'fr': getLocalizedUrl('fr', path),
        'en': getLocalizedUrl('en', path),
        'ar': getLocalizedUrl('ar', path),
        'x-default': getLocalizedUrl('fr', path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'AFAQ HEALTH',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'en' ? 'en_US' : 'fr_FR',
      alternateLocale:
        locale === 'fr'
          ? ['en_US', 'ar_MA']
          : locale === 'en'
            ? ['fr_FR', 'ar_MA']
            : ['fr_FR', 'en_US'],
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
