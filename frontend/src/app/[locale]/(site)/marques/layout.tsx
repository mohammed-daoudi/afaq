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
    path: '/marques',
    title: 'Marques Européennes Partenaires au Maroc | AFAQ HEALTH',
    description:
      'Découvrez les laboratoires européens représentés par AFAQ HEALTH au Maroc : Sotya, Colagenova et Naturamins Kids, formulés selon les plus hauts standards et disponibles en pharmacie.',
  });
}

export default function MarquesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
