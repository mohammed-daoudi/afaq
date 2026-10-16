'use client';
import { useText } from '@/lib/useText';


import { Play } from 'lucide-react';
import { useCookiePreferences } from '@/context/CookiePreferencesContext';

interface ConsentVideoProps {
  src: string;
  title: string;
}

export default function ConsentVideo({ src, title }: ConsentVideoProps) {
  const tx = useText();
  const { preferences, ready, openPreferences } = useCookiePreferences();

  if (ready && preferences.functional) {
    return (
      <video
        src={src}
        aria-label={tx(title)}
        autoPlay
        loop
        muted
        playsInline
        className="block w-full h-full object-cover"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-sage-light/30 p-6 text-center text-teal-deep">
      <Play size={30} className="text-gold-soft" aria-hidden="true" />
      <p className="text-lg font-semibold">{tx("Vidéo désactivée")}</p>
      <p className="max-w-sm text-sm leading-relaxed">{tx("Activez les fonctionnalités et médias enrichis dans vos préférences pour regarder cette vidéo.")}</p>
      <button
        type="button"
        onClick={openPreferences}
        className="rounded-xl bg-teal-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-deep/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:ring-offset-2"
      >{tx("Gérer mes préférences")}</button>
    </div>
  );
}
