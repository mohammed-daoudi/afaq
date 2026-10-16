'use client';

import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import { createTextTranslator } from './translate';

export function useText() {
  const locale = useLocale();
  return useMemo(() => createTextTranslator(locale), [locale]);
}
