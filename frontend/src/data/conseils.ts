export const CATEGORIES = [
  'Toutes',
  'Nutrition',
  'Bien-être',
  'Enfants',
  'Beauté',
  'Compléments alimentaires',
  'Actualités AFAQ'
];

export const MOCK_ARTICLES = [
  {
    slug: 'pourquoi-se-supplementer-en-magnesium',
    category: 'Nutrition',
    title: 'Pourquoi se supplémenter en Magnésium au changement de saison ?',
    image: '/images/unsplash/formulations/formulation_3.jpg',
    date: '12 Septembre 2026',
    readTime: '4 min',
    intro: 'Fatigue, stress, crampes... Le magnésium est essentiel à notre organisme. Découvrez pourquoi une supplémentation peut s\'avérer bénéfique et comment bien choisir son magnésium.',
    content: `
      <h2>Le rôle fondamental du magnésium</h2>
      <p>Le magnésium participe à plus de 300 réactions métaboliques dans notre corps. Il est notamment indispensable à la production d'énergie, au fonctionnement du système nerveux et à la fonction musculaire.</p>
      
      <img src="/images/unsplash/formulations/formulation_4.jpg" alt="Laboratoire" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />
      
      <h2>Pourquoi en manquons-nous ?</h2>
      <p>L'alimentation moderne, souvent raffinée, est moins riche en magnésium. De plus, le stress, l'activité physique intense ou encore certains régimes peuvent augmenter nos pertes en magnésium.</p>
      
      <img src="/images/unsplash/formulations/plants_2.png" alt="Plantes" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>Les signes d'un déficit</h2>
      <p>Une fatigue persistante, des tressautements de la paupière, des crampes nocturnes ou une irritabilité anormale peuvent être les signes évocateurs d'un besoin accru en magnésium.</p>
    `,
    takeaway: 'Privilégiez les sels de magnésium hautement assimilables (comme le bisglycinate) pour une meilleure tolérance digestive et une efficacité optimisée.'
  },
  {
    slug: 'les-besoins-nutritionnels-des-enfants',
    category: 'Enfants',
    title: 'Les besoins nutritionnels spécifiques des enfants en pleine croissance',
    image: '/images/unsplash/babies/baby_3.jpg',
    date: '05 Septembre 2026',
    readTime: '6 min',
    intro: 'La croissance des enfants demande des apports ciblés en vitamines et minéraux. Tour d\'horizon des nutriments clés pour leur développement osseux, cognitif et immunitaire.',
    content: `
      <h2>Une période de construction intense</h2>
      <p>De la petite enfance à l'adolescence, le corps se développe à une vitesse spectaculaire. Ce développement nécessite des "briques de construction" spécifiques apportées par l'alimentation.</p>
      
      <img src="/images/unsplash/babies/baby_2.jpg" alt="Enfant qui dort" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>Les nutriments indispensables</h2>
      <ul>
        <li><strong>La Vitamine D :</strong> Essentielle pour fixer le calcium sur les os.</li>
        <li><strong>Le Fer :</strong> Crucial pour le développement cognitif et la réduction de la fatigue.</li>
        <li><strong>Les Oméga-3 (DHA) :</strong> Importants pour le fonctionnement normal du cerveau.</li>
      </ul>
      
      <img src="/images/unsplash/babies/baby_floatie.png" alt="Bébé avec bouée" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>L'importance d'une alimentation variée</h2>
      <p>Une assiette équilibrée et colorée est la première source de vitamines. Cependant, dans certains contextes (périodes hivernales, croissance rapide, enfants petits mangeurs), un complément adapté peut être envisagé.</p>
    `,
    takeaway: 'Les compléments alimentaires pour enfants doivent toujours être formulés selon des dosages stricts et adaptés à leur âge.'
  },
  {
    slug: 'comprendre-le-collagene',
    category: 'Beauté',
    title: 'Comprendre le collagène : bien-être articulaire et beauté de la peau',
    image: '/images/unsplash/beauty/beauty_3.jpg',
    date: '28 Août 2026',
    readTime: '5 min',
    intro: 'Protéine structurelle majeure, le collagène diminue naturellement avec l\'âge. Quels sont ses véritables bénéfices en supplémentation pour la peau et les articulations ?',
    content: `
      <h2>Qu'est-ce que le collagène ?</h2>
      <p>Le collagène est la protéine la plus abondante du corps humain. Il forme la structure de notre peau, de nos os, de nos tendons et de nos cartilages, leur conférant résistance et élasticité.</p>
      
      <img src="/images/unsplash/beauty/beauty_cream.png" alt="Application crème beauté" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>La baisse naturelle liée à l'âge</h2>
      <p>Dès l'âge de 25 ans, la synthèse naturelle de collagène commence à diminuer, ce qui se traduit progressivement par l'apparition de rides et une perte de souplesse articulaire.</p>
      
      <img src="/images/unsplash/beauty/beauty_hands.png" alt="Soins beauté des mains" class="rounded-3xl shadow-md my-10 w-full object-cover max-h-[400px]" />

      <h2>Les bienfaits de la supplémentation</h2>
      <p>Des études suggèrent que la prise de peptides de collagène (une forme hydrolysée pour une meilleure absorption) peut contribuer à maintenir l'élasticité de la peau et le confort articulaire au quotidien.</p>
    `,
    takeaway: 'Pour une efficacité optimale, le collagène est souvent associé à la Vitamine C, qui contribue à sa formation normale dans l\'organisme.'
  }
];
