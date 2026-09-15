import os
import re

products_file = "frontend/src/lib/products.ts"

with open(products_file, 'r', encoding='utf-8') as f:
    content = f.read()

labels_dir = "frontend/public/images/labels"
if os.path.exists(labels_dir):
    label_files = os.listdir(labels_dir)
    for lf in label_files:
        if not lf.endswith(".png"): continue
        id_val = lf.replace(".png", "")
        
        # Regex to find the product block with this ID
        pattern = re.compile(r"(id:\s*['\"]" + re.escape(id_val) + r"['\"],.*?imagePath:\s*['\"].*?['\"],)", re.DOTALL)
        
        def replacer(match):
            block = match.group(1)
            if "labelImagePath:" not in block:
                # Append labelImagePath after imagePath
                return block + f"\n    labelImagePath: '/images/labels/{lf}',"
            return block
        
        content = pattern.sub(replacer, content)

with open(products_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated products.ts")
