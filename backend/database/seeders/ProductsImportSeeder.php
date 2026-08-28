<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use App\Models\Product;

class ProductsImportSeeder extends Seeder
{
    public function run()
    {
        $brand = Brand::firstOrCreate(
            ['name' => 'SOTYA'],
            [
                'origin' => 'Spain',
                'description' => 'Certifiées AMMPS, GMP, EU et ISO.',
                'storytelling' => 'Le naturel au service de votre bien-être au quotidien.'
            ]
        );

        $products = [
            [
                'category' => 'Stress · Sommeil · Énergie',
                'photo' => '/images/products/magnesium.jpeg',
                'label' => 'Bisglycinate de Magnésium',
                'composition' => '100 gélules végétales de 750mg',
                'benefits' => 'Système nerveux, Énergie, Réduction de la fatigue',
                'description' => 'Complément alimentaire à base de Magnésium (Bisglycinate) pour une absorption optimale.',
            ],
            [
                'category' => 'Stress · Sommeil · Énergie',
                'photo' => '/images/products/vitamines B.jpeg',
                'label' => 'Complexe de Vitamines B',
                'composition' => '60 gélules végétales de 620mg',
                'benefits' => 'Énergie, Système nerveux, Fonctions psychologiques',
                'description' => 'Complément alimentaire à base de Vitamines B (B1, B2, B3, B5, B6, B8, B9, B12).',
            ],
            [
                'category' => 'Stress · Sommeil · Énergie',
                'photo' => '/images/products/melatonine.jpeg',
                'label' => 'Complexe de Mélatonine',
                'composition' => '60 gélules végétales de 550mg',
                'benefits' => 'Endormissement rapide, Détente mentale, Décalage horaire',
                'description' => 'Complément alimentaire à base de Mélatonine, L-Tryptophane, Magnésium et Vitamine B6.',
            ],
            [
                'category' => 'Stress · Sommeil · Énergie',
                'photo' => '/images/products/melatonine.jpeg',
                'label' => 'Mélatonine',
                'composition' => '60 gélules végétales de 650mg',
                'benefits' => 'Relaxation et sommeil naturel, Réduction de la fatigue',
                'description' => 'Complément alimentaire à base de Mélatonine, Extrait de Mélisse, Extrait de Passiflore et Extrait de Tilleul.',
            ],
            [
                'category' => 'Stress · Sommeil · Énergie',
                'photo' => '/images/products/ashwaganda.jpeg',
                'label' => 'Ashwagandha',
                'composition' => '60 gélules végétales de 570mg',
                'benefits' => 'Relaxation et bien-être, Défenses naturelles',
                'description' => 'Complément alimentaire à base d\'Extrait d\'Ashwagandha, Zinc et Vitamine C.',
            ],
            [
                'category' => 'Immunité & Défenses',
                'photo' => '/images/products/vitamine c.jpeg',
                'label' => 'Complexe de Vitamine C',
                'composition' => '90 comprimés de 1g',
                'benefits' => 'Anti-fatigue, Défenses naturelles, Énergie et vitalité, Circulation veineuse',
                'description' => 'Complément alimentaire à base de Vitamine C, Bioflavonoïdes et Acérola.',
            ],
            [
                'category' => 'Immunité & Défenses',
                'photo' => '/images/products/propolis.jpeg',
                'label' => 'Complexe de Propolis Forte',
                'composition' => '100 comprimés de 800mg',
                'benefits' => 'Défenses naturelles, Voies respiratoires, Confort respiratoire',
                'description' => 'Complément alimentaire à base d\'Extrait de propolis, Extrait de thym, Extrait d\'échinacée et Vitamine C. À croquer.',
            ],
            [
                'category' => 'Santé Spécifique',
                'photo' => '/images/products/omega.jpeg',
                'label' => 'Complexe d\'Oméga 3, 6, 9',
                'composition' => '50 perles de 1400mg',
                'benefits' => 'Santé cardiovasculaire, Cholestérol équilibré, Peau et articulations',
                'description' => 'Complément alimentaire à base de Huile de poisson, Huile de lin, Huile d\'onagre et Vitamine E.',
            ],
            [
                'category' => 'Santé Spécifique',
                'photo' => '/images/products/prostal.jpeg',
                'label' => 'Prostal',
                'composition' => '30 gélules végétales de 650mg',
                'benefits' => 'Confort urinaire masculin, Santé prostatique',
                'description' => 'Complément alimentaire à base d\'Extraits de citrouille, trèfle rouge, saw palmetto, thé vert, romarin, lycopène et zinc.',
            ],
            [
                'category' => 'Santé Spécifique',
                'photo' => '/images/products/onagre.jpeg',
                'label' => 'Huile d\'Onagre',
                'composition' => '50 perles de 1405mg',
                'benefits' => 'Équilibre hormonal prénatal, Santé gynécologique, Peau et articulations',
                'description' => 'Complément alimentaire à base de Huile d\'Onagre, Acide gamma Linolénique et Vitamine E. 10% GLA (Oméga 6).',
            ],
            [
                'category' => 'Santé Spécifique',
                'photo' => '/images/products/charbon.jpeg',
                'label' => 'Charbon Actif avec Probiotiques',
                'composition' => '90 gélules végétales de 550mg',
                'benefits' => 'Santé gastro-intestinale, Flore digestive, Bien-être digestif',
                'description' => 'Complément alimentaire à base de Charbon de bois, probiotiques, prébiotiques et extraits de plantes.',
            ],
            [
                'category' => 'Vitalité & Beauté',
                'photo' => '/images/products/collagene.jpeg',
                'label' => 'Collagène',
                'composition' => '90 comprimés de 1,3g',
                'benefits' => 'Renforcement des cheveux, Élasticité de la peau, Os et articulations',
                'description' => 'Complément alimentaire à base de Collagène hydrolysé, Silicium, Magnésium marin et Vitamines D3 et C.',
            ],
            [
                'category' => 'Vitalité & Beauté',
                'photo' => '/images/products/peau.jpeg',
                'label' => 'Peau, Cheveux et Ongles',
                'composition' => '60 gélules de 522mg',
                'benefits' => 'Croissance des cheveux, Élasticité de la peau, Ongles forts',
                'description' => 'Complément alimentaire à base de Levure de bière, Extraits de plantes, Collagène, Taurine, Vitamines et Minéraux.',
            ],
            [
                'category' => 'Vitalité & Beauté',
                'photo' => '/images/products/multivitamines.jpeg',
                'label' => 'Multivitamines & Minéraux',
                'composition' => '60 gélules végétales de 820mg',
                'benefits' => 'Santé générale et énergie, Santé oculaire, Santé cardiaque',
                'description' => 'Complément alimentaire à base de Vitamines et Minéraux avec Lutéine, Q10 et Lycopène.',
            ]
        ];

        foreach ($products as $product) {
            Product::create(array_merge($product, ['brand_id' => $brand->id]));
        }
    }
}
