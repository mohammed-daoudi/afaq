import 'server-only';
import { getLocale } from 'next-intl/server';
import { createTextTranslator } from './translate';

export async function getText() {
  return createTextTranslator(await getLocale());
}
