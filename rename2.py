import os

dir_path = "frontend/public/images/labels"

files = os.listdir(dir_path)

for filename in files:
    new_name = None
    name_lower = filename.lower()
    
    if "ashwagandha" in name_lower: new_name = "ashwagandha.png"
    elif "bisglycinate" in name_lower: new_name = "bisglycinate-magnesium.png"
    elif "charbon" in name_lower: new_name = "charbon-actif-probiotiques.png"
    elif "collag" in name_lower: new_name = "collagene.png"
    elif "m\xe9latonine" in name_lower or "mlatonine" in name_lower or "melatonine" in name_lower: new_name = "complexe-melatonine.png"
    elif "propolis" in name_lower: new_name = "complexe-propolis-forte.png"
    elif "vitamine c" in name_lower: new_name = "complexe-vitamine-c.png"
    elif "multivitamines" in name_lower: new_name = "multivitamines-mineraux.png"
    elif "vitamines" in name_lower: new_name = "complexe-vitamines-b.png"
    elif "om\xe9ga" in name_lower or "omga" in name_lower or "omega" in name_lower: new_name = "complexe-omega-369.png"
    elif "onagre" in name_lower: new_name = "huile-onagre.png"
    elif "peau" in name_lower: new_name = "peau-cheveux-ongles.png"
    
    if new_name and filename.lower() != new_name.lower():
        old_path = os.path.join(dir_path, filename)
        new_path = os.path.join(dir_path, new_name)
        
        # In Windows, renaming to the same file but different case can fail if we do it directly sometimes,
        # but here the names are totally different except for ashwagandha.
        # Just to be safe, rename to a temp name first.
        temp_path = os.path.join(dir_path, new_name + ".tmp")
        os.rename(old_path, temp_path)
        if os.path.exists(new_path):
            os.remove(new_path)
        os.rename(temp_path, new_path)
        print(f"Renamed {filename} to {new_name}")
