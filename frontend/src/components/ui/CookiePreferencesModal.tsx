'use client';

import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
import { Cookie, LockKeyhole, X } from 'lucide-react';
import { Link } from '@/navigation';
import type { CookiePreferences, CookiePreferenceSelection } from '@/lib/cookie-preferences';

interface CookiePreferencesModalProps {
  preferences: CookiePreferences;
  storageError: string | null;
  onClose: () => void;
  onSave: (selection: CookiePreferenceSelection) => boolean;
}

interface CookieCategoryProps {
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  onToggle?: () => void;
}

function CookieCategory({ title, description, checked, locked = false, onToggle }: CookieCategoryProps) {
  const id = useId();
  return (
    <section className="rounded-2xl border border-sage-light bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 id={id} className="text-sm font-bold leading-snug text-[#0f4c3a] sm:text-base">{title}</h3>
          <p id={`${id}-description`} className="mt-2 text-sm leading-relaxed text-anthracite-soft/80">{description}</p>
          {locked && (
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-sage-light px-2.5 py-1 text-xs font-semibold text-[#0f4c3a]">
              <LockKeyhole size={12} aria-hidden="true" /> Toujours actif
            </span>
          )}
        </div>
        <div className="flex shrink-0 flex-col items-center gap-1.5">
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-labelledby={id}
            aria-describedby={`${id}-description`}
            disabled={locked}
            onClick={onToggle}
            className={`relative h-7 w-12 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a05b] focus-visible:ring-offset-2 disabled:cursor-not-allowed ${checked ? 'border-[#0f4c3a] bg-[#0f4c3a]' : 'border-gray-300 bg-gray-200'}`}
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
          <span className="text-[11px] font-medium text-anthracite-soft/75">{checked ? 'Activé' : 'Désactivé'}</span>
        </div>
      </div>
    </section>
  );
}

export function CookiePreferencesModal({ preferences, storageError, onClose, onSave }: CookiePreferencesModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [analytics, setAnalytics] = useState(preferences.analytics);
  const [functional, setFunctional] = useState(preferences.functional);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  const handleBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
      onClose();
    }
  };

  const saveAll = (enabled: boolean) => {
    setAnalytics(enabled);
    setFunctional(enabled);
    onSave({ analytics: enabled, functional: enabled });
  };

  return (
    <dialog
      ref={dialogRef}
      lang="fr"
      dir="ltr"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={handleBackdrop}
      className="m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-2xl overflow-hidden rounded-3xl border border-sage-light bg-ivory-soft p-0 text-anthracite-soft shadow-2xl backdrop:bg-[#0f4c3a]/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[calc(100dvh_-_2rem)] flex-col">
        <header className="flex shrink-0 items-start gap-3 border-b border-sage-light bg-white p-5 sm:p-6">
          <span className="hidden rounded-2xl bg-sage-light p-3 text-[#0f4c3a] sm:block"><Cookie size={24} aria-hidden="true" /></span>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-xl font-bold text-[#0f4c3a] sm:text-2xl">Vos préférences cookies</h2>
            <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-anthracite-soft/80">
              Choisissez les usages que vous autorisez. Vous pouvez modifier vos choix à tout moment depuis le lien « Cookies » en bas de page.
            </p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer les préférences cookies" className="shrink-0 rounded-full p-2 text-[#0f4c3a] transition-colors hover:bg-sage-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a05b]">
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="min-h-0 space-y-3 overflow-y-auto p-4 sm:p-6">
          <CookieCategory title="Cookies strictement nécessaires" description="Préférences de langue (NEXT_LOCALE), sécurité, session et mémorisation de vos choix." checked locked />
          <CookieCategory title="Mesure d'audience & Statistiques" description="Autoriser des statistiques anonymisées sur la fréquentation du site. Cette option est désactivée par défaut." checked={analytics} onToggle={() => setAnalytics((value) => !value)} />
          <CookieCategory title="Fonctionnalités & Médias enrichis" description="Autoriser la carte interactive Google Maps des pharmacies et les lecteurs vidéo. Google peut recevoir des données de connexion lors du chargement de la carte." checked={functional} onToggle={() => setFunctional((value) => !value)} />
          <p className="px-1 text-xs leading-relaxed text-anthracite-soft/75">
            Vos choix sont conservés pendant six mois au maximum. Fermer cette fenêtre ne modifie pas vos préférences.{' '}
            <Link href="/cookies" onClick={onClose} className="font-semibold text-[#0f4c3a] underline underline-offset-2">Politique des cookies</Link>
          </p>
          {storageError && <p role="alert" className="rounded-xl border border-[#d9a05b]/40 bg-[#d9a05b]/10 p-3 text-sm leading-relaxed text-anthracite-soft">{storageError}</p>}
        </div>
        <footer className="shrink-0 space-y-3 border-t border-sage-light bg-white p-4 sm:px-6 sm:py-5">
          <button type="button" onClick={() => onSave({ analytics, functional })} className="w-full rounded-xl bg-[#0f4c3a] px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0b392c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a05b] focus-visible:ring-offset-2">
            Enregistrer mes préférences
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => saveAll(false)} className="rounded-xl border border-[#0f4c3a]/30 bg-white px-3 py-3 text-sm font-semibold text-[#0f4c3a] transition-colors hover:bg-sage-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a05b]">
              Tout refuser
            </button>
            <button type="button" onClick={() => saveAll(true)} className="rounded-xl border border-[#0f4c3a]/30 bg-white px-3 py-3 text-sm font-semibold text-[#0f4c3a] transition-colors hover:bg-sage-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9a05b]">
              Tout accepter
            </button>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
