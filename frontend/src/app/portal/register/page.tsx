'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'pharmacie',
    name: '',
    inpe: '',
    manager: '',
    email: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call to register professional account
    setTimeout(() => {
      setStep(2);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-ivory-soft flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border border-sage-light">
        <div className="flex flex-col items-center mb-8">
          <Logo className="mb-6 scale-110" />
          <h1 className="text-2xl font-heading font-bold text-teal-deep text-center">
            {step === 1 ? 'Demande d\'Ouverture de Compte' : 'Demande Envoyée'}
          </h1>
          <p className="text-sm text-anthracite-soft/60 mt-1 text-center">
            {step === 1 ? 'Rejoignez le portail B2B exclusif AFAQ Health' : 'Votre compte est en cours de validation'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Account Type */}
            <div>
              <label className="block text-sm font-medium text-teal-deep mb-2">Type d'établissement</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`border rounded-xl p-4 cursor-pointer flex items-center justify-center transition-all ${formData.type === 'pharmacie' ? 'border-teal-deep bg-sage-light/30 ring-1 ring-teal-deep' : 'border-sage-light hover:border-teal-deep/50'}`}>
                  <input type="radio" name="type" className="hidden" checked={formData.type === 'pharmacie'} onChange={() => setFormData({...formData, type: 'pharmacie'})} />
                  <span className="font-bold text-teal-deep">Pharmacie</span>
                </label>
                <label className={`border rounded-xl p-4 cursor-pointer flex items-center justify-center transition-all ${formData.type === 'grossiste' ? 'border-teal-deep bg-sage-light/30 ring-1 ring-teal-deep' : 'border-sage-light hover:border-teal-deep/50'}`}>
                  <input type="radio" name="type" className="hidden" checked={formData.type === 'grossiste'} onChange={() => setFormData({...formData, type: 'grossiste'})} />
                  <span className="font-bold text-teal-deep">Grossiste / Clinique</span>
                </label>
              </div>
            </div>

            {/* General Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="Nom de l'établissement" 
                placeholder="Pharmacie Centrale"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
              <Input 
                label="Code INPE" 
                placeholder="12345678"
                value={formData.inpe}
                onChange={(e) => setFormData({...formData, inpe: e.target.value})}
                required
              />
              <Input 
                label="Nom du Pharmacien / Gérant" 
                placeholder="Dr. Dupont"
                value={formData.manager}
                onChange={(e) => setFormData({...formData, manager: e.target.value})}
                required
              />
              <Input 
                label="Email Professionnel" 
                type="email"
                placeholder="contact@pharmacie.ma"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <Input 
                label="Téléphone" 
                type="tel"
                placeholder="0537000000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <Input 
                label="Ville" 
                placeholder="Rabat"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
              />
            </div>
            
            <div className="w-full">
              <label className="block text-sm font-medium text-teal-deep mb-1">Adresse Complète</label>
              <textarea 
                className="w-full border border-sage-light rounded-lg px-4 py-2.5 text-anthracite-soft focus:border-teal-deep outline-none" 
                rows={2} 
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>

            {/* Document Uploads */}
            <div className="space-y-4 border-t border-sage-light pt-6">
              <h3 className="font-bold text-teal-deep">Documents Obligatoires</h3>
              <p className="text-xs text-anthracite-soft/60">Afin de valider votre compte B2B, nous avons besoin de vos documents légaux (PDF ou Image).</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-dashed border-sage-light rounded-xl p-4 text-center hover:bg-ivory-soft transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,image/*" required />
                  <svg className="w-8 h-8 text-teal-deep mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span className="text-sm font-medium text-teal-deep">Registre de Commerce</span>
                </div>
                <div className="border border-dashed border-sage-light rounded-xl p-4 text-center hover:bg-ivory-soft transition-colors cursor-pointer relative">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,image/*" required />
                  <svg className="w-8 h-8 text-teal-deep mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  <span className="text-sm font-medium text-teal-deep">Diplôme du Pharmacien</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg" withShimmer disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : 'Soumettre ma demande'}
            </Button>
            
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-sage-light rounded-full flex items-center justify-center mx-auto mb-2">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#133b3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-teal-deep">Demande bien reçue !</h2>
            <p className="text-anthracite-soft/80 max-w-md mx-auto">
              Nous avons bien reçu votre demande d'inscription pour <strong>{formData.name || 'votre établissement'}</strong>. 
            </p>
            <div className="bg-ivory-soft border border-sage-light rounded-xl p-4 text-sm text-anthracite-soft/80 text-left max-w-md mx-auto">
              <p className="mb-2 font-bold text-teal-deep">Prochaines étapes :</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Vérification de vos documents (24h ouvrées)</li>
                <li>Validation de votre compte par notre équipe</li>
                <li>Réception de vos accès par email</li>
              </ul>
            </div>
            <div className="pt-6">
              <Link href="/" className="text-teal-deep font-semibold hover:underline">
                Retour au site public
              </Link>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="mt-8 text-center text-sm text-anthracite-soft/60 border-t border-sage-light pt-6">
            Vous avez déjà un compte ? <br />
            <Link href="/portal/login" className="text-teal-deep font-semibold hover:underline">Connectez-vous ici</Link>
          </div>
        )}
      </div>
    </div>
  );
}
