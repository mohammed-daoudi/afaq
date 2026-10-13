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
    path: '/pharmacies',
    title: 'Trouver une Pharmacie Partenaire au Maroc | Points de Vente AFAQ HEALTH',
    description:
      'Localisez les pharmacies et parapharmacies partenaires AFAQ HEALTH à Casablanca, Rabat, Marrakech, Fès, Tanger, Kénitra et partout au Maroc.',
  });
}

export default function PharmaciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
