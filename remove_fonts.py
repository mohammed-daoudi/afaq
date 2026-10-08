import os
import re

def remove_classes(root_dir):
    pattern = re.compile(r'\b(italic|font-serif|font-heading|font-sans)\b\s*')
    
    count = 0
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                filepath = os.path.join(subdir, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace these classes and any trailing/leading spaces gracefully
                new_content = pattern.sub('', content)
                # Cleanup any double spaces created inside classNames if needed, 
                # but React handles extra spaces fine.
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
                    
    print(f"Modified {count} files.")

if __name__ == "__main__":
    remove_classes(r"c:\Users\Ce_Pc\Desktop\afaq\frontend\src")
