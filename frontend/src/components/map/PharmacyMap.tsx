import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Fix for default Leaflet markers in Next.js/Webpack
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

// Icon for the user's location
const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A component to dynamically center the map when the active pharmacy changes
function MapCenterController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    });
  }, [center, zoom, map]);
  
  return null;
}

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
  userLocation?: { lat: number, lng: number } | null;
}

export default function PharmacyMap({ pharmacies, activePharmacyId, onMarkerClick, userLocation }: PharmacyMapProps) {
  // Default center (Morocco)
  const defaultCenter: [number, number] = [33.5928, -7.6192];
  
  const activePharmacy = pharmacies.find(p => p.id === activePharmacyId);
  const currentCenter: [number, number] = activePharmacy && activePharmacy.lat && activePharmacy.lng
    ? [activePharmacy.lat, activePharmacy.lng] 
    : userLocation 
      ? [userLocation.lat, userLocation.lng]
      : (pharmacies.length > 0 && pharmacies[0].lat && pharmacies[0].lng ? [pharmacies[0].lat, pharmacies[0].lng] : defaultCenter);
    
  const currentZoom = activePharmacy ? 15 : 6;

  return (
    <MapContainer 
      center={currentCenter} 
      zoom={currentZoom} 
      style={{ height: '100%', width: '100%' }}
      className="z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapCenterController center={currentCenter} zoom={currentZoom} />

      {userLocation && (
        <Marker 
          position={[userLocation.lat, userLocation.lng]} 
          icon={userIcon}
          zIndexOffset={1000}
        >
          <Popup>
            <div className="font-bold text-center text-teal-deep">Vous êtes ici</div>
          </Popup>
        </Marker>
      )}

      <MarkerClusterGroup
        chunkedLoading
      >
        {pharmacies.map((pharmacy) => {
          if (!pharmacy.lat || !pharmacy.lng) return null;
          
          return (
            <Marker 
              key={pharmacy.id} 
              position={[pharmacy.lat, pharmacy.lng]} 
              icon={icon}
              eventHandlers={{
                click: () => onMarkerClick(pharmacy.id),
              }}
            >
              <Popup>
                <div className="text-sm min-w-[150px]">
                  <p className="font-bold text-teal-deep mb-1">{pharmacy.name}</p>
                  <p className="text-gray-600 mb-1">{pharmacy.address}</p>
                  <p className="text-gray-600 mb-3">{pharmacy.city}</p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-teal-deep text-white py-1.5 font-semibold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
                  >
                    📍 Y aller
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
