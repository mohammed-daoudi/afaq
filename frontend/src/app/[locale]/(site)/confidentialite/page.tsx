import { getLocale } from 'next-intl/server';
import { PrivacyPageClient } from './PrivacyPageClient';

export default async function ConfidentialitePage() {
  const locale = await getLocale();
  const lastUpdated = new Intl.DateTimeFormat(locale, { timeZone: 'Africa/Casablanca' }).format(new Date());
  return <PrivacyPageClient lastUpdated={lastUpdated} />;
}
