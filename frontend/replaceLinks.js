const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      if (content.includes("import Link from 'next/link'") || content.includes('import Link from "next/link"')) {
        content = content.replace(/import Link from ['"]next\/link['"];?/g, "import { Link } from '@/navigation';");
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated', fullPath);
      }
    }
  }
}

walk(srcDir);
