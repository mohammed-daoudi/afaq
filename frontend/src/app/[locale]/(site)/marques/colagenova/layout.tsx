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
    path: '/marques/colagenova',
    title: 'Colagenova Maroc | Collagène Hydrolysé & Nutrition Articulaire - AFAQ HEALTH',
    description:
      'Découvrez Colagenova au Maroc : gamme innovante de collagène marin et bovin hydrolysé pour la beauté cutanée et la santé articulaire. Disponibilité en pharmacie.',
  });
}

export default function ColagenovaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
