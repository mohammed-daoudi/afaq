'use client';
import { useText } from '@/lib/useText';
import { useLocale } from 'next-intl';


import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useCookiePreferences } from '@/context/CookiePreferencesContext';

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface PharmacyMapProps {
  pharmacies: Pharmacy[];
  activePharmacyId: number | null;
  onMarkerClick: (id: number) => void;
  userLocation?: { lat: number; lng: number } | null;
}

function buildGoogleMapsEmbedUrl(query: string, zoom = 13, locale = 'fr') {
  const params = new URLSearchParams({
    q: query,
    z: String(zoom),
    output: 'embed',
    hl: locale,
  });

  return `https://www.google.com/maps?${params.toString()}`;
}

function buildGoogleMapsViewportUrl(center: { lat: number; lng: number }, zoom = 6, locale = 'fr') {
  const params = new URLSearchParams({
    ll: `${center.lat},${center.lng}`,
    z: String(zoom),
    output: 'embed',
    hl: locale,
  });

  return `https://www.google.com/maps?${params.toString()}`;
}

const MOROCCO_CENTER = { lat: 31.7917, lng: -7.0926 };
const DESKTOP_MOROCCO_ZOOM = 6;
const MOBILE_MOROCCO_ZOOM = 5;

export default function PharmacyMap({
  activePharmacyId,
  pharmacies,
  userLocation,
}: PharmacyMapProps) {
  const tx = useText();
  const locale = useLocale();
  const { preferences, ready, openPreferences } = useCookiePreferences();
  const [defaultZoom, setDefaultZoom] = useState(DESKTOP_MOROCCO_ZOOM);
  const activePharmacy = pharmacies.find((pharmacy) => pharmacy.id === activePharmacyId);

  useEffect(() => {
    const updateDefaultZoom = () => {
      setDefaultZoom(window.innerWidth < 640 ? MOBILE_MOROCCO_ZOOM : DESKTOP_MOROCCO_ZOOM);
    };

    updateDefaultZoom();
    window.addEventListener('resize', updateDefaultZoom);

    return () => window.removeEventListener('resize', updateDefaultZoom);
  }, []);

  const mapUrl = activePharmacy
    ? buildGoogleMapsEmbedUrl(`${activePharmacy.lat},${activePharmacy.lng}`, 16, locale)
    : userLocation
      ? buildGoogleMapsEmbedUrl(`${userLocation.lat},${userLocation.lng}`, 13, locale)
      : buildGoogleMapsViewportUrl(MOROCCO_CENTER, defaultZoom, locale);

  return (
    <div className="relative h-full w-full bg-[#f4f7f6]">
      {ready && preferences.functional ? (
        <iframe
          key={mapUrl}
          title={tx("Carte Google Maps des pharmacies partenaires AFAQ HEALTH")}
          src={mapUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-teal-deep">
          <MapPin size={32} className="text-gold-soft" aria-hidden="true" />
          <h2 className="text-xl font-semibold">{tx("Afficher la carte des pharmacies")}</h2>
          <p className="max-w-md text-sm leading-relaxed">{tx("La carte Google Maps nécessite votre accord pour les fonctionnalités et médias enrichis. La liste des pharmacies reste disponible.")}</p>
          <button
            type="button"
            onClick={openPreferences}
            className="rounded-xl bg-teal-deep px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-deep/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft focus-visible:ring-offset-2"
          >{tx("Gérer mes préférences")}</button>
        </div>
      )}
    </div>
  );
}
