import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('.', function(filePath) {
  if (filePath.endsWith('.jsx') && !filePath.includes('Shared')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Remove `const stripRef = useRef(null);`
    content = content.replace(/.*const stripRef = useRef\(null\);.*?\n/, '');

    // Remove GSAP stripRef hook
    content = content.replace(/\s*\/\*\s*client strip drifts continuously.*?[\s\S]*?}, \[\]\);/g, '');

    // Remove import { CLIENT_LOGOS }
    content = content.replace(/import\s+\{\s*CLIENT_LOGOS\s*\}\s+from\s+['"][^'"]+['"];?\n?/g, '');

    // Replace <section className="...v2-client-strip..." ...>...</section>
    const sectionRegex = /<section\s+className="[^"]*v2-client-strip[^"]*"[^>]*>[\s\S]*?<\/section>/;
    if (sectionRegex.test(content)) {
      content = content.replace(sectionRegex, '<ClientStrip />');

      // Add import ClientStrip from Shared
      if (!content.includes('import ClientStrip')) {
        const lastImportIndex = content.lastIndexOf('import ');
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        const fileDir = path.dirname(filePath);
        let relativePath = path.relative(fileDir, 'Shared/ClientStrip');
        if (!relativePath.startsWith('.')) relativePath = './' + relativePath;
        relativePath = relativePath.replace(/\\/g, '/');
        
        content = content.substring(0, endOfLastImport + 1) +
          `import ClientStrip from '${relativePath}';\n` +
          content.substring(endOfLastImport + 1);
      }
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated ${filePath}`);
    }
  }
});
