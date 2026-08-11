import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
}

export default function PharmacyMap({ pharmacies, activePharmacyId, onMarkerClick }: PharmacyMapProps) {
  // Default center (Morocco)
  const defaultCenter: [number, number] = [33.5928, -7.6192];
  
  const activePharmacy = pharmacies.find(p => p.id === activePharmacyId);
  const currentCenter: [number, number] = activePharmacy && activePharmacy.lat && activePharmacy.lng
    ? [activePharmacy.lat, activePharmacy.lng] 
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
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      
      <MapCenterController center={currentCenter} zoom={currentZoom} />

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
              <div className="text-sm">
                <p className="font-bold text-teal-deep mb-1">{pharmacy.name}</p>
                <p className="text-gray-600 mb-1">{pharmacy.address}</p>
                <p className="text-gray-600">{pharmacy.city}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
