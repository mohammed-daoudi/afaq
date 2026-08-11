import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';

const pillars = [
  {
    title: 'Références Homologuées',
    description: 'Toutes nos références sont systématiquement enregistrées auprès de la Direction du Médicament et de la Pharmacie (AMMPS) avant toute commercialisation.',
    icon: '📜',
    highlight: '20+ références',
  },
  {
    title: 'Exclusivité Territoriale',
    description: 'Nous détenons les droits exclusifs de représentation et de distribution sur l\'ensemble de nos territoires d\'implantation.',
    icon: '🌍',
    highlight: '9 pays',
  },
  {
    title: 'Fabrication Européenne',
    description: 'Nos laboratoires partenaires sont exclusivement basés en Europe et certifiés ISO 9001 et GMP pour garantir la plus haute qualité.',
    icon: '🇪🇺',
    highlight: '100% Européen',
  },
  {
    title: 'Conformité Réglementaire',
    description: 'Une maîtrise totale du cycle de vie du produit, de l\'importation à la distribution, dans le strict respect des réglementations locales.',
    icon: '🛡️',
    highlight: 'De bout en bout',
  },
  {
    title: 'Support Scientifique & Marketing',
    description: 'Un accompagnement quotidien des officines : formation continue, matériel de PLV, et conseil produit pour assurer le meilleur service au patient.',
    icon: '🤝',
    highlight: 'Accompagnement 360°',
  }
];

export default function PourquoiNousPage() {
  return (
    <div className="min-h-screen bg-ivory-soft pt-12 pb-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-6">
          <div className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-teal-deep bg-sage-light rounded-full uppercase">
            Nos Engagements
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-teal-deep">
            Pourquoi <span className="text-gold-soft">AFAQ Health ?</span>
          </h1>
          <p className="text-lg text-anthracite-soft/80 font-sans">
            L'excellence de la nutrition européenne, distribuée avec la plus grande rigueur réglementaire et commerciale.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-soft transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="text-4xl">{pillar.icon}</div>
                  <div className="bg-sage-light text-teal-deep text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {pillar.highlight}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-teal-deep mb-4">{pillar.title}</h3>
                <p className="text-anthracite-soft/80 leading-relaxed">
                  {pillar.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
