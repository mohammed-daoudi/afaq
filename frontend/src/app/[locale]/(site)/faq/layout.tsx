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
    path: '/faq',
    title: 'FAQ Compléments Alimentaires au Maroc | Conseils & Produits - AFAQ HEALTH',
    description:
      'Toutes vos questions sur le magnésium bisglycinate, le collagène, la mélatonine pour le sommeil, les vitamines enfants et la disponibilité de nos marques en pharmacie au Maroc.',
  });
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
