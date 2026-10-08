from PIL import Image

def perfect_match():
    # 1. Analyze propolis.jpeg (the reference)
    propolis_path = "frontend/public/images/products/propolis.jpeg"
    im_prop = Image.open(propolis_path)
    
    # We found earlier that propolis is 716x680.
    # The bottle is not perfectly pure white, let's find its bbox
    gray_prop = im_prop.convert('L')
    # Use a high threshold to ignore the white background
    bw_prop = gray_prop.point(lambda x: 0 if x > 250 else 255, '1')
    bbox_prop = bw_prop.getbbox()
    print("Propolis size:", im_prop.size)
    print("Propolis tight bbox:", bbox_prop)
    
    if not bbox_prop:
        bbox_prop = (100, 160, 616, 680) # fallback based on previous runs
        
    prop_bottle_h = bbox_prop[3] - bbox_prop[1]
    prop_bottle_y = bbox_prop[1]
    print(f"Reference bottle height: {prop_bottle_h}, y-offset: {prop_bottle_y}")
    
    # 2. Process omegaa.jpeg (the target)
    omega_path = "frontend/public/images/products/omegaa.jpeg"
    
    # Let's make sure we're using the pure uploaded image
    import shutil
    shutil.copyfile("C:/Users/Ce_Pc/.gemini/antigravity-ide/brain/e27e6502-3e09-4852-b8d5-4f7f7339c7f5/.user_uploaded/media_1789229527302.png", omega_path)
    
    im_omega = Image.open(omega_path)
    print("Omega original size:", im_omega.size)
    
    gray_omega = im_omega.convert('L')
    # The uploaded omega.jpeg might have slightly off-white shadows
    bw_omega = gray_omega.point(lambda x: 0 if x > 240 else 255, '1')
    bbox_omega = bw_omega.getbbox()
    
    print("Omega tight bbox:", bbox_omega)
    
    if not bbox_omega:
        # Fallback if threshold fails
        bbox_omega = (0, 0, im_omega.width, im_omega.height)
        
    bottle_omega = im_omega.crop(bbox_omega)
    
    # =========================================================================
    # PARAMÈTRES MODIFIABLES
    # =========================================================================
    # Modifiez ces valeurs pour ajuster manuellement la taille et la position
    
    # 1. Hauteur de la bouteille (agrandir ou rétrécir)
    # Par défaut, elle copie la hauteur de Propolis (environ 520). 
    # Mettez par exemple 550 pour agrandir, 490 pour rétrécir.
    MANUAL_BOTTLE_HEIGHT = 490
    
    # 2. Position verticale (déplacer vers le haut ou vers le bas)
    # Par défaut, elle copie la position de Propolis (environ 160). 
    # Mettez une valeur plus PETITE (ex: 120) pour monter la bouteille.
    # Mettez une valeur plus GRANDE (ex: 200) pour descendre la bouteille.
    MANUAL_OFFSET_Y = 160
    # =========================================================================
    
    # 3. Resize and Paste
    # Resize bottle_omega to match the MANUAL height
    ratio = MANUAL_BOTTLE_HEIGHT / bottle_omega.height
    new_w = int(bottle_omega.width * ratio)
    new_h = MANUAL_BOTTLE_HEIGHT
    
    bottle_resized = bottle_omega.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Create final canvas to match propolis exactly (716x680)
    canvas = Image.new('RGB', im_prop.size, (255, 255, 255))
    
    # Paste it at the same Y offset as propolis, centered horizontally
    offset_x = (im_prop.width - new_w) // 2
    offset_y = MANUAL_OFFSET_Y
    
    canvas.paste(bottle_resized, (offset_x, offset_y))
    canvas.save("frontend/public/images/products/omega.jpeg")
    canvas.save("frontend/public/images/products/omegaa.jpeg")
    print(f"Saved matched omega.jpeg & omegaa.jpeg: canvas={canvas.size}, bottle={new_w}x{new_h}, offset=({offset_x}, {offset_y})")

perfect_match()
