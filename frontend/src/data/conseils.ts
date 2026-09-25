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
    slug: 'magnesium-comment-choisir-bonne-formule',
    category: 'Nutrition',
    title: 'Magnésium : comment choisir la bonne formule ?',
    image: '/images/unsplash/formulations/formulation_3.jpg',
    date: '25 Septembre 2026',
    readTime: '4 min',
    intro: 'Fatigue, périodes de stress, activité intense ou rythme de vie soutenu peuvent amener certaines personnes à s’intéresser davantage à leurs apports en magnésium.',
    content: `
      <h2>Pourquoi le magnésium est-il important ?</h2>
      <p>Le magnésium participe à de nombreux processus physiologiques. Il contribue notamment au fonctionnement normal du système nerveux, à une fonction musculaire normale et à la réduction de la fatigue.</p>
      <p>Les besoins peuvent varier selon l’alimentation, le mode de vie et les périodes de vie.</p>
      <p>Une alimentation variée reste la première source de nutriments. Les aliments tels que les fruits à coque, les légumineuses et certaines céréales complètes constituent notamment des sources alimentaires de magnésium.</p>
      
      <img src="/images/unsplash/formulations/formulation_4.jpg" alt="Magnésium" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />
      
      <h2>Toutes les formules de magnésium se valent-elles ?</h2>
      <p>Pas nécessairement.</p>
      <p>Un complément peut contenir différentes formes de magnésium, avec des teneurs et des caractéristiques différentes.</p>
      <p>Il faut donc regarder la composition de manière plus précise :</p>
      <ul>
        <li>quelle forme de magnésium est utilisée ?</li>
        <li>quelle quantité de magnésium élément est réellement apportée ?</li>
        <li>quelle est la dose journalière recommandée ?</li>
        <li>d’autres nutriments sont-ils associés ?</li>
        <li>à quel besoin la formule est-elle destinée ?</li>
      </ul>
      <p>Cette lecture permet de comparer les produits autrement que sur le seul nombre de milligrammes affiché sur la boîte.</p>
      
      <h2>Pourquoi associer plusieurs nutriments ?</h2>
      <p>Certaines formules ne reposent pas uniquement sur le magnésium. Une association peut être pensée pour répondre à plusieurs dimensions d’un même besoin.</p>
      <p>C’est le choix fait par SOTYA avec son <strong>Bisglycinate de Magnésium</strong>, qui associe magnésium, zinc et vitamine D3.</p>

      <h2>La formule SOTYA</h2>
      <p>La formule apporte, pour <strong>3 gélules par jour</strong> :</p>
      <ul>
        <li><strong>Magnésium : 327 mg — 87 % VNR</strong></li>
        <li><strong>Zinc : 15 mg — 150 % VNR</strong></li>
        <li><strong>Vitamine D : 5 µg — 100 % VNR</strong></li>
      </ul>
      <p>Elle est positionnée autour de trois axes : <strong>Stress & fatigue</strong>, <strong>Détente & sommeil</strong>, <strong>Système nerveux</strong>.</p>
      
      <img src="/images/unsplash/formulations/plants_2.png" alt="Ingrédients" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />
      
      <h2>Comment choisir son magnésium ?</h2>
      <p>Avant de choisir, vérifiez principalement :</p>
      <p><strong>1. La forme du magnésium</strong><br/>La forme utilisée constitue un premier élément de comparaison.</p>
      <p><strong>2. La quantité de magnésium réellement apportée</strong><br/>Il faut regarder l’apport en magnésium et non uniquement le poids total du composé utilisé.</p>
      <p><strong>3. La dose journalière</strong><br/>Un produit fortement dosé mais nécessitant une prise très importante n’offre pas nécessairement la même simplicité d’utilisation qu’une formule pensée pour une prise quotidienne claire.</p>
      <p><strong>4. Les nutriments associés</strong><br/>Zinc, vitamine D ou vitamines du groupe B peuvent être associés selon l’objectif de la formule.</p>
      <p><strong>5. Le besoin recherché</strong><br/>Un complément destiné à accompagner la fatigue et le fonctionnement nerveux ne sera pas forcément formulé de la même manière qu’un produit destiné principalement au sport ou à la fonction musculaire.</p>
    `,
    takeaway: 'Ne regardez pas uniquement la quantité de magnésium annoncée : examinez sa forme, son apport réel, la dose journalière et les éventuels nutriments associés.'
  },
  {
    slug: 'sommeil-quelle-formule-melatonine-choisir',
    category: 'Bien-être',
    title: 'Sommeil : quelle formule de mélatonine choisir selon son besoin ?',
    image: '/images/unsplash/welness/rachel-mcdermott-mEKhOVkOcKE-unsplash.jpg',
    date: '20 Septembre 2026',
    readTime: '5 min',
    intro: 'Le sommeil n’est pas toujours perturbé de la même manière. Certaines personnes ont surtout du mal à s’endormir. D’autres recherchent davantage de relaxation avant la nuit.',
    content: `
      <h2>Quel est le rôle de la mélatonine ?</h2>
      <p>La mélatonine est une hormone naturellement produite par l’organisme, notamment en lien avec le cycle veille-sommeil. Elle est particulièrement connue pour son rôle dans la régulation du rythme veille-sommeil.</p>
      <p>Dans une formule alimentaire, il est donc intéressant de regarder non seulement la présence de mélatonine, mais également <strong>les autres ingrédients qui l’accompagnent</strong>.</p>
      <p>C’est là que deux formules SOTYA se différencient : <strong>Complexe de Mélatonine</strong> et <strong>Mélatonine — Plantes</strong>.</p>

      <img src="/images/unsplash/comp/capture_comp_2.png" alt="Sommeil" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>1. Complexe de Mélatonine</h2>
      <p>Cette formule associe :</p>
      <ul>
        <li><strong>Mélatonine : 1,8 mg</strong></li>
        <li><strong>Magnésium : 112,5 mg — 30 % VNR</strong></li>
        <li><strong>L-Tryptophane : 100 mg</strong></li>
        <li><strong>Vitamine B6 : 6 mg — 100 % VNR</strong></li>
      </ul>
      <p>La formule est positionnée autour de : <strong>Endormissement</strong>, <strong>Décalage horaire</strong>, <strong>Réduction de la fatigue</strong>.</p>
      <p>Elle constitue une approche particulièrement intéressante lorsque la problématique recherchée concerne principalement <strong>le moment de l’endormissement</strong>.</p>
      
      <h2>2. Mélatonine — Plantes</h2>
      <p>La deuxième formule associe la mélatonine à plusieurs extraits végétaux :</p>
      <ul>
        <li><strong>Mélisse : 400 mg</strong></li>
        <li><strong>Passiflore : 400 mg</strong></li>
        <li><strong>Tilleul : 200 mg</strong></li>
        <li><strong>Mélatonine : 1,8 mg</strong></li>
      </ul>
      <p>Les plantes sont apportées avec leurs composés caractéristiques, notamment l’acide rosmarinique et les flavonoïdes.</p>
      <p>Cette approche s’adresse davantage à une personne qui recherche une formule combinant <strong>mélatonine et plantes traditionnellement associées à la relaxation</strong>.</p>
      
      <img src="/images/unsplash/welness/laura-ohlman-sW6TRpgZLMw-unsplash.jpg" alt="Relaxation" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>Comment choisir entre les deux ?</h2>
      <p>Il ne s’agit pas de dire qu’une formule est meilleure que l’autre. La question est plutôt : <strong>quel est le besoin recherché ?</strong></p>
      <p>Si vous recherchez principalement une aide autour de l’endormissement, le <strong>Complexe de Mélatonine</strong> est idéal. Si vous recherchez une approche davantage orientée relaxation, <strong>Mélatonine — Plantes</strong> sera plus approprié.</p>
      <p>Cette distinction permet d’éviter de choisir un produit uniquement parce qu’il contient « de la mélatonine ».</p>
      
      <h2>Comment bien choisir un complément pour le sommeil ?</h2>
      <p>Avant de choisir, regardez : la quantité de mélatonine, les ingrédients associés, l’objectif de la formule, la dose journalière, la durée et les conditions d’utilisation.</p>
      <p>Un complément alimentaire ne remplace donc pas une bonne hygiène du sommeil.</p>
    `,
    takeaway: 'Deux produits contenant la même quantité de mélatonine peuvent avoir des profils très différents. Regardez l’ensemble de la formule et le besoin auquel elle répond.'
  },
  {
    slug: 'sante-masculine-comprendre-prostate',
    category: 'Bien-être',
    title: 'Santé masculine : comprendre la prostate et le confort urinaire',
    image: '/images/unsplash/welness/dane-wetton-zdLdgGbi9Ow-unsplash.jpg',
    date: '15 Septembre 2026',
    readTime: '6 min',
    intro: 'La santé de la prostate devient un sujet auquel de nombreux hommes accordent davantage d’attention avec l\'âge.',
    content: `
      <h2>Comprendre la prostate et le confort urinaire</h2>
      <p>La prostate est une petite glande de l'appareil reproducteur masculin située sous la vessie, autour de l'urètre. Avec l’âge, la santé de la prostate devient un sujet auquel de nombreux hommes accordent davantage d’attention.</p>
      <p>Certaines modifications peuvent notamment se traduire par un besoin d’uriner plus fréquemment, des réveils nocturnes ou une sensation de confort urinaire différente.</p>
      <p>Ces manifestations ne doivent toutefois pas être automatiquement attribuées à la prostate. Lorsqu’elles apparaissent, persistent ou changent, <strong>un avis médical reste important</strong>.</p>
      
      <img src="/images/unsplash/comp/Gemini_Generated_Image_3f5zd73f5zd73f5z.jpg" alt="Homme en bonne santé" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>Pourquoi plusieurs actifs dans les formules pour la prostate ?</h2>
      <p>Les formules destinées à la santé masculine peuvent associer plusieurs familles d’ingrédients : des extraits végétaux traditionnellement utilisés autour du confort urinaire, des micronutriments, des composés végétaux recherchés pour leur apport antioxydant.</p>
      <p>L’intérêt d’une formule multi-actifs est donc de proposer une approche globale plutôt que de reposer sur un seul ingrédient.</p>

      <h2>Les principaux ingrédients de Prostal</h2>
      <p>Prostal de SOTYA associe plusieurs extraits végétaux, du zinc et différents composés végétaux.</p>
      <ul>
        <li><strong>Saw palmetto :</strong> C’est l’un des ingrédients les plus connus des formules destinées au confort urinaire masculin.</li>
        <li><strong>Extrait de citrouille :</strong> Complète le saw palmetto à hauteur de 83 mg par gélule.</li>
        <li><strong>Zinc :</strong> Un micronutriment essentiel, apporté à 10 mg (100 % VNR), cofacteur associé au maintien d’un taux normal de testostérone.</li>
        <li><strong>Trèfle rouge :</strong> 83 mg d’extrait, apportant 6,6 mg d’isoflavones, pour l’équilibre hormonal masculin.</li>
        <li><strong>Thé vert, romarin, quercétine et lycopène :</strong> Apportent des polyphénols et composés antioxydants.</li>
      </ul>
      
      <h2>Comment choisir un complément destiné à la santé masculine ?</h2>
      <p>Avant de choisir une formule, plusieurs critères peuvent être examinés :</p>
      <p><strong>1. Identifier le besoin :</strong> Confort urinaire ? Complémentation nutritionnelle ? Approche globale ?</p>
      <p><strong>2. Regarder les actifs :</strong> Savoir lesquels sont réellement présents.</p>
      <p><strong>3. Vérifier les dosages :</strong> Les quantités apportées par la dose journalière sont essentielles.</p>
      <p><strong>4. Vérifier la simplicité de prise :</strong> Prostal se prend à raison de 1 gélule par jour (cure de 30 jours).</p>
      <p><strong>5. Ne pas remplacer le suivi médical :</strong> En cas de troubles urinaires persistants, il est important de consulter un professionnel de santé.</p>
    `,
    takeaway: 'Pour choisir un complément destiné à la santé masculine, ne vous arrêtez pas au nom d’un seul ingrédient. Regardez la formule dans son ensemble : les actifs, leurs dosages, les associations proposées et la simplicité de prise.'
  },
  {
    slug: 'cycle-feminin-comprendre-role-huile-onagre',
    category: 'Bien-être',
    title: 'Cycle féminin : comprendre le rôle de l’huile d’onagre',
    image: '/images/unsplash/beauty/beauty_3.jpg',
    date: '28 Septembre 2026',
    readTime: '4 min',
    intro: 'Certaines femmes recherchent une complémentation autour de l’équilibre féminin, notamment avant les règles ou lors de la période de ménopause.',
    content: `
      <h2>Qu’est-ce que l’huile d’onagre ?</h2>
      <p>L’huile d’onagre est une huile végétale naturellement riche en acides gras de la famille des oméga-6. Elle est notamment connue pour sa teneur en <strong>acide gamma-linolénique, ou GLA</strong>.</p>
      <p>C’est cette teneur en GLA qui constitue un élément important lorsqu’on compare différentes formules.</p>

      <img src="/images/unsplash/beauty/beauty_hands.png" alt="Huile d'onagre" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>Pourquoi le GLA compte-t-il ?</h2>
      <p>Deux produits peuvent afficher une quantité importante d’huile d’onagre tout en apportant des quantités différentes de GLA. Prenons un exemple simple :</p>
      <p><strong>2 000 mg d’huile d’onagre à 10 % de GLA = 200 mg de GLA.</strong></p>
      <p>C’est précisément le profil de la formule SOTYA. Lorsque vous comparez deux produits, il est donc préférable de regarder : <strong>la quantité totale d’huile → la concentration en GLA → la quantité réelle de GLA apportée par jour.</strong></p>
      
      <h2>Cycle féminin, syndrome prémenstruel et ménopause</h2>
      <p>Le cycle menstruel s’accompagne de variations hormonales qui peuvent influencer le confort ressenti au cours du mois. La période précédant les règles peut notamment être associée à différentes sensations chez certaines femmes.</p>
      <p>Plus tard, la périménopause puis la ménopause constituent une autre période de transition, au cours de laquelle les changements hormonaux peuvent modifier le confort général, le sommeil, l’humeur ou encore la perception de certains symptômes.</p>
      <p>L’huile d’onagre fait partie des ingrédients que certaines femmes recherchent dans une approche de complémentation autour de <strong>l’équilibre féminin</strong>.</p>
      <p>La formule SOTYA est positionnée autour de trois univers : <strong>Équilibre hormonal</strong>, <strong>Ménopause & syndrome prémenstruel</strong>, <strong>Peau & articulations</strong>.</p>
      
      <h2>Comment choisir une huile d’onagre ?</h2>
      <p>Avant de choisir, regardez plusieurs éléments :</p>
      <ul>
        <li><strong>1. La quantité d’huile d’onagre :</strong> C’est le premier chiffre que l’on retrouve généralement sur l’étiquette.</li>
        <li><strong>2. La concentration en GLA :</strong> Une huile d’onagre à 10 % de GLA ne présente pas le même apport qu’une huile moins concentrée.</li>
        <li><strong>3. La quantité réelle de GLA :</strong> C’est l’un des éléments les plus utiles pour comparer deux formules.</li>
        <li><strong>4. Les nutriments associés :</strong> Certaines formules associent l’huile d’onagre à d’autres nutriments, comme la vitamine E.</li>
        <li><strong>5. La dose journalière :</strong> La quantité réellement consommée chaque jour doit toujours être prise en compte dans la comparaison.</li>
      </ul>
      
      <img src="/images/unsplash/beauty/beauty_cream.png" alt="Beauté et équilibre" class="rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ease-out my-14 w-full object-cover max-h-[500px] cursor-pointer border-4 border-white/50" />

      <h2>La formule SOTYA</h2>
      <p>Pour la dose journalière recommandée de <strong>1 à 2 perles</strong> :</p>
      <ul>
        <li><strong>Huile d’onagre : 2 000 mg</strong></li>
        <li><strong>GLA : 200 mg</strong></li>
        <li><strong>Vitamine E : 10 mg — 83 % VNR</strong></li>
      </ul>
      <p>La vitamine E complète la formule.</p>

      <h2>À qui cette formule peut-elle s’adresser ?</h2>
      <p>Elle peut intéresser les femmes qui recherchent une complémentation à base d’huile d’onagre dans le cadre d’une approche autour de l’équilibre féminin, notamment pendant la période de ménopause ou en lien avec le syndrome prémenstruel.</p>
      <p>En cas de traitement, de situation particulière ou de doute sur l’utilisation d’un complément alimentaire, le conseil d’un professionnel de santé reste recommandé.</p>
    `,
    takeaway: 'Pour bien comprendre une formule, regardez surtout la concentration en GLA et la quantité réellement apportée par la dose journalière.'
  }
];
