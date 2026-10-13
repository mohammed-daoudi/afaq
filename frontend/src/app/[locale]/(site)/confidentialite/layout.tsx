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
    path: '/confidentialite',
    title: 'Politique de Confidentialité | AFAQ HEALTH Maroc',
    description:
      'Politique de protection des données personnelles et règles de confidentialité de la plateforme vitrine AFAQ HEALTH au Maroc.',
  });
}

export default function ConfidentialiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
