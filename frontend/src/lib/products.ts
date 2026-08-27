/**
 * Product data extracted from the official SOTYA Catalogue 2026
 * Organized into 4 therapeutic families with catalog-accurate colors
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: TherapeuticFamily;
  imagePath: string;
  labelImagePath?: string;
  description: string;
  benefits: string[];
  dosage: string;
  duration: string;
  format: string;
  certifications: string[];
}

export type TherapeuticFamily =
  | 'Stress · Sommeil · Énergie'
  | 'Immunité & Défenses'
  | 'Santé Spécifique'
  | 'Vitalité & Beauté';

export const FAMILY_COLORS: Record<TherapeuticFamily, { bg: string; text: string; accent: string; border: string }> = {
  'Stress · Sommeil · Énergie': {
    bg: 'bg-[#1a7fa8]/10',
    text: 'text-[#1a7fa8]',
    accent: '#1a7fa8',
    border: 'border-[#1a7fa8]/20',
  },
  'Immunité & Défenses': {
    bg: 'bg-[#2a8c5a]/10',
    text: 'text-[#2a8c5a]',
    accent: '#2a8c5a',
    border: 'border-[#2a8c5a]/20',
  },
  'Santé Spécifique': {
    bg: 'bg-[#d97b2a]/10',
    text: 'text-[#d97b2a]',
    accent: '#d97b2a',
    border: 'border-[#d97b2a]/20',
  },
  'Vitalité & Beauté': {
    bg: 'bg-[#c4447a]/10',
    text: 'text-[#c4447a]',
    accent: '#c4447a',
    border: 'border-[#c4447a]/20',
  },
};

export const FAMILY_DESCRIPTIONS: Record<TherapeuticFamily, string> = {
  'Stress · Sommeil · Énergie':
    'Formulations destinées à accompagner le stress, la fatigue physique et mentale, l\'endormissement et le bon fonctionnement nerveux et musculaire.',
  'Immunité & Défenses':
    'Vitamine C, cuivre et plantes en synergie pour soutenir les défenses naturelles, en particulier aux changements de saison.',
  'Santé Spécifique':
    'Des réponses ciblées sur un besoin précis : santé cardiovasculaire, confort urinaire masculin, équilibre féminin et confort digestif.',
  'Vitalité & Beauté':
    'Vitalité quotidienne et beauté de l\'intérieur : collagène, vitamines, minéraux et antioxydants pour la peau, les cheveux, les os et l\'énergie.',
};

export const FAMILY_COUNTS: Record<TherapeuticFamily, number> = {
  'Stress · Sommeil · Énergie': 5,
  'Immunité & Défenses': 2,
  'Santé Spécifique': 4,
  'Vitalité & Beauté': 3,
};

export const THERAPEUTIC_FAMILIES: TherapeuticFamily[] = [
  'Stress · Sommeil · Énergie',
  'Immunité & Défenses',
  'Santé Spécifique',
  'Vitalité & Beauté',
];

export const products: Product[] = [
  // ─── STRESS · SOMMEIL · ÉNERGIE (5 références) ────────────────────────
  {
    id: 'bisglycinate-magnesium',
    name: 'Bisglycinate de Magnésium',
    brand: 'SOTYA',
    category: 'Stress · Sommeil · Énergie',
    imagePath: '/images/products/magnesium.jpeg',
    description: 'Complément alimentaire à base de Magnésium, Zinc et Vitamine D3. Haute biodisponibilité.',
    benefits: ['Stress et fatigue', 'Détente et sommeil', 'Système nerveux'],
    dosage: '3 gélules par jour',
    duration: '33 jours',
    format: '100 gélules végétales de 750mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
  {
    id: 'complexe-vitamines-b',
    name: 'Complexe de Vitamines B',
    brand: 'SOTYA',
    category: 'Stress · Sommeil · Énergie',
    imagePath: '/images/products/vitamines B.jpeg',
    description: 'Complément alimentaire à base de 9 Vitamines B et Inositol.',
    benefits: ['Énergie et vitalité', 'Performances mentales'],
    dosage: '1 gélule par jour',
    duration: '60 jours',
    format: '60 gélules végétales de 620mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
  {
    id: 'complexe-melatonine',
    name: 'Complexe de Mélatonine',
    brand: 'SOTYA',
    category: 'Stress · Sommeil · Énergie',
    imagePath: '/images/products/melatonine.jpeg',
    description: 'Complément alimentaire à base de Mélatonine, L-Tryptophane, Magnésium et Vitamine B6.',
    benefits: ['Endormissement rapide', 'Détente mentale', 'Décalage horaire'],
    dosage: '2 gélules par jour',
    duration: '30 jours',
    format: '60 gélules végétales de 550mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
  {
    id: 'melatonine',
    name: 'Mélatonine',
    brand: 'SOTYA',
    category: 'Stress · Sommeil · Énergie',
    imagePath: '/images/products/melatonine.jpeg',
    description: 'Complément alimentaire à base de Mélatonine, Extrait de Mélisse, Extrait de Passiflore et Extrait de Tilleul.',
    benefits: ['Relaxation et sommeil naturel', 'Réduction de la fatigue'],
    dosage: '2 gélules par jour',
    duration: '30 jours',
    format: '60 gélules végétales de 650mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    brand: 'SOTYA',
    category: 'Stress · Sommeil · Énergie',
    imagePath: '/images/products/ashwaganda.jpeg',
    description: 'Complément alimentaire à base d\'Extrait d\'Ashwagandha, Zinc et Vitamine C.',
    benefits: ['Relaxation et bien-être', 'Défenses naturelles'],
    dosage: '1 gélule par jour',
    duration: '60 jours',
    format: '60 gélules végétales de 570mg',
    certifications: ['Vegan', 'Sans gluten'],
  },

  // ─── IMMUNITÉ & DÉFENSES (2 références) ──────────────────────────────
  {
    id: 'complexe-vitamine-c',
    name: 'Complexe de Vitamine C',
    brand: 'SOTYA',
    category: 'Immunité & Défenses',
    imagePath: '/images/products/vitamine c.jpeg',
    description: 'Complément alimentaire à base de Vitamine C, Bioflavonoïdes et Acérola.',
    benefits: ['Anti-fatigue', 'Défenses naturelles', 'Énergie et vitalité', 'Circulation veineuse'],
    dosage: '1 comprimé par jour',
    duration: '90 jours',
    format: '90 comprimés de 1g',
    certifications: ['Sans gluten'],
  },
  {
    id: 'complexe-propolis-forte',
    name: 'Complexe de Propolis Forte',
    brand: 'SOTYA',
    category: 'Immunité & Défenses',
    imagePath: '/images/products/propolis.jpeg',
    description: 'Complément alimentaire à base d\'Extrait de propolis, Extrait de thym, Extrait d\'échinacée et Vitamine C. À croquer.',
    benefits: ['Défenses naturelles', 'Voies respiratoires', 'Confort respiratoire'],
    dosage: '4 comprimés par jour',
    duration: '25 jours',
    format: '100 comprimés de 800mg',
    certifications: ['Sans gluten'],
  },

  // ─── SANTÉ SPÉCIFIQUE (4 références) ──────────────────────────────────
  {
    id: 'complexe-omega-369',
    name: 'Complexe d\'Oméga 3, 6, 9',
    brand: 'SOTYA',
    category: 'Santé Spécifique',
    imagePath: '/images/products/omega.jpeg',
    description: 'Complément alimentaire à base de Huile de poisson, Huile de lin, Huile d\'onagre et Vitamine E.',
    benefits: ['Santé cardiovasculaire', 'Cholestérol équilibré', 'Peau et articulations'],
    dosage: '3 perles par jour',
    duration: '16 jours',
    format: '50 perles de 1400mg',
    certifications: ['Sans gluten'],
  },
  {
    id: 'prostal',
    name: 'Prostal',
    brand: 'SOTYA',
    category: 'Santé Spécifique',
    imagePath: '/images/products/prostal.jpeg',
    description: 'Complément alimentaire à base d\'Extraits de citrouille, trèfle rouge, saw palmetto, thé vert, romarin, lycopène et zinc. Contient de la caféine.',
    benefits: ['Confort urinaire masculin', 'Santé prostatique'],
    dosage: '1 gélule par jour',
    duration: '30 jours',
    format: '30 gélules végétales de 650mg',
    certifications: [],
  },
  {
    id: 'huile-onagre',
    name: 'Huile d\'Onagre',
    brand: 'SOTYA',
    category: 'Santé Spécifique',
    imagePath: '/images/products/onagre.jpeg',
    labelImagePath: '/tsawrsotya/onagre_label_3d.png',
    description: 'Complément alimentaire à base de Huile d\'Onagre, Acide gamma Linolénique et Vitamine E. 10% GLA (Oméga 6).',
    benefits: ['Équilibre hormonal prénatal', 'Santé gynécologique', 'Peau et articulations'],
    dosage: '1 à 2 perles par jour',
    duration: '25 jours',
    format: '50 perles de 1405mg',
    certifications: ['Sans gluten'],
  },
  {
    id: 'charbon-actif-probiotiques',
    name: 'Charbon Actif avec Probiotiques',
    brand: 'SOTYA',
    category: 'Santé Spécifique',
    imagePath: '/images/products/charbon.jpeg',
    description: 'Complément alimentaire à base de Charbon de bois, probiotiques, prébiotiques et extraits de plantes.',
    benefits: ['Santé gastro-intestinale', 'Flore digestive', 'Bien-être digestif'],
    dosage: '6 gélules par jour',
    duration: '15 jours',
    format: '90 gélules végétales de 550mg',
    certifications: ['Vegan', 'Sans gluten'],
  },

  // ─── VITALITÉ & BEAUTÉ (3 références) ─────────────────────────────────
  {
    id: 'collagene',
    name: 'Collagène',
    brand: 'SOTYA',
    category: 'Vitalité & Beauté',
    imagePath: '/images/products/collagene.jpeg',
    description: 'Complément alimentaire à base de Collagène hydrolysé, Silicium, Magnésium marin et Vitamines D3 et C.',
    benefits: ['Renforcement des cheveux', 'Élasticité de la peau', 'Os et articulations', 'Renouvellement des tissus'],
    dosage: '4 comprimés par jour',
    duration: '22 jours',
    format: '90 comprimés de 1,3g',
    certifications: ['Sans gluten'],
  },
  {
    id: 'peau-cheveux-ongles',
    name: 'Peau, Cheveux et Ongles',
    brand: 'SOTYA',
    category: 'Vitalité & Beauté',
    imagePath: '/images/products/peau.jpeg',
    description: 'Complément alimentaire à base de Levure de bière, Extraits de plantes, Collagène, Taurine, Vitamines et Minéraux.',
    benefits: ['Croissance des cheveux', 'Élasticité de la peau', 'Ongles forts'],
    dosage: '2 gélules par jour',
    duration: '30 jours',
    format: '60 gélules de 522mg',
    certifications: ['Sans gluten'],
  },
  {
    id: 'multivitamines-mineraux',
    name: 'Multivitamines & Minéraux',
    brand: 'SOTYA',
    category: 'Vitalité & Beauté',
    imagePath: '/images/products/multivitamines.jpeg',
    description: 'Complément alimentaire à base de Vitamines et Minéraux avec Lutéine, Q10 et Lycopène.',
    benefits: ['Santé générale et énergie', 'Santé oculaire', 'Santé cardiaque'],
    dosage: '1 gélule par jour',
    duration: '60 jours',
    format: '60 gélules végétales de 820mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
];
