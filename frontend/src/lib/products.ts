/**
 * Product data extracted from the official SOTYA Catalogue 2026
 * Organized into Universes / Needs and Brands
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  categories: string[];
  imagePath: string;
  labelImagePath?: string;
  description: string;
  benefits: string[];
  dosage: string;
  duration: string;
  format: string;
  certifications: string[];
}

export const PRODUCT_CATEGORIES = [
  'Énergie & Vitalité',
  'Stress & Sommeil',
  'Immunité & Défenses',
  'Beauté',
  'Articulations & Mobilité',
  'Nutrition pédiatrique',
  'Santé Spécifique'
];

export const PRODUCT_BRANDS = [
  'SOTYA',
  'NATURAMINS KIDS',
  'COLAGENOVA'
];

export const products: Product[] = [
  // ─── SOTYA ────────────────────────
  {
    id: 'bisglycinate-magnesium',
    name: 'Bisglycinate de Magnésium',
    brand: 'SOTYA',
    categories: ['Stress & Sommeil', 'Énergie & Vitalité'],
    imagePath: '/images/products/magnesium.jpeg',
    labelImagePath: '/images/labels/bisglycinate-magnesium.png',
    description: 'Complément alimentaire à base de Magnésium, Zinc et Vitamine D3.',
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
    categories: ['Énergie & Vitalité'],
    imagePath: '/images/products/vitamines B.jpeg',
    labelImagePath: '/images/labels/complexe-vitamines-b.png',
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
    categories: ['Stress & Sommeil'],
    imagePath: '/images/products/melatonine.jpeg',
    labelImagePath: '/images/labels/complexe-melatonine.png',
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
    categories: ['Stress & Sommeil'],
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
    categories: ['Stress & Sommeil'],
    imagePath: '/images/products/ashwaganda.jpeg',
    labelImagePath: '/images/labels/ashwagandha.png',
    description: 'Complément alimentaire à base d\'Extrait d\'Ashwagandha, Zinc et Vitamine C.',
    benefits: ['Relaxation et bien-être', 'Défenses naturelles'],
    dosage: '1 gélule par jour',
    duration: '60 jours',
    format: '60 gélules végétales de 570mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
  {
    id: 'complexe-vitamine-c',
    name: 'Complexe de Vitamine C',
    brand: 'SOTYA',
    categories: ['Immunité & Défenses', 'Énergie & Vitalité'],
    imagePath: '/images/products/vitamine c.jpeg',
    labelImagePath: '/images/labels/complexe-vitamine-c.png',
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
    categories: ['Immunité & Défenses'],
    imagePath: '/images/products/propolis.jpeg',
    labelImagePath: '/images/labels/complexe-propolis-forte.png',
    description: 'Complément alimentaire à base d\'Extrait de propolis, Extrait de thym, Extrait d\'échinacée et Vitamine C. À croquer.',
    benefits: ['Défenses naturelles', 'Voies respiratoires', 'Confort respiratoire'],
    dosage: '4 comprimés par jour',
    duration: '25 jours',
    format: '100 comprimés de 800mg',
    certifications: ['Sans gluten'],
  },
  {
    id: 'complexe-omega-369',
    name: 'Complexe d\'Oméga 3, 6, 9',
    brand: 'SOTYA',
    categories: ['Beauté', 'Articulations & Mobilité', 'Santé Spécifique'],
    imagePath: '/images/products/omegaa.jpeg',
    labelImagePath: '/images/labels/complexe-omega-369.png',
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
    categories: ['Santé Spécifique'],
    imagePath: '/images/products/prostal.jpeg',
    labelImagePath: '/images/labels/prostal.png',
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
    categories: ['Beauté', 'Santé Spécifique'],
    imagePath: '/images/products/onagre.jpeg',
    labelImagePath: '/images/labels/huile-onagre.png',
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
    categories: ['Santé Spécifique'],
    imagePath: '/images/products/charbon.jpeg',
    labelImagePath: '/images/labels/charbon-actif-probiotiques.png',
    description: 'Complément alimentaire à base de Charbon de bois, probiotiques, prébiotiques et extraits de plantes.',
    benefits: ['Santé gastro-intestinale', 'Flore digestive', 'Bien-être digestif'],
    dosage: '6 gélules par jour',
    duration: '15 jours',
    format: '90 gélules végétales de 550mg',
    certifications: ['Vegan', 'Sans gluten'],
  },
  {
    id: 'collagene',
    name: 'Collagène',
    brand: 'SOTYA',
    categories: ['Beauté', 'Articulations & Mobilité'],
    imagePath: '/images/products/collagene.jpeg',
    labelImagePath: '/images/labels/collagene.png',
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
    categories: ['Beauté'],
    imagePath: '/images/products/peau.jpeg',
    labelImagePath: '/images/labels/peau-cheveux-ongles.png',
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
    categories: ['Énergie & Vitalité'],
    imagePath: '/images/products/multivitamines.jpeg',
    labelImagePath: '/images/labels/multivitamines-mineraux.png',
    description: 'Complément alimentaire à base de Vitamines et Minéraux avec Lutéine, Q10 et Lycopène.',
    benefits: ['Santé générale et énergie', 'Santé oculaire', 'Santé cardiaque'],
    dosage: '1 gélule par jour',
    duration: '60 jours',
    format: '60 gélules végétales de 820mg',
    certifications: ['Vegan', 'Sans gluten'],
  },

  // ─── NATURAMINS KIDS ────────────────────────
  {
    id: 'naturamins-kids-multi',
    name: 'Multivitamines Gummies',
    brand: 'NATURAMINS KIDS',
    categories: ['Nutrition pédiatrique', 'Immunité & Défenses'],
    imagePath: '/images/unsplash/comp/Gemini_Generated_Image_1tkniv1tkniv1tkn.jfif', // placeholder
    description: 'Complément alimentaire à base de 11 vitamines, zinc et iode. Forme gomme.',
    benefits: ['Défenses naturelles', 'Croissance saine', 'Énergie'],
    dosage: '2 gommes par jour',
    duration: '30 jours',
    format: '60 gommes fruitées',
    certifications: ['Sans gluten', 'Sans sucres ajoutés'],
  },

  // ─── COLAGENOVA ────────────────────────
  {
    id: 'colagenova-marine',
    name: 'Marine Beauty',
    brand: 'COLAGENOVA',
    categories: ['Beauté', 'Articulations & Mobilité'],
    imagePath: '/images/unsplash/welness/capture_welness_2.png', // placeholder
    description: 'Complément alimentaire à base de Peptides de collagène marin pur, Acide hyaluronique et Vitamine C.',
    benefits: ['Hydratation de la peau', 'Réduction des rides', 'Souplesse articulaire'],
    dosage: '2 dosettes par jour',
    duration: '21 jours',
    format: 'Poudre 275g (Saveur Vanille)',
    certifications: ['Sans gluten', 'Arômes naturels'],
  },
];
