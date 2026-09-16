import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['fr', 'en', 'ar'];
export const defaultLocale = 'fr';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
