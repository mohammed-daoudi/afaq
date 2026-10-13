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
    path: '/cookies',
    title: 'Politique des Cookies | AFAQ HEALTH Maroc',
    description:
      'Information sur la gestion et l’utilisation des cookies sur le site vitrine d’AFAQ HEALTH au Maroc.',
  });
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
