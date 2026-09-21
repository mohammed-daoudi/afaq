<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductDescriptionsSeeder extends Seeder
{
    public function run()
    {
        $updates = [
            'Bisglycinate de Magnésium' => 'Une formule associant le magnésium bisglycinate, le zinc et la vitamine D. Le magnésium contribue à réduire la fatigue et au fonctionnement normal des muscles. La vitamine D contribue au maintien d\'une ossature normale, tandis que le zinc participe au fonctionnement normal du système immunitaire.',
            'Complexe de Vitamines B'   => 'Une formule complète regroupant les vitamines du groupe B, la choline et l\'inositol, à raison d\'une capsule par jour. Les vitamines B2, B3, B5, B6 et B12 contribuent à réduire la fatigue. Les vitamines B1, B6 et B12 participent au fonctionnement normal du système nerveux.',
            'Complexe de Mélatonine'    => 'Une formule destinée à la routine du soir, associant la mélatonine, le magnésium, le L-tryptophane et la vitamine B6. La mélatonine contribue à réduire le temps nécessaire à l\'endormissement. La vitamine B6 contribue au fonctionnement normal du système nerveux et le magnésium aide à réduire la fatigue.',
            'Mélatonine'                => 'Une formule associant la mélatonine à des extraits de mélisse, de passiflore et de tilleul. La mélatonine contribue à atténuer la sensation subjective de décalage horaire.',
            'Ashwagandha'               => 'Une formule à base d\'ashwagandha (Withania somnifera), une plante traditionnellement utilisée dans la médecine ayurvédique, associée à la vitamine C et au zinc. La vitamine C contribue au fonctionnement normal du système nerveux et à la réduction de la fatigue. Le zinc contribue au fonctionnement normal du système immunitaire.',
            'Complexe de Vitamine C'    => 'Une formule à prendre à raison d\'un comprimé par jour, associant la vitamine C, l\'acérola, l\'églantier et les flavonoïdes d\'agrumes. La vitamine C contribue au fonctionnement normal du système immunitaire et à la réduction de la fatigue.',
            'Complexe de Propolis Forte' => 'Un comprimé à croquer associant la propolis, le miel, le citron, le thym, l\'échinacée et la vitamine C. Une formule pratique, notamment lors des changements de saison.',
            'Oméga 3, 6, 9'            => 'Une formule associant plusieurs acides gras essentiels et insaturés. Les oméga-3 proviennent notamment de l\'huile de poisson — EPA et DHA — ainsi que de l\'huile de lin — ALA. Les oméga-6 sont issus de l\'huile d\'onagre et de l\'huile de lin, tandis que les oméga-9 complètent la formule. Les huiles de lin et d\'onagre sont pressées à froid.',
            'Prostal'                   => 'Une formule destinée aux hommes, à raison d\'une capsule par jour. Elle associe le palmier nain, les graines de courge, le trèfle rouge, le thé vert et le romarin, avec du zinc, du lycopène et de la quercétine. Le zinc contribue au maintien d\'un taux normal de testostérone dans le sang.',
            'Huile d\'Onagre'           => 'Une huile obtenue par pression des graines d\'onagre, naturellement riche en GLA — acide gamma-linolénique — et en oméga-6. Chaque capsule contient également de la vitamine E, qui contribue à protéger les cellules contre le stress oxydatif.',
            'Charbon Actif avec Probiotiques' => 'Une formule dédiée au confort digestif, associant du charbon végétal activé, trois souches de probiotiques, des FOS, de l\'anis étoilé et du fenouil.',
            'Collagène'                 => 'Une formule à base de collagène hydrolysé, de silicium organique, de magnésium et de vitamines C et D. La vitamine C contribue à la formation normale du collagène pour assurer le fonctionnement normal des os, du cartilage et de la peau. La vitamine D contribue au maintien d\'une ossature normale. Le magnésium contribue au fonctionnement normal des muscles.',
            'Peau, Cheveux et Ongles'   => 'Une formule associant la levure de bière, la prêle, le collagène hydrolysé, la taurine, des vitamines et des minéraux. La biotine et le zinc contribuent au maintien d\'une peau et de cheveux normaux. Le zinc et le sélénium contribuent au maintien d\'ongles normaux.',
            'Multivitamines'            => 'Une formule complète à raison d\'une capsule par jour, associant des vitamines et des minéraux à la lutéine, au coenzyme Q10 et au lycopène. Les vitamines B2, B3, B5 et C, ainsi que le fer et le magnésium, contribuent à réduire la fatigue.',
        ];

        foreach ($updates as $label => $description) {
            $updated = Product::where('label', 'like', "%{$label}%")
                ->update(['description' => $description]);
            $this->command->info("Updated '{$label}': {$updated} row(s)");
        }

        $this->command->info('All product descriptions updated successfully!');
    }
}
