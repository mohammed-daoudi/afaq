from PIL import Image

def perfect_match_smart():
    # 1. Analyze propolis.jpeg (the reference)
    propolis_path = "frontend/public/images/products/propolis.jpeg"
    im_prop = Image.open(propolis_path)
    gray_prop = im_prop.convert('L')
    # Aggressive threshold to find the actual bottle
    bw_prop = gray_prop.point(lambda x: 0 if x > 240 else 255, '1')
    bbox_prop = bw_prop.getbbox()
    print("Propolis tight bbox:", bbox_prop)
    
    if not bbox_prop:
        bbox_prop = (100, 160, 616, 680)
        
    prop_bottle_h = bbox_prop[3] - bbox_prop[1]
    prop_bottle_y = bbox_prop[1]
    
    # 2. Process omegaa.jpeg (the target)
    omega_path = "frontend/public/images/products/omegaa.jpeg"
    
    import shutil
    shutil.copyfile("C:/Users/Ce_Pc/.gemini/antigravity-ide/brain/e27e6502-3e09-4852-b8d5-4f7f7339c7f5/.user_uploaded/media_1789220180427.png", omega_path)
    
    im_omega = Image.open(omega_path)
    
    gray_omega = im_omega.convert('L')
    # Aggressive threshold to find the actual bottle
    bw_omega = gray_omega.point(lambda x: 0 if x > 240 else 255, '1')
    bbox_omega = bw_omega.getbbox()
    
    print("Omega tight bbox:", bbox_omega)
    
    if not bbox_omega:
        bbox_omega = (0, 0, im_omega.width, im_omega.height)
        
    bottle_omega = im_omega.crop(bbox_omega)
    
    # 3. Resize and Paste
    # Resize bottle_omega to match the height of prop_bottle_h
    ratio = prop_bottle_h / bottle_omega.height
    new_w = int(bottle_omega.width * ratio)
    new_h = prop_bottle_h
    
    bottle_resized = bottle_omega.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    canvas = Image.new('RGB', im_prop.size, (255, 255, 255))
    
    offset_x = (im_prop.width - new_w) // 2
    offset_y = prop_bottle_y
    
    canvas.paste(bottle_resized, (offset_x, offset_y))
    canvas.save(omega_path)
    print(f"Saved matched omegaa.jpeg: canvas={canvas.size}, bottle={new_w}x{new_h}, offset=({offset_x}, {offset_y})")

perfect_match_smart()
