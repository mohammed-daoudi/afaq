'use client';

import { useEffect, useState } from 'react';

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

function buildGoogleMapsEmbedUrl(query: string, zoom = 13) {
  const params = new URLSearchParams({
    q: query,
    z: String(zoom),
    output: 'embed',
  });

  return `https://www.google.com/maps?${params.toString()}`;
}

function buildGoogleMapsViewportUrl(center: { lat: number; lng: number }, zoom = 6) {
  const params = new URLSearchParams({
    ll: `${center.lat},${center.lng}`,
    z: String(zoom),
    output: 'embed',
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
    ? buildGoogleMapsEmbedUrl(`${activePharmacy.lat},${activePharmacy.lng}`, 16)
    : userLocation
      ? buildGoogleMapsEmbedUrl(`${userLocation.lat},${userLocation.lng}`, 13)
      : buildGoogleMapsViewportUrl(MOROCCO_CENTER, defaultZoom);

  return (
    <div className="relative h-full w-full bg-[#f4f7f6]">
      <iframe
        key={mapUrl}
        title="Carte Google Maps des pharmacies partenaires AFAQ HEALTH"
        src={mapUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
