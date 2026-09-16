import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-heading font-bold text-teal-deep">Validation de Commande</h1>
          <p className="text-anthracite-soft/60 mt-1">Veuillez vérifier les informations avant de valider.</p>
        </div>
      </div>

      {/* Checkout Workflow Steps */}
      <div className="flex items-center justify-between mb-8">
        {['Panier', 'Validation', 'Paiement', 'Confirmation'].map((step, idx) => (
          <div key={idx} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 1 ? 'bg-teal-deep text-white' : 'bg-sage-light text-teal-deep/50'}`}>
              {idx + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${idx === 1 ? 'text-teal-deep' : 'text-anthracite-soft/50'}`}>{step}</span>
            {idx < 3 && <div className="w-12 h-1 mx-4 bg-sage-light"></div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adresse de Livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-teal-deep rounded-lg bg-teal-deep/5">
                <p className="font-bold text-teal-deep">Pharmacie Centrale</p>
                <p className="text-sm text-anthracite-soft/80 mt-1">123 Avenue Mohammed V</p>
                <p className="text-sm text-anthracite-soft/80">Kénitra, 14000</p>
                <p className="text-sm text-anthracite-soft/80">Maroc</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Méthode de Paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-sage-light rounded-lg cursor-pointer hover:bg-sage-light/30">
                  <input type="radio" name="payment" defaultChecked className="text-teal-deep focus:ring-teal-deep" />
                  <span className="font-medium">Paiement à terme (30 jours)</span>
                </label>
                <label className="flex items-center gap-3 p-4 border border-sage-light rounded-lg cursor-pointer hover:bg-sage-light/30">
                  <input type="radio" name="payment" className="text-teal-deep focus:ring-teal-deep" />
                  <span className="font-medium">Virement bancaire immédiat</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-anthracite-soft/80">Sous-total HT</span>
                <span className="font-medium">1 250,00 MAD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-anthracite-soft/80">Frais de port</span>
                <span className="font-medium text-green-600">Gratuit</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-anthracite-soft/80">TVA (20%)</span>
                <span className="font-medium">250,00 MAD</span>
              </div>
              <div className="border-t border-sage-light pt-4 mt-4 flex justify-between">
                <span className="font-bold text-teal-deep">Total TTC</span>
                <span className="font-bold text-teal-deep text-lg">1 500,00 MAD</span>
              </div>
              
              <Button variant="primary" className="w-full mt-6">
                Confirmer la commande
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
