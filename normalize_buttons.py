import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def replace_classes(match):
        cls_str = match.group(1)
        # Split into individual classes
        classes = cls_str.split()
        
        # Classes to remove
        remove_patterns = [
            r'^hover:.*$',
            r'^shadow-.*$',
            r'^rounded-.*$',
            r'^transition-.*$',
            r'^duration-.*$',
            r'^transform$',
            r'^shimmer-effect$',
            r'^group-hover:.*$'
        ]
        
        filtered_classes = []
        for cls in classes:
            should_remove = False
            for pattern in remove_patterns:
                if re.match(pattern, cls):
                    should_remove = True
                    break
            if not should_remove:
                filtered_classes.append(cls)
                
        # Append the standardized Espace Pro styles
        filtered_classes.extend([
            'rounded-xl',
            'hover:bg-gold-soft',
            'hover:text-teal-deep',
            'transition-all',
            'shadow-md',
            'shimmer-effect'
        ])
        
        new_cls_str = ' '.join(filtered_classes)
        return match.group(0).replace(cls_str, new_cls_str)

    # Match className="..."
    new_content = re.sub(r'className="([^"]*bg-teal-deep[^"]*text-white[^"]*)"', replace_classes, content)
    # Match className={`...`}
    new_content = re.sub(r'className=\{`([^`]*bg-teal-deep[^`]*text-white[^`]*)`\}', replace_classes, new_content)
    # Also match className={'...'}
    new_content = re.sub(r"className=\{'([^']*bg-teal-deep[^']*text-white[^']*)'\}", replace_classes, new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    root_dir = r"c:\Users\Ce_Pc\Desktop\afaq\frontend\src"
    modified = 0
    for subdir, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                if process_file(os.path.join(subdir, file)):
                    modified += 1
                    print(f"Modified: {file}")
                    
    print(f"Total modified files: {modified}")

if __name__ == "__main__":
    main()
