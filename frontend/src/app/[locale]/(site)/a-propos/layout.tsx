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
    path: '/a-propos',
    title: 'À Propos d’AFAQ HEALTH | Marques Européennes de Compléments au Maroc',
    description:
      'Découvrez AFAQ HEALTH, partenaire et représentant exclusif de marques européennes de compléments alimentaires au Maroc, disponibles en pharmacie via notre réseau.',
  });
}

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
