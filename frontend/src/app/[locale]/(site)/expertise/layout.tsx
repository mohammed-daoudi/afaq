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
    path: '/expertise',
    title: 'Notre Expertise Scientifique & Réglementaire au Maroc | AFAQ HEALTH',
    description:
      'Rigueur scientifique, homologation AMMPS et sélection exigeante : découvrez les standards d’excellence d’AFAQ HEALTH pour les marques de santé européennes au Maroc.',
  });
}

export default function ExpertiseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
