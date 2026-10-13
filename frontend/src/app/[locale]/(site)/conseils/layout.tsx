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
    path: '/conseils',
    title: 'Conseils Santé & Micronutrition au Maroc | Blog AFAQ HEALTH',
    description:
      'Guides scientifiques et recommandations bien-être : découvrez nos articles experts sur le sommeil, le magnésium, l’équilibre hormonal et l’immunité au Maroc.',
  });
}

export default function ConseilsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
