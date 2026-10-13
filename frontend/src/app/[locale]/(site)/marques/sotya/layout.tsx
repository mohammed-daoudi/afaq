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
    path: '/marques/sotya',
    title: 'Laboratoire Sotya au Maroc | Compléments Alimentaires Naturels - AFAQ HEALTH',
    description:
      'Gamme de compléments alimentaires Sotya au Maroc en partenariat exclusif avec AFAQ HEALTH : magnésium, mélatonine, oméga 3, vitamines et plantes en pharmacie.',
  });
}

export default function SotyaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
