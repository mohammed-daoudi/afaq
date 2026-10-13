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
    path: '/mentions-legales',
    title: 'Mentions Légales | AFAQ HEALTH Maroc',
    description:
      'Mentions légales et informations administratives relatives à la société AFAQ HEALTH, représentant de marques européennes de santé au Maroc.',
  });
}

export default function MentionsLegalesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
