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
    title: 'À propos | AFAQ Health Maroc',
    description:
      'Découvrez AFAQ Health, distributeur de compléments alimentaires européens au Maroc.',
  });
}

export default function AProposLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
