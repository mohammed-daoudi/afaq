import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

const differentiators = [
  {
    title: 'Conformité Réglementaire',
    description: 'Chaque référence est enregistrée AMMPS avant commercialisation. Nous ne faisons aucun compromis sur la sécurité et la légalité de nos produits.',
    icon: '📋',
  },
  {
    title: 'Exclusivité Territoriale',
    description: 'Une présence garantie sur le Maroc et huit pays d\'Afrique de l\'Ouest francophone, assurant un développement commercial cohérent et protégé.',
    icon: '🌍',
  },
  {
    title: 'Partenaires Reconnus',
    description: 'Nous sélectionnons rigoureusement des laboratoires européens certifiés ISO 9001, garants d\'une qualité de production irréprochable.',
    icon: '🤝',
  },
  {
    title: 'Vision Multi-Pays',
    description: 'Une organisation pensée dès le départ pour l\'expansion régionale, adaptant notre stratégie aux spécificités de chaque marché local.',
    icon: '🚀',
  }
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Qui Sommes-Nous
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            L'Expertise <span className="text-gold-soft">AFAQ Health</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            Nous accompagnons des laboratoires européens dans leur implantation durable sur des marchés à fort potentiel, en Afrique de l'Ouest et au Maroc.
          </p>
        </div>

        {/* Mission & Expertise */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8 md:p-12 mb-20 border border-sage-light/50">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-teal-deep border-b-2 border-gold-soft pb-2 inline-block">Notre Mission</h2>
              <p className="text-anthracite-soft/80 leading-relaxed">
                Apporter des solutions de santé et de nutrition de haute qualité aux professionnels, en garantissant une traçabilité totale et un respect strict des normes réglementaires. Nous nous positionnons comme le pont de confiance entre l'excellence européenne et les besoins grandissants du marché ouest-africain.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-heading font-bold text-teal-deep border-b-2 border-gold-soft pb-2 inline-block">Notre Expertise</h2>
              <p className="text-anthracite-soft/80 leading-relaxed">
                Au-delà de la simple importation, AFAQ Health prend en charge l'ensemble de la chaîne de valeur : de la stratégie d'accès au marché et l'homologation AMMPS, jusqu'au développement commercial, la structuration des réseaux de distribution et l'accompagnement scientifique des officines.
              </p>
            </div>
          </div>
        </div>

        {/* Differentiators Grid */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-heading font-bold text-teal-deep text-center mb-12">Nos 4 Différenciateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {differentiators.map((item, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white flex flex-row items-start p-6 gap-6">
                <div className="text-4xl bg-sage-light p-4 rounded-2xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-teal-deep mb-2">{item.title}</h3>
                  <p className="text-anthracite-soft/80 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
