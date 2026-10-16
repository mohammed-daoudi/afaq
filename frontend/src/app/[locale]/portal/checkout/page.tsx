'use client';
import { useText } from '@/lib/useText';


import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Link } from '@/navigation';
import { useRouter } from '@/navigation';
import api from '@/lib/api';

export default function CheckoutPage() {
  const tx = useText();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const router = useRouter();
  
  // Simulated form data
  const [formData, setFormData] = useState({
    pharmacy: 'Pharmacie Centrale',
    address: '15 Avenue Mohammed V',
    city: 'Rabat',
    phone: '0537000000',
    notes: ''
  });

  // If cart is empty and we're not on the success step, go back to catalog
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      router.push('/portal/catalog');
    }
    
    // Load user data
    const userStr = localStorage.getItem('afaq_b2b_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.account) {
          setFormData(prev => ({
            ...prev,
            pharmacy: user.account.name || prev.pharmacy,
            address: user.account.address || prev.address,
            city: user.account.city || prev.city,
            phone: user.account.phone || prev.phone,
          }));
        }
      } catch {}
    }
  }, [items.length, step, router]);

  const handleConfirmOrder = async () => {
    try {
      const orderItems = items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price: item.pph
      }));

      if (orderItems.length === 0 || orderItems.some(item => !item.product_id || item.quantity < 1 || item.unit_price < 0)) {
        alert(tx('Votre panier contient des informations invalides.'));
        return;
      }
      
      const response = await api.post('/b2b/orders', {
        items: orderItems
      });
      
      if (response.data) {
        setStep(3);
        clearCart();
      }
    } catch {
      alert(tx('Erreur lors de la confirmation de la commande'));
    }
  };

  if (items.length === 0 && step !== 3) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Checkout Progress */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-sage-light -z-10 rounded-full"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-deep -z-10 rounded-full transition-all duration-500"
          style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        ></div>
        
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`w-10 h-10 flex items-center justify-center font-bold text-sm ${ step >= s ? 'bg-teal-deep text-white' : 'bg-white text-anthracite-soft/40 border-2 border-sage-light' } rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect`}
          >
            {tx(s === 1 && '1')}
            {tx(s === 2 && '2')}
            {tx(s === 3 && '✓')}
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold text-teal-deep mb-8">
        {tx(step === 1 && 'Récapitulatif de la commande')}
        {tx(step === 2 && 'Détails de livraison')}
        {tx(step === 3 && 'Commande confirmée')}
      </h1>

      {step === 1 && (
        <div className="bg-white rounded-3xl shadow-sm border border-sage-light overflow-hidden">
          <div className="p-6 border-b border-sage-light">
            <h2 className="font-bold text-lg text-teal-deep">{tx("Vos articles")}</h2>
          </div>
          <div className="p-6 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 items-center border-b border-sage-light/50 pb-4 last:border-0 last:pb-0">
                <div className="w-16 h-16 relative bg-ivory-soft rounded-lg overflow-hidden border border-sage-light flex-shrink-0">
                  <Image src={item.product.imagePath} alt={tx(item.product.name)} fill className="object-contain p-2" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-teal-deep"><bdi dir="ltr">{tx(item.product.name)}</bdi></h3>
                  <p className="text-xs text-anthracite-soft/60">{tx("PPH: ")}{tx(item.pph.toFixed(2))}{tx(" MAD")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-anthracite-soft/80">{tx("Quantité: ")}{tx(item.quantity)}</p>
                  <p className="font-bold text-teal-deep">{tx((item.pph * item.quantity).toFixed(2))}{tx(" MAD")}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-ivory-soft/30 flex justify-between items-center border-t border-sage-light">
            <span className="font-medium text-anthracite-soft/80">{tx("Total HT (PPH)")}</span>
            <span className="text-2xl font-bold text-teal-deep">{tx(totalPrice.toFixed(2))}{tx(" MAD")}</span>
          </div>
          <div className="p-6 flex justify-end">
            <button 
              onClick={() => setStep(2)}
              className="bg-teal-deep text-white px-8 py-3 font-bold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
            >{tx("Continuer vers la livraison")}</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-sage-light p-6">
              <h2 className="font-bold text-lg text-teal-deep mb-4">{tx("Adresse de livraison")}</h2>
              <p className="text-sm text-anthracite-soft/60 mb-6">{tx("Cette adresse correspond à celle associée à votre compte validé.")}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-teal-deep mb-1">{tx("Nom de l'établissement")}</label>
                  <input type="text" disabled value={formData.pharmacy} className="w-full bg-ivory-soft/50 border border-sage-light rounded-lg px-4 py-2.5 text-anthracite-soft" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-deep mb-1">{tx("Adresse")}</label>
                  <input type="text" disabled value={formData.address} className="w-full bg-ivory-soft/50 border border-sage-light rounded-lg px-4 py-2.5 text-anthracite-soft" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-teal-deep mb-1">{tx("Ville")}</label>
                    <input type="text" disabled value={formData.city} className="w-full bg-ivory-soft/50 border border-sage-light rounded-lg px-4 py-2.5 text-anthracite-soft" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-teal-deep mb-1">{tx("Téléphone de contact")}</label>
                    <input type="text" disabled value={formData.phone} className="w-full bg-ivory-soft/50 border border-sage-light rounded-lg px-4 py-2.5 text-anthracite-soft" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-teal-deep mb-1">{tx("Instructions de livraison (Optionnel)")}</label>
                  <textarea 
                    value={formData.notes} 
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full border border-sage-light rounded-lg px-4 py-2.5 text-anthracite-soft focus:border-teal-deep outline-none" 
                    rows={3} 
                    placeholder={tx("Heures d'ouverture, code porte...")}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-3xl shadow-sm border border-sage-light p-6 sticky top-24">
              <h2 className="font-bold text-lg text-teal-deep mb-4">{tx("Résumé")}</h2>
              <div className="space-y-3 text-sm mb-6 border-b border-sage-light pb-6">
                <div className="flex justify-between">
                  <span className="text-anthracite-soft/80">{tx("Sous-total")}</span>
                  <span className="font-medium text-teal-deep">{tx(totalPrice.toFixed(2))}{tx(" MAD")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-anthracite-soft/80">{tx("Frais de livraison")}</span>
                  <span className="font-medium text-green-600">{tx("Gratuit")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-anthracite-soft/80">{tx("TVA (20%)")}</span>
                  <span className="font-medium text-teal-deep">{tx((totalPrice * 0.2).toFixed(2))}{tx(" MAD")}</span>
                </div>
              </div>
              <div className="flex justify-between items-end mb-8">
                <span className="font-bold text-teal-deep">{tx("Total TTC")}</span>
                <span className="text-2xl font-bold text-teal-deep">{tx((totalPrice * 1.2).toFixed(2))}{tx(" MAD")}</span>
              </div>
              <button 
                onClick={handleConfirmOrder}
                className="w-full bg-teal-deep text-white py-3.5 font-bold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect"
              >{tx("Confirmer la commande")}</button>
              <button 
                onClick={() => setStep(1)}
                className="w-full mt-3 text-sm font-medium text-anthracite-soft/60 hover:text-teal-deep transition-colors"
              >{tx("Retour au panier")}</button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-3xl shadow-sm border border-sage-light p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-teal-deep mb-4">{tx("Commande Confirmée !")}</h2>
          <p className="text-anthracite-soft/80 mb-2">{tx("Votre commande ")}<strong className="text-teal-deep">{tx("#CMD-2026-0895")}</strong>{tx(" a bien été enregistrée.")}</p>
          <p className="text-anthracite-soft/80 mb-8">{tx("Vous recevrez un email de confirmation et la livraison est prévue d'ici 24 à 48 heures.")}</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portal/orders" className="bg-sage-light text-teal-deep px-6 py-3 font-bold rounded-xl hover:bg-gold-soft hover:text-teal-deep transition-all shadow-md shimmer-effect">{tx("Suivre ma commande")}</Link>
            <Link href="/portal/catalog" className="border border-teal-deep text-teal-deep px-6 py-3 rounded-xl font-bold hover:bg-ivory-soft transition-colors">{tx("Retour au catalogue")}</Link>
          </div>
        </div>
      )}
    </div>
  );
}
