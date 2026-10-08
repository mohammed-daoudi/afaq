import fitz
import os
import glob

pdf_dir = "frontend/public/images/back_products"
out_dir = "frontend/public/images/labels"

os.makedirs(out_dir, exist_ok=True)

for pdf_path in glob.glob(os.path.join(pdf_dir, "*.pdf")):
    name = os.path.basename(pdf_path)
    base_name = os.path.splitext(name)[0]
    
    # We only take the product name, remove the dimensions
    # E.g., "ASHWAGANDHA-158mm-55mm.pdf" -> "ASHWAGANDHA"
    clean_name = base_name.split('-')[0].strip()
    
    doc = fitz.open(pdf_path)
    if doc.page_count > 0:
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=150)
        out_path = os.path.join(out_dir, f"{clean_name}.png")
        pix.save(out_path)
        print(f"Converted {name} to {clean_name}.png")
    doc.close()
