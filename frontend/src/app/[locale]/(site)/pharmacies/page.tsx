'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/navigation';
import dynamic from 'next/dynamic';
import axios from 'axios';

// Dynamically import the map component since Leaflet requires window
const MapComponent = dynamic(() => import('@/components/map/PharmacyMap'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[#f4f7f6]">
      <div className="text-teal-deep font-semibold">Chargement de la carte interactive...</div>
    </div>
  )
});

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface PharmacyWithDistance extends Pharmacy {
  distance: number | null;
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180);
}

export default function PharmaciesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [activePharmacy, setActivePharmacy] = useState<number | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isProductFiltered, setIsProductFiltered] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Fetch real pharmacies
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
        
        // Check if we are filtering by a specific product
        const searchParams = new URLSearchParams(window.location.search);
        const productId = searchParams.get('product_id');
        
        if (productId) {
          setIsProductFiltered(true);
        }
        
        const endpoint = productId 
          ? `${apiUrl}/products/${productId}/pharmacies`
          : `${apiUrl}/public/pharmacies`;
          
        const response = await axios.get(endpoint);
        setPharmacies(response.data);
      } catch (error) {
        console.warn('Backend non disponible, fallback aux données de test.');
        setPharmacies([
          { id: 1, name: 'Pharmacie Centrale', city: 'Rabat', address: '15 Avenue Mohammed V, Rabat', lat: 34.020882, lng: -6.841650 },
          { id: 2, name: 'Pharmacie Al Amal', city: 'Rabat', address: 'Quartier Agdal, Rabat', lat: 34.004413, lng: -6.847582 },
          { id: 3, name: 'Pharmacie des Nations Unies', city: 'Casablanca', address: 'Place des Nations Unies, Casablanca', lat: 33.592817, lng: -7.619183 },
          { id: 4, name: 'Pharmacie Maârif', city: 'Casablanca', address: 'Quartier Maârif, Casablanca', lat: 33.579471, lng: -7.632948 },
          { id: 5, name: 'Pharmacie Kénitra Médina', city: 'Kénitra', address: 'Centre Ville, Kénitra', lat: 34.261013, lng: -6.580196 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setSelectedCity('Toutes'); // Reset city to see all nearest pharmacies across boundaries
        setIsLocating(false);
      },
      (error) => {
        alert("Impossible de récupérer votre position. Veuillez vérifier vos autorisations.");
        setIsLocating(false);
      }
    );
  };

  const cities = ['Toutes', ...Array.from(new Set(pharmacies.map(p => p.city)))].filter(Boolean);

  // Filter pharmacies based on search and city
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const searchMatch = pharmacy.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        pharmacy.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Toutes' || pharmacy.city === selectedCity;
    return searchMatch && matchesCity;
  });

  // Calculate distance and sort if userLocation is known
  let pharmaciesWithDistance: PharmacyWithDistance[] = filteredPharmacies.map(pharmacy => {
    if (userLocation) {
      const distance = getDistanceFromLatLonInKm(userLocation.lat, userLocation.lng, pharmacy.lat, pharmacy.lng);
      return { ...pharmacy, distance };
    }
    return { ...pharmacy, distance: null };
  });

  if (userLocation) {
    pharmaciesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24 flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col h-full">
        
        {/* Page Header */}
        <div className="max-w-4xl mb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
              Notre Réseau
            </div>
            {isProductFiltered && (
              <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white bg-gold-soft rounded-full uppercase">
                Stock Vérifié ✓
              </div>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Pharmacies à <span className="text-gold-soft">proximité</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans max-w-2xl">
            {isProductFiltered 
              ? "Les pharmacies ci-dessous ont déclaré avoir ce produit en stock." 
              : "Recherchez les pharmacies partenaires AFAQ HEALTH distribuant nos références près de chez vous."}
          </p>
        </div>

        {/* Layout: Sidebar + Map */}
        <div className="flex-grow flex flex-col lg:flex-row gap-6 lg:h-[70vh] lg:min-h-[600px]">
          
          {/* Sidebar (Search & List) */}
          <div className="w-full lg:w-1/3 bg-white rounded-3xl shadow-sm border border-sage-light flex flex-col overflow-hidden h-[400px] lg:h-auto">
            
            {/* Search Header */}
            <div className="p-6 border-b border-sage-light/50 bg-ivory-soft/30 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" 
                  placeholder="Rechercher une pharmacie, un quartier..." 
                  className="flex-grow w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-white transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  onClick={handleLocateMe}
                  disabled={isLocating}
                  className="flex items-center justify-center gap-2 bg-white border border-teal-deep text-teal-deep px-4 py-3 rounded-xl hover:bg-sage-light transition-all text-sm font-semibold whitespace-nowrap disabled:opacity-50"
                  title="Trouver les pharmacies autour de moi"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {isLocating ? '...' : 'Autour de moi'}
                </button>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {cities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedCity === city
                        ? 'bg-teal-deep text-white shadow-sm'
                        : 'bg-sage-light text-teal-deep hover:bg-teal-deep/10'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {pharmaciesWithDistance.length > 0 ? (
                pharmaciesWithDistance.map((pharmacy) => (
                  <div 
                    key={pharmacy.id}
                    onClick={() => setActivePharmacy(pharmacy.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      activePharmacy === pharmacy.id
                        ? 'bg-teal-deep/5 border-teal-deep shadow-sm'
                        : 'bg-white border-sage-light hover:border-teal-deep/50 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-teal-deep text-lg leading-tight mb-1">{pharmacy.name}</h3>
                      {pharmacy.distance !== null && (
                        <span className="inline-block px-2 py-1 bg-gold-soft/20 text-teal-deep text-xs font-bold rounded-lg whitespace-nowrap">
                          {pharmacy.distance < 1 ? Math.round(pharmacy.distance * 1000) + ' m' : pharmacy.distance.toFixed(1) + ' km'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-anthracite-soft/80 flex items-start gap-1.5 mt-2">
                      <span className="text-gold-soft">📍</span> {pharmacy.address}
                    </p>
                    {activePharmacy === pharmacy.id && (
                      <div className="mt-3">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${pharmacy.lat},${pharmacy.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full text-center bg-teal-deep text-white text-sm py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Obtenir l'itinéraire
                        </a>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-anthracite-soft/60">
                  <p>Aucune pharmacie trouvée pour cette recherche.</p>
                </div>
              )}
            </div>


          </div>

          {/* Map Area */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-sm border border-sage-light relative overflow-hidden flex flex-col z-0 h-[400px] sm:h-[500px] lg:h-auto lg:min-h-0">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f4f7f6]">
                <div className="text-teal-deep font-semibold">Chargement de la carte...</div>
              </div>
            ) : (
              <MapComponent 
                pharmacies={pharmaciesWithDistance} 
                activePharmacyId={activePharmacy} 
                onMarkerClick={setActivePharmacy} 
                userLocation={userLocation}
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
