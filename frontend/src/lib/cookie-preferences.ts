export const COOKIE_PREFERENCES_KEY = 'afaq-cookie-preferences';
export const OPEN_COOKIE_PREFERENCES_EVENT = 'afaq:open-cookie-preferences';
export const COOKIE_PREFERENCES_CHANGED_EVENT = 'afaq:cookie-preferences-changed';

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  functional: boolean;
  date: string;
}

export type CookiePreferenceSelection = Pick<CookiePreferences, 'analytics' | 'functional'>;

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = Object.freeze({
  necessary: true,
  analytics: false,
  functional: false,
  date: '',
});

export function getCookiePreferenceExpiry(date: string): Date {
  const expiry = new Date(date);
  const day = expiry.getUTCDate();
  expiry.setUTCDate(1);
  expiry.setUTCMonth(expiry.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(expiry.getUTCFullYear(), expiry.getUTCMonth() + 1, 0)).getUTCDate();
  expiry.setUTCDate(Math.min(day, lastDay));
  return expiry;
}

export function parseCookiePreferences(raw: string | null, now = new Date()): CookiePreferences | null {
  if (!raw) return null;

  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

    const candidate = value as Record<string, unknown>;
    if (
      candidate.necessary !== true ||
      typeof candidate.analytics !== 'boolean' ||
      typeof candidate.functional !== 'boolean' ||
      typeof candidate.date !== 'string'
    ) return null;

    const date = new Date(candidate.date);
    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString() !== candidate.date ||
      date.getTime() > now.getTime() ||
      getCookiePreferenceExpiry(candidate.date).getTime() <= now.getTime()
    ) return null;

    return {
      necessary: true,
      analytics: candidate.analytics,
      functional: candidate.functional,
      date: candidate.date,
    };
  } catch {
    return null;
  }
}

export function openCookiePreferences(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  }
}
