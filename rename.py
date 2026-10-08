import os

dir_path = "frontend/public/images/labels"

mapping = {
    "ASHWAGANDHA.png": "ashwagandha.png",
    "BISGLYCINATE DE MAGNÉSIUM.png": "bisglycinate-magnesium.png",
    "CHARBON ACTIF.png": "charbon-actif-probiotiques.png",
    "COLLAGÈNE.png": "collagene.png",
    "COMPLEXE DE MÉLATONINE.png": "complexe-melatonine.png",
    "COMPLEXE DE PROPOLIS FORTE.png": "complexe-propolis-forte.png",
    "COMPLEXE DE VITAMINE C.png": "complexe-vitamine-c.png",
    "COMPLEXE DE VITAMINES B.png": "complexe-vitamines-b.png",
    "COMPLEXE DE VITAMINES\xA0B.png": "complexe-vitamines-b.png",
    "COMPLEXE D’OMÉGA 3.png": "complexe-omega-369.png",
    "HUILE D'ONAGRE.png": "huile-onagre.png",
    "MULTIVITAMINES & MINÉRAUX.png": "multivitamines-mineraux.png",
    "PEAU.png": "peau-cheveux-ongles.png"
}

for filename in os.listdir(dir_path):
    if filename in mapping:
        old_path = os.path.join(dir_path, filename)
        new_path = os.path.join(dir_path, mapping[filename])
        if os.path.exists(new_path):
            os.remove(new_path)
        os.rename(old_path, new_path)
        print(f"Renamed {filename} to {mapping[filename]}")
