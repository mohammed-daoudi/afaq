'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { THERAPEUTIC_FAMILIES } from '@/lib/products';
import api from '@/lib/api';

export default function CatalogPage() {
  const { addItem, totalItems, setIsOpen } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Toutes les marques');
  const [selectedFamily, setSelectedFamily] = useState('Toutes les familles');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await api.get('/b2b/catalog');
        const mappedProducts = response.data.map((p: any) => ({
          ...p,
          id: p.id,
          name: p.label,
          imagePath: p.photo,
          brand: p.brand?.name || 'SOTYA',
          category: p.category,
        }));
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch catalog', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  // Local state for quantity inputs
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (id: string, qty: number) => {
    if (qty < 1) return;
    setQuantities(prev => ({ ...prev, [id]: qty }));
  };

  const handleAddToCart = (product: any, pph: number) => {
    const qty = quantities[product.id] || 1;
    addItem(product, pph, qty);
    setQuantities(prev => ({ ...prev, [product.id]: 1 })); // Reset after adding
  };

  const filteredProducts = products.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBrand = selectedBrand === 'Toutes les marques' || product.brand === selectedBrand;
    const matchFamily = selectedFamily === 'Toutes les familles' || product.category === selectedFamily;
    return matchSearch && matchBrand && matchFamily;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-teal-deep">Catalogue & Commandes</h1>
          <p className="text-anthracite-soft/60 mt-1">Gérez vos approvisionnements avec vos tarifs négociés (PPH).</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-teal-deep text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-opacity-90 transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          Mon panier ({totalItems})
        </button>
      </div>

      {/* Catalog Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-sage-light flex flex-col md:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Rechercher une référence..." 
          className="flex-grow border border-sage-light rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-deep focus:ring-1 focus:ring-teal-deep text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="border border-sage-light rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-deep text-sm text-anthracite-soft font-medium bg-white"
          value={selectedFamily}
          onChange={(e) => setSelectedFamily(e.target.value)}
        >
          <option>Toutes les familles</option>
          {THERAPEUTIC_FAMILIES.map(f => <option key={f}>{f}</option>)}
        </select>
        <select 
          className="border border-sage-light rounded-xl px-4 py-2.5 focus:outline-none focus:border-teal-deep text-sm text-anthracite-soft font-medium bg-white"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option>Toutes les marques</option>
          <option>SOTYA</option>
          <option>Colagenova</option>
          <option>Naturamins</option>
        </select>
      </div>

      {/* B2B Catalog List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-deep"></div>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const pph = product.prices && product.prices.length > 0 ? parseFloat(product.prices[0].custom_price) : 0;
          const ppv = pph * 1.4; // Mock PPV
          const stock = 50; // Mock Stock
          const currentQty = quantities[product.id] || 1;

          return (
            <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-lg transition-shadow border border-sage-light flex flex-col overflow-hidden group">
              <div className="p-6 flex-grow flex flex-col">
                <div className="relative w-full h-48 mb-6 bg-ivory-soft/50 rounded-2xl p-4 flex items-center justify-center group-hover:bg-ivory-soft transition-colors">
                  <Image 
                    src={product.imagePath} 
                    alt={product.name}
                    fill
                    className="object-contain p-2 drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-teal-deep uppercase">
                    {product.brand}
                  </div>
                </div>
                
                <div className="mb-2 flex-grow">
                  <p className="text-xs text-anthracite-soft/60 mb-1">{product.category}</p>
                  <h3 className="font-heading font-bold text-lg text-teal-deep leading-tight">{product.name}</h3>
                  <p className="text-[11px] text-anthracite-soft/80 mt-1">{product.format}</p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-sage-light/50 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-anthracite-soft/60 line-through">PPV: {ppv.toFixed(2)} MAD</p>
                    <p className="text-2xl font-bold text-teal-deep tracking-tight">{pph.toFixed(2)} <span className="text-sm">MAD</span></p>
                  </div>
                  <div className="text-right">
                    {stock > 50 ? (
                      <p className="text-[11px] font-semibold text-green-600 mb-1.5 flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> En stock</p>
                    ) : (
                      <p className="text-[11px] font-semibold text-orange-500 mb-1.5 flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> Stock limité ({stock})</p>
                    )}
                    <div className="flex items-center gap-1.5 bg-ivory-soft rounded-lg p-1 border border-sage-light">
                      <button 
                        onClick={() => handleQuantityChange(product.id, currentQty - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-anthracite-soft hover:text-teal-deep hover:bg-sage-light"
                      >-</button>
                      <input 
                        type="number" 
                        value={currentQty} 
                        onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                        className="w-8 text-center bg-transparent text-sm font-bold outline-none" 
                        min="1"
                      />
                      <button 
                        onClick={() => handleQuantityChange(product.id, currentQty + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm text-anthracite-soft hover:text-teal-deep hover:bg-sage-light"
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCart(product, pph)}
                className="w-full bg-sage-light text-teal-deep font-bold py-3.5 hover:bg-teal-deep hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
                Ajouter au panier
              </button>
            </div>
          );
        })}
      </div>
      )}
      
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-sage-light">
          <p className="text-anthracite-soft/60">Aucune référence ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
