'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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

export default function LocaliserPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('Toutes');
  const [activePharmacy, setActivePharmacy] = useState<number | null>(null);
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real pharmacies
  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/public/pharmacies');
        setPharmacies(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des pharmacies (fallback aux données de test):', error);
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

  const cities = ['Toutes', ...Array.from(new Set(pharmacies.map(p => p.city)))].filter(Boolean);

  // Filter pharmacies based on search and city
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const searchMatch = pharmacy.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        pharmacy.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'Toutes' || pharmacy.city === selectedCity;
    return searchMatch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24 flex flex-col">
      <div className="container mx-auto px-4 flex-grow flex flex-col h-full">
        
        {/* Page Header */}
        <div className="max-w-4xl mb-8 space-y-4">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Notre Réseau
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Trouver une <span className="text-gold-soft">Pharmacie</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans max-w-2xl">
            Recherchez les pharmacies partenaires AFAQ Health distribuant nos références près de chez vous.
          </p>
        </div>

        {/* Layout: Sidebar + Map */}
        <div className="flex-grow flex flex-col lg:flex-row gap-6 h-[70vh] min-h-[600px]">
          
          {/* Sidebar (Search & List) */}
          <div className="w-full lg:w-1/3 bg-white rounded-3xl shadow-sm border border-sage-light flex flex-col overflow-hidden">
            
            {/* Search Header */}
            <div className="p-6 border-b border-sage-light/50 bg-ivory-soft/30 space-y-4">
              <input 
                type="text" 
                placeholder="Rechercher une pharmacie, un quartier..." 
                className="w-full px-4 py-3 rounded-xl border border-sage-light focus:border-teal-deep focus:ring-1 focus:ring-teal-deep outline-none bg-white transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
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
              {filteredPharmacies.length > 0 ? (
                filteredPharmacies.map((pharmacy) => (
                  <div 
                    key={pharmacy.id}
                    onClick={() => setActivePharmacy(pharmacy.id)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                      activePharmacy === pharmacy.id
                        ? 'bg-teal-deep/5 border-teal-deep shadow-sm'
                        : 'bg-white border-sage-light hover:border-teal-deep/50 hover:shadow-sm'
                    }`}
                  >
                    <h3 className="font-bold text-teal-deep text-lg leading-tight mb-1">{pharmacy.name}</h3>
                    <p className="text-sm text-anthracite-soft/80 flex items-start gap-1.5 mt-2">
                      <span className="text-gold-soft">📍</span> {pharmacy.address}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center p-8 text-anthracite-soft/60">
                  <p>Aucune pharmacie trouvée pour cette recherche.</p>
                </div>
              )}
            </div>

            {/* Professional Banner */}
            <div className="p-5 bg-teal-deep text-white text-center">
              <p className="text-sm font-semibold mb-2">Vous êtes pharmacien ?</p>
              <Link href="/portal/login" className="text-xs text-gold-soft underline hover:text-white transition-colors">
                Rejoignez le réseau AFAQ Health →
              </Link>
            </div>
          </div>

          {/* Map Area */}
          <div className="w-full lg:w-2/3 bg-white rounded-3xl shadow-sm border border-sage-light relative overflow-hidden flex flex-col z-0">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f4f7f6]">
                <div className="text-teal-deep font-semibold">Chargement de la carte...</div>
              </div>
            ) : (
              <MapComponent 
                pharmacies={filteredPharmacies} 
                activePharmacyId={activePharmacy} 
                onMarkerClick={setActivePharmacy} 
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
