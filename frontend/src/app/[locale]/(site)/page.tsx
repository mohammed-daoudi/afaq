import type { Metadata } from 'next';
import { HomePageClient } from './HomePageClient';
import { buildPageMetadata, getSiteUrl } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    path: '',
    title: 'AFAQ HEALTH | Marques Européennes de Compléments Alimentaires au Maroc',
    description:
      'Représentant exclusif au Maroc de marques européennes réputées de compléments alimentaires (Sotya, Colagenova, Naturamins). Produits certifiés disponibles en pharmacie.',
    image: '/icon.png',
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl = getSiteUrl();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'AFAQ HEALTH',
    alternateName: 'AFAQ HEALTH Maroc',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/icon.png`,
      width: 512,
      height: 512,
    },
    description:
      'Représentant exclusif au Maroc de marques européennes de compléments alimentaires et produits de santé certifiés (Sotya, Colagenova, Naturamins). Disponibles en pharmacie via notre réseau partenaire dépositaire.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bir Rami Ouest',
      addressLocality: 'Kénitra',
      postalCode: '14000',
      addressCountry: 'MA',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+212617201129',
      contactType: 'customer service',
      areaServed: 'MA',
      availableLanguage: ['French', 'Arabic', 'English'],
    },
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'AFAQ HEALTH',
    description:
      'Portefeuille de marques européennes de compléments alimentaires au Maroc. Retrouvez nos références en pharmacie.',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: ['fr', 'en', 'ar'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <HomePageClient />
    </>
  );
}
