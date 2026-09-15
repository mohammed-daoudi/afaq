from PIL import Image

def manual_crop():
    path = "frontend/public/images/products/omega.jpeg"
    im = Image.open(path)
    print("Original size:", im.size)
    
    # The original image is 636 x 798. 
    # The user says the bottle is too small or too chopped.
    # Let's crop the bottom 150 pixels (UI elements).
    # Then we make it a square to fit the Next/Image aspect ratio nicely.
    
    # We crop out the bottom 150px
    im_no_ui = im.crop((0, 0, 636, 798 - 150))
    
    # Size is now 636 x 648
    # To zoom in, we can crop out some white space from the left, right, and top.
    # Let's crop 50px from left, 50px from right, 50px from top.
    left = 60
    right = 636 - 60
    top = 50
    bottom = 648
    
    cropped = im_no_ui.crop((left, top, right, bottom))
    print("Cropped size:", cropped.size)
    
    # Make it a perfect square with a white background so Next.js Image component renders it correctly
    max_dim = max(cropped.width, cropped.height) + 40 # add a small padding 20px on each side
    square = Image.new('RGB', (max_dim, max_dim), (255, 255, 255))
    offset = ((max_dim - cropped.width) // 2, (max_dim - cropped.height) // 2)
    square.paste(cropped, offset)
    
    print("Final size:", square.size)
    square.save(path)

manual_crop()
