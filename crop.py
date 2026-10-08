from PIL import Image, ImageChops

def trim(im):
    # Convert to grayscale and threshold to get mask of non-white pixels
    gray = im.convert('L')
    bw = gray.point(lambda x: 0 if x > 240 else 255, '1')
    bbox = bw.getbbox()
    if bbox:
        print("Bounding box found:", bbox)
        # Add some padding
        padding = 40
        left = max(0, bbox[0] - padding)
        top = max(0, bbox[1] - padding)
        right = min(im.width, bbox[2] + padding)
        bottom = min(im.height, bbox[3] + padding)
        return im.crop((left, top, right, bottom))
    return im

def crop_omega():
    path = "frontend/public/images/products/omega.jpeg"
    im = Image.open(path)
    print("Original size:", im.size)
    
    # We know the bottom has UI elements. So let's crop the bottom 160 pixels first to remove them
    im_no_ui = im.crop((0, 0, im.width, im.height - 180))
    
    # Now trim the white space
    cropped = trim(im_no_ui)
    
    # To match the aspect ratio of other images which are roughly square, let's paste it on a white square
    max_dim = max(cropped.width, cropped.height) + 100
    square = Image.new('RGB', (max_dim, max_dim), (255, 255, 255))
    offset = ((max_dim - cropped.width) // 2, (max_dim - cropped.height) // 2)
    square.paste(cropped, offset)
    
    print("New size:", square.size)
    square.save(path)

crop_omega()
