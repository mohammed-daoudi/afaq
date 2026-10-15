'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  COOKIE_PREFERENCES_CHANGED_EVENT,
  COOKIE_PREFERENCES_KEY,
  DEFAULT_COOKIE_PREFERENCES,
  OPEN_COOKIE_PREFERENCES_EVENT,
  getCookiePreferenceExpiry,
  parseCookiePreferences,
  type CookiePreferences,
  type CookiePreferenceSelection,
} from '@/lib/cookie-preferences';
import { CookiePreferencesModal } from '@/components/ui/CookiePreferencesModal';

interface CookiePreferencesContextValue {
  preferences: CookiePreferences;
  ready: boolean;
  hasDecision: boolean;
  isOpen: boolean;
  storageError: string | null;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (selection: CookiePreferenceSelection) => boolean;
}

const CookiePreferencesContext = createContext<CookiePreferencesContextValue | null>(null);
const STORAGE_ERROR = 'Vos choix s’appliquent à cette page, mais votre navigateur ne permet pas de les enregistrer. Ils vous seront redemandés lors de votre prochaine visite.';

export function CookiePreferencesProvider({ children }: { children: ReactNode }) {
  const [decision, setDecision] = useState<CookiePreferences | null>(null);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const sessionOnly = useRef(false);
  const openingControl = useRef<HTMLElement | null>(null);

  const openPreferences = useCallback(() => {
    if (document.activeElement instanceof HTMLElement && !document.activeElement.closest('dialog')) {
      openingControl.current = document.activeElement;
    }
    setIsOpen(true);
  }, []);
  const closePreferences = useCallback(() => {
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      const original = openingControl.current;
      const target = original?.isConnected ? original : document.getElementById('afaq-cookie-customize') ?? document.getElementById('afaq-cookie-settings');
      target?.focus({ preventScroll: true });
    });
  }, []);

  const refreshPreferences = useCallback(() => {
    try {
      const raw = window.localStorage.getItem(COOKIE_PREFERENCES_KEY);
      const saved = parseCookiePreferences(raw);
      if (raw && !saved) window.localStorage.removeItem(COOKIE_PREFERENCES_KEY);
      setDecision(saved);
      setStorageError(null);
    } catch {
      setDecision(null);
      setStorageError('Le stockage de votre navigateur est indisponible. Les options non essentielles restent désactivées tant que vous ne les autorisez pas.');
    }
    setReady(true);
  }, []);

  useEffect(() => {
    refreshPreferences();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_PREFERENCES_KEY || event.key === null) {
        sessionOnly.current = false;
        refreshPreferences();
      }
    };
    const handleFocus = () => {
      if (!sessionOnly.current) refreshPreferences();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') handleFocus();
    };

    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [openPreferences, refreshPreferences]);

  useEffect(() => {
    if (!decision) return;
    let timer: number;
    const checkExpiry = () => {
      const remaining = getCookiePreferenceExpiry(decision.date).getTime() - Date.now();
      if (remaining <= 0) {
        sessionOnly.current = false;
        refreshPreferences();
      } else {
        timer = window.setTimeout(checkExpiry, Math.min(remaining, 2_147_483_647));
      }
    };
    checkExpiry();
    return () => window.clearTimeout(timer);
  }, [decision, refreshPreferences]);

  const savePreferences = useCallback((selection: CookiePreferenceSelection) => {
    const next: CookiePreferences = {
      necessary: true,
      analytics: selection.analytics === true,
      functional: selection.functional === true,
      date: new Date().toISOString(),
    };
    let persisted = false;
    try {
      window.localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(next));
      persisted = true;
    } catch {
      // Remove a previous opt-in where possible if a new choice cannot be stored.
      try { window.localStorage.removeItem(COOKIE_PREFERENCES_KEY); } catch { /* Storage may be disabled. */ }
    }
    if (persisted) {
      try { window.localStorage.removeItem('afaq-cookie-consent'); } catch { /* The granular decision is already saved. */ }
    }
    sessionOnly.current = !persisted;
    setDecision(next);
    setReady(true);
    setStorageError(persisted ? null : STORAGE_ERROR);
    if (persisted) closePreferences();
    else openPreferences();
    return persisted;
  }, [closePreferences, openPreferences]);

  const preferences = decision ?? DEFAULT_COOKIE_PREFERENCES;
  useEffect(() => {
    if (ready) window.dispatchEvent(new CustomEvent<CookiePreferences>(COOKIE_PREFERENCES_CHANGED_EVENT, { detail: preferences }));
  }, [ready, preferences]);

  const value = useMemo(() => ({
    preferences, ready, hasDecision: decision !== null, isOpen, storageError,
    openPreferences, closePreferences, savePreferences,
  }), [preferences, ready, decision, isOpen, storageError, openPreferences, closePreferences, savePreferences]);

  return (
    <CookiePreferencesContext.Provider value={value}>
      {children}
      {isOpen && (
        <CookiePreferencesModal
          preferences={preferences}
          storageError={storageError}
          onClose={closePreferences}
          onSave={savePreferences}
        />
      )}
    </CookiePreferencesContext.Provider>
  );
}

export function useCookiePreferences(): CookiePreferencesContextValue {
  const value = useContext(CookiePreferencesContext);
  if (!value) throw new Error('useCookiePreferences requires CookiePreferencesProvider.');
  return value;
}
