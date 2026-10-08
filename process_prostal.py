import fitz
import os
from PIL import Image
import re

pdf_path = r'frontend/public/images/back_products/Prostal (1).pdf'
out_path = r'frontend/public/images/labels/prostal.png'

print('Opening PDF:', pdf_path)
doc = fitz.open(pdf_path)
page = doc.load_page(0)
pix = page.get_pixmap(dpi=150)
pix.save(out_path)
doc.close()
print('Converted PDF to PNG.')

img = Image.open(out_path)
width, height = img.size
# Left part is usually the ingredients panel. Let's crop 0 to 60% of width
crop_box = (0, 0, int(width * 0.6), height)
img_cropped = img.crop(crop_box)
img_cropped.save(out_path)
print('Cropped image.')

products_file = r'frontend/src/lib/products.ts'
with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r"(id:\s*['\"]prostal['\"],.*?imagePath:\s*['\"].*?['\"],)", re.DOTALL)
def replacer(match):
    block = match.group(1)
    if 'labelImagePath:' not in block:
        return block + "\n    labelImagePath: '/images/labels/prostal.png',"
    return block

content = pattern.sub(replacer, content)

with open(products_file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Injected label into products.ts')
