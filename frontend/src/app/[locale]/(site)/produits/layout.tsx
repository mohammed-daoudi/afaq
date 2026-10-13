import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    path: '/produits',
    title: 'Catalogue Compléments Alimentaires au Maroc | AFAQ HEALTH',
    description:
      'Consultez notre catalogue complet de compléments alimentaires certifiés au Maroc : magnésium, mélatonine, collagène, santé cardiovasculaire, digestion et immunité.',
  });
}

export default function ProduitsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
