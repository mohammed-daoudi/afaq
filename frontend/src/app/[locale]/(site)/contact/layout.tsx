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
    path: '/contact',
    title: 'Contactez AFAQ HEALTH Maroc | Partenariats & Réseau Pharmaceutique',
    description:
      'Contactez l’équipe AFAQ HEALTH à Kénitra (Maroc) pour vos partenariats, référencements en pharmacie ou collaborations avec nos laboratoires européens.',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
