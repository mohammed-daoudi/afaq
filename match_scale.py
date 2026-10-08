from PIL import Image

def perfect_match_crop():
    path = "frontend/public/images/products/omega.jpeg"
    
    # Restore original first
    import subprocess
    subprocess.run(["git", "checkout", "--", path])
    
    im = Image.open(path)
    # Original is 636 x 798
    
    # Crop bottom 150px (UI elements)
    im_no_ui = im.crop((0, 0, 636, 798 - 150))
    
    # Get tight bounding box (threshold 252 to catch shadows)
    gray = im_no_ui.convert('L')
    bw = gray.point(lambda x: 0 if x > 252 else 255, '1')
    bbox = bw.getbbox()
    print("Tight bbox:", bbox)
    
    if not bbox:
        bbox = (0, 0, 636, 648)
        
    bottle_img = im_no_ui.crop(bbox)
    
    # Target: match propolis.jpeg (716x680)
    # Make bottle BIGGER (was 520, now 580) and position it HIGHER
    target_canvas_w = 716
    target_canvas_h = 680
    target_bottle_h = 580  # bigger than before
    
    ratio = target_bottle_h / bottle_img.height
    new_w = int(bottle_img.width * ratio)
    new_h = target_bottle_h
    
    bottle_resized = bottle_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    # Create final canvas
    final_img = Image.new('RGB', (target_canvas_w, target_canvas_h), (255, 255, 255))
    
    # Center horizontally, position higher (offset_y = 60 instead of bottom-aligned)
    offset_x = (target_canvas_w - new_w) // 2
    offset_y = 60  # push it up
    
    final_img.paste(bottle_resized, (offset_x, offset_y))
    final_img.save(path)
    print(f"Saved: bottle {new_w}x{new_h}, canvas {target_canvas_w}x{target_canvas_h}, offset_y={offset_y}")

perfect_match_crop()
